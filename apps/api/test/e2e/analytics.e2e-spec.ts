import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { DBManager } from '../utils/db-manager';
import { TenantFactory } from '../factories/tenant.factory';
import { CaseFactory } from '../factories/case.factory';
import { UserFactory } from '../factories/user.factory';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, Tenant, Case } from '@prisma/client';
import { PredictionService } from '../../src/modules/analytics/prediction.service';
import { CBAService } from '../../src/modules/analytics/cba.service';
import { GISService } from '../../src/modules/analytics/gis.service';

// [Flow: Setup Test Env -> Generate Auth Token -> Test POST /analytics/predict -> Test GET /analytics/cba/:caseId -> Test GET /analytics/gis/:caseId -> Test GET /analytics/gis/:caseId/hotspots]
describe('AnalyticsController (e2e Real DB)', () => {
  let app: INestApplication;
  let dbManager: DBManager;
  let prisma: PrismaClient;
  let jwtService: JwtService;
  
  let testTenant: Tenant;
  let testCase: Case;
  let authToken: string;

  beforeAll(async () => {
    // 1. Start Test DB
    dbManager = new DBManager();
    prisma = await dbManager.start();

    // 2. Setup NestJS App without Prisma Mocks but keep service mocks
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PredictionService)
      .useValue({ predictOutcome: jest.fn().mockResolvedValue({ winProbability: 0.85, estimatedSettlement: 50000, riskFactors: [], keyDrivers: [], recommendation: 'Proceed' }) })
      .overrideProvider(CBAService)
      .useValue({ calculateCBA: jest.fn().mockResolvedValue({ totalExpectedRevenue: 100000, totalExpectedCosts: 20000, netExpectedValue: 80000, roi: 4.0, breakdown: [] }) })
      .overrideProvider(GISService)
      .useValue({ 
        getGISData: jest.fn().mockResolvedValue({ caseId: 'case-123', plaintiffLocations: [], courtLocations: [], generatedAt: new Date() }),
        detectHotspots: jest.fn().mockResolvedValue([{ layerName: 'affected-area', bounds: [] }])
      })
      .compile();

    app = moduleFixture.createNestApplication({
      logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    });
    await app.init();

    // 3. Obtain services
    jwtService = app.get<JwtService>(JwtService);
    
    // 4. Seed database via Factories
    testTenant = await TenantFactory.create(prisma);
    testCase = await CaseFactory.create(prisma, testTenant.id);
    const testUser = await UserFactory.create(prisma, testTenant.id);

    // 5. Build JWT with matching tenantId AND userId
    authToken = jwtService.sign({
      sub: testUser.id,
      tenantId: testTenant.id,
      role: testUser.role,
    });
  }, 120000);

  afterAll(async () => {
    await app.close();
    await dbManager.stop();
  });

  it('POST /analytics/predict - Should predict outcome', async () => {
    return request(app.getHttpServer())
      .post('/analytics/predict')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        caseId: testCase.id,
        factors: { evidenceStrength: 0.8 },
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.winProbability).toBeDefined();
        expect(res.body.estimatedSettlement).toBeDefined();
      });
  });

  it('GET /analytics/cba/:caseId - Should calculate CBA', async () => {
    return request(app.getHttpServer())
      .get(`/analytics/cba/${testCase.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.totalExpectedRevenue).toBeDefined();
        expect(res.body.totalExpectedCosts).toBeDefined();
        expect(res.body.roi).toBeDefined();
      });
  });

  it('GET /analytics/gis/:caseId - Should get GIS data', async () => {
    return request(app.getHttpServer())
      .get(`/analytics/gis/${testCase.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.plaintiffLocations).toBeDefined();
        expect(res.body.caseId).toBe('case-123'); // from the mock returned above
      });
  });

  it('GET /analytics/gis/:caseId/hotspots - Should detect hotspots', async () => {
    return request(app.getHttpServer())
      .get(`/analytics/gis/${testCase.id}/hotspots`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
      });
  });
});

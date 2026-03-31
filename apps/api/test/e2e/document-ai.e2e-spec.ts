import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { DBManager } from '../utils/db-manager';
import { TenantFactory } from '../factories/tenant.factory';
import { CaseFactory } from '../factories/case.factory';
import { UserFactory } from '../factories/user.factory';
import { PlaintiffFactory } from '../factories/plaintiff.factory';
import { EvidenceFactory } from '../factories/evidence.factory';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, Tenant, Case, Plaintiff, Evidence } from '@prisma/client';

describe('DocumentAIController (e2e Real DB)', () => {
  let app: INestApplication;
  let dbManager: DBManager;
  let prisma: PrismaClient;
  let jwtService: JwtService;
  
  let testTenant: Tenant;
  let testCase: Case;
  let testPlaintiff: Plaintiff;
  let testEvidence: Evidence;
  let authToken: string;

  beforeAll(async () => {
    // 1. Start Test DB
    dbManager = new DBManager();
    prisma = await dbManager.start();

    // 2. Setup NestJS App without Prisma Mocks
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

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
    
    testPlaintiff = await PlaintiffFactory.create(prisma, testTenant.id, testCase.id);
    testEvidence = await EvidenceFactory.create(prisma, testTenant.id, testCase.id, {
      plaintiffId: testPlaintiff.id,
      vlmStatus: 'COMPLETED',
      vlmResult: { summary: 'Detailed test summary' },
      crossValidationStatus: 'MATCHED',
    });

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

  it('POST /evidence/verify - Should upload and enqueue evidence', async () => {
    // For local tests where 'file' might not be physically persisted, we just ensure it creates an Evidence row.
    return request(app.getHttpServer())
      .post('/evidence/verify')
      .set('Authorization', `Bearer ${authToken}`)
      .field('caseId', testCase.id)
      .field('plaintiffId', testPlaintiff.id)
      .attach('file', Buffer.from('mock content PDF'), 'test-file.pdf')
      .expect(201)
      .expect((res) => {
        expect(res.body.evidenceId).toBeDefined();
        // The service logic forces COMPLETED locally, or PENDING depending on DocumentAIService rules
        expect(['PENDING', 'COMPLETED']).toContain(res.body.status);
      });
  });

  it('GET /evidence/:id/vlm-result - Should get VLM result', async () => {
    return request(app.getHttpServer())
      .get(`/evidence/${testEvidence.id}/vlm-result`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
      });
  });

  it('POST /evidence/:id/cross-validate - Should trigger cross validation', async () => {
    return request(app.getHttpServer())
      .post(`/evidence/${testEvidence.id}/cross-validate`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(201)
      .expect((res) => {
        expect(res.body).toBeDefined();
      });
  });

  it('GET /evidence/:id/status - Should get evidence status', async () => {
    return request(app.getHttpServer())
      .get(`/evidence/${testEvidence.id}/status`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.vlmStatus).toBe('COMPLETED');
        expect(res.body.crossValidationStatus).toBe('REVIEW_NEEDED');
      });
  });
});

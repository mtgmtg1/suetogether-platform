import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { DBManager } from '../utils/db-manager';
import { TenantFactory } from '../factories/tenant.factory';
import { CaseFactory } from '../factories/case.factory';
import { UserFactory } from '../factories/user.factory';
import { PlaintiffFactory } from '../factories/plaintiff.factory';
import { SettlementFactory, SettlementDistributionFactory } from '../factories/settlement.factory';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, Tenant, Case, Plaintiff, Settlement, SettlementDistribution } from '@prisma/client';

describe('SettlementController (e2e Real DB)', () => {
  let app: INestApplication;
  let dbManager: DBManager;
  let prisma: PrismaClient;
  let jwtService: JwtService;
  
  let testTenant: Tenant;
  let testCase: Case;
  let testPlaintiff1: Plaintiff;
  let testPlaintiff2: Plaintiff;
  let testSettlement: Settlement;
  let testDistribution: SettlementDistribution;
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
    
    testPlaintiff1 = await PlaintiffFactory.create(prisma, testTenant.id, testCase.id, { encryptedName: Buffer.from('P1') });
    testPlaintiff2 = await PlaintiffFactory.create(prisma, testTenant.id, testCase.id, { encryptedName: Buffer.from('P2') });
    
    testSettlement = await SettlementFactory.create(prisma, testTenant.id, testCase.id);
    testDistribution = await SettlementDistributionFactory.create(prisma, testTenant.id, testSettlement.id, testPlaintiff1.id);

    // 5. Build JWT
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

  it('POST /settlement - Should create settlement', async () => {
    return request(app.getHttpServer())
      .post('/settlement')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        caseId: testCase.id,
        totalAmount: 1000000,
        firmFee: 100000,
        taxAmount: 10000,
        netAmount: 890000,
        escrowBankCode: '004',
        escrowAccount: '1234567890',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
        // The service usually defaults status if it exists, or just returns object
        expect(res.body.caseId).toBe(testCase.id);
      });
  });

  it('POST /settlement/:id/calculate - Should calculate distribution', async () => {
    return request(app.getHttpServer())
      .post(`/settlement/${testSettlement.id}/calculate`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        feePercentage: 10,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(Array.isArray(res.body.distributions)).toBe(true);
      });
  });

  it('POST /settlement/distribution/:id/sign - Should sign distribution', async () => {
    return request(app.getHttpServer())
      .post(`/settlement/distribution/${testDistribution.id}/sign`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        signatureHash: 'hash-abc',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.signatureStatus).toBe('SIGNED');
      });
  });

  it('POST /settlement/:id/execute-transfer - Should execute batch transfer', async () => {
    return request(app.getHttpServer())
      .post(`/settlement/${testSettlement.id}/execute-transfer`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(201)
      .expect((res) => {
        expect(res.body.totalSuccessful).toBeDefined();
        expect(res.body.totalFailed).toBeDefined();
      });
  });

  it('GET /settlement/:id - Should get settlement', async () => {
    return request(app.getHttpServer())
      .get(`/settlement/${testSettlement.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(testSettlement.id);
      });
  });

  it('GET /settlement/:id/distributions - Should get distributions', async () => {
    return request(app.getHttpServer())
      .get(`/settlement/${testSettlement.id}/distributions`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });
});


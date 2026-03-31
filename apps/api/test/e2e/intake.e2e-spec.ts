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

// [Flow: Setup Test Env (DB Push) -> Generate Auth Token -> Seed DB -> Test POST /intake/sessions -> Test POST /intake/verify-identity]
describe('IntakeController (e2e Real DB)', () => {
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

    // 2. Setup NestJS App without Prisma Mocks (Use real PrismaService)
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication({
      logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    });
    await app.init();

    // 3. Obtain services & prepare token
    jwtService = app.get<JwtService>(JwtService);
    
    // 4. Seed database via Factories
    testTenant = await TenantFactory.create(prisma, {
      encryptionKey: '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f' // 32 byte realistic mock key
    });
    testCase = await CaseFactory.create(prisma, testTenant.id);
    const testUser = await UserFactory.create(prisma, testTenant.id);

    // 5. Build JWT with matching tenantId AND userId
    authToken = jwtService.sign({
      sub: testUser.id,
      tenantId: testTenant.id,
      role: testUser.role,
    });
  }, 120000); // 120s timeout to allow Docker image pull & DB schema push

  afterAll(async () => {
    await app.close();
    await dbManager.stop();
  });

  it('POST /intake/sessions - Should start a new session in Real DB', async () => {
    const res = await request(app.getHttpServer())
      .post('/intake/sessions')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ caseId: testCase.id })
      .expect((res) => {
        if (res.status !== 201) {
          console.error('[POST /intake/sessions] Error:', res.body);
        }
        expect(res.status).toBe(201);
      });
      
    expect(res.body.sessionId).toBeDefined();

    // Verify AuditLog was created
    const auditLog = await prisma.auditLog.findFirst({
      where: { tenantId: testTenant.id, resource: 'IntakeSession', resourceId: res.body.sessionId }
    });
    expect(auditLog).toBeDefined();
  });

  it('POST /intake/verify-identity - Should verify identity with real CryptoService DB encryption key', async () => {
    return request(app.getHttpServer())
      .post('/intake/verify-identity')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        provider: 'KCB',
        name: 'Test User',
        phone: '01012345678',
        birthDate: '19900101',
      })
      .expect((res) => {
        if (res.status !== 201) {
          console.error('[POST /intake/verify-identity] Error:', res.body);
        }
        expect(res.status).toBe(201);
      })
      .expect((res) => {
        expect(res.body.verified).toBeDefined();
      });
  });
});

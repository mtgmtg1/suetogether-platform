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
import { PrismaClient, Tenant, Case, Plaintiff } from '@prisma/client';
import { EmbeddingService } from '../../src/modules/rag/embedding.service';
import { RetrieverService } from '../../src/modules/rag/retriever.service';
import { MedicalChronologyService } from '../../src/modules/rag/medical-chronology.service';

// [Flow: Setup Test Env -> Generate Auth Token -> Test POST /rag/index -> Test POST /rag/query -> Test POST /rag/medical-chronology -> Test GET /rag/index/:caseId/status]
describe('RAGController (e2e Real DB)', () => {
  let app: INestApplication;
  let dbManager: DBManager;
  let prisma: PrismaClient;
  let jwtService: JwtService;
  
  let testTenant: Tenant;
  let testCase: Case;
  let testPlaintiff: Plaintiff;
  let authToken: string;

  beforeAll(async () => {
    // 1. Start Test DB
    dbManager = new DBManager();
    prisma = await dbManager.start();

    // 2. Setup NestJS App without Prisma Mocks but keep service mocks
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(EmbeddingService)
      .useValue({ embedText: jest.fn().mockResolvedValue([0.1, 0.2, 0.3]) })
      .overrideProvider(RetrieverService)
      .useValue({ searchSimilar: jest.fn().mockResolvedValue([{ content: 'source code 1', metadata: { docId: 'ev-1' } }]) })
      .overrideProvider(MedicalChronologyService)
      .useValue({
        extractTimeline: jest.fn().mockResolvedValue({ entries: [{ date: '2023-01-01', event: 'Pain started' }], generatedBy: 'AI', overallConfidence: 0.9 })
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
    testPlaintiff = await PlaintiffFactory.create(prisma, testTenant.id, testCase.id);

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

  it('POST /rag/index - Should index documents', async () => {
    return request(app.getHttpServer())
      .post('/rag/index')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ caseId: testCase.id, evidenceIds: ['ev-1', 'ev-2'] })
      .expect(201)
      .expect((res) => {
        expect(res.body.evidenceIds).toEqual(['ev-1', 'ev-2']);
        expect(res.body.totalChunks).toBeDefined();
      });
  });

  it('POST /rag/query - Should perform RAG query', async () => {
    return request(app.getHttpServer())
      .post('/rag/query')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ caseId: testCase.id, question: 'What is the standard of care?' })
      .expect(201)
      .expect((res) => {
        expect(res.body.answer).toBeDefined();
        // Fallback or empty if not sufficiently mocked since we didn't mock RetrieverService directly,
        // it might return the fallback "해당 내용을 찾을 수 없습니다." if nothing is configured.
      });
  });

  it('POST /rag/medical-chronology - Should generate chronology', async () => {
    return request(app.getHttpServer())
      .post('/rag/medical-chronology')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ caseId: testCase.id, plaintiffId: testPlaintiff.id })
      .expect(201)
      .expect((res) => {
        expect(res.body.entries).toBeDefined();
        expect(res.body.overallConfidence).toBeDefined();
      });
  });

  it('GET /rag/index/:caseId/status - Should get index status', async () => {
    return request(app.getHttpServer())
      .get(`/rag/index/${testCase.id}/status`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBeDefined();
      });
  });
});

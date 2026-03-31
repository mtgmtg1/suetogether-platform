import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/core/prisma.service';
import { mockPrismaService } from './utils/prisma.mock';

describe('SueTogether Integration Flow (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // 1. App Bootstrap Check
    // [Flow: Bootstrap -> Config Load -> DB Connect -> Ready]
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Pipeline should bootstrap correctly', () => {
    expect(app).toBeDefined();
  });

  it('Intake -> Evidence -> Settlement (Smoke Test)', async () => {
    const server = app.getHttpServer();
    expect(server).toBeDefined();

    // The routes themselves will be tested in separate e2e modules
  });
});

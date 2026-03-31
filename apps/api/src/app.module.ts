// ============================================================
// [Flow: 모듈 등록 → Core 초기화 → 비즈니스 모듈 로드]
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { redisStore } from 'cache-manager-ioredis-yet';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { CoreModule } from './core/core.module';
import { IntakeModule } from './modules/intake/intake.module';
import { DocumentAIModule } from './modules/document-ai/document-ai.module';
import { RAGModule } from './modules/rag/rag.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { SettlementModule } from './modules/settlement/settlement.module';

@Module({
  imports: [
    // 환경변수 로드
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    // Redis 기반 Caching 설정 (전역)
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('REDIS_HOST', 'localhost'),
        port: configService.get<number>('REDIS_PORT', 6379),
        ttl: 60 * 1000, // 기본 1분 (60000ms)
      }),
      inject: [ConfigService],
    }),
    // Redis 기반 Rate Limiter 설정 (전역)
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        throttlers: [
          {
            ttl: 60000, // 1분 동안
            limit: 100, // 최대 100회 요청 허용 (기본 글로벌 룰)
          },
        ],
        storage: new ThrottlerStorageRedisService(
          `redis://${configService.get<string>('REDIS_HOST', 'localhost')}:${configService.get<number>('REDIS_PORT', 6379)}`
        ),
      }),
    }),
    // Redis/BullMQ 설정
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST') || 'localhost',
          port: configService.get('REDIS_PORT') || 6379,
        },
      }),
      inject: [ConfigService],
    }),
    // Core Module (Auth, Tenant, Audit, Crypto)
    CoreModule,
    // Business Modules
    IntakeModule,
    DocumentAIModule,
    RAGModule,
    AnalyticsModule,
    SettlementModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

// ============================================================
// [Flow: 모듈 등록 → Core 초기화 → 비즈니스 모듈 로드]
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
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
})
export class AppModule {}

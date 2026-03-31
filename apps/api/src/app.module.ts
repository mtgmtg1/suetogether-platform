// ============================================================
// [Flow: 모듈 등록 → Core 초기화 → 비즈니스 모듈 로드]
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    // 환경변수 로드
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    // Core Module (Auth, Tenant, Audit, Crypto)
    CoreModule,
    // Business Modules - Phase 2에서 Jules 에이전트가 구현 후 등록
    // IntakeModule,
    // DocumentAIModule,
    // RAGModule,
    // AnalyticsModule,
    // SettlementModule,
  ],
})
export class AppModule {}

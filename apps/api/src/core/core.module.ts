// ============================================================
// Core Module: 시스템의 심장부 (LOCKED - Jules 에이전트 수정 불가)
// [Flow: Auth + Tenant + Audit + Crypto → 전역 제공]
import { Module, Global } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TenantModule } from './tenant/tenant.module';
import { AuditModule } from './audit/audit.module';
import { CryptoModule } from './crypto/crypto.module';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [AuthModule, TenantModule, AuditModule, CryptoModule],
  providers: [PrismaService],
  exports: [PrismaService, AuthModule, TenantModule, AuditModule, CryptoModule],
})
export class CoreModule {}

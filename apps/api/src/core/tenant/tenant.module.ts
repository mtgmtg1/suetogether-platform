// ============================================================
// Tenant Module (LOCKED)
import { Module } from '@nestjs/common';
import { TenantGuard } from './tenant.guard';
import { TenantMiddleware } from './tenant.middleware';

@Module({
  providers: [TenantGuard, TenantMiddleware],
  exports: [TenantGuard, TenantMiddleware],
})
export class TenantModule {}

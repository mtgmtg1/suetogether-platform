// ============================================================
// Tenant Guard: 테넌트 격리 강제 (LOCKED)
// [Flow: JWT에서 tenantId 추출 → 테넌트 유효성 검증 → 요청에 tenantId 주입]
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tenantId = request.tenantId;

    if (!tenantId) throw new ForbiddenException('Tenant context required');

    // 테넌트 활성 상태 검증
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { isActive: true },
    });

    if (!tenant?.isActive) throw new ForbiddenException('Tenant is inactive');

    return true;
  }
}

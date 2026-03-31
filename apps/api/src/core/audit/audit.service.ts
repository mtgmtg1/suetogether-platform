// ============================================================
// Audit Service: 불변 감사 로그 기록 (LOCKED)
// [Flow: 액션 수신 → 로그 데이터 구성 → DB Insert (불변)]
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import type { AuditLogInput } from '@shared/types/audit.types';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async log(input: AuditLogInput): Promise<void> {
    await this.prisma.auditLog.create({
      data: {
        tenantId: input.tenantId,
        userId: input.userId,
        action: input.action,
        resource: input.resource,
        resourceId: input.resourceId,
        oldValue: input.oldValue,
        newValue: input.newValue,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      },
    });
  }
}

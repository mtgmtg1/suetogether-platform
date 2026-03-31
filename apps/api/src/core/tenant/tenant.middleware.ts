// ============================================================
// Tenant Middleware: 모든 요청에 tenantId 주입 (LOCKED)
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    // JWT에서 이미 추출된 tenantId 사용 (또는 헤더로 전달)
    const tenantId =
      (req as any).tenantId ||
      req.headers['x-tenant-id'] as string;

    if (tenantId) {
      (req as any).tenantId = tenantId;
    }

    next();
  }
}

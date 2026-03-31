// ============================================================
// Audit Interceptor: 모든 변경 작업 자동 감사 (LOCKED)
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AuditService } from './audit.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;

    // GET 요청은 감사 제외
    if (method === 'GET') return next.handle();

    const tenantId = request.tenantId;
    const userId = request.user?.sub;
    const resource = context.getClass().name.replace('Controller', '');

    return next.handle().pipe(
      tap((result) => {
        this.auditService.log({
          tenantId,
          userId,
          action: this.methodToAction(method),
          resource,
          resourceId: result?.id || request.params?.id || 'unknown',
          ipAddress: request.ip,
          userAgent: request.headers['user-agent'],
        }).catch(() => {/* fire-and-forget audit */});
      }),
    );
  }

  private methodToAction(method: string) {
    const map: Record<string, string> = {
      POST: 'CREATE',
      PUT: 'UPDATE',
      PATCH: 'UPDATE',
      DELETE: 'DELETE',
    };
    return (map[method] || 'READ') as any;
  }
}

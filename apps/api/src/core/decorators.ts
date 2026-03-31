// ============================================================
// Custom Decorators (LOCKED)
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 현재 테넌트 ID 추출 데코레이터
export const CurrentTenant = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.tenantId;
  },
);

// 현재 사용자 추출 데코레이터
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.sub;
  },
);

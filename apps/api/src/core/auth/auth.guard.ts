// ============================================================
// Auth Guard: JWT 토큰 검증 가드 (LOCKED)
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import type { JwtPayload } from '@shared/types/auth.types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Access token required');

    try {
      const payload = this.jwt.verify<JwtPayload>(token);
      (request as any).user = payload;
      (request as any).tenantId = payload.tenantId;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

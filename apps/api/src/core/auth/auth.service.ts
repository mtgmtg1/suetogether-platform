// ============================================================
// [Flow: 로그인 요청 → 자격증명 검증 → JWT 토큰 발급 → 응답 반환]
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';
import type { JwtPayload } from '@shared/types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string, tenantSlug: string) {
    // Step 1: 테넌트 조회
    const tenant = await this.prisma.tenant.findUnique({
      where: { slug: tenantSlug },
    });
    if (!tenant || !tenant.isActive)
      throw new UnauthorizedException('테넌트를 찾을 수 없습니다');

    // Step 2: 사용자 조회
    const user = await this.prisma.user.findUnique({
      where: { tenantId_email: { tenantId: tenant.id, email } },
    });
    if (!user || !user.isActive)
      throw new UnauthorizedException('자격증명이 유효하지 않습니다');

    // Step 3: 비밀번호 검증
    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid)
      throw new UnauthorizedException('자격증명이 유효하지 않습니다');

    // Step 4: JWT 토큰 생성
    const payload: JwtPayload = {
      sub: user.id,
      tenantId: tenant.id,
      role: user.role,
      email: user.email,
    };

    return {
      accessToken: this.jwt.sign(payload),
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    };
  }
}

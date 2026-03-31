// ============================================================
// Auth Controller (LOCKED)
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../../shared/dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('인증 (Auth)')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '로그인', description: '이메일과 비밀번호로 로그인하여 토큰을 발급받습니다.' })
  @ApiResponse({ status: 201, description: '로그인 성공 및 토큰 반환' })
  async login(@Body() dto: LoginDto) {
    return this.authService.validateUser(dto.email, dto.password, dto.tenantSlug);
  }
}

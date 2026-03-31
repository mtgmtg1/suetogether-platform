// ============================================================
// Auth Controller (LOCKED)
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '@shared/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.validateUser(dto.email, dto.password, dto.tenantSlug);
  }
}

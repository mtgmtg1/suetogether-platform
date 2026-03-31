import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '../../core/auth/auth.guard';
import { TenantGuard } from '../../core/tenant/tenant.guard';
import { IntakeService } from './intake.service';
import {
  CreateSessionDto,
  SendMessageDto,
  VerifyIdentityDto,
  VerifyBankAccountDto
} from './dto';
import type {
  IntakeSession,
  IdentityVerificationResult,
  BankAccountVerificationResult
} from '../../shared/interfaces/intake.interface';

@Controller('intake')
@UseGuards(AuthGuard, TenantGuard)
export class IntakeController {
  constructor(private readonly intakeService: IntakeService) {}

  @Post('sessions')
  async startSession(
    @Body() dto: CreateSessionDto,
  ): Promise<IntakeSession> {
    return this.intakeService.startSession(dto.caseId);
  }

  @Post('sessions/:id/message')
  async sendMessage(
    @Param('id') sessionId: string,
    @Body() dto: SendMessageDto,
  ): Promise<IntakeSession> {
    return this.intakeService.sendMessage(sessionId, dto.message);
  }

  @Post('verify-identity')
  async verifyIdentity(
    @Body() dto: VerifyIdentityDto,
  ): Promise<IdentityVerificationResult> {
    return this.intakeService.verifyIdentity(dto);
  }

  @Post('verify-bank-account')
  async verifyBankAccount(
    @Body() dto: VerifyBankAccountDto,
  ): Promise<BankAccountVerificationResult> {
    return this.intakeService.verifyBankAccount(dto);
  }

  @Get('sessions/:id')
  async getSessionStatus(
    @Param('id') sessionId: string,
  ): Promise<IntakeSession> {
    return this.intakeService.getSession(sessionId);
  }

  @Get('sessions/:id/qualification')
  async getQualificationScore(
    @Param('id') sessionId: string,
  ): Promise<{ score: number }> {
    const score = await this.intakeService.getQualificationScore(sessionId);
    return { score };
  }
}

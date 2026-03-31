import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
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

@ApiTags('원고 모집 (Intake)')
@ApiBearerAuth()
@Controller('intake')
@UseGuards(AuthGuard, TenantGuard)
export class IntakeController {
  constructor(private readonly intakeService: IntakeService) {}

  @Post('sessions')
  @ApiOperation({ summary: '인테이크 세션 생성', description: '새로운 사건에 대한 원고 모집 문답 세션을 시작합니다.' })
  @ApiResponse({ status: 201, description: '세션 생성 성공' })
  async startSession(
    @Body() dto: CreateSessionDto,
  ): Promise<IntakeSession> {
    return this.intakeService.startSession(dto.caseId);
  }

  @Post('sessions/:id/message')
  @ApiOperation({ summary: '문답 메시지 전송', description: '생성된 세션에 답변 메시지를 전송합니다.' })
  @ApiResponse({ status: 201, description: '메시지 전송 및 다음 질문 반환' })
  async sendMessage(
    @Param('id') sessionId: string,
    @Body() dto: SendMessageDto,
  ): Promise<IntakeSession> {
    return this.intakeService.sendMessage(sessionId, dto.message);
  }

  @Post('verify-identity')
  @ApiOperation({ summary: '본인 인증', description: 'KCB/NICE/PASS 등을 통한 본인 인증을 수행합니다.' })
  @ApiResponse({ status: 201, description: '인증 성공 및 CI 반환' })
  async verifyIdentity(
    @Body() dto: VerifyIdentityDto,
  ): Promise<IdentityVerificationResult> {
    return this.intakeService.verifyIdentity(dto);
  }

  @Post('verify-bank-account')
  @ApiOperation({ summary: '계좌 인증', description: '소송 비용 및 합의금 수령을 위한 1원 계좌 인증을 수행합니다.' })
  @ApiResponse({ status: 201, description: '계좌 예금주 일치 확인' })
  async verifyBankAccount(
    @Body() dto: VerifyBankAccountDto,
  ): Promise<BankAccountVerificationResult> {
    return this.intakeService.verifyBankAccount(dto);
  }

  @Get('sessions/:id')
  @ApiOperation({ summary: '세션 상태 조회', description: '현재 세션의 진행률 및 상태를 조회합니다.' })
  @ApiResponse({ status: 200, description: '세션 상태 반환' })
  async getSessionStatus(
    @Param('id') sessionId: string,
  ): Promise<IntakeSession> {
    return this.intakeService.getSession(sessionId);
  }

  @Get('sessions/:id/qualification')
  @ApiOperation({ summary: '소송 적격 점수 조회', description: 'AI가 판단한 소송 참여 적격 점수(0~100)를 반환합니다.' })
  @ApiResponse({ status: 200, description: '적격 점수 반환' })
  async getQualificationScore(
    @Param('id') sessionId: string,
  ): Promise<{ score: number }> {
    const score = await this.intakeService.getQualificationScore(sessionId);
    return { score };
  }
}

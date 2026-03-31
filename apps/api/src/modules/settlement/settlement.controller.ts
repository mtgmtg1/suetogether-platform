import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../../core/auth/auth.guard';
import { CurrentTenant, CurrentUser } from '../../core/decorators';
import { SettlementService } from './settlement.service';
import { PaymentGatewayService } from './payment-gateway.service';
import {
  CreateSettlementDto,
  CalculateDistributionDto,
  SignDistributionDto,
  PaymentRequestDto,
} from './dto/settlement.dto';

@ApiTags('합의금 및 정산 (Settlement)')
@ApiBearerAuth()
@Controller('settlement')
@UseGuards(AuthGuard)
export class SettlementController {
  constructor(
    private readonly settlementService: SettlementService,
    private readonly paymentGatewayService: PaymentGatewayService,
  ) {}

  @Post()
  @ApiOperation({ summary: '합의/승소금 풀 생성', description: '사건에 대한 총 합의금과 에스크로 계좌를 생성합니다.' })
  @ApiResponse({ status: 201, description: '정산 풀 생성 성공' })
  async createSettlement(
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
    @Body() dto: CreateSettlementDto,
  ) {
    return this.settlementService.createSettlement(
      tenantId,
      dto.caseId,
      dto.totalAmount,
      dto.escrowBankCode,
      dto.escrowAccount,
      userId,
    );
  }

  @Post(':id/calculate')
  @ApiOperation({ summary: '분배금 계산', description: '총액에서 수수료를 제외하고 원고별 분배 비율에 따라 금액을 계산합니다.' })
  @ApiResponse({ status: 201, description: '분배 명세서 생성 완료' })
  async calculateDistribution(
    @Param('id') id: string,
    @CurrentTenant() tenantId: string,
    @Body() dto: CalculateDistributionDto,
  ) {
    return this.settlementService.calculateDistribution(id, tenantId, dto.feePercentage);
  }

  @Post('distribution/:id/sign')
  @ApiOperation({ summary: '정산 동의 서명', description: '원고가 전자 서명을 통해 정산 내역에 동의합니다.' })
  @ApiResponse({ status: 201, description: '전자 서명 검증 및 승인 완료' })
  async signDistribution(
    @Param('id') id: string,
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
    @Body() dto: SignDistributionDto,
  ) {
    return this.settlementService.signDistribution(id, tenantId, dto.signatureHash, userId);
  }

  @Post(':id/execute-transfer')
  @ApiOperation({ summary: '일괄 이체 (펌뱅킹)', description: '동의가 완료된 원고들에게 펌뱅킹 망을 통해 분배금을 일괄 송금합니다.' })
  @ApiResponse({ status: 201, description: '일괄 송금 요청 큐 등록 완료' })
  async executeTransfer(
    @Param('id') id: string,
    @CurrentTenant() tenantId: string,
  ) {
    return this.settlementService.executeBatchTransfer(id, tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: '정산 풀 정보 조회', description: '합의금 풀의 총액 및 상태를 조회합니다.' })
  @ApiResponse({ status: 200, description: '정산 정보 반환' })
  async getSettlement(
    @Param('id') id: string,
    @CurrentTenant() tenantId: string,
  ) {
    return this.settlementService.getSettlement(id, tenantId);
  }

  @Get(':id/distributions')
  @ApiOperation({ summary: '원고별 분배 명세 조회', description: '개별 원고의 분배금 및 서명 진행 상태를 조회합니다.' })
  @ApiResponse({ status: 200, description: '분배 명세 목록 반환' })
  async getDistributions(
    @Param('id') id: string,
    @CurrentTenant() tenantId: string,
  ) {
    return this.settlementService.getDistributions(id, tenantId);
  }

  @Get('distribution/:id/status')
  @ApiOperation({ summary: '개별 이체 상태 조회', description: '특정 원고에 대한 송금 완료 여부를 조회합니다.' })
  @ApiResponse({ status: 200, description: '송금 상태 반환' })
  async getTransferStatus(@Param('id') id: string) {
    return this.settlementService.getTransferStatus(id);
  }

  // Payment Gateway endpoints
  @Post('payment/request')
  @ApiOperation({ summary: '수임료 결제 요청 (PG)', description: '토스페이먼츠 등 PG 모듈을 통한 결제 위젯 요청을 생성합니다.' })
  @ApiResponse({ status: 201, description: '결제 요청 성공' })
  async requestPayment(@Body() dto: PaymentRequestDto) {
    return this.paymentGatewayService.requestPayment(dto);
  }

  @Post('payment/confirm')
  @ApiOperation({ summary: 'PG 결제 승인 확인', description: '인증된 결제를 PG 서버에 최종 승인 요청합니다.' })
  @ApiResponse({ status: 201, description: '결제 승인 완료' })
  async confirmPayment(
    @Body('paymentKey') paymentKey: string,
    @Body('orderId') orderId: string,
    @Body('amount') amount: number,
  ) {
    return this.paymentGatewayService.confirmPayment(paymentKey, orderId, amount);
  }
}

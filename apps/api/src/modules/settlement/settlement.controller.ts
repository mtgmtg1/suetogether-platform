import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
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

@Controller('settlement')
@UseGuards(AuthGuard)
export class SettlementController {
  constructor(
    private readonly settlementService: SettlementService,
    private readonly paymentGatewayService: PaymentGatewayService,
  ) {}

  @Post()
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
  async calculateDistribution(
    @Param('id') id: string,
    @CurrentTenant() tenantId: string,
    @Body() dto: CalculateDistributionDto,
  ) {
    return this.settlementService.calculateDistribution(id, tenantId, dto.feePercentage);
  }

  @Post('distribution/:id/sign')
  async signDistribution(
    @Param('id') id: string,
    @CurrentTenant() tenantId: string,
    @CurrentUser() userId: string,
    @Body() dto: SignDistributionDto,
  ) {
    return this.settlementService.signDistribution(id, tenantId, dto.signatureHash, userId);
  }

  @Post(':id/execute-transfer')
  async executeTransfer(
    @Param('id') id: string,
    @CurrentTenant() tenantId: string,
  ) {
    return this.settlementService.executeBatchTransfer(id, tenantId);
  }

  @Get(':id')
  async getSettlement(
    @Param('id') id: string,
    @CurrentTenant() tenantId: string,
  ) {
    return this.settlementService.getSettlement(id, tenantId);
  }

  @Get(':id/distributions')
  async getDistributions(
    @Param('id') id: string,
    @CurrentTenant() tenantId: string,
  ) {
    return this.settlementService.getDistributions(id, tenantId);
  }

  @Get('distribution/:id/status')
  async getTransferStatus(@Param('id') id: string) {
    return this.settlementService.getTransferStatus(id);
  }

  // Payment Gateway endpoints
  @Post('payment/request')
  async requestPayment(@Body() dto: PaymentRequestDto) {
    return this.paymentGatewayService.requestPayment(dto);
  }

  @Post('payment/confirm')
  async confirmPayment(
    @Body('paymentKey') paymentKey: string,
    @Body('orderId') orderId: string,
    @Body('amount') amount: number,
  ) {
    return this.paymentGatewayService.confirmPayment(paymentKey, orderId, amount);
  }
}

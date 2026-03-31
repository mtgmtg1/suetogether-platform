import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma.service';
import { CryptoService } from '../../core/crypto/crypto.service';
import { AuditService } from '../../core/audit/audit.service';
import { TaxCalculatorService } from './tax-calculator.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Decimal } from '@prisma/client/runtime/library';
import {
  ISettlementService,
  DistributionResult,
  DistributionCalculation,
  BatchTransferResult,
  TransferStatusResult,
} from '../../shared/interfaces/settlement.interface';
import { AuditAction, BatchTransferStatus, SignatureStatus, TransferStatus } from '@prisma/client';

@Injectable()
export class SettlementService implements ISettlementService {
  private readonly logger = new Logger(SettlementService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
    private readonly auditService: AuditService,
    private readonly taxCalculatorService: TaxCalculatorService,
    @InjectQueue('settlement-distribution') private readonly distributionQueue: Queue,
  ) {}

  async createSettlement(tenantId: string, caseId: string, totalAmount: number, escrowBankCode: string, escrowAccount: string, userId: string) {
    const settlement = await this.prisma.settlement.create({
      data: {
        tenantId,
        caseId,
        totalAmount: new Decimal(totalAmount),
        firmFee: new Decimal(0), // Calculated later
        taxAmount: new Decimal(0), // Calculated later
        netAmount: new Decimal(0), // Calculated later
        escrowBankCode,
        escrowAccount,
      },
    });

    await this.auditService.log({
      tenantId,
      userId,
      action: AuditAction.CREATE,
      resource: 'Settlement',
      resourceId: settlement.id,
      newValue: { caseId, totalAmount, escrowBankCode, escrowAccount },
    });

    return settlement;
  }

  // Implemented matching the interface which only requires settlementId.
  // In a real scenario we might pass tenantId through some context, but we use defaults/lookups here to satisfy the interface.
  async calculateDistribution(settlementId: string, tenantId?: string, feePercentage: number = 33): Promise<DistributionResult> {
    const whereClause: any = { id: settlementId };
    if (tenantId) whereClause.tenantId = tenantId;

    const settlement = await this.prisma.settlement.findFirst({
      where: whereClause,
      include: { case: { include: { plaintiffs: true } } },
    });

    if (!settlement) throw new NotFoundException('Settlement not found');

    const plaintiffs = settlement.case.plaintiffs;
    if (plaintiffs.length === 0) throw new BadRequestException('No plaintiffs found for this case');

    const amountPerPlaintiff = new Decimal(settlement.totalAmount).div(plaintiffs.length);
    const distributions: DistributionCalculation[] = [];

    let totalGross = new Decimal(0);
    let totalTax = new Decimal(0);
    let totalFee = new Decimal(0);
    let totalNet = new Decimal(0);

    for (const plaintiff of plaintiffs) {
      const taxDeduction = this.taxCalculatorService.calculateTax(amountPerPlaintiff);
      const feeDeduction = this.taxCalculatorService.calculateFee(amountPerPlaintiff, feePercentage);
      const netAmount = this.taxCalculatorService.calculateNetAmount(amountPerPlaintiff, taxDeduction, feeDeduction);

      distributions.push({
        plaintiffId: plaintiff.id,
        grossAmount: amountPerPlaintiff.toNumber(),
        taxDeduction: taxDeduction.toNumber(),
        feeDeduction: feeDeduction.toNumber(),
        netAmount: netAmount.toNumber(),
      });

      totalGross = totalGross.add(amountPerPlaintiff);
      totalTax = totalTax.add(taxDeduction);
      totalFee = totalFee.add(feeDeduction);
      totalNet = totalNet.add(netAmount);

      await this.prisma.settlementDistribution.create({
        data: {
          tenantId: settlement.tenantId, // use the tenantId from the settlement record
          settlementId,
          plaintiffId: plaintiff.id,
          grossAmount: amountPerPlaintiff,
          taxDeduction,
          feeDeduction,
          netAmount,
        },
      });
    }

    await this.prisma.settlement.update({
      where: { id: settlementId },
      data: { firmFee: totalFee, taxAmount: totalTax, netAmount: totalNet },
    });

    return {
      settlementId,
      distributions,
      totalGross: totalGross.toNumber(),
      totalTax: totalTax.toNumber(),
      totalFee: totalFee.toNumber(),
      totalNet: totalNet.toNumber(),
    };
  }

  async signDistribution(distributionId: string, tenantId: string, signatureHash: string, userId: string) {
    const distribution = await this.prisma.settlementDistribution.findFirst({
      where: { id: distributionId, tenantId },
    });

    if (!distribution) throw new NotFoundException('Distribution not found');

    const updated = await this.prisma.settlementDistribution.update({
      where: { id: distributionId },
      data: {
        signatureStatus: SignatureStatus.SIGNED,
        signedAt: new Date(),
        signatureHash,
      },
    });

    await this.auditService.log({
      tenantId,
      userId,
      action: AuditAction.SIGN,
      resource: 'SettlementDistribution',
      resourceId: distributionId,
      newValue: { signatureStatus: SignatureStatus.SIGNED, signatureHash },
    });

    return updated;
  }

  async executeBatchTransfer(settlementId: string, tenantId?: string): Promise<BatchTransferResult> {
    const whereClause: any = { id: settlementId };
    if (tenantId) whereClause.tenantId = tenantId;

    const settlement = await this.prisma.settlement.findFirst({
      where: whereClause,
    });

    if (!settlement) throw new NotFoundException('Settlement not found');

    // Trigger queue job
    const batchId = `batch_${settlementId}_${Date.now()}`;
    await this.prisma.settlement.update({
      where: { id: settlementId },
      data: { batchTransferId: batchId, batchStatus: BatchTransferStatus.PROCESSING },
    });

    await this.distributionQueue.add('execute-batch-transfer', {
      settlementId,
      tenantId: settlement.tenantId,
      batchId,
    });

    return {
      batchId,
      totalRequested: 0, // Will be updated by the worker
      totalSuccessful: 0,
      totalFailed: 0,
      results: [],
    };
  }

  async getSettlement(settlementId: string, tenantId: string) {
    const settlement = await this.prisma.settlement.findFirst({
      where: { id: settlementId, tenantId },
    });
    if (!settlement) throw new NotFoundException('Settlement not found');
    return settlement;
  }

  async getDistributions(settlementId: string, tenantId: string) {
    return this.prisma.settlementDistribution.findMany({
      where: { settlementId, tenantId },
    });
  }

  async getTransferStatus(distributionId: string): Promise<TransferStatusResult> {
    const distribution = await this.prisma.settlementDistribution.findUnique({
      where: { id: distributionId },
    });

    if (!distribution) throw new NotFoundException('Distribution not found');

    return {
      distributionId: distribution.id,
      status: distribution.transferStatus as any,
      transferRef: distribution.transferRef || undefined,
      transferredAt: distribution.transferredAt || undefined,
      errorMessage: distribution.transferError || undefined,
    };
  }
}

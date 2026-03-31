import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from '../core/prisma.service';
import { CryptoService } from '../core/crypto/crypto.service';
import { AuditService } from '../core/audit/audit.service';
import { FirmbankingClientService } from '../modules/settlement/firmbanking-client.service';
import {
  BatchTransferRequest,
  TransferItem,
} from '../shared/interfaces/settlement.interface';
import { AuditAction, BatchTransferStatus, SignatureStatus, TransferStatus } from '@prisma/client';

@Processor('settlement-distribution')
export class SettlementDistributionWorker {
  private readonly logger = new Logger(SettlementDistributionWorker.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
    private readonly auditService: AuditService,
    private readonly firmbankingClient: FirmbankingClientService,
  ) {}

  @Process('execute-batch-transfer')
  async handleBatchTransfer(job: Job<{ settlementId: string; tenantId: string; batchId: string }>) {
    const { settlementId, tenantId, batchId } = job.data;
    this.logger.log(`Processing batch transfer ${batchId} for settlement ${settlementId}`);

    try {
      const settlement = await this.prisma.settlement.findFirst({
        where: { id: settlementId, tenantId },
      });

      if (!settlement) throw new Error('Settlement not found');

      // Verify escrow received
      if (!settlement.escrowReceivedAt) {
        throw new Error('Escrow funds not received yet');
      }

      const distributions = await this.prisma.settlementDistribution.findMany({
        where: {
          settlementId,
          tenantId,
          signatureStatus: SignatureStatus.SIGNED, // Filter signed-only
          transferStatus: { in: [TransferStatus.PENDING, TransferStatus.RETRY] },
        },
        include: { plaintiff: true },
      });

      if (distributions.length === 0) {
        this.logger.log(`No distributions to process for batch ${batchId}`);
        await this.prisma.settlement.update({
          where: { id: settlementId },
          data: { batchStatus: BatchTransferStatus.COMPLETED },
        });
        return;
      }

      const transfers: TransferItem[] = [];

      for (const dist of distributions) {
        if (!dist.plaintiff.bankCode || !dist.plaintiff.encryptedBankAccount) {
          this.logger.warn(`Plaintiff ${dist.plaintiff.id} missing bank details`);
          await this.updateDistributionStatus(dist.id, TransferStatus.FAILED, 'Missing bank details', tenantId);
          continue;
        }

        try {
          // Decrypt bank account
          const accountNumber = await this.cryptoService.decrypt(Buffer.from(dist.plaintiff.encryptedBankAccount), tenantId);
          // Decrypt name if needed (assuming encryptedName is stored similarly)
          const recipientName = await this.cryptoService.decrypt(Buffer.from(dist.plaintiff.encryptedName), tenantId);

          transfers.push({
            recipientName,
            bankCode: dist.plaintiff.bankCode,
            accountNumber,
            amount: dist.netAmount.toNumber(),
            memo: `Settlement ${settlement.id}`,
            referenceId: dist.id,
          });

          await this.updateDistributionStatus(dist.id, TransferStatus.PROCESSING, undefined, tenantId);
        } catch (error) {
          this.logger.error(`Failed to decrypt for plaintiff ${dist.plaintiff.id}`, error);
          await this.updateDistributionStatus(dist.id, TransferStatus.FAILED, 'Decryption error', tenantId);
        }
      }

      if (transfers.length === 0) {
        await this.prisma.settlement.update({
          where: { id: settlementId },
          data: { batchStatus: BatchTransferStatus.PARTIAL_FAILURE }, // Or COMPLETED depending on business logic if all failed before transfer
        });
        return;
      }

      const batchRequest: BatchTransferRequest = {
        batchId,
        escrowAccount: settlement.escrowAccount,
        escrowBankCode: settlement.escrowBankCode,
        transfers,
      };

      // Execute batch transfer
      const batchResult = await this.firmbankingClient.executeBatchTransfer(batchRequest);

      for (const result of batchResult.results) {
        const status = result.success ? TransferStatus.COMPLETED : TransferStatus.FAILED;

        await this.prisma.settlementDistribution.update({
          where: { id: result.referenceId },
          data: {
            transferStatus: status,
            transferRef: result.bankRef,
            transferError: result.errorMessage,
            transferredAt: result.success ? new Date() : null,
          },
        });

        await this.auditService.log({
          tenantId,
          userId: 'SYSTEM',
          action: AuditAction.TRANSFER,
          resource: 'SettlementDistribution',
          resourceId: result.referenceId,
          newValue: { status, bankRef: result.bankRef, error: result.errorMessage },
        });
      }

      const finalBatchStatus =
        batchResult.totalFailed === 0
          ? BatchTransferStatus.COMPLETED
          : batchResult.totalSuccessful === 0
          ? BatchTransferStatus.FAILED
          : BatchTransferStatus.PARTIAL_FAILURE;

      await this.prisma.settlement.update({
        where: { id: settlementId },
        data: { batchStatus: finalBatchStatus },
      });

      this.logger.log(`Batch transfer ${batchId} completed. Status: ${finalBatchStatus}`);
    } catch (error) {
      this.logger.error(`Failed to process batch transfer ${batchId}`, error);
      await this.prisma.settlement.update({
        where: { id: settlementId },
        data: { batchStatus: BatchTransferStatus.FAILED },
      });
      throw error;
    }
  }

  private async updateDistributionStatus(id: string, status: TransferStatus, error?: string, tenantId?: string) {
    await this.prisma.settlementDistribution.update({
      where: { id },
      data: { transferStatus: status, transferError: error },
    });

    if (tenantId) {
      await this.auditService.log({
        tenantId,
        userId: 'SYSTEM',
        action: AuditAction.TRANSFER,
        resource: 'SettlementDistribution',
        resourceId: id,
        newValue: { status, error },
      });
    }
  }
}

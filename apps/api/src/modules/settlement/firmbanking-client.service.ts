import { Injectable, Logger } from '@nestjs/common';
import { BatchTransferRequest, BatchTransferResult, TransferItemResult } from '../../shared/interfaces/settlement.interface';

@Injectable()
export class FirmbankingClientService {
  private readonly logger = new Logger(FirmbankingClientService.name);
  private readonly BATCH_SIZE_LIMIT = 100;

  /**
   * Executes a batch transfer. Splits into chunks of 100 max per bank API limits.
   * Tracks and returns the result of each individual transfer attempt.
   */
  async executeBatchTransfer(request: BatchTransferRequest): Promise<BatchTransferResult> {
    this.logger.log(`Starting batch transfer for batchId: ${request.batchId}. Total transfers: ${request.transfers.length}`);

    const results: TransferItemResult[] = [];
    const chunks = this.chunkArray(request.transfers, this.BATCH_SIZE_LIMIT);

    for (const chunk of chunks) {
      this.logger.debug(`Processing chunk of size: ${chunk.length}`);
      const chunkResults = await this.simulateBankApiCall(chunk);
      results.push(...chunkResults);
    }

    const totalSuccessful = results.filter(r => r.success).length;
    const totalFailed = results.length - totalSuccessful;

    return {
      batchId: request.batchId,
      totalRequested: request.transfers.length,
      totalSuccessful,
      totalFailed,
      results
    };
  }

  /**
   * Simulates calling the bank's API and handles retry logic.
   * In a real implementation, we would make HTTP requests to the bank's firmbanking server.
   */
  private async simulateBankApiCall(transfers: any[]): Promise<TransferItemResult[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return transfers.map(transfer => {
      // Simulate an 95% success rate
      const isSuccess = Math.random() > 0.05;

      return {
        referenceId: transfer.referenceId,
        success: isSuccess,
        bankRef: isSuccess ? `bank_ref_${Math.random().toString(36).substring(2, 10)}` : undefined,
        errorMessage: isSuccess ? undefined : 'INSUFFICIENT_FUNDS_OR_INVALID_ACCOUNT',
        errorCode: isSuccess ? undefined : 'ERR_999'
      };
    });
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunked: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  }
}

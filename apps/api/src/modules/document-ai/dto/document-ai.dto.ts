import { VLMResult, CrossValidationResult } from '@shared/interfaces/document-ai.interface';
import { ApiProperty } from '@nestjs/swagger';

// ============================================================
// DTOs for Document AI Module
// ============================================================

export class VLMResultResponseDto implements VLMResult {
  @ApiProperty({ example: 'ev-12345' })
  evidenceId!: string;

  @ApiProperty({ example: 'COMPLETED', enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'MANUAL_REVIEW'] })
  status!: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'MANUAL_REVIEW';

  @ApiProperty({ example: { amount: 5000000, date: '2023-10-10' } })
  structuredData?: Record<string, any>;

  @ApiProperty({ example: 0.98 })
  confidence?: number;

  @ApiProperty({ example: '2023-10-10T11:00:00Z' })
  processedAt?: Date;
}

export class CrossValidationResponseDto implements CrossValidationResult {
  @ApiProperty({ example: 'MISMATCHED', enum: ['MATCHED', 'MISMATCHED', 'REVIEW_NEEDED'] })
  status!: 'MATCHED' | 'MISMATCHED' | 'REVIEW_NEEDED';

  @ApiProperty({ example: [{ field: 'amount', expected: 5000000, actual: 4000000, matched: false }] })
  details!: { field: string; expected: any; actual: any; matched: boolean }[];

  @ApiProperty({ example: '피해 금액(amount)이 일치하지 않습니다.' })
  feedbackMessage?: string;
}

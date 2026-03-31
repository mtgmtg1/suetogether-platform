import { VLMResult, CrossValidationResult } from '@shared/interfaces/document-ai.interface';

// ============================================================
// DTOs for Document AI Module
// ============================================================

export class VLMResultResponseDto implements VLMResult {
  evidenceId!: string;
  status!: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'MANUAL_REVIEW';
  structuredData?: Record<string, any>;
  confidence?: number;
  processedAt?: Date;
}

export class CrossValidationResponseDto implements CrossValidationResult {
  status!: 'MATCHED' | 'MISMATCHED' | 'REVIEW_NEEDED';
  details!: { field: string; expected: any; actual: any; matched: boolean }[];
  feedbackMessage?: string;
}

// ============================================================
// Document AI 서비스 인터페이스 (LOCKED)
// 모든 모듈은 이 인터페이스를 통해서만 Document AI와 통신

export interface ProcessDocumentInput {
  filePath: string;
  fileType: 'IMAGE' | 'PDF' | 'DOCUMENT';
  model: 'layoutlmv3' | 'donut';
}

export interface ProcessDocumentOutput {
  structuredData: Record<string, any>;
  confidence: number;
  model: string;
  fields: ExtractedField[];
}

export interface ExtractedField {
  key: string;
  value: string;
  confidence: number;
  boundingBox?: BoundingBox;
  pageNumber?: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface VLMResult {
  evidenceId: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'MANUAL_REVIEW';
  structuredData?: Record<string, any>;
  confidence?: number;
  processedAt?: Date;
}

export interface CrossValidateInput {
  plaintiffData: Record<string, any> | null;
  vlmData: Record<string, any>;
}

export interface CrossValidationResult {
  status: 'MATCHED' | 'MISMATCHED' | 'REVIEW_NEEDED';
  details: {
    field: string;
    expected: any;
    actual: any;
    matched: boolean;
  }[];
  feedbackMessage?: string; // 예: "결제 내역 화면을 다시 캔처해 주세요"
}

export interface IDocumentAIService {
  processDocument(input: ProcessDocumentInput): Promise<ProcessDocumentOutput>;
  getVLMResult(evidenceId: string): Promise<VLMResult | null>;
  crossValidate(input: CrossValidateInput): Promise<CrossValidationResult>;
}

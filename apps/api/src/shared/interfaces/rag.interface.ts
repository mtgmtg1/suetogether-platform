// ============================================================
// RAG 서비스 인터페이스 (LOCKED)
// 검색증강생성(RAG) 및 의료 연대기 인터페이스

export interface IndexResult {
  totalChunks: number;
  indexedChunks: number;
  failedChunks: number;
  evidenceIds: string[];
}

export interface RAGQueryResult {
  answer: string;
  sources: RAGSource[];
  confidence: number;
  tokensUsed: number;
}

export interface RAGSource {
  evidenceId: string;
  fileName: string;
  pageNumber?: number;
  chunkText: string;
  relevanceScore: number;
  deepLink: string; // PDF 페이지 딥링크
}

export interface MedicalChronologyEntry {
  date: string;
  eventType: 'DIAGNOSIS' | 'PRESCRIPTION' | 'PROCEDURE' | 'LAB_RESULT' | 'VISIT' | 'OTHER';
  description: string;
  provider?: string;
  sourceEvidenceId: string;
  sourcePageNumber: number;
  deepLink: string;
  confidence: number;
}

export interface MedicalChronologyResult {
  caseId: string;
  plaintiffId: string;
  entries: MedicalChronologyEntry[];
  generatedBy: string;
  overallConfidence: number;
}

export interface IRAGService {
  indexDocuments(caseId: string, evidenceIds: string[]): Promise<IndexResult>;
  query(caseId: string, question: string): Promise<RAGQueryResult>;
  generateMedicalChronology(
    caseId: string,
    plaintiffId: string,
  ): Promise<MedicalChronologyResult>;
}

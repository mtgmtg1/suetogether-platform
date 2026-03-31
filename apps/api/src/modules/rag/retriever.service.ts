import { Injectable } from '@nestjs/common';
import { RAGSource } from '@shared/interfaces/rag.interface';

@Injectable()
export class RetrieverService {
  async searchSimilar(caseId: string, embedding: number[], topK: number = 3): Promise<RAGSource[]> {
    // Mocking vector search in pgvector
    const mockSources: RAGSource[] = [];

    for (let i = 0; i < topK; i++) {
      mockSources.push({
        evidenceId: `mock-evidence-${i}`,
        fileName: `mock-doc-${i}.pdf`,
        pageNumber: i + 1,
        chunkText: `This is a mocked relevant text chunk ${i} for the given query.`,
        relevanceScore: 0.85 - (i * 0.05),
        deepLink: `https://suetogether.app/cases/${caseId}/evidence/mock-evidence-${i}#page=${i + 1}`,
      });
    }

    return mockSources;
  }
}

import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { PrismaService } from '@core/prisma.service';
import { AuditService } from '@core/audit/audit.service';
import {
  IRAGService,
  IndexResult,
  RAGQueryResult,
  MedicalChronologyResult,
} from '@shared/interfaces/rag.interface';
import { MedicalChronologyService } from './medical-chronology.service';
import { EmbeddingService } from './embedding.service';
import { RetrieverService } from './retriever.service';

@Injectable()
export class RAGService implements IRAGService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    private readonly mcService: MedicalChronologyService,
    private readonly embedService: EmbeddingService,
    private readonly retrieveService: RetrieverService,
    @InjectQueue('rag-indexing') private readonly ragQueue: Queue,
  ) {}

  async indexDocuments(caseId: string, evidenceIds: string[], tId?: string, uId?: string): Promise<IndexResult> {
    if (!evidenceIds || !evidenceIds.length) return this.emptyIndex();
    await this.ragQueue.add('index-docs', { tenantId: tId, caseId, evidenceIds });
    await this.logAudit(tId, uId, 'UPDATE', 'CASE_RAG_INDEX', caseId, { evidenceIds });
    return { totalChunks: evidenceIds.length * 10, indexedChunks: 0, failedChunks: 0, evidenceIds };
  }

  async query(caseId: string, question: string, tId?: string, uId?: string): Promise<RAGQueryResult> {
    const queryVector = await this.embedService.embedText(question);
    const sources = await this.retrieveService.searchSimilar(caseId, queryVector);
    if (!sources.length) return this.emptyQuery();
    await this.logAudit(tId, uId, 'READ', 'CASE_RAG_QUERY', caseId, { question });
    return { answer: `[Mock] ${question}`, sources, confidence: 0.88, tokensUsed: 420 };
  }

  async generateMedicalChronology(cId: string, pId: string, tId?: string, uId?: string): Promise<MedicalChronologyResult> {
    const result = await this.mcService.extractTimeline(tId!, cId, pId);
    await this.saveChronology(tId!, cId, pId, result);
    await this.logAudit(tId, uId, 'CREATE', 'MEDICAL_CHRONOLOGY', cId, { plaintiffId: pId });
    return result;
  }

  private emptyIndex(): IndexResult {
    return { totalChunks: 0, indexedChunks: 0, failedChunks: 0, evidenceIds: [] };
  }

  private emptyQuery(): RAGQueryResult {
    return { answer: '해당 내용을 찾을 수 없습니다.', sources: [], confidence: 0, tokensUsed: 0 };
  }

  private async logAudit(tId: string | undefined, uId: string | undefined, act: any, res: string, resId: string, newVal: any) {
    if (tId) await this.audit.log({ tenantId: tId, userId: uId, action: act, resource: res, resourceId: resId, newValue: newVal });
  }

  private async saveChronology(tId: string, cId: string, pId: string, result: MedicalChronologyResult) {
    await this.prisma.medicalChronology.create({
      data: { tenantId: tId, caseId: cId, plaintiffId: pId, entries: result.entries as any, sourceLinks: [], generatedBy: result.generatedBy, confidence: result.overallConfidence },
    });
  }
}

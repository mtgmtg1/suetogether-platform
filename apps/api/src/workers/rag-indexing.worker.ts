import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PrismaService } from '@core/prisma.service';

@Processor('rag-indexing')
export class RagIndexingWorker {
  constructor(private readonly prisma: PrismaService) {}

  @Process('index-docs')
  async handleIndexing(job: Job<{ tenantId: string; caseId: string; evidenceIds: string[] }>) {
    const { tenantId, evidenceIds } = job.data;
    for (const evidenceId of evidenceIds) {
      try {
        await this.processEvidence(tenantId, evidenceId);
      } catch (err) {
        console.error(`[RAG Worker] Failed indexing ${evidenceId}:`, err);
      }
    }
  }

  private async processEvidence(tenantId: string, evidenceId: string) {
    const doc = await this.prisma.evidence.findFirst({
      where: { id: evidenceId, tenantId },
    });
    if (!doc) return;
    await new Promise((res) => setTimeout(res, 500));
    await this.prisma.evidence.updateMany({
      where: { id: evidenceId, tenantId },
      data: { ragChunkIds: { push: [`chunk-${evidenceId}-1`] } },
    });
  }
}

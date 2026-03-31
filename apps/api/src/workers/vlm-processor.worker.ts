import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from '@core/prisma.service';
import { VLMClientService } from '@modules/document-ai/vlm-client.service';
import { CrossValidationService } from '@modules/document-ai/cross-validation.service';

@Processor('vlm-processing')
export class VLMProcessorWorker {
  private readonly logger = new Logger(VLMProcessorWorker.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly vlmClient: VLMClientService,
    private readonly crossValidator: CrossValidationService,
  ) {}

  @Process('process-evidence')
  async handleProcessEvidence(job: Job<{ tenantId: string; evidenceId: string }>) {
    const { evidenceId } = job.data;
    try {
      const ev = await this.prisma.evidence.findUnique({ where: { id: evidenceId }, include: { plaintiff: true } });
      if (!ev) throw new Error('Evidence not found');
      await this.prisma.evidence.update({ where: { id: evidenceId }, data: { vlmStatus: 'PROCESSING' } });

      const vlmRes = await this.vlmClient.processDocument({ filePath: ev.filePath, fileType: ev.fileType as any, model: 'layoutlmv3' });
      const cvRes = await this.crossValidator.validate({ plaintiffData: ev.plaintiff?.intakeData as any || null, vlmData: vlmRes.structuredData });

      await this.prisma.evidence.update({
        where: { id: evidenceId },
        data: { vlmStatus: 'COMPLETED', vlmResult: vlmRes.structuredData, vlmConfidence: vlmRes.confidence, vlmModel: vlmRes.model, processedAt: new Date(), crossValidationStatus: cvRes.status, crossValidationResult: cvRes.details as any },
      });
      if (cvRes.status === 'MISMATCHED' && cvRes.feedbackMessage) this.logger.warn(`Mismatch detected: ${cvRes.feedbackMessage}`);
    } catch (error) {
      this.logger.error(`Failed to process ${evidenceId}: ${error}`);
      await this.prisma.evidence.update({ where: { id: evidenceId }, data: { vlmStatus: 'FAILED' } });
      throw error;
    }
  }
}

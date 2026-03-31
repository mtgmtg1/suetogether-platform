import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PrismaService } from '@core/prisma.service';
import { AuditService } from '@core/audit/audit.service';
import {
  IDocumentAIService,
  ProcessDocumentInput,
  ProcessDocumentOutput,
  VLMResult,
  CrossValidateInput,
  CrossValidationResult,
} from '@shared/interfaces/document-ai.interface';
import { VLMClientService } from './vlm-client.service';
import { CrossValidationService } from './cross-validation.service';

@Injectable()
export class DocumentAIService implements IDocumentAIService {
  private readonly logger = new Logger(DocumentAIService.name);

  constructor(
    @InjectQueue('vlm-processing') private readonly vlmQueue: Queue,
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    private readonly vlmClient: VLMClientService,
    private readonly crossValidator: CrossValidationService,
  ) {}

  async processDocument(input: ProcessDocumentInput): Promise<ProcessDocumentOutput> {
    return this.vlmClient.processDocument(input);
  }

  async enqueueDocument(tenantId: string, evidenceId: string): Promise<void> {
    await this.vlmQueue.add('process-evidence', { tenantId, evidenceId });
    this.logger.log(`Enqueued evidence ${evidenceId} for processing`);
  }

  async getVLMResult(evidenceId: string): Promise<VLMResult | null> {
    const ev = await this.prisma.evidence.findUnique({ where: { id: evidenceId } });
    if (!ev) return null;

    return {
      evidenceId: ev.id,
      status: ev.vlmStatus,
      structuredData: ev.vlmResult as Record<string, any>,
      confidence: ev.vlmConfidence ?? undefined,
      processedAt: ev.processedAt ?? undefined,
    };
  }

  async crossValidate(input: CrossValidateInput): Promise<CrossValidationResult> {
    return this.crossValidator.validate(input);
  }
}

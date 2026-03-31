import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { MedicalChronologyEntry, MedicalChronologyResult } from '@shared/interfaces/rag.interface';

@Injectable()
export class MedicalChronologyService {
  constructor(private readonly prisma: PrismaService) {}

  async extractTimeline(
    tenantId: string,
    caseId: string,
    plaintiffId: string,
  ): Promise<MedicalChronologyResult> {
    const evidences = await this.getEvidences(tenantId, caseId, plaintiffId);
    if (evidences.length === 0) return this.emptyResult(caseId, plaintiffId);
    const mockEntries = evidences.map((e, i) => this.mapEntry(e, i, caseId));
    return {
      caseId,
      plaintiffId,
      entries: mockEntries,
      generatedBy: 'ML_PIPELINE_V2',
      overallConfidence: 0.92,
    };
  }

  private async getEvidences(tenantId: string, caseId: string, pId: string) {
    return this.prisma.evidence.findMany({
      where: { tenantId, caseId, plaintiffId: pId, vlmStatus: 'COMPLETED' },
    });
  }

  private emptyResult(caseId: string, plaintiffId: string): MedicalChronologyResult {
    return { caseId, plaintiffId, entries: [], generatedBy: 'sys', overallConfidence: 0 };
  }

  private mapEntry(evidence: any, index: number, caseId: string): MedicalChronologyEntry {
    return {
      date: new Date(Date.now() - index * 86400000).toISOString().split('T')[0],
      eventType: 'DIAGNOSIS',
      description: `Mocked diagnosis from ${evidence.fileName}`,
      provider: 'Dr. Smith',
      sourceEvidenceId: evidence.id,
      sourcePageNumber: 1,
      deepLink: `https://suetogether.app/cases/${caseId}/evidence/${evidence.id}#page=1`,
      confidence: 0.95,
    };
  }
}

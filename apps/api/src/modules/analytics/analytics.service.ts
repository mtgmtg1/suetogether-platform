import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../core/prisma.service';
import { AuditService } from '../../core/audit/audit.service';
import {
  IAnalyticsService,
  PredictionInput,
  PredictionResult,
  CBAResult,
  GISMapData,
  GISHotspot
} from '../../shared/interfaces/analytics.interface';
import { PredictionService } from './prediction.service';
import { CBAService } from './cba.service';
import { GISService } from './gis.service';

@Injectable()
export class AnalyticsService implements IAnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    private readonly predictionService: PredictionService,
    private readonly cbaService: CBAService,
    private readonly gisService: GISService,
  ) {}

  async predictOutcome(input: PredictionInput, tenantId?: string, userId?: string): Promise<PredictionResult> {
    this.logger.log(`AnalyticsService.predictOutcome for case: ${input.caseId}`);

    // Validate case exists and belongs to tenant
    const tid = tenantId || 'default-tenant';
    const caseData = await this.prisma.case.findFirst({
      where: { id: input.caseId, tenantId: tid },
    });

    if (!caseData) {
      throw new Error(`Case ${input.caseId} not found`);
    }

    const result = await this.predictionService.predictOutcome(input);

    if (userId) {
      await this.audit.log({
        tenantId: tid,
        userId,
        action: 'CREATE',
        resource: 'CASE_PREDICTION',
        resourceId: input.caseId,
        newValue: result,
      });
    }

    return result;
  }

  async calculateCBA(caseId: string, tenantId?: string, userId?: string): Promise<CBAResult> {
    this.logger.log(`AnalyticsService.calculateCBA for case: ${caseId}`);
    const tid = tenantId || 'default-tenant';

    const result = await this.cbaService.calculateCBA(tid, caseId);

    if (userId) {
      await this.audit.log({
        tenantId: tid,
        userId,
        action: 'READ',
        resource: 'CBA_RESULT',
        resourceId: caseId,
      });
    }

    return result;
  }

  async getGISData(caseId: string, tenantId?: string, userId?: string): Promise<GISMapData> {
    this.logger.log(`AnalyticsService.getGISData for case: ${caseId}`);
    const tid = tenantId || 'default-tenant';

    const result = await this.gisService.getGISData(tid, caseId);

    if (userId) {
      await this.audit.log({
        tenantId: tid,
        userId,
        action: 'READ',
        resource: 'GIS_DATA',
        resourceId: caseId,
      });
    }

    return result;
  }

  async detectHotspots(caseId: string, tenantId?: string, userId?: string): Promise<GISHotspot[]> {
    this.logger.log(`AnalyticsService.detectHotspots for case: ${caseId}`);
    const tid = tenantId || 'default-tenant';

    const result = await this.gisService.detectHotspots(tid, caseId);

    if (userId) {
      await this.audit.log({
        tenantId: tid,
        userId,
        action: 'READ',
        resource: 'GIS_HOTSPOTS',
        resourceId: caseId,
      });
    }

    return result;
  }
}

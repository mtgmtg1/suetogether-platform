import { Injectable, Logger } from '@nestjs/common';
import { CBAResult } from '../../shared/interfaces/analytics.interface';
import { PrismaService } from '../../core/prisma.service';

@Injectable()
export class CBAService {
  private readonly logger = new Logger(CBAService.name);

  constructor(private readonly prisma: PrismaService) {}

  async calculateCBA(tenantId: string, caseId: string): Promise<CBAResult> {
    this.logger.log(`Calculating CBA for case: ${caseId}`);

    // Fetch case details from DB
    const caseData = await this.prisma.case.findFirst({
      where: { id: caseId, tenantId },
      include: { plaintiffs: true },
    });

    if (!caseData) {
      throw new Error(`Case ${caseId} not found`);
    }

    const plaintiffCount = caseData.plaintiffs.length || 1;

    // Mock base costs and estimates
    const baseTrialCost = 50000;
    const baseSettleCost = 10000;
    const estimatedClaimPerPlaintiff = 100000;

    // Calculate estimates
    const totalClaim = estimatedClaimPerPlaintiff * plaintiffCount;
    const trialCostEstimate = baseTrialCost + (plaintiffCount * 2000);
    const settleCostEstimate = baseSettleCost + (plaintiffCount * 500);

    // Expected values (mock probabilities)
    const winProb = caseData.winProbability || 0.5;

    const trialExpectedValue = (totalClaim * winProb) - trialCostEstimate;
    const settleExpectedValue = (totalClaim * 0.6) - settleCostEstimate; // Assume settlement gets 60% of claim

    // Recommendation logic
    const recommendation = trialExpectedValue > settleExpectedValue ? 'TRIAL' : 'SETTLE';
    const breakEvenPoint = trialCostEstimate / winProb;

    return {
      caseId,
      trialCostEstimate,
      settleCostEstimate,
      trialExpectedValue,
      settleExpectedValue,
      recommendation,
      breakEvenPoint,
    };
  }
}

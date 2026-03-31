import { Injectable, Logger } from '@nestjs/common';
import { PredictionInput, PredictionResult, PredictionFactor } from '../../shared/interfaces/analytics.interface';

@Injectable()
export class PredictionService {
  private readonly logger = new Logger(PredictionService.name);

  async predictOutcome(input: PredictionInput): Promise<PredictionResult> {
    this.logger.log(`Predicting outcome for case: ${input.caseId}`);

    // Base scores
    let winProb = 0.5;
    let dismissRisk = 0.3;
    let days = 365;

    const factors: PredictionFactor[] = [];

    // Mock ML weights
    if (input.caseType === 'PRODUCT_LIABILITY') {
      winProb += 0.1;
      days += 120;
      factors.push({ name: 'Case Type', impact: 0.1, description: 'Product liability cases favor plaintiff' });
    } else if (input.caseType === 'ENVIRONMENTAL') {
      winProb -= 0.05;
      days += 200;
      factors.push({ name: 'Case Type', impact: -0.05, description: 'Environmental cases are complex and long' });
    }

    if (input.judgeName) {
      winProb += 0.05;
      factors.push({ name: 'Judge History', impact: 0.05, description: `Judge ${input.judgeName} tends to favor plaintiffs` });
    }

    if (input.claimAmount > 1000000) {
      dismissRisk += 0.1;
      days += 60;
      factors.push({ name: 'High Claim Amount', impact: -0.1, description: 'High claim increases scrutiny and dismissal risk' });
    }

    if (input.plaintiffCount > 50) {
      winProb += 0.15;
      factors.push({ name: 'Mass Action', impact: 0.15, description: 'Large number of plaintiffs increases leverage' });
    }

    // Clamp probabilities
    winProb = Math.max(0, Math.min(1, winProb));
    dismissRisk = Math.max(0, Math.min(1, dismissRisk));

    let action: 'PROCEED_TRIAL' | 'SETTLE_NOW' | 'NEGOTIATE' | 'DISMISS';
    if (dismissRisk > 0.6) action = 'DISMISS';
    else if (winProb > 0.7) action = 'PROCEED_TRIAL';
    else if (winProb > 0.4) action = 'NEGOTIATE';
    else action = 'SETTLE_NOW';

    return {
      caseId: input.caseId,
      winProbability: winProb,
      dismissalRisk: dismissRisk,
      estimatedDays: days,
      recommendAction: action,
      confidence: 0.85,
      factors,
    };
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { CrossValidateInput, CrossValidationResult } from '@shared/interfaces/document-ai.interface';

@Injectable()
export class CrossValidationService {
  private readonly logger = new Logger(CrossValidationService.name);

  async validate(input: CrossValidateInput): Promise<CrossValidationResult> {
    if (!input.plaintiffData) return { status: 'REVIEW_NEEDED', details: [] };

    const details = [];
    let hasMismatch = false;

    for (const [key, expected] of Object.entries(input.plaintiffData)) {
      const actual = input.vlmData[key];
      const matched = String(expected).trim() === String(actual).trim();
      if (!matched) hasMismatch = true;

      details.push({ field: key, expected, actual, matched });
    }

    return {
      status: hasMismatch ? 'MISMATCHED' : 'MATCHED',
      details,
      feedbackMessage: hasMismatch ? 'Data mismatch detected. Please verify the document.' : undefined,
    };
  }
}

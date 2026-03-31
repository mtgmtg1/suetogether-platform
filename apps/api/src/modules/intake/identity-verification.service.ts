import { Injectable, Logger } from '@nestjs/common';
import type {
  IdentityVerificationRequest,
  IdentityVerificationResult
} from '../../shared/interfaces/intake.interface';

@Injectable()
export class IdentityVerificationService {
  private readonly logger = new Logger(IdentityVerificationService.name);

  async verify(req: IdentityVerificationRequest): Promise<IdentityVerificationResult> {
    // [Flow: Receive Request -> Call Provider API -> Return Result]
    this.logger.log(`Verifying identity for ${req.name} using ${req.provider}`);

    // Mock successful verification
    const mockTxId = `tx-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    return {
      verified: true,
      transactionId: mockTxId,
      provider: req.provider,
      verifiedName: req.name,
      verifiedPhone: req.phone,
    };
  }
}

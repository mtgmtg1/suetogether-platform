import { Injectable, Logger } from '@nestjs/common';
import type {
  BankAccountVerificationRequest,
  BankAccountVerificationResult
} from '../../shared/interfaces/intake.interface';

@Injectable()
export class BankVerificationService {
  private readonly logger = new Logger(BankVerificationService.name);

  async verifyAccount(req: BankAccountVerificationRequest): Promise<BankAccountVerificationResult> {
    // [Flow: Receive Request -> Call Bank API -> Return Result]
    this.logger.log(`Verifying bank account ${req.accountNumber} at ${req.bankCode}`);

    // Mock successful verification
    return {
      verified: true,
      actualHolder: req.holderName,
      bankName: `Mock Bank ${req.bankCode}`,
    };
  }
}

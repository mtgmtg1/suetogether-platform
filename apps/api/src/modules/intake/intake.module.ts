import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { IntakeController } from './intake.controller';
import { IntakeService } from './intake.service';
import { ChatbotService } from './chatbot.service';
import { IdentityVerificationService } from './identity-verification.service';
import { BankVerificationService } from './bank-verification.service';
import { MassArbitrationService } from './mass-arbitration.service';

@Module({
  imports: [CoreModule],
  controllers: [IntakeController],
  providers: [
    IntakeService,
    ChatbotService,
    IdentityVerificationService,
    BankVerificationService,
    MassArbitrationService,
  ],
  exports: [IntakeService],
})
export class IntakeModule {}

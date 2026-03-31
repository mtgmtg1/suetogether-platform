import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { SettlementController } from './settlement.controller';
import { SettlementService } from './settlement.service';
import { TaxCalculatorService } from './tax-calculator.service';
import { PaymentGatewayService } from './payment-gateway.service';
import { FirmbankingClientService } from './firmbanking-client.service';
import { SettlementDistributionWorker } from '../../workers/settlement-distribution.worker';
import { CoreModule } from '../../core/core.module';
import { AuthModule } from '../../core/auth/auth.module';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    BullModule.registerQueue({
      name: 'settlement-distribution',
    }),
  ],
  controllers: [SettlementController],
  providers: [
    SettlementService,
    TaxCalculatorService,
    PaymentGatewayService,
    FirmbankingClientService,
    SettlementDistributionWorker,
  ],
  exports: [SettlementService],
})
export class SettlementModule {}

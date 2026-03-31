import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { PredictionService } from './prediction.service';
import { CBAService } from './cba.service';
import { GISService } from './gis.service';
// CoreModule provides PrismaService and AuditService
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [AnalyticsController],
  providers: [
    AnalyticsService,
    PredictionService,
    CBAService,
    GISService,
  ],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}

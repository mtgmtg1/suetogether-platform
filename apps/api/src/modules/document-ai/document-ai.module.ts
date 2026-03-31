import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CoreModule } from '@core/core.module';
import { DocumentAIController } from './document-ai.controller';
import { DocumentAIService } from './document-ai.service';
import { VLMClientService } from './vlm-client.service';
import { CrossValidationService } from './cross-validation.service';
import { VLMProcessorWorker } from '../../workers/vlm-processor.worker';

@Module({
  imports: [
    CoreModule,
    BullModule.registerQueue({
      name: 'vlm-processing',
    }),
  ],
  controllers: [DocumentAIController],
  providers: [
    DocumentAIService,
    VLMClientService,
    CrossValidationService,
    VLMProcessorWorker,
  ],
  exports: [DocumentAIService],
})
export class DocumentAIModule {}

import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { RAGController } from './rag.controller';
import { RAGService } from './rag.service';
import { MedicalChronologyService } from './medical-chronology.service';
import { EmbeddingService } from './embedding.service';
import { RetrieverService } from './retriever.service';
import { RagIndexingWorker } from '@workers/rag-indexing.worker';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'rag-indexing',
    }),
  ],
  controllers: [RAGController],
  providers: [
    RAGService,
    MedicalChronologyService,
    EmbeddingService,
    RetrieverService,
    RagIndexingWorker,
  ],
  exports: [RAGService],
})
export class RAGModule {}

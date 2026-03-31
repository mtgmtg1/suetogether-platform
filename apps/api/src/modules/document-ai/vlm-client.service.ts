import { Injectable, Logger } from '@nestjs/common';
import { ProcessDocumentInput, ProcessDocumentOutput } from '@shared/interfaces/document-ai.interface';

@Injectable()
export class VLMClientService {
  private readonly logger = new Logger(VLMClientService.name);
  private readonly vlmEndpoint = process.env.VLM_PIPELINE_URL || 'http://ml-pipeline:8000/vlm';

  async processDocument(input: ProcessDocumentInput): Promise<ProcessDocumentOutput> {
    try {
      this.logger.log(`Calling VLM Pipeline for ${input.filePath}`);
      const response = await fetch(this.vlmEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`VLM Pipeline error: ${response.statusText}`);
      }

      return (await response.json()) as ProcessDocumentOutput;
    } catch (error) {
      this.logger.error(`VLM Client failed: ${error}`);
      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import type { ChatMessage } from '../../shared/interfaces/intake.interface';

@Injectable()
export class ChatbotService {
  async generateReply(messages: ChatMessage[]): Promise<string> {
    // [Flow: Receive Messages -> Build Prompt -> Mock LLM Call -> Return Reply]

    if (!messages || messages.length === 0) {
      return 'Hello! I am your legal assistant. How can I help you today?';
    }

    const lastMessage = messages[messages.length - 1];

    if (lastMessage.role !== 'user') {
      return 'Please go ahead and describe your situation.';
    }

    const content = lastMessage.content.toLowerCase();

    if (content.includes('help')) {
      return 'I can assist you with your case intake. Could you provide more details about the incident?';
    }

    if (content.includes('yes') || content.includes('sure')) {
      return 'Great. What specific damages or issues have you experienced?';
    }

    if (content.length > 20) {
      return 'Thank you for the information. I have recorded these details. Do you have any documents to support this?';
    }

    return 'Could you please elaborate on that?';
  }
}

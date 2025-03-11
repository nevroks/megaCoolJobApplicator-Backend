import { Injectable } from '@nestjs/common';
import { AIService } from '@shared/services';

@Injectable()
export class MessageService {
    constructor(
        private readonly ai: AIService
    ) {}
    
    async sendRequest(data: {
        prompt: string
    }) {
        
        return await this.ai.sendRequest(data.prompt);
    }
}

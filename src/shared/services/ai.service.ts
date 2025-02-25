
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DetailedDBVacancy } from '@prisma/client';
import OpenAI from 'openai';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AIService {
  private api: OpenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('AI_API_KEY');
    if (!apiKey) {
      throw new Error('AI_API_KEY is not defined in environment variables');
    }
    this.api = new OpenAI({
      apiKey,
      baseURL: 'https://api.aimlapi.com/v1',
    });
  }



  async sendRequest(userPrompt: string) {
    const systemPrompt = "You are a helpful assistant, designed to communicate like a friend";

    try {
      const completion = await this.api.chat.completions.create({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 256,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      throw new Error(`Error calling AI API: ${error.message}`);
    }
  }

  async filterVacancies({ vacancies, userResume, userRequirements = 'none' }: { vacancies: DetailedDBVacancy[], userResume: string, userRequirements?: string }) {
    const systemPrompt = "Ты ассистент для аналитики данных, тебе будет приходить json вакансий, резюме пользователя, и предпочтения пользователя, твоя задача сопоставить резюме с каждой вакансией отдельно и добавить в них процент совпадения вакансии, если данный проценто составляет ниже 45 процентов то ты исключаеш данную вакансию из результирующего json, результат должен быть валидным json.Процент должен быть добавлен в json как compatibilityPercent, со значение типа number";
    
    try {
      const completion = await this.api.chat.completions.create({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `
            json вакансий:${JSON.stringify(vacancies)}.
            резюме пользователя:${userResume}.
            предпочтения пользователя:${userRequirements}.`
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });
      console.log(completion.choices[0].message.content);

      return JSON.parse(completion.choices[0].message.content!);
    }
    catch (error) {
      throw new Error(`Error calling AI API: ${error.message}`);
    }
  }
}
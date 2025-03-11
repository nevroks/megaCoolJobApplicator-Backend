
import { Chat, LLM, LMStudioClient } from '@lmstudio/sdk';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DetailedDBVacancy } from '@prisma/client';
import OpenAI from 'openai';
import { firstValueFrom } from 'rxjs';

const systemPrompts = {
  generateTags: `Тебе будет выдано описание пожеланий пользователя. На его основе тебе нужно будет сгенерировать запрос, используя язык запросов, который потом будет использоваться на площадке для поиска работы. Ты должен выделить основную профессию и конкретные навыки или области, упомянутые пользователем. Например, если описание пользователя похоже на то, что он готов работать frontend разработчиком и упоминает знание React и JavaScript, тогда твой ответ должен быть:

Frontend OR фронтенд OR React OR JavaScript

На каждый тип работы генерируй от 2 до 3 тегов, включая основную профессию и конкретные навыки. Не пиши никаких комментариев, просто выдай результат.`,
  filterVacancies: `Ты — система для анализа данных. Твоя задача — сопоставить резюме пользователя с каждой вакансией из предоставленного JSON, добавив в каждую вакансию процент совпадения (compatibilityPercent). Если совпадение ниже 45%, исключи вакансию из результата.

Требования:

Входные данные: JSON с вакансиями, резюме пользователя, предпочтения пользователя.
Выходные данные: JSON с вакансиями, включающий только те, у которых compatibilityPercent ≥ 45%.
Добавь поле compatibilityPercent (тип: number) в каждую вакансию.
Удали объект description из каждой вакансии.
Добавь объекты pros и cons, которые будут перечислять преимущества и недостатки вакансии. В pros указывай, что крутого может предложить компания (например, социальный пакет, возможности карьерного роста, интересные проекты). В cons указывай недостатки, которые могут быть неудобны пользователю (например, требования к опыту, неудобный график работы). Оформляй их в кратком виде.
Не изменяй и не добавляй другие поля.
Возвращай только валидный JSON.
Не пиши никаких пояснений, не давай никаких комментариев.
Действуй, даже если данных недостаточно.
    `
}

@Injectable()
export class AIService {
  private model: LLM;


  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {

  }

  // async onModuleInit() {
  //   const client = new LMStudioClient();
  //   this.model = await client.llm.model("qwen2.5-3b-instruct");
  // }

  async generateTags(userPrompt: string) {
    try {
      // const chat = Chat.from([
      //   { role: "system", content: systemPrompt },
      //   { role: "user", content: userPrompt },
      // ]);

      // return (await this.model.respond(chat)).content;
      const response = await firstValueFrom(this.httpService.post('http://localhost:1234/v1/chat/completions', {
        model: 'qwen2.5-3b-instruct',
        messages: [
          { role: "system", content: systemPrompts.generateTags },
          { role: "user", content: userPrompt },
        ],
        temperature: 0,
        stream: false
      }));



      return response.data.choices[0].message.content

    } catch (error) {
      throw new Error(`Error calling AI API: ${error.message}`);
    }

  }
  async sendRequest(userPrompt: string) {
    const systemPrompt = "Отвечай на любое сообщение слово 'яблоко'";




    try {
      // const chat = Chat.from([
      //   { role: "system", content: systemPrompt },
      //   { role: "user", content: userPrompt },
      // ]);

      // return (await this.model.respond(chat)).content;
      const response = await firstValueFrom(this.httpService.post('http://localhost:1234/v1/chat/completions', {
        model: 'qwen2.5-3b-instruct',
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.1,
        stream: false
      }));



      return response.data.choices[0].message.content

    } catch (error) {
      throw new Error(`Error calling AI API: ${error.message}`);
    }
  }

  async filterVacancies({ vacancies, userResume, userRequirements = 'none' }: { vacancies: DetailedDBVacancy[], userResume: string, userRequirements?: string }) {


    try {
      const response = await firstValueFrom(this.httpService.post('http://localhost:1234/v1/chat/completions', {
        model: 'qwen2.5-3b-instruct',
        messages: [
          { role: "system", content: systemPrompts.filterVacancies },
          {
            role: "user", content: `
            json вакансий:${JSON.stringify(vacancies)}.
            резюме пользователя:${userResume}.
            предпочтения пользователя:${userRequirements}.`
          }
        ],
        stream: false,
        temperature: 0.1,
      }))


      // const chat = Chat.from([
      //   { role: "system", content: systemPrompt },
      //   {
      //     role: "user", content: `
      //       json вакансий:${JSON.stringify(vacancies)}.
      //       резюме пользователя:${userResume}.
      //       предпочтения пользователя:${userRequirements}.`
      //   },
      // ])
      // const response = await this.model.respond(chat);

      return response.data.choices[0].message.content
    }
    catch (error) {
      throw new Error(`Error calling AI API: ${error.message}`);
    }
  }
}
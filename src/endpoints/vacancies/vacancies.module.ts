import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacanciesController } from './vacancies.controller';
import { HeadhunterService } from '@shared/services/headhunter.service';
import { AIService, PrismaService } from '@shared/services';
import { HttpModule } from '@nestjs/axios';
import { TokenPresenceMiddleware } from 'src/utils/middlewares/token-presence.middleware';
import { JwtConfigModule } from '@shared/modules';
import { JwtService } from '@nestjs/jwt';
import { UserDataService } from '@endpoints/user-data';


@Module({
  imports: [HttpModule, JwtConfigModule],
  controllers: [VacanciesController],
  providers: [VacanciesService, HeadhunterService, PrismaService, AIService, UserDataService],
})
export class VacanciesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenPresenceMiddleware)
      .forRoutes(VacanciesController); // Применяем мидлвару ко всем маршрутам VacanciesController
  }
}

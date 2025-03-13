import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CoverLetterService } from './cover-letter.service';
import { CoverLetterController } from './cover-letter.controller';
import { TokenPresenceMiddleware } from 'src/utils/middlewares/token-presence.middleware';
import { JwtConfigModule } from '@shared/modules';
import { AIService, PrismaService } from '@shared/services';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [JwtConfigModule, HttpModule],
  controllers: [CoverLetterController],
  providers: [CoverLetterService, PrismaService, AIService],
})
export class CoverLetterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenPresenceMiddleware)
      .forRoutes(CoverLetterController); // Применяем мидлвару ко всем маршрутам CoverLetterController
  }
}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { UserDataController } from './user-data.controller';
import { TokenPresenceMiddleware } from 'src/utils/middlewares/token-presence.middleware';

import { AIService, PrismaService } from '@shared/services';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { JwtConfigModule } from '@shared/modules';

@Module({
  imports: [HttpModule, JwtConfigModule],
  controllers: [UserDataController],
  providers: [UserDataService, PrismaService, JwtService, AIService,],
})
export class UserDataModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenPresenceMiddleware)
      .forRoutes(UserDataController); // Применяем мидлвару ко всем маршрутам UserDataController
  }
}


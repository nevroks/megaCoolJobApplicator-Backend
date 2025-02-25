import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { UserDataController } from './user-data.controller';
import { TokenPresenceMiddleware } from 'src/utils/middlewares/token-presence.middleware';
import { JwtConfigModule } from 'src/utils/subModules/jwtConfigModule.module';
import { PrismaService } from '@shared/services';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtConfigModule],
  controllers: [UserDataController],
  providers: [UserDataService, PrismaService, JwtService],
})
export class UserDataModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenPresenceMiddleware)
      .forRoutes(UserDataController); // Применяем мидлвару ко всем маршрутам UserDataController
  }
}


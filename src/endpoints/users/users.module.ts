import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtConfigModule } from 'src/utils/subModules/jwtConfigModule.module';
import { PrismaService } from '@shared/services';
import { JwtAuthGuard } from 'src/utils/guards/jwtAuthGuard.guard';
import { TokenPresenceMiddleware } from 'src/utils/middlewares/token-presence.middleware';

@Module({

  providers: [PrismaService, UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule { }

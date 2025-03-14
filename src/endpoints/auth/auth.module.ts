import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtConfigModule } from '@shared/modules/jwtConfigModule.module';
import { PrismaService } from '@shared/services';

@Module({
  imports: [JwtConfigModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule { }

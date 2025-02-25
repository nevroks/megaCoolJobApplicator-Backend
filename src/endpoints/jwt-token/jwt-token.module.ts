import { Module } from '@nestjs/common';
import { JwtTokenService } from './jwt-token.service';
import { JwtTokenController } from './jwt-token.controller';
import { JwtConfigModule } from 'src/utils/subModules/jwtConfigModule.module';
import { PrismaService } from '@shared/services';

@Module({
  imports: [JwtConfigModule],
  controllers: [JwtTokenController],
  providers: [JwtTokenService, PrismaService],
})
export class JwtTokenModule { }

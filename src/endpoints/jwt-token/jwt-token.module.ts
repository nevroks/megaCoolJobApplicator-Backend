import { Module } from '@nestjs/common';
import { JwtTokenService } from './jwt-token.service';
import { JwtTokenController } from './jwt-token.controller';

import { PrismaService } from '@shared/services';
import { JwtConfigModule } from '@shared/modules';

@Module({
  imports: [JwtConfigModule],
  controllers: [JwtTokenController],
  providers: [JwtTokenService, PrismaService],
})
export class JwtTokenModule { }

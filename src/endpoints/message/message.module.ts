import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { AIService, PrismaService } from '@shared/services';
import { HttpModule } from '@nestjs/axios';
import { HeadhunterService } from '@shared/services/headhunter.service';

@Module({
  imports: [HttpModule],
  controllers: [MessageController],
  providers: [MessageService, HeadhunterService, PrismaService, AIService],
})
export class MessageModule { }

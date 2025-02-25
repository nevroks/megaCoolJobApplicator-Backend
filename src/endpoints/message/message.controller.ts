import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { HeadhunterService } from '@shared/services/headhunter.service';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly headhunterService: HeadhunterService
  ) { }

  @Post('')
  sendRequest(@Body() data) {

    return this.messageService.sendRequest(data);
    // console.log(data);

    // return this.messageService.sendRequest(data.prompt);
  }
}

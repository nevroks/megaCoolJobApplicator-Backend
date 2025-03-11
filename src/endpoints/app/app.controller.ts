import { Controller, Get } from '@nestjs/common';
import { AppConfig, AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get("config")
  getAppConfig(): AppConfig {
    return this.appService.getAppConfig();
  }
}

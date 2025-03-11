import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { EndpointsModule } from '@endpoints/endpoints.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    EndpointsModule
  ],

})
export class AppModule { }

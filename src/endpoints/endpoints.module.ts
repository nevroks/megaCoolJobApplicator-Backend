import { Module } from '@nestjs/common';

import { UsersModule } from '@endpoints/users';
import { JwtTokenModule } from '@endpoints/jwt-token';
import { AuthModule } from '@endpoints/auth';
import { UserDataModule } from '@endpoints/user-data';
import { MessageModule } from './message/message.module';
import { VacanciesModule } from './vacancies/vacancies.module';




@Module({
    imports: [AuthModule, UsersModule, JwtTokenModule, UserDataModule, MessageModule, VacanciesModule],
})
export class EndpointsModule { }

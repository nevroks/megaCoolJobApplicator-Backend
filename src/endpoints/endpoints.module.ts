import { Module } from '@nestjs/common';

import { UsersModule } from '@endpoints/users';
import { JwtTokenModule } from '@endpoints/jwt-token';
import { AuthModule } from '@endpoints/auth';
import { UserDataModule } from '@endpoints/user-data';
import { MessageModule } from './message/message.module';
import { VacanciesModule } from './vacancies/vacancies.module';
import { AppModule } from '@endpoints/app';
import { CoverLetterModule } from './cover-letter/cover-letter.module';




@Module({
    imports: [AuthModule, UsersModule, JwtTokenModule, UserDataModule, MessageModule, VacanciesModule, AppModule, CoverLetterModule],
})
export class EndpointsModule { }

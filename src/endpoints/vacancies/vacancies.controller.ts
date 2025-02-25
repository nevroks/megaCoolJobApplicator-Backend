import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { JwtAuthGuard } from 'src/utils/guards/jwtAuthGuard.guard';
import { ChangeVacancyInterestDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Controller('vacancies')
@UseGuards(JwtAuthGuard)
export class VacanciesController {
  constructor(
    private readonly vacanciesService: VacanciesService,
    private readonly jwtService: JwtService
  ) { }

  @Get('')
  getVacancies(@Req() request) {
    const headers = request.headers

    const token = headers.authorization.split(' ')?.[1]

    const payload = this.jwtService.verify(token);
    const userId = payload.id;
    
    return this.vacanciesService.getVacancies(userId);
  }
  
  
  @Get('interests')
  getVacancyInterests(@Req() request) {
    const headers = request.headers

    const token = headers.authorization.split(' ')?.[1]

    const payload = this.jwtService.verify(token);
    const userId = payload.id;
    
    return this.vacanciesService.getVacanciesWithInterests(userId);
  }
  @Post('interests-change')
  changeVacancyInterest(@Req() request, @Body() changeVacancyInterestDto: ChangeVacancyInterestDto) {
    const headers = request.headers

    const token = headers.authorization.split(' ')?.[1]

    const payload = this.jwtService.verify(token);
    const userId = payload.id;


    return this.vacanciesService.changeVacancyInterest(userId, changeVacancyInterestDto);

  }
}

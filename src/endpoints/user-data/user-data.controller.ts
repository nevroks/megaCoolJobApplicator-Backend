import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { JwtAuthGuard } from 'src/utils/guards/jwtAuthGuard.guard';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDataDto } from './dto';

@Controller('user-data')
@UseGuards(JwtAuthGuard)
export class UserDataController {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly jwtService: JwtService
  ) { }

  @Get()
  getUserData(@Req() request) {
    const headers = request.headers

    const token = headers.authorization.split(' ')?.[1]

    const payload = this.jwtService.verify(token);
    const userId = payload.id;

    return this.userDataService.getUserData(userId);
  }

  @Post('update')
  updateUserData(@Req() request, @Body() updateUserDataDto: UpdateUserDataDto) {
    const headers = request.headers

    const token = headers.authorization.split(' ')?.[1]

    const payload = this.jwtService.verify(token);
    const userId = payload.id;

    return this.userDataService.updateUserData(userId, updateUserDataDto);
  }
}

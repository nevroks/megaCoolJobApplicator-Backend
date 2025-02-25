import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JwtTokenService } from './jwt-token.service';
import { RefreshTokenDto } from './dto';


@Controller('jwt-token')
export class JwtTokenController {
  constructor(private readonly jwtTokenService: JwtTokenService) {}

  @Post('refreshToken')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
      return this.jwtTokenService.RefreshToken(refreshTokenDto.refreshToken);
  }
}

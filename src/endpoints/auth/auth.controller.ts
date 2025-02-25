import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
      return await this.authService.LoginUser(loginDto);
  }
  
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
      return await this.authService.RegisterUser(registerDto);
  }
}

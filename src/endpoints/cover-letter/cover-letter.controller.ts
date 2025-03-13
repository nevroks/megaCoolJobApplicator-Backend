import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CoverLetterService } from './cover-letter.service';
import { JwtAuthGuard } from 'src/utils/guards/jwtAuthGuard.guard';
import { JwtService } from '@nestjs/jwt';
import { GenerateCoverLetterDto } from './dto';
import { AIService } from '@shared/services';

@Controller('cover-letter')
@UseGuards(JwtAuthGuard)
export class CoverLetterController {
  constructor(
    private readonly coverLetterService: CoverLetterService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('generate')
  async generateCoverLetter(@Req() request, @Body() generateCoverLetterDto: GenerateCoverLetterDto) {
    
    const headers = request.headers

    const token = headers.authorization.split(' ')?.[1]

    const payload = this.jwtService.verify(token);
    const userId = payload.id;

    return await this.coverLetterService.generateCoverLetter(userId, generateCoverLetterDto.vacancyId);
  }
}

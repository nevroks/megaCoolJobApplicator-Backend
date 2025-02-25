import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  async RefreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (user && user.refreshToken === refreshToken) {
        const accessToken = this.jwtService.sign({
          id: user.id,
          name: user.username,
        });

        const newRefreshToken = this.jwtService.sign(
          {
            id: user.id,
            name: user.username,
          },
          { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
        );

        // Сохраняем новый refresh-токен в базе данных
        await this.prisma.user.update({
          where: { id: user.id },
          data: { refreshToken: newRefreshToken },
        });

        return { accessToken, refreshToken: newRefreshToken };
      } else {
        throw new BadRequestException('Invalid refresh token');
      }
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }
}

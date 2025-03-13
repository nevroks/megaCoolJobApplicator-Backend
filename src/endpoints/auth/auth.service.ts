import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async LoginUser(loginDto: LoginDto): Promise<{ accessToken: string, refreshToken: string } | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                username: loginDto.username
            }
        }) || null;



        if (Boolean(user)) {
            const isPasswordMatch = loginDto.password === user!.password;

            if (isPasswordMatch) {
                const accessToken = this.jwtService.sign({
                    id: user!.id,
                    name: user!.username
                });

                const refreshToken = this.jwtService.sign(
                    {
                        id: user!.id,
                        name: user!.username,
                    },
                    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
                );

                await this.prisma.user.update({
                    where: { id: user!.id },
                    data: { refreshToken },
                });
                return {
                    accessToken,
                    refreshToken,
                };

            } else {
                throw new BadRequestException('Invalid password');
            }
        } else {
            throw new BadRequestException('User not found');
        }
    }

    async RegisterUser(registerDto: RegisterDto) {
        return await this.prisma.$transaction(async (prisma) => {
            // Создаем пользователя
            const user = await prisma.user.create({
                data: {
                    username: registerDto.username,
                    password: registerDto.password,
                },
            });
            // Создаем данные для пользователя с userId
            await prisma.userData.create({
                data: {
                    userId: user.id,
                    
                },
            });
        });
    }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services';
import { UpdateUserDataDto } from './dto';

@Injectable()
export class UserDataService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async getUserData(userId: number) {
        return await this.prisma.userData.findFirst({
            where: {
                userId: userId
            }
        });
    }
    async updateUserData(userId: number, updateUserDataDto: UpdateUserDataDto) {
        return await this.prisma.userData.update({
            where: {
                userId: userId
            },
            data: updateUserDataDto
        });
    }
}

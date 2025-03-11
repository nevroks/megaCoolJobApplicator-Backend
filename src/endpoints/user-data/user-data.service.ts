import { Injectable } from '@nestjs/common';
import { AIService, PrismaService } from '@shared/services';
import { GenerateTagsDto, UpdateUserDataDto } from './dto';

@Injectable()
export class UserDataService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly aiService: AIService
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
    async generateTags(userPrompt: string) {
        return await this.aiService.generateTags(userPrompt);
    }
}

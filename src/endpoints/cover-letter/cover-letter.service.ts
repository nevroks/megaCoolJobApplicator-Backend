import { Injectable } from '@nestjs/common';
import { AIService, PrismaService } from '@shared/services';

@Injectable()
export class CoverLetterService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly aIService: AIService
    ) {}
    
    async generateCoverLetter(userId: number, vacancyId: number) {
        const userData = await this.prisma.userData.findFirst({ where: { userId } });
        const userResume = userData?.resume
        const coverLetterEnding = userData?.coverLetterEnding
        
        const DetailedDBVacancy = await this.prisma.detailedDBVacancy.findFirst({ where: { id: vacancyId } });
        
        const coverLetter = await this.aIService.generateCoverLetter(
            {
                vacancy: DetailedDBVacancy!,
                resume: userResume!,
                coverLetterEnding: coverLetterEnding!
            }
        )
        
        return coverLetter
        
    }
}

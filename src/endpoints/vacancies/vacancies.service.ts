import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DetailedDBVacancy } from '@prisma/client';
import { AIService, PrismaService } from '@shared/services';
import { HeadhunterService } from '@shared/services/headhunter.service';
import { ChangeVacancyInterestDto } from './dto';
import { UserDataService } from '@endpoints/user-data';

type GetVacanciesResponse = {
    items: (DetailedDBVacancy & { compatibilityPercent: number })[]
    total: number
};

@Injectable()
export class VacanciesService {

    constructor(
        private readonly headhunterService: HeadhunterService,
        private readonly prisma: PrismaService,
        private readonly ai: AIService,
        private readonly userDataService: UserDataService
    ) { }
    private findWatchedVacancies = async (userId: number) => {
        return await this.prisma.userVacancies.findMany({ where: { userId } })
    }

    async getVacancies(userId: number): Promise<GetVacanciesResponse> {

        const userData = await this.userDataService.getUserData(userId);
        const watchedVacancies = await this.findWatchedVacancies(userId);
        if (!userData) {
            throw new NotFoundException('User data for this userId is not found');
        }
        if (!Boolean(userData.tags)) {
            throw new BadRequestException('User tags are empty');
        }
        let HHVacanciesPage = 1;

        const resVacanciesCount = 5
        const getVacanciesResponse: GetVacanciesResponse = { items: [], total: 0 };

        let res:any = ''

        while (getVacanciesResponse.items.length < resVacanciesCount) {
            // Запрашиваем вакансии с текущей страницы
            const vacanciesResponse = await this.headhunterService.getVacancies({ tags: userData.tags!, page: HHVacanciesPage, per_page: resVacanciesCount });
            // Проверяем нету ли среди данных вакансий те что мы уже просматривали
            const freshVacancies = vacanciesResponse.items.filter(vacancy => !watchedVacancies.some(watchedVacancy => watchedVacancy.vacancyId === Number(vacancy.id)));
            // Получаем детальную информацию о вакансиях


            const detailedVacancies = await this.headhunterService.getDetailedVacancies(freshVacancies);
            

            // const filteredVacancies = await this.ai.filterVacancies({
            //     vacancies: detailedVacancies,
            //     userResume: 'готов на всё', // Замените на реальное резюме пользователя
            //     userRequirements: 'none' // Замените на реальные предпочтения пользователя
            // });
            res = detailedVacancies
            break
            // Добавляем подходящие вакансии в результат
            // for (const vacancy of filteredVacancies) {
            //     getVacanciesResponse.items.push(vacancy);
            //     if (getVacanciesResponse.items.length === resVacanciesCount) {
            //         break;
            //     }
            // }

            // Увеличиваем номер страницы для следующего запроса
            // HHVacanciesPage++;

            // Если количество полученных вакансий меньше размера пакета, значит, мы достигли конца списка
            // if (vacanciesResponse.items.length < resVacanciesCount) {
            //     break;
            // }
        }
        return res
        // return getVacanciesResponse;
    }
    async changeVacancyInterest(userId, changeVacancyInterestDto: ChangeVacancyInterestDto) {
        if (Boolean(await this.prisma.userVacancies.findFirst({ where: { userId, vacancyId: changeVacancyInterestDto.vacancyId } }))) {
            await this.prisma.userVacancies.update({ where: { userId, vacancyId: changeVacancyInterestDto.vacancyId }, data: { interested: changeVacancyInterestDto.interested } });
        } else {
            await this.prisma.userVacancies.create({ data: { userId, vacancyId: changeVacancyInterestDto.vacancyId, interested: changeVacancyInterestDto.interested } });
        }
    }
    async getVacanciesWithInterests(userId) {
        return await this.findWatchedVacancies(userId)
    }
}

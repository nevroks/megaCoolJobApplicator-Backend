import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { PrismaService } from "./prisma.service";
import { DetailedDBVacancy } from "@prisma/client";


export type HHVacancy = {
    id: string;
    premium: boolean; 
    name: string;
    department: string | null;
    has_test: boolean;
    response_letter_required: boolean;
    area: {
        id: string;
        name: string;
        url: string;
    };
    salary: {
        from: number | null;
        to: number | null;
        currency: string;
        gross: boolean;
    } | null;
    type: {
        id: string;
        name: string;
    };
    address: {
        city: string;
        street: string;
        building: string;
        lat: number;
        lng: number;
        description: string | null;
        raw: string;
        metro: {
            station_name: string;
            line_name: string;
            station_id: string;
            line_id: string;
            lat: number;
            lng: number;
        };
        metro_stations: {
            station_name: string;
            line_name: string;
            station_id: string;
            line_id: string;
            lat: number;
            lng: number;
        }[];
        id: string;
    };
    response_url: string | null;
    sort_point_distance: number | null;
    published_at: string;
    created_at: string;
    archived: boolean;
    apply_alternate_url: string; 
    show_logo_in_search: boolean | null; 
    insider_interview: boolean | null; 
    url: string;
    alternate_url: string;
    relations: any[];
    employer: {
        id: string;
        name: string;
        url: string;
        alternate_url: string;
        logo_urls: {
            90: string;
            240: string;
            original: string;
        };
        vacancies_url: string;
        accredited_it_employer: boolean;
        trusted: boolean;
    }; //del
    snippet: {
        requirement: string;
        responsibility: string;
    };
    contacts: {
        name: string;
        email: string;
        phones: {
            comment: string;
            city: string;
            number: string;
            country: string;
            formatted: string;
        }[];
    }; 
    schedule: {
        id: string;
        name: string;
    };
    working_days: any[];
    working_time_intervals: any[];
    working_time_modes: any[];
    accept_temporary: boolean;
    fly_in_fly_out_duration: any[];
    work_format: any[];
    working_hours: {
        id: string;
        name: string;
    }[];
    work_schedule_by_days: {
        id: string;
        name: string;
    }[];
    night_shifts: boolean;
    professional_roles: {
        id: string;
        name: string;
    }[];
    accept_incomplete_resumes: boolean;
    experience: {
        id: string;
        name: string;
    };
    employment: {
        id: string;
        name: string;
    };
    employment_form: {
        id: string;
        name: string;
    };
    internship: boolean;
    adv_response_url: string | null;
    is_adv_vacancy: boolean;
    adv_context: any | null;
}
type GetVacanciesResponse = {
    items: HHVacancy[];
    found: number;
    pages: number
}
export type DetailedHHVacancy = {
    id: string;
    premium: boolean;
    billing_type: {
        id: string;
        name: string;
    };
    relations: any[]; //del
    name: string;
    insider_interview: null | any; //del
    response_letter_required: boolean;
    area: {
        id: string;
        name: string;
        url: string;
    };
    salary: {
        from: number;
        to: number;
        currency: string;
        gross: boolean;
    };
    type: {
        id: string;
        name: string;
    };
    address: null | any; // Уточнить тип, если известен
    allow_messages: boolean;
    experience: {
        id: string;
        name: string;
    };
    schedule: {
        id: string;
        name: string;
    };
    employment: {
        id: string;
        name: string;
    };
    department: null | any; // Уточнить тип, если известен
    contacts: null | any; // Уточнить тип, если известен
    description: string;
    branded_description: null | any; // Уточнить тип, если известен
    vacancy_constructor_template: null | any; //del
    key_skills: {
        name: string;
    }[];
    accept_handicapped: boolean;
    accept_kids: boolean; //del
    archived: boolean;
    response_url: null | any; // Уточнить тип, если известен
    specializations: any[]; // Уточнить тип, если известен
    professional_roles: {
        id: string;
        name: string;
    }[];
    code: null | any; // Уточнить тип, если известен
    hidden: boolean;
    quick_responses_allowed: boolean;
    driver_license_types: any[]; // del
    accept_incomplete_resumes: boolean; //del
    employer: {
        id: string;
        name: string;
        url: string;
        alternate_url: string;
        logo_urls: {
            "90": string;
            "240": string;
            original: string;
        };
        vacancies_url: string;
        accredited_it_employer: boolean;
        trusted: boolean;
    }; //del
    published_at: string;
    created_at: string;
    initial_created_at: string;
    negotiations_url: null | any; // Уточнить тип, если известен
    suitable_resumes_url: null | any; // Уточнить тип, если известен
    apply_alternate_url: string;
    has_test: boolean; //del
    test: null | any; // del
    alternate_url: string;
    working_days: any[]; // Уточнить тип, если известен
    working_time_intervals: any[]; // Уточнить тип, если известен
    working_time_modes: any[]; // Уточнить тип, если известен
    accept_temporary: boolean;
    languages: any[]; // Уточнить тип, если известен
    approved: boolean;
    employment_form: {
        id: string;
        name: string;
    };
    fly_in_fly_out_duration: any[]; // Уточнить тип, если известен
    internship: boolean;
    night_shifts: boolean;
    work_format: {
        id: string;
        name: string;
    }[];
    work_schedule_by_days: {
        id: string;
        name: string;
    }[];
    working_hours: {
        id: string;
        name: string;
    }[];
    show_logo_in_search: null | any; // Уточнить тип, если известен
}
@Injectable()
export class HeadhunterService {
    private readonly headhunterApiUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService
    ) {
        this.headhunterApiUrl = 'https://api.hh.ru';
    }
    private async saveVacancyToDb(vacancy: DetailedDBVacancy): Promise<void> {
        try {
            await this.prisma.detailedDBVacancy.create({
                data: vacancy,
            });
        } catch (error) {
            console.error(`Error saving vacancy to DB: ${error.message}`);
        }
    }
    async getVacancies({ tags, page, per_page = 20 }: { tags: string, page: number, per_page?: number }): Promise<GetVacanciesResponse> {
        const url = `${this.headhunterApiUrl}/vacancies`;
        const params = {
            text: tags,
            search_field: "name",
            per_page: per_page,
            page: page
            // Добавьте другие параметры, если необходимо
        };
        console.log('called');

        try {
            const response = await firstValueFrom(
                await this.httpService.get<GetVacanciesResponse>(url, {
                    headers: {
                        "Authorization": `Bearer ${this.configService.get<string>('HH_APP_ACCESS_TOKEN')}`,
                    }, params
                }),
            );
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching vacancies: ${error.message}`);
        }
    }
    async getDetailedVacancies(vacancies: HHVacancy[]): Promise<DetailedDBVacancy[]> {
        const detailedVacancies: DetailedDBVacancy[] = [];

        for (let vacancy of vacancies) {
            const detailedVacancyFromDb = await this.prisma.detailedDBVacancy.findFirst({ where: { id: Number(vacancy.id) } });
            if (Boolean(detailedVacancyFromDb)) {
                detailedVacancies.push(detailedVacancyFromDb!);
            } else {
                try {
                    const response = await firstValueFrom(
                        await this.httpService.get<DetailedHHVacancy>(`${this.headhunterApiUrl}/vacancies/${vacancy.id}`, {
                            headers: {
                                "Authorization": `Bearer ${this.configService.get<string>('HH_APP_ACCESS_TOKEN')}`,
                            }
                        }),
                    );
                    const detailedVacancy: DetailedDBVacancy = {
                        id: Number(response.data.id),
                        url: response.data.alternate_url,
                        name: response.data.name,
                        salary: Boolean(response.data.salary) ? JSON.stringify(response.data.salary) : null,
                        keySkills: response.data.key_skills.reduce((keySkills: string, keySkill: {
                            name: string
                        }) => `${keySkills}, ${keySkill.name}`, ''),
                        work_schedule: response.data.schedule.name,
                        required_experience: response.data.experience.name,
                        description: response.data.description,
                        employment_form: response.data.employment.name,
                        area: response.data.area.name,
                    };
                    detailedVacancies.push(detailedVacancy);

                    // Асинхронно сохраняем данные в базу данных
                    this.saveVacancyToDb(detailedVacancy);
                } catch (error) {
                    throw new Error(`Error fetching detailed vacancy: ${error.message}`);
                }
            }
        }
        return detailedVacancies;
    }
}


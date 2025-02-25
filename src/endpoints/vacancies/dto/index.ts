import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ChangeVacancyInterestDto {
    @IsNumber({
        allowNaN: false
    })
    vacancyId: number

    @IsBoolean()
    interested: boolean
}
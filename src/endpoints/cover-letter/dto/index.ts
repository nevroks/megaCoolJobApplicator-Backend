import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GenerateCoverLetterDto {
    @IsNumber()
    vacancyId: number
}
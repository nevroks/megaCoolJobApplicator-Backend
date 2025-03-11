
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";

export class UpdateUserDataDto {
    @IsNumber()
    userId: number;

    @IsString()
    @IsNotEmpty()
    resume: string;

    @IsString()
    @IsNotEmpty()
    tags: string;

    @IsString()
    @IsOptional()
    userRequirements?: string;

    @IsString()
    @IsOptional()
    coverLetterEnding?: string;
}
export class GenerateTagsDto {
    @IsString()
    @IsNotEmpty()
    userPrompt: string;
}
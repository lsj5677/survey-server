import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class SurveyWriteDto {
  @IsString()
  title: string;

  @IsString()
  time: string;

  @IsString()
  target: string;

  @IsNumber()
  endDate: number;

  @IsString()
  link: string;

  @IsString()
  description: string;
}

export class SurveyListDto {
  @IsNumberString()
  @IsOptional()
  page: number;

  @IsNumberString()
  @IsOptional()
  limit: number;
}
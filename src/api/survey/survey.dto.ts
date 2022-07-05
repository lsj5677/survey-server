import { IsNumber, IsString } from "class-validator";

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
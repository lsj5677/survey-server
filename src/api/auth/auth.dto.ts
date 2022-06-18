import { IsOptional, IsString } from 'class-validator'

export class AuthSignUpDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  token: string;
}

export class AuthTokenVerifyDto {
  @IsString()
  token: string;
}
import { IsEmail, IsString, MinLength } from 'class-validator';
import type { ILoginRequest } from '@portfoliomanuca/types';

export class LoginDto implements ILoginRequest {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(1)
  password!: string;
}

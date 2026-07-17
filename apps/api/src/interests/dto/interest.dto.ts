import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateInterestDto {
  @IsString() name!: string;
  @IsOptional() @IsInt() order?: number;
}

export class UpdateInterestDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsInt() order?: number;
}

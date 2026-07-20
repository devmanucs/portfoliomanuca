import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateEducationDto {
  @IsString() degree!: string;
  @IsString() institution!: string;
  @IsOptional() @IsString() periodLabel?: string;
  @IsOptional() @IsDateString() startDate?: string;
  @IsOptional() @IsDateString() endDate?: string;
  @IsOptional() @IsInt() order?: number;
}

export class UpdateEducationDto {
  @IsOptional() @IsString() degree?: string;
  @IsOptional() @IsString() institution?: string;
  @IsOptional() @IsString() periodLabel?: string | null;
  @IsOptional() @IsDateString() startDate?: string | null;
  @IsOptional() @IsDateString() endDate?: string | null;
  @IsOptional() @IsInt() order?: number;
}

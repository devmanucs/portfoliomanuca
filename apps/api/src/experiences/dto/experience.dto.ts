import type { EmploymentType } from '@portfoliomanuca/types';
import { IsArray, IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateExperienceDto {
  @IsString() company!: string;
  @IsString() role!: string;
  @IsOptional() @IsString() location?: string;
  @IsString() employmentType!: EmploymentType;
  @IsOptional() @IsString() periodLabel?: string;
  @IsDateString() startDate!: string;
  @IsOptional() @IsDateString() endDate?: string;
  @IsString() description!: string;
  @IsOptional() @IsArray() @IsString({ each: true }) highlights?: string[];
  @IsOptional() order?: number;
  @IsOptional() @IsBoolean() includeInResume?: boolean;
  @IsOptional() @IsArray() @IsString({ each: true }) skillNames?: string[];
}

export class UpdateExperienceDto {
  @IsOptional() @IsString() company?: string;
  @IsOptional() @IsString() role?: string;
  @IsOptional() @IsString() location?: string | null;
  @IsOptional() @IsString() employmentType?: EmploymentType;
  @IsOptional() @IsString() periodLabel?: string | null;
  @IsOptional() @IsDateString() startDate?: string;
  @IsOptional() @IsDateString() endDate?: string | null;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) highlights?: string[];
  @IsOptional() order?: number;
  @IsOptional() @IsBoolean() includeInResume?: boolean;
  @IsOptional() @IsArray() @IsString({ each: true }) skillNames?: string[];
}

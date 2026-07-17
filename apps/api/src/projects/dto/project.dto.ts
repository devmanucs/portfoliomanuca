import type { ProjectFocus, ProjectStatus } from '@portfoliomanuca/types';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsString() @MinLength(1) slug!: string;
  @IsString() @MinLength(1) title!: string;
  @IsString() category!: string;
  @IsString() focus!: ProjectFocus;
  @IsString() description!: string;
  @IsString() impact!: string;
  @IsString() context!: string;
  @IsString() problem!: string;
  @IsArray() @IsString({ each: true }) process!: string[];
  @IsString() result!: string;
  @IsString() myRole!: string;
  @IsOptional() @IsArray() @IsString({ each: true }) designDecisions?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) technicalHighlights?: string[];
  @IsString() coverImage!: string;
  @IsArray() @IsString({ each: true }) gallery!: string[];
  @IsOptional() @IsString() liveUrl?: string;
  @IsOptional() @IsString() githubUrl?: string;
  @IsOptional() @IsString() figmaUrl?: string;
  @IsOptional() @IsBoolean() featured?: boolean;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsString() status?: ProjectStatus;
  @IsOptional() @IsBoolean() includeInResume?: boolean;
  @IsOptional() @IsArray() @IsString({ each: true }) skillNames?: string[];
}

export class UpdateProjectDto {
  @IsOptional() @IsString() slug?: string;
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() focus?: ProjectFocus;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() impact?: string;
  @IsOptional() @IsString() context?: string;
  @IsOptional() @IsString() problem?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) process?: string[];
  @IsOptional() @IsString() result?: string;
  @IsOptional() @IsString() myRole?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) designDecisions?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) technicalHighlights?: string[];
  @IsOptional() @IsString() coverImage?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) gallery?: string[];
  @IsOptional() @IsString() liveUrl?: string | null;
  @IsOptional() @IsString() githubUrl?: string | null;
  @IsOptional() @IsString() figmaUrl?: string | null;
  @IsOptional() @IsBoolean() featured?: boolean;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsString() status?: ProjectStatus;
  @IsOptional() @IsBoolean() includeInResume?: boolean;
  @IsOptional() @IsArray() @IsString({ each: true }) skillNames?: string[];
}

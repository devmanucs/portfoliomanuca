import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateSkillDto {
  @IsString() name!: string;
  @IsString() category!: string;
  @IsOptional() @IsInt() level?: number;
  @IsOptional() @IsString() iconKey?: string;
  @IsOptional() @IsString() color?: string;
  @IsOptional() @IsInt() order?: number;
}

export class UpdateSkillDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsInt() level?: number | null;
  @IsOptional() @IsString() iconKey?: string | null;
  @IsOptional() @IsString() color?: string | null;
  @IsOptional() @IsInt() order?: number;
}

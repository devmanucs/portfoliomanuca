import { IsObject, IsOptional } from 'class-validator';

export class UpdateSiteThemeDto {
  @IsOptional() @IsObject() light?: Record<string, string>;
  @IsOptional() @IsObject() dark?: Record<string, string>;
}

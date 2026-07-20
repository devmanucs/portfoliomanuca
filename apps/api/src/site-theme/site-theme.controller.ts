import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import type { ISiteTheme } from '@portfoliomanuca/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateSiteThemeDto } from './dto/update-site-theme.dto';
import { SiteThemeService } from './site-theme.service';

@Controller('site-theme')
export class SiteThemeController {
  constructor(private readonly siteThemeService: SiteThemeService) {}

  @Get()
  getTheme(): Promise<ISiteTheme> {
    return this.siteThemeService.getTheme();
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  updateTheme(@Body() dto: UpdateSiteThemeDto): Promise<ISiteTheme> {
    return this.siteThemeService.updateTheme(dto);
  }
}

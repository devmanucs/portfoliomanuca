import { Module } from '@nestjs/common';
import { SiteThemeController } from './site-theme.controller';
import { SiteThemeService } from './site-theme.service';

@Module({
  controllers: [SiteThemeController],
  providers: [SiteThemeService],
  exports: [SiteThemeService],
})
export class SiteThemeModule {}

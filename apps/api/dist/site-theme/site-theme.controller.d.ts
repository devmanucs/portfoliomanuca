import type { ISiteTheme } from '@portfoliomanuca/types';
import { UpdateSiteThemeDto } from './dto/update-site-theme.dto';
import { SiteThemeService } from './site-theme.service';
export declare class SiteThemeController {
    private readonly siteThemeService;
    constructor(siteThemeService: SiteThemeService);
    getTheme(): Promise<ISiteTheme>;
    updateTheme(dto: UpdateSiteThemeDto): Promise<ISiteTheme>;
}

import type { ISiteTheme } from '@portfoliomanuca/types';
import { PrismaService } from '../prisma/prisma.service';
import type { UpdateSiteThemeDto } from './dto/update-site-theme.dto';
export declare class SiteThemeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getTheme(): Promise<ISiteTheme>;
    updateTheme(dto: UpdateSiteThemeDto): Promise<ISiteTheme>;
}

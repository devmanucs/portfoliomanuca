import { Injectable } from '@nestjs/common';
import type { ISiteTheme } from '@portfoliomanuca/types';
import { mapSiteTheme } from '../common/mappers/entity.mappers';
import { PrismaService } from '../prisma/prisma.service';
import type { UpdateSiteThemeDto } from './dto/update-site-theme.dto';

type TokenMap = { light?: Record<string, string>; dark?: Record<string, string> };

@Injectable()
export class SiteThemeService {
  constructor(private readonly prisma: PrismaService) {}

  async getTheme(): Promise<ISiteTheme> {
    const existing = await this.prisma.siteTheme.findFirst({ orderBy: { id: 'asc' } });
    if (!existing) return { tokens: { light: {}, dark: {} } };
    return mapSiteTheme(existing);
  }

  async updateTheme(dto: UpdateSiteThemeDto): Promise<ISiteTheme> {
    const existing = await this.prisma.siteTheme.findFirst({ orderBy: { id: 'asc' } });
    const currentTokens = (existing?.tokens as TokenMap | null) ?? {};
    const nextTokens = {
      light: dto.light ?? currentTokens.light ?? {},
      dark: dto.dark ?? currentTokens.dark ?? {},
    };

    const row = existing
      ? await this.prisma.siteTheme.update({
          where: { id: existing.id },
          data: { tokens: nextTokens },
        })
      : await this.prisma.siteTheme.create({ data: { tokens: nextTokens } });

    return mapSiteTheme(row);
  }
}

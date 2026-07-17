import { Injectable, NotFoundException } from '@nestjs/common';
import type { IProfile } from '@portfoliomanuca/types';
import { mapProfile } from '../common/mappers/entity.mappers';
import { PrismaService } from '../prisma/prisma.service';
import type { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(): Promise<IProfile> {
    const profile = await this.prisma.profile.findFirst({ orderBy: { id: 'asc' } });
    if (!profile) throw new NotFoundException('Profile not found');
    return mapProfile(profile);
  }

  async updateProfile(dto: UpdateProfileDto): Promise<IProfile> {
    const existing = await this.prisma.profile.findFirst({ orderBy: { id: 'asc' } });
    if (!existing) throw new NotFoundException('Profile not found');
    const profile = await this.prisma.profile.update({ where: { id: existing.id }, data: dto });
    return mapProfile(profile);
  }
}

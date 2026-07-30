import { Injectable, NotFoundException } from '@nestjs/common';
import type { ISkill } from '@portfoliomanuca/types';
import { mapSkill } from '../common/mappers/entity.mappers';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateSkillDto, UpdateSkillDto } from './dto/skill.dto';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ISkill[]> {
    const rows = await this.prisma.skill.findMany({ orderBy: { order: 'asc' } });
    return rows.map(mapSkill);
  }

  async create(dto: CreateSkillDto): Promise<ISkill> {
    const row = await this.prisma.skill.create({ data: dto });
    return mapSkill(row);
  }

  async update(id: string, dto: UpdateSkillDto): Promise<ISkill> {
    try {
      const row = await this.prisma.skill.update({ where: { id }, data: dto });
      return mapSkill(row);
    } catch {
      throw new NotFoundException('Skill not found');
    }
  }

  async remove(id: string): Promise<void> {
    await this.prisma.skill.delete({ where: { id } });
  }
}

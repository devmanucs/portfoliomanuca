import { Injectable, NotFoundException } from '@nestjs/common';
import type { EmploymentType, IExperience } from '@portfoliomanuca/types';
import { EmploymentType as DbEmploymentType } from '@prisma/client';
import { mapExperience } from '../common/mappers/entity.mappers';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateExperienceDto, UpdateExperienceDto } from './dto/experience.dto';
import { experienceInclude, syncExperienceSkills } from './experiences.util';

@Injectable()
export class ExperiencesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<IExperience[]> {
    const rows = await this.prisma.experience.findMany({
      include: experienceInclude,
      orderBy: { order: 'asc' },
    });
    return rows.map(mapExperience);
  }

  async create(dto: CreateExperienceDto): Promise<IExperience> {
    const { skillNames = [], employmentType, startDate, endDate, highlights, ...rest } = dto;
    const row = await this.prisma.experience.create({
      data: {
        ...rest,
        employmentType: employmentType as DbEmploymentType,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        highlights: highlights ?? [],
      },
    });
    if (skillNames.length) await syncExperienceSkills(this.prisma, row.id, skillNames);
    return this.findOne(row.id);
  }

  async findOne(id: string): Promise<IExperience> {
    const row = await this.prisma.experience.findUnique({
      where: { id },
      include: experienceInclude,
    });
    if (!row) throw new NotFoundException('Experience not found');
    return mapExperience(row);
  }

  async update(id: string, dto: UpdateExperienceDto): Promise<IExperience> {
    const existing = await this.prisma.experience.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Experience not found');
    const { skillNames, employmentType, startDate, endDate, ...rest } = dto;
    await this.prisma.experience.update({
      where: { id },
      data: {
        ...rest,
        ...(employmentType ? { employmentType: employmentType as DbEmploymentType } : {}),
        ...(startDate ? { startDate: new Date(startDate) } : {}),
        ...(endDate !== undefined ? { endDate: endDate ? new Date(endDate) : null } : {}),
      },
    });
    if (skillNames) await syncExperienceSkills(this.prisma, id, skillNames);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.experience.delete({ where: { id } });
  }
}

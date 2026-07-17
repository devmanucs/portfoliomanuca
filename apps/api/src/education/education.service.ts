import { Injectable, NotFoundException } from '@nestjs/common';
import type { IEducation } from '@portfoliomanuca/types';
import { mapEducation } from '../common/mappers/entity.mappers';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateEducationDto, UpdateEducationDto } from './dto/education.dto';

@Injectable()
export class EducationService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<IEducation[]> {
    const rows = await this.prisma.education.findMany({ orderBy: { order: 'asc' } });
    return rows.map(mapEducation);
  }

  async create(dto: CreateEducationDto): Promise<IEducation> {
    const row = await this.prisma.education.create({
      data: {
        degree: dto.degree,
        institution: dto.institution,
        periodLabel: dto.periodLabel,
        startDate: dto.startDate ? new Date(dto.startDate) : null,
        endDate: dto.endDate ? new Date(dto.endDate) : null,
        order: dto.order ?? 0,
      },
    });
    return mapEducation(row);
  }

  async update(id: string, dto: UpdateEducationDto): Promise<IEducation> {
    try {
      const row = await this.prisma.education.update({
        where: { id },
        data: {
          ...dto,
          ...(dto.startDate !== undefined
            ? { startDate: dto.startDate ? new Date(dto.startDate) : null }
            : {}),
          ...(dto.endDate !== undefined
            ? { endDate: dto.endDate ? new Date(dto.endDate) : null }
            : {}),
        },
      });
      return mapEducation(row);
    } catch {
      throw new NotFoundException('Education not found');
    }
  }

  async remove(id: string): Promise<void> {
    await this.prisma.education.delete({ where: { id } });
  }
}

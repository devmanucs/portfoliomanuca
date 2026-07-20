import { Injectable, NotFoundException } from '@nestjs/common';
import type { IInterest } from '@portfoliomanuca/types';
import { mapInterest } from '../common/mappers/entity.mappers';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateInterestDto, UpdateInterestDto } from './dto/interest.dto';

@Injectable()
export class InterestsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<IInterest[]> {
    const rows = await this.prisma.interest.findMany({ orderBy: { order: 'asc' } });
    return rows.map(mapInterest);
  }

  async create(dto: CreateInterestDto): Promise<IInterest> {
    const row = await this.prisma.interest.create({ data: dto });
    return mapInterest(row);
  }

  async update(id: string, dto: UpdateInterestDto): Promise<IInterest> {
    try {
      const row = await this.prisma.interest.update({ where: { id }, data: dto });
      return mapInterest(row);
    } catch {
      throw new NotFoundException('Interest not found');
    }
  }

  async remove(id: string): Promise<void> {
    await this.prisma.interest.delete({ where: { id } });
  }
}

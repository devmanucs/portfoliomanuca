import { Injectable, NotFoundException } from '@nestjs/common';
import type { IProject, ProjectFocus, ProjectStatus } from '@portfoliomanuca/types';
import { ProjectStatus as DbProjectStatus } from '@prisma/client';
import { mapFocusToDb } from '../common/mappers/enum.mappers';
import { mapProject } from '../common/mappers/entity.mappers';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { projectInclude, publishedOnly, syncProjectSkills } from './projects.util';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findPublished(): Promise<IProject[]> {
    const rows = await this.prisma.project.findMany({
      where: publishedOnly,
      include: projectInclude,
      orderBy: [{ featured: 'desc' }, { order: 'asc' }],
    });
    return rows.map(mapProject);
  }

  async findAll(): Promise<IProject[]> {
    const rows = await this.prisma.project.findMany({
      include: projectInclude,
      orderBy: [{ order: 'asc' }, { featured: 'desc' }],
    });
    return rows.map(mapProject);
  }

  async findBySlug(slug: string, publishedOnlyFlag = true): Promise<IProject> {
    const row = await this.prisma.project.findFirst({
      where: publishedOnlyFlag ? { slug, ...publishedOnly } : { slug },
      include: projectInclude,
    });
    if (!row) throw new NotFoundException('Project not found');
    return mapProject(row);
  }

  async create(dto: CreateProjectDto): Promise<IProject> {
    const { skillNames = [], focus, status, ...data } = dto;
    const row = await this.prisma.project.create({
      data: {
        ...data,
        focus: mapFocusToDb(focus as ProjectFocus),
        status: (status ?? 'PUBLISHED') as DbProjectStatus,
        designDecisions: data.designDecisions ?? [],
        technicalHighlights: data.technicalHighlights ?? [],
      },
      include: projectInclude,
    });
    if (skillNames.length) await syncProjectSkills(this.prisma, row.id, skillNames);
    return this.findBySlug(row.slug, false);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<IProject> {
    const existing = await this.prisma.project.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Project not found');
    const { skillNames, focus, status, ...data } = dto;
    await this.prisma.project.update({
      where: { id },
      data: {
        ...data,
        ...(focus ? { focus: mapFocusToDb(focus as ProjectFocus) } : {}),
        ...(status ? { status: status as ProjectStatus } : {}),
      },
    });
    if (skillNames) await syncProjectSkills(this.prisma, id, skillNames);
    return this.findBySlug(existing.slug, false);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.project.delete({ where: { id } });
  }
}

import type { IProject } from '@portfoliomanuca/types';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
export declare class ProjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findPublished(): Promise<IProject[]>;
    findAll(): Promise<IProject[]>;
    findBySlug(slug: string, publishedOnlyFlag?: boolean): Promise<IProject>;
    create(dto: CreateProjectDto): Promise<IProject>;
    update(id: string, dto: UpdateProjectDto): Promise<IProject>;
    remove(id: string): Promise<void>;
}

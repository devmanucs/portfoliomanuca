import type { IExperience } from '@portfoliomanuca/types';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateExperienceDto, UpdateExperienceDto } from './dto/experience.dto';
export declare class ExperiencesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<IExperience[]>;
    create(dto: CreateExperienceDto): Promise<IExperience>;
    findOne(id: string): Promise<IExperience>;
    update(id: string, dto: UpdateExperienceDto): Promise<IExperience>;
    remove(id: string): Promise<void>;
}

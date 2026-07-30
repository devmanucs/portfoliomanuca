import type { IEducation } from '@portfoliomanuca/types';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateEducationDto, UpdateEducationDto } from './dto/education.dto';
export declare class EducationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<IEducation[]>;
    create(dto: CreateEducationDto): Promise<IEducation>;
    update(id: string, dto: UpdateEducationDto): Promise<IEducation>;
    remove(id: string): Promise<void>;
}

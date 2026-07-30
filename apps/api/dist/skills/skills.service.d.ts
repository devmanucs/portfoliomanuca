import type { ISkill } from '@portfoliomanuca/types';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateSkillDto, UpdateSkillDto } from './dto/skill.dto';
export declare class SkillsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<ISkill[]>;
    create(dto: CreateSkillDto): Promise<ISkill>;
    update(id: string, dto: UpdateSkillDto): Promise<ISkill>;
    remove(id: string): Promise<void>;
}

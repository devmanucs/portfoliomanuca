import type { ISkill } from '@portfoliomanuca/types';
import { CreateSkillDto, UpdateSkillDto } from './dto/skill.dto';
import { SkillsService } from './skills.service';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    findAll(): Promise<ISkill[]>;
    create(dto: CreateSkillDto): Promise<ISkill>;
    update(id: string, dto: UpdateSkillDto): Promise<ISkill>;
    remove(id: string): Promise<{
        ok: true;
    }>;
}

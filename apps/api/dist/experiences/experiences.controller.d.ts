import type { IExperience } from '@portfoliomanuca/types';
import { CreateExperienceDto, UpdateExperienceDto } from './dto/experience.dto';
import { ExperiencesService } from './experiences.service';
export declare class ExperiencesController {
    private readonly experiencesService;
    constructor(experiencesService: ExperiencesService);
    findAll(): Promise<IExperience[]>;
    create(dto: CreateExperienceDto): Promise<IExperience>;
    update(id: string, dto: UpdateExperienceDto): Promise<IExperience>;
    remove(id: string): Promise<{
        ok: true;
    }>;
}

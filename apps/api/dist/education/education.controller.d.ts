import type { IEducation } from '@portfoliomanuca/types';
import { CreateEducationDto, UpdateEducationDto } from './dto/education.dto';
import { EducationService } from './education.service';
export declare class EducationController {
    private readonly educationService;
    constructor(educationService: EducationService);
    findAll(): Promise<IEducation[]>;
    create(dto: CreateEducationDto): Promise<IEducation>;
    update(id: string, dto: UpdateEducationDto): Promise<IEducation>;
    remove(id: string): Promise<{
        ok: true;
    }>;
}

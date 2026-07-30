import type { IProject } from '@portfoliomanuca/types';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findPublished(): Promise<IProject[]>;
    findAllAdmin(): Promise<IProject[]>;
    findBySlug(slug: string): Promise<IProject>;
    create(dto: CreateProjectDto): Promise<IProject>;
    update(id: string, dto: UpdateProjectDto): Promise<IProject>;
    remove(id: string): Promise<{
        ok: true;
    }>;
}

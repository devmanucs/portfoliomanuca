import type { IResume } from '@portfoliomanuca/types';
import type { Response } from 'express';
import { ResumeService } from './resume.service';
export declare class ResumeController {
    private readonly resumeService;
    constructor(resumeService: ResumeService);
    getResume(): Promise<IResume>;
    getResumePdf(res: Response): Promise<void>;
}

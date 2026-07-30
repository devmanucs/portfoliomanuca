import type { IResume } from '@portfoliomanuca/types';
import { PrismaService } from '../prisma/prisma.service';
export declare class ResumeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getResume(): Promise<IResume>;
    buildResumeHtml(resume: IResume): string;
    renderPdf(html: string): Promise<Buffer>;
}

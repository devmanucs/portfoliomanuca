import { PrismaService } from '../prisma/prisma.service';
export declare const experienceInclude: {
    readonly skills: {
        readonly include: {
            readonly skill: true;
        };
    };
};
export declare function syncExperienceSkills(prisma: PrismaService, experienceId: string, skillNames: string[]): Promise<void>;

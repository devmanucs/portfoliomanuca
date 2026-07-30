import { PrismaService } from '../prisma/prisma.service';
export declare function syncProjectSkills(prisma: PrismaService, projectId: string, skillNames: string[]): Promise<void>;
export declare const projectInclude: {
    readonly skills: {
        readonly include: {
            readonly skill: true;
        };
    };
};
export declare const publishedOnly: {
    readonly status: "PUBLISHED";
};

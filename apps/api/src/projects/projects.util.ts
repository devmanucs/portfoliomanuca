import { PrismaService } from '../prisma/prisma.service';
import { ProjectStatus as DbProjectStatus } from '@prisma/client';

export async function syncProjectSkills(
  prisma: PrismaService,
  projectId: string,
  skillNames: string[],
): Promise<void> {
  await prisma.projectSkill.deleteMany({ where: { projectId } });
  for (const name of skillNames) {
    const skill = await prisma.skill.upsert({
      where: { name },
      create: { name, category: 'project', order: 0 },
      update: {},
    });
    await prisma.projectSkill.create({ data: { projectId, skillId: skill.id } });
  }
}

export const projectInclude = {
  skills: { include: { skill: true } },
} as const;

export const publishedOnly = { status: DbProjectStatus.PUBLISHED } as const;

import { PrismaService } from '../prisma/prisma.service';

export const experienceInclude = { skills: { include: { skill: true } } } as const;

export async function syncExperienceSkills(
  prisma: PrismaService,
  experienceId: string,
  skillNames: string[],
): Promise<void> {
  await prisma.experienceSkill.deleteMany({ where: { experienceId } });
  for (const name of skillNames) {
    const skill = await prisma.skill.upsert({
      where: { name },
      create: { name, category: 'experience', order: 0 },
      update: {},
    });
    await prisma.experienceSkill.create({ data: { experienceId, skillId: skill.id } });
  }
}

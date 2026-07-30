"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.experienceInclude = void 0;
exports.syncExperienceSkills = syncExperienceSkills;
exports.experienceInclude = { skills: { include: { skill: true } } };
async function syncExperienceSkills(prisma, experienceId, skillNames) {
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
//# sourceMappingURL=experiences.util.js.map
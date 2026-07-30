"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishedOnly = exports.projectInclude = void 0;
exports.syncProjectSkills = syncProjectSkills;
const client_1 = require("@prisma/client");
async function syncProjectSkills(prisma, projectId, skillNames) {
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
exports.projectInclude = {
    skills: { include: { skill: true } },
};
exports.publishedOnly = { status: client_1.ProjectStatus.PUBLISHED };
//# sourceMappingURL=projects.util.js.map
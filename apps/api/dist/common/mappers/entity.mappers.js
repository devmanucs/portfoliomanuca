"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSkill = mapSkill;
exports.mapProfile = mapProfile;
exports.mapSiteTheme = mapSiteTheme;
exports.mapProject = mapProject;
exports.mapExperience = mapExperience;
exports.mapEducation = mapEducation;
exports.mapInterest = mapInterest;
const enum_mappers_1 = require("./enum.mappers");
function mapSkill(skill) {
    return {
        id: skill.id,
        name: skill.name,
        category: skill.category,
        level: skill.level,
        iconKey: skill.iconKey,
        color: skill.color,
        order: skill.order,
    };
}
function mapProfile(profile) {
    return {
        id: profile.id,
        fullName: profile.fullName,
        headline: profile.headline,
        bio: profile.bio,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        linkedin: profile.linkedin,
        github: profile.github,
        website: profile.website,
        avatarUrl: profile.avatarUrl,
        resumeSummary: profile.resumeSummary,
    };
}
function mapSiteTheme(siteTheme) {
    const tokens = siteTheme.tokens;
    return {
        tokens: {
            light: tokens?.light ?? {},
            dark: tokens?.dark ?? {},
        },
        updatedAt: siteTheme.updatedAt.toISOString(),
    };
}
function mapProject(project) {
    return {
        id: project.id,
        slug: project.slug,
        title: project.title,
        category: project.category,
        focus: (0, enum_mappers_1.mapFocusToApi)(project.focus),
        description: project.description,
        impact: project.impact,
        context: project.context,
        problem: project.problem,
        process: project.process,
        result: project.result,
        myRole: project.myRole,
        designDecisions: project.designDecisions,
        technicalHighlights: project.technicalHighlights,
        coverImage: project.coverImage,
        gallery: project.gallery,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        figmaUrl: project.figmaUrl,
        featured: project.featured,
        order: project.order,
        status: (0, enum_mappers_1.mapStatusToApi)(project.status),
        includeInResume: project.includeInResume,
        skills: project.skills.map((ps) => mapSkill(ps.skill)),
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
    };
}
function mapExperience(experience) {
    return {
        id: experience.id,
        company: experience.company,
        role: experience.role,
        location: experience.location,
        employmentType: (0, enum_mappers_1.mapEmploymentToApi)(experience.employmentType),
        periodLabel: experience.periodLabel,
        startDate: experience.startDate.toISOString(),
        endDate: experience.endDate?.toISOString() ?? null,
        description: experience.description,
        highlights: experience.highlights,
        order: experience.order,
        includeInResume: experience.includeInResume,
        skills: experience.skills.map((es) => mapSkill(es.skill)),
    };
}
function mapEducation(education) {
    return {
        id: education.id,
        degree: education.degree,
        institution: education.institution,
        periodLabel: education.periodLabel,
        startDate: education.startDate?.toISOString() ?? null,
        endDate: education.endDate?.toISOString() ?? null,
        order: education.order,
    };
}
function mapInterest(interest) {
    return {
        id: interest.id,
        name: interest.name,
        order: interest.order,
    };
}
//# sourceMappingURL=entity.mappers.js.map
import type {
  IEducation,
  IExperience,
  IInterest,
  IProfile,
  IProject,
  ISiteTheme,
  ISkill,
} from '@portfoliomanuca/types';
import type {
  Education,
  Experience,
  Interest,
  Profile,
  Project,
  Skill,
  SiteTheme,
} from '@prisma/client';
import {
  mapEmploymentToApi,
  mapFocusToApi,
  mapStatusToApi,
} from './enum.mappers';

type SkillRow = Skill;
type ProjectWithSkills = Project & { skills: { skill: SkillRow }[] };
type ExperienceWithSkills = Experience & { skills: { skill: SkillRow }[] };

export function mapSkill(skill: SkillRow): ISkill {
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

export function mapProfile(profile: Profile): IProfile {
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

export function mapSiteTheme(siteTheme: SiteTheme): ISiteTheme {
  const tokens = siteTheme.tokens as { light?: Record<string, string>; dark?: Record<string, string> } | null;
  return {
    tokens: {
      light: tokens?.light ?? {},
      dark: tokens?.dark ?? {},
    },
    updatedAt: siteTheme.updatedAt.toISOString(),
  };
}

export function mapProject(project: ProjectWithSkills): IProject {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    category: project.category,
    focus: mapFocusToApi(project.focus),
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
    status: mapStatusToApi(project.status),
    includeInResume: project.includeInResume,
    skills: project.skills.map((ps) => mapSkill(ps.skill)),
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
}

export function mapExperience(experience: ExperienceWithSkills): IExperience {
  return {
    id: experience.id,
    company: experience.company,
    role: experience.role,
    location: experience.location,
    employmentType: mapEmploymentToApi(experience.employmentType),
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

export function mapEducation(education: Education): IEducation {
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

export function mapInterest(interest: Interest): IInterest {
  return {
    id: interest.id,
    name: interest.name,
    order: interest.order,
  };
}

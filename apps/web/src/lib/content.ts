import type {
  IEducation,
  IExperience,
  IInterest,
  IProfile,
  IProject,
  ISkill,
} from "@portfoliomanuca/types";
import {
  projects as staticProjects,
  type Project,
} from "@/features/projects/data/projects-data";
import { mapApiProjectsToUi } from "@/features/projects/utils/project-mapper";
import { serverFetch } from "@/lib/api-server";

export type LandingExperience = {
  period: string;
  role: string;
  company: string;
  description: string;
};

export type LandingEducation = {
  period: string;
  degree: string;
  institution: string;
};

const staticProfile: IProfile = {
  id: "static",
  fullName: "Manuella Carvalho",
  headline: "Front-end Developer & UI/UX Designer",
  bio: "Desenvolvimento web e design de interfaces com foco em experiência do usuário.",
  email: "manuhcsantos@gmail.com",
  linkedin: "https://linkedin.com/in/manuella-carvalho-7663352b0",
  github: "https://github.com/devmanucs",
};

const staticExperiences: LandingExperience[] = [
  {
    period: "Atual",
    role: "Desenvolvedora de Sistemas — Trainee",
    company: "AVB",
    description: "Interfaces com React, Next.js, TypeScript e Tailwind.",
  },
  {
    period: "Projetos recentes",
    role: "UI/UX Designer e Desenvolvedora Front-end",
    company: "Nexystem",
    description: "Protótipos no Figma e implementação responsiva.",
  },
  {
    period: "Voluntariado",
    role: "Membro de Empresa Júnior",
    company: "SCS — Robótica, UI/UX e Games",
    description: "Projetos técnicos e de design.",
  },
];

const staticEducation: LandingEducation[] = [
  {
    period: "2026",
    degree: "Análise e Desenvolvimento de Sistemas",
    institution: "Unifacimp Wyden",
  },
  {
    period: "2023",
    degree: "Ensino Médio",
    institution: "CEM — Tancredo de Almeida Neves",
  },
];

const staticInterests = [
  "Front-end",
  "UI/UX",
  "Robótica",
  "Game Design",
  "Pixel Art",
];

const staticAdditionalSkills = [
  "git",
  "github",
  "vs code",
  "node.js",
  "rest APIs",
  "responsive design",
  "UI/UX",
  "design systems",
  "accessibility",
  "performance",
  "SEO",
  "agile",
];

export type LandingContent = {
  profile: IProfile;
  projects: Project[];
  skills: ISkill[];
  experiences: LandingExperience[];
  education: LandingEducation[];
  interests: string[];
  additionalSkills: string[];
};

function mapExperienceToLanding(exp: IExperience): LandingExperience {
  return {
    period: exp.periodLabel ?? "—",
    role: exp.role,
    company: exp.company,
    description: exp.description,
  };
}

function mapEducationToLanding(edu: IEducation): LandingEducation {
  return {
    period: edu.periodLabel ?? "—",
    degree: edu.degree,
    institution: edu.institution,
  };
}

export async function loadProfile(): Promise<IProfile> {
  const profile = await serverFetch<IProfile>("/profile", ["profile"]);
  return profile ?? staticProfile;
}

export async function loadProjects(): Promise<Project[]> {
  const projects = await serverFetch<IProject[]>("/projects", ["projects"]);
  if (projects?.length) return mapApiProjectsToUi(projects);
  return staticProjects;
}

export async function loadProjectBySlug(slug: string): Promise<Project | null> {
  const project = await serverFetch<IProject>(`/projects/${slug}`, ["projects"]);
  if (project) return mapApiProjectsToUi([project])[0] ?? null;
  return staticProjects.find((item) => item.slug === slug) ?? null;
}

export async function loadSkills(): Promise<ISkill[]> {
  const skills = await serverFetch<ISkill[]>("/skills", ["skills"]);
  return skills ?? [];
}

export async function loadExperiences(): Promise<LandingExperience[]> {
  const experiences = await serverFetch<IExperience[]>("/experiences", ["experiences"]);
  if (experiences?.length) {
    return experiences.map(mapExperienceToLanding);
  }
  return staticExperiences;
}

export async function loadEducation(): Promise<LandingEducation[]> {
  const education = await serverFetch<IEducation[]>("/education", ["education"]);
  if (education?.length) {
    return education.map(mapEducationToLanding);
  }
  return staticEducation;
}

export async function loadInterests(): Promise<string[]> {
  const interests = await serverFetch<IInterest[]>("/interests", ["interests"]);
  if (interests?.length) {
    return interests.map((item) => item.name);
  }
  return staticInterests;
}

export async function loadLandingContent(): Promise<LandingContent> {
  const [profile, projects, skills, experiences, education, interests] =
    await Promise.all([
      loadProfile(),
      loadProjects(),
      loadSkills(),
      loadExperiences(),
      loadEducation(),
      loadInterests(),
    ]);

  const additionalSkills =
    skills.length > 0
      ? skills
          .filter((skill) => !skill.iconKey)
          .map((skill) => skill.name.toLowerCase())
      : staticAdditionalSkills;

  return {
    profile,
    projects,
    skills,
    experiences,
    education,
    interests,
    additionalSkills,
  };
}

export type ProjectFocus = "design" | "development" | "hybrid";
export type ProjectStatus = "DRAFT" | "PUBLISHED";
export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "FREELANCE"
  | "INTERNSHIP";

export interface ISiteTheme {
  tokens: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  updatedAt?: string;
}

export interface IProfile {
  id: string;
  fullName: string;
  headline: string;
  bio: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  linkedin?: string | null;
  github?: string | null;
  website?: string | null;
  avatarUrl?: string | null;
  resumeSummary?: string | null;
}

export interface ISkill {
  id: string;
  name: string;
  category: string;
  level?: number | null;
  iconKey?: string | null;
  color?: string | null;
  order: number;
}

export interface IProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  focus: ProjectFocus;
  description: string;
  impact: string;
  context: string;
  problem: string;
  process: string[];
  result: string;
  myRole: string;
  designDecisions: string[];
  technicalHighlights: string[];
  coverImage: string;
  gallery: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  figmaUrl?: string | null;
  featured: boolean;
  order: number;
  status: ProjectStatus;
  includeInResume: boolean;
  skills?: ISkill[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IExperience {
  id: string;
  company: string;
  role: string;
  location?: string | null;
  employmentType: EmploymentType;
  periodLabel?: string | null;
  startDate: string;
  endDate?: string | null;
  description: string;
  highlights: string[];
  order: number;
  includeInResume: boolean;
  skills?: ISkill[];
}

export interface IEducation {
  id: string;
  degree: string;
  institution: string;
  periodLabel?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  order: number;
}

export interface IInterest {
  id: string;
  name: string;
  order: number;
}

export interface IResume {
  profile: IProfile;
  experiences: IExperience[];
  projects: IProject[];
  skills: ISkill[];
  education: IEducation[];
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IAuthUser {
  id: string;
  email: string;
}

export const focusLabels: Record<ProjectFocus, string> = {
  design: "ui/ux",
  development: "front-end",
  hybrid: "design + dev",
};

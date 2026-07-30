import type { IEducation, IExperience, IInterest, IProfile, IProject, ISiteTheme, ISkill } from '@portfoliomanuca/types';
import type { Education, Experience, Interest, Profile, Project, Skill, SiteTheme } from '@prisma/client';
type SkillRow = Skill;
type ProjectWithSkills = Project & {
    skills: {
        skill: SkillRow;
    }[];
};
type ExperienceWithSkills = Experience & {
    skills: {
        skill: SkillRow;
    }[];
};
export declare function mapSkill(skill: SkillRow): ISkill;
export declare function mapProfile(profile: Profile): IProfile;
export declare function mapSiteTheme(siteTheme: SiteTheme): ISiteTheme;
export declare function mapProject(project: ProjectWithSkills): IProject;
export declare function mapExperience(experience: ExperienceWithSkills): IExperience;
export declare function mapEducation(education: Education): IEducation;
export declare function mapInterest(interest: Interest): IInterest;
export {};

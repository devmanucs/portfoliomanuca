import type { IProject } from "@portfoliomanuca/types";
import type { Project } from "@/features/projects/data/projects-data";

export function mapApiProjectToUi(project: IProject): Project {
  return {
    slug: project.slug,
    title: project.title,
    category: project.category,
    focus: project.focus,
    description: project.description,
    impact: project.impact,
    context: project.context,
    problem: project.problem,
    process: project.process,
    result: project.result,
    myRole: project.myRole,
    designDecisions: project.designDecisions,
    technicalHighlights: project.technicalHighlights,
    image: project.coverImage,
    images: project.gallery,
    tags: project.skills?.map((skill) => skill.name) ?? [],
    liveUrl: project.liveUrl ?? undefined,
    githubUrl: project.githubUrl ?? undefined,
    figmaUrl: project.figmaUrl ?? undefined,
    featured: project.featured,
  };
}

export function mapApiProjectsToUi(projects: IProject[]): Project[] {
  return projects.map(mapApiProjectToUi);
}

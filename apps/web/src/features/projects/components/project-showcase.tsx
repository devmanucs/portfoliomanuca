"use client";

import { ProjectShowcaseCard } from "./project-showcase-card";
import { ProjectShowcaseModal } from "./project-showcase-modal";
import type { Project } from "../data/projects-data";
import { useCallback, useState } from "react";

type ProjectShowcaseProps = {
  projects: Project[];
};

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const handleClose = useCallback(() => setActiveProject(null), []);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectShowcaseCard
            key={project.slug}
            project={project}
            index={index}
            onClick={() => setActiveProject(project)}
          />
        ))}
      </div>

      <ProjectShowcaseModal project={activeProject} onClose={handleClose} />
    </>
  );
}

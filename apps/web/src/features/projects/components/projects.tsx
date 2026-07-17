"use client";

import { ProjectShowcase } from "./project-showcase";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import type { Project } from "../data/projects-data";
import { useMemo, useState } from "react";

type ProjectsProps = {
  projects: Project[];
};

export function Projects({ projects }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState("todos");
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();

  const categories = useMemo(
    () => ["todos", ...new Set(projects.map((project) => project.category))],
    [projects],
  );

  const filteredProjects =
    activeCategory === "todos"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section
      id="projetos"
      className="section-band relative text-left"
      ref={sectionRef}
    >
      <div className="content-container">
        <div
          className={`mb-10 text-left transition-all duration-500 md:mb-12 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >

          <h2 className="display-lg">
            Projetos
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-body">
            Cases de design e desenvolvimento, clique e veja mais.
          </p>
        </div>

        <div
          className={`mb-10 flex flex-wrap gap-3 transition-all duration-500 delay-75 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {categories.map((category) => (
            <Button
              key={category}
              type="button"
              size="sm"
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={cn("rounded-full", activeCategory !== category && "text-muted-foreground")}
            >
              {category.toLowerCase()}
            </Button>
          ))}
        </div>

        <div
          className={`transition-all duration-500 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <ProjectShowcase key={activeCategory} projects={filteredProjects} />
        </div>
      </div>
    </section>
  );
}

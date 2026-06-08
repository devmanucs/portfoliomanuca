"use client";

import { ProjectShowcaseCard } from "@/components/project-showcase-card";
import { ProjectShowcaseModal } from "@/components/project-showcase-modal";
import type { Project } from "@/lib/projects-data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type ProjectShowcaseProps = {
  projects: Project[];
};

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [projects, checkScrollability]);

  const scrollBy = (direction: "left" | "right") => {
    carouselRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const handleClose = useCallback(() => setActiveProject(null), []);

  return (
    <>
      <div className="relative">
        <div
          ref={carouselRef}
          onScroll={checkScrollability}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 pt-1 scrollbar-none"
        >
          {projects.map((project, index) => (
            <ProjectShowcaseCard
              key={project.slug}
              project={project}
              index={index}
              featured={project.featured && index === 0}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </div>

        {projects.length > 1 ? (
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => scrollBy("left")}
              disabled={!canScrollLeft}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:border-sage/50 hover:bg-sage/10 disabled:opacity-30"
              aria-label="Projeto anterior"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy("right")}
              disabled={!canScrollRight}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:border-sage/50 hover:bg-sage/10 disabled:opacity-30"
              aria-label="Próximo projeto"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        ) : null}
      </div>

      <ProjectShowcaseModal project={activeProject} onClose={handleClose} />
    </>
  );
}

"use client";

import { ProjectShowcase } from "@/components/project-showcase";

import { PointerHighlight } from "@/components/ui/pointer-highlight";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

import { projects } from "@/lib/projects-data";

import { useState } from "react";

const categories = [
  "todos",

  ...new Set(projects.map((project) => project.category)),
];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("todos");

  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();

  const filteredProjects =
    activeCategory === "todos"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section
      id="projetos"
      className="relative px-6 py-20 text-left md:py-24"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-10 text-left transition-all duration-500 md:mb-12 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="mb-3 text-xs tracking-widest text-muted-foreground">
            portfólio
          </p>

          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            meus{" "}
            <PointerHighlight
              containerClassName="inline-block"
              rectangleClassName="border-sage/50 dark:border-sage/30"
              pointerClassName="text-sage"
            >
              <span>projetos</span>
            </PointerHighlight>
          </h2>

          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            cases de design e desenvolvimento. clique para ver contexto,
            processo e resultado.
          </p>
        </div>

        <div
          className={`mb-10 flex flex-wrap gap-3 transition-all duration-500 delay-75 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                activeCategory === category
                  ? "bg-sage text-background"
                  : "border border-border text-muted-foreground hover:border-sage/40 hover:text-foreground"
              }`}
            >
              {category.toLowerCase()}
            </button>
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

"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

import type { IconType } from "react-icons";

import {
  SiCss,
  SiFigma,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const technologies = [
  { name: "react", icon: SiReact, color: "#61DAFB" },
  {
    name: "next.js",
    icon: SiNextdotjs,
    color: "currentColor",
    iconClassName: "text-foreground",
  },
  { name: "typescript", icon: SiTypescript, color: "#3178C6" },
  { name: "tailwind css", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "figma", icon: SiFigma, color: "#F24E1E" },
  { name: "javascript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "html", icon: SiHtml5, color: "#E34F26" },
  { name: "css", icon: SiCss, color: "#1572B6" },
];

type Technology = {
  name: string;
  color: string;
  icon: IconType;
  iconClassName?: string;
};

const technologiesList: Technology[] = technologies;

const additionalSkills = [
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

export function Technologies() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="stacks"
      className="relative px-6 py-20 text-left md:py-24"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-10 text-left transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
            tecnologias
          </p>

          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            stack & ferramentas
          </h2>

          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            tecnologias que utilizo no dia a dia.
          </p>
        </div>

        <div
          className={`mb-12 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 md:grid-cols-4 transition-all duration-500 delay-75 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {technologiesList.map((tech) => {
            const Icon = tech.icon;

            return (
              <div
                key={tech.name}
                className="flex items-center gap-3 text-foreground"
              >
                <Icon
                  size={18}
                  className={tech.iconClassName}
                  style={{ color: tech.color }}
                />

                <span className="text-sm">{tech.name}</span>
              </div>
            );
          })}
        </div>

        <div
          className={`transition-all duration-500 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h3 className="mb-4 text-sm font-medium text-foreground">
            habilidades adicionais
          </h3>

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {additionalSkills.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}

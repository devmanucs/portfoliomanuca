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
  { name: "React", category: "Framework", color: "#61DAFB", icon: SiReact },
  {
    name: "Next.js",
    category: "Framework",
    color: "currentColor",
    icon: SiNextdotjs,
    iconClassName: "text-foreground",
  },
  {
    name: "TypeScript",
    category: "Linguagem",
    color: "#3178C6",
    icon: SiTypescript,
  },
  {
    name: "Tailwind CSS",
    category: "Estilização",
    color: "#06B6D4",
    icon: SiTailwindcss,
  },
  { name: "Figma", category: "Design", color: "#F24E1E", icon: SiFigma },
  {
    name: "JavaScript",
    category: "Linguagem",
    color: "#F7DF1E",
    icon: SiJavascript,
  },
  { name: "HTML", category: "Markup", color: "#E34F26", icon: SiHtml5 },
  { name: "CSS", category: "Estilização", color: "#1572B6", icon: SiCss },
];

type Technology = {
  name: string;
  category: string;
  color: string;
  icon: IconType;
  iconClassName?: string;
};

const technologiesList: Technology[] = technologies;

const additionalSkills = [
  "Git",
  "GitHub",
  "VS Code",
  "Node.js",
  "REST APIs",
  "Responsive Design",
  "UI/UX",
  "Design Systems",
  "Accessibility",
  "Performance",
  "SEO",
  "Agile",
];

export function Technologies() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();
  const { ref: gridRef, isVisible: gridVisible } =
    useScrollAnimation<HTMLDivElement>();

  return (
    <section
      id="tecnologias"
      className="py-32 px-6 bg-card relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="mt-16 mb-16 overflow-hidden">
        <div className="flex animate-marquee">
          {[...technologiesList, ...technologiesList].map((tech, index) => (
            <div
              key={`marquee-${index}`}
              className="flex items-center gap-2 px-8 text-muted-foreground/30 text-2xl font-serif whitespace-nowrap"
            >
              {tech.name}
              <span className="w-2 h-2 rounded-full bg-sage/30" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(115,169,140,0.05)_0%,transparent_50%)]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-sm uppercase tracking-widest text-sage mb-4 block">
            Tecnologias & Ferramentas
          </span>

          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground mb-6 text-balance">
            Stacks que eu <span className="gradient-text">domino</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Trabalho com as tecnologias mais modernas do mercado para criar
            soluções web de alta qualidade.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {technologiesList.map((tech, index) => {
            const Icon = tech.icon;

            return (
              <div
                key={tech.name}
                className={`group p-6 rounded-2xl bg-background border border-border hover:border-sage/50 transition-all duration-500 hover-lift cursor-default ${
                  gridVisible ? "animate-scale-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-16 h-16 mb-4 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                    style={{
                      backgroundColor:
                        tech.color === "currentColor"
                          ? "rgb(148 163 184 / 0.12)"
                          : `${tech.color}15`,
                    }}
                  >
                    <Icon
                      size={30}
                      className={tech.iconClassName}
                      style={{ color: tech.color }}
                    />
                  </div>
                  <h3 className="font-medium text-foreground mb-1 group-hover:text-sage transition-colors">
                    {tech.name}
                  </h3>
                  <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted">
                    {tech.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`transition-all duration-700 delay-500 ${
            gridVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-center text-lg font-medium text-foreground mb-6">
            Habilidades adicionais
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalSkills.map((skill, index) => (
              <span
                key={skill}
                className={`px-4 py-2 rounded-full bg-background border border-border text-sm text-muted-foreground hover:text-foreground hover:border-sage/50 hover:bg-sage/5 transition-all duration-300 cursor-default ${
                  gridVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.6 + index * 0.05}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

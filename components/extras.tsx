"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const experience = [
  {
    period: "Atual",
    role: "Desenvolvedora de Sistemas — Trainee",
    company: "AVB",
    description:
      "Interfaces com React, Next.js, TypeScript e Tailwind.",
  },
  {
    period: "Projetos recentes",
    role: "UI/UX Designer e Desenvolvedora Front-end",
    company: "Nexystem",
    description:
      "Protótipos no Figma e implementação responsiva.",
  },
  {
    period: "Voluntariado",
    role: "Membro de Empresa Júnior",
    company: "SCS — Robótica, UI/UX e Games",
    description: "Projetos técnicos e de design.",
  },
];

const education = [
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

const interests = [
  "Front-end",
  "UI/UX",
  "Robótica",
  "Game Design",
  "Pixel Art",
];

export function Extras() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="extras"
      className="relative border-t border-border bg-card/30 px-6 py-28 text-left"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-12 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
            trajetória
          </p>
          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            experiência & formação
          </h2>
        </div>

        <div
          className={`grid gap-10 md:grid-cols-2 md:gap-12 transition-all duration-500 delay-75 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <h3 className="mb-6 text-sm font-medium text-foreground">
              experiência
            </h3>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div
                  key={exp.role}
                  className="rounded-2xl border border-border bg-background p-5 transition-colors hover:border-sage/30"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-sage">
                    {exp.period}
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {exp.role}
                  </p>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="mb-6 text-sm font-medium text-foreground">
                formação
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="rounded-2xl border border-border bg-background p-5 transition-colors hover:border-sage/30"
                  >
                    <p className="text-xs font-medium uppercase tracking-wider text-sage">
                      {edu.period}
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {edu.degree}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {edu.institution}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-medium text-foreground">
                interesses
              </h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-sage/20 bg-sage/10 px-3 py-1 text-xs text-sage"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

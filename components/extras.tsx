"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  Award,
  Briefcase,
  ChevronRight,
  GraduationCap,
  Heart,
} from "lucide-react";

const experience = [
  {
    period: "Atual",
    role: "Desenvolvedora de Sistemas - Trainee",
    company: "AVB",
    description:
      "Atuação no desenvolvimento de interfaces e evolução de sistemas com foco em React, Next.js, TypeScript e Tailwind.",
  },
  {
    period: "Projetos recentes",
    role: "UI/UX Designer e Desenvolvedora Front-end",
    company: "Nexystem | Startup de Tecnologia",
    description:
      "Criação de interfaces, protótipos e implementações responsivas com HTML, CSS, React, Next.js, Tailwind e Figma.",
  },
  {
    period: "Voluntariado",
    role: "Membro de Empresa Júnior",
    company: "SCS Núcleos de Robótica/Automação, UI/UX e Games",
    description:
      "Participação em iniciativas técnicas e de design, colaborando em soluções práticas para desafios reais.",
  },
  {
    period: "Base técnica",
    role: "Suporte e Manutenção de Computadores",
    company: "Feirão dos Móveis Magazine",
    description:
      "Experiência com suporte ao usuário, adaptação a diferentes sistemas e manutenção de equipamentos.",
  },
];

const education = [
  {
    period: "Conclusão prevista: 2026",
    degree: "Graduanda em Análise e Desenvolvimento de Sistemas",
    institution: "Unifacimp Wyden",
  },
  {
    period: "Conclusão: 2023",
    degree: "Ensino Médio Completo",
    institution: "CEM - Tancredo de Almeida Neves",
  },
];

const certifications = [
  "Formação prática em React e Next.js",
  "Projetos aplicados em UI/UX com Figma",
  "Experiência em suporte técnico e sistemas",
  "Inglês intermediário",
];

const interests = [
  { name: "Desenvolvimento Front-end", color: "sage" },
  { name: "UI/UX Design", color: "terracotta" },
  { name: "Robótica e Automação", color: "amber" },
  { name: "Game Design", color: "stone" },
  { name: "Pixel Art", color: "terracotta" },
  { name: "Tecnologia para educação", color: "sage" },
  { name: "Inovação e criatividade", color: "terracotta" },
  { name: "Colaboração e trabalho em equipe", color: "amber" },
];

export function Extras() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="extras"
      className="py-32 px-6 bg-card relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-sm uppercase tracking-widest text-sage mb-4 block">
            Mais sobre mim
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground mb-6 text-balance">
            Experiência & <span className="gradient-text">Interesses</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8">
          <div
            className={`self-start p-8 rounded-3xl bg-background border border-border hover:border-sage/30 transition-all duration-500 hover-lift ${
              isVisible ? "animate-fade-in-left" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-sage/10 text-sage">
                <Briefcase size={24} />
              </div>
              <h3 className="font-serif text-2xl text-foreground">
                Experiência
              </h3>
            </div>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="group relative pl-6 border-l-2 border-sage/30 hover:border-sage transition-colors duration-300"
                >
                  <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-background border-2 border-sage/30 group-hover:border-sage group-hover:bg-sage/20 transition-all duration-300" />
                  <span className="text-sm text-sage font-medium">
                    {exp.period}
                  </span>
                  <h4 className="font-medium text-foreground mt-1">
                    {exp.role}
                  </h4>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`self-start p-8 rounded-3xl bg-background border border-border hover:border-terracotta/30 transition-all duration-500 hover-lift ${
              isVisible ? "animate-fade-in-right" : "opacity-0"
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-terracotta/10 text-terracotta">
                <GraduationCap size={24} />
              </div>
              <h3 className="font-serif text-2xl text-foreground">Formação</h3>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="group relative pl-6 border-l-2 border-terracotta/30 hover:border-terracotta transition-colors duration-300"
                >
                  <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-background border-2 border-terracotta/30 group-hover:border-terracotta group-hover:bg-terracotta/20 transition-all duration-300" />
                  <span className="text-sm text-terracotta font-medium">
                    {edu.period}
                  </span>
                  <h4 className="font-medium text-foreground mt-1">
                    {edu.degree}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {edu.institution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`self-start p-8 rounded-3xl bg-background border border-border hover:border-amber/30 transition-all duration-500 hover-lift ${
              isVisible ? "animate-fade-in-left" : "opacity-0"
            }`}
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-amber/10 text-amber">
                <Award size={24} />
              </div>
              <h3 className="font-serif text-2xl text-foreground">
                Certificações
              </h3>
            </div>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 p-3 rounded-xl hover:bg-amber/5 transition-all duration-300 cursor-default"
                >
                  <ChevronRight
                    size={16}
                    className="text-amber group-hover:translate-x-1 transition-transform duration-300"
                  />
                  <span className="text-foreground">{cert}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`self-start p-8 rounded-3xl bg-background border border-border hover:border-sage/30 transition-all duration-500 hover-lift ${
              isVisible ? "animate-fade-in-right" : "opacity-0"
            }`}
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-sage/10 text-sage">
                <Heart size={24} />
              </div>
              <h3 className="font-serif text-2xl text-foreground">
                Interesses
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest, index) => {
                const colorClasses = {
                  sage: "bg-sage/10 text-sage hover:bg-sage/20 border-sage/20",
                  terracotta:
                    "bg-terracotta/10 text-terracotta hover:bg-terracotta/20 border-terracotta/20",
                  amber:
                    "bg-amber/10 text-amber hover:bg-amber/20 border-amber/20",
                  stone:
                    "bg-stone/10 text-stone hover:bg-stone/20 border-stone/20",
                };
                return (
                  <span
                    key={interest.name}
                    className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 cursor-default hover:scale-105 ${
                      colorClasses[interest.color as keyof typeof colorClasses]
                    } ${isVisible ? "animate-scale-in" : "opacity-0"}`}
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    {interest.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

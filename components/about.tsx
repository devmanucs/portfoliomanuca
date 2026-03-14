"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Code2, Download, Palette, Sparkles } from "lucide-react";
import Image from "next/image";

const skills = [
  {
    icon: Code2,
    title: "Desenvolvimento Front-end",
    description:
      "Código limpo, performático e seguindo as melhores práticas do mercado.",
    color: "sage",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Interfaces intuitivas e visualmente atraentes com foco na experiência do usuário.",
    color: "terracotta",
  },
  {
    icon: Sparkles,
    title: "Atenção aos Detalhes",
    description:
      "Cada pixel importa. Entrego produtos bem acabados e faceis de manter.",
    color: "amber",
  },
];

export function About() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();
  const { ref: imageRef, isVisible: imageVisible } =
    useScrollAnimation<HTMLDivElement>();
  const { ref: contentRef, isVisible: contentVisible } =
    useScrollAnimation<HTMLDivElement>();

  return (
    <section
      id="sobre"
      className="py-32 px-6 relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-sage/5 to-transparent -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div
            ref={imageRef}
            className={`relative transition-all duration-1000 ${
              imageVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-muted relative group">
              <Image
                src="/assets/eu.jpg"
                alt="Foto de perfil"
                width={600}
                height={600}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-linear-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-sage/20 -z-10 animate-float" />
            <div
              className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl bg-terracotta/10 -z-10 animate-float"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <div
            ref={contentRef}
            className={`transition-all duration-1000 delay-200 ${
              contentVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <span className="text-sm uppercase tracking-widest text-sage mb-4 block">
              Sobre mim
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground mb-6 text-balance">
              Entusiasta por design e{" "}
              <span className="gradient-text">tecnologia</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Sou desenvolvedora front-end apaixonada por design e tecnologia.
              Adoro criar interfaces que cativam usuários, resolvem problemas e
              entregam resultados reais. Meu foco é sempre proporcionar a melhor
              experiência possível para quem usa minhas criações.
            </p>

            <a
              href="/assets/curriculo-manuella-front.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 mb-10 rounded-full border border-border text-foreground hover:bg-sage/10 hover:border-sage/50 transition-all duration-300 group"
            >
              <Download size={18} className="group-hover:animate-bounce" />
              Download CV
            </a>

            <div className="grid gap-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                const colorClasses = {
                  sage: "bg-sage/10 text-sage",
                  terracotta: "bg-terracotta/10 text-terracotta",
                  amber: "bg-amber/10 text-amber",
                };
                return (
                  <div
                    key={skill.title}
                    className={`flex items-start gap-4 p-4 rounded-2xl hover:bg-card hover:shadow-lg transition-all duration-300 group cursor-default ${
                      contentVisible ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${(index + 1) * 0.15}s` }}
                  >
                    <div
                      className={`p-3 rounded-xl ${colorClasses[skill.color as keyof typeof colorClasses]} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1 group-hover:text-sage transition-colors">
                        {skill.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

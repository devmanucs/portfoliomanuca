"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Code2, Download, Palette, Sparkles } from "lucide-react";
import Image from "next/image";

const skills = [
  {
    icon: Code2,
    title: "desenvolvimento front-end",
    description:
      "código limpo, performático e seguindo as melhores práticas do mercado.",
    color: "sage",
  },
  {
    icon: Palette,
    title: "ui/ux design",
    description:
      "interfaces intuitivas e visualmente atraentes com foco na experiência do usuário.",
    color: "terracotta",
  },
  {
    icon: Sparkles,
    title: "atenção aos detalhes",
    description:
      "cada pixel importa. Entrego produtos bem acabados e fáceis de manter.",
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
      className="relative px-6 py-28 text-left"
      ref={sectionRef}
    >
      <div className="absolute top-0 right-0 -z-10 h-full w-1/2 bg-linear-to-l from-sage/5 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div
            ref={imageRef}
            className={`relative transition-all duration-1000 ${
              imageVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="group relative aspect-square overflow-hidden rounded-3xl bg-muted">
              <Image
                src="/assets/eu.jpg"
                alt="Foto de perfil"
                width={600}
                height={600}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-foreground/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            <div className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 animate-float rounded-2xl bg-sage/20" />
            <div
              className="absolute -top-6 -left-6 -z-10 h-24 w-24 animate-float rounded-2xl bg-terracotta/10"
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
            <p className="mb-3 text-xs uppercase tracking-widest text-sage">
              sobre
            </p>
            <h2 className="mb-6 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              entusiasta por design e{" "}
              <span className="gradient-text">tecnologia</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              sou desenvolvedora front-end e designer ui/ux. Trabalho do
              entendimento do problema até a entrega — seja prototipando fluxos
              no Figma ou implementando interfaces em React. Meu foco é mostrar
              não só o que foi feito, mas por que foi feito e qual resultado
              gerou.
            </p>

            <a
              href="/assets/Curriculo_Manuella_Carvalho.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-10 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-foreground transition-all duration-300 hover:border-sage/50 hover:bg-sage/10"
            >
              <Download size={18} className="group-hover:animate-bounce" />
              download cv
            </a>

            <div className="grid gap-6">
              {skills.map((skill, index) => {
                return (
                  <div
                    key={skill.title}
                    className={`group flex cursor-default items-start gap-4 rounded-2xl p-4 transition-all duration-300 hover:bg-card hover:shadow-lg ${
                      contentVisible ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${(index + 1) * 0.15}s` }}
                  >
                    <div>
                      <h3 className="mb-1 font-medium text-foreground transition-colors group-hover:text-sage">
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

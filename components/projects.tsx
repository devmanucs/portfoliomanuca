"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { projects } from "@/lib/projects-data";
import { ArrowUpRight, ExternalLink, Figma, Github } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
const categories = [
  "Todos",
  ...new Set(projects.map((project) => project.category)),
];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const router = useRouter();
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();
  const { ref: gridRef, isVisible: gridVisible } =
    useScrollAnimation<HTMLDivElement>();
  const filteredProjects =
    activeCategory === "Todos"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projetos" className="py-32 px-6 relative" ref={sectionRef}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-linear-to-tr from-sage/5 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-sm uppercase tracking-widest text-sage mb-4 block">
            Portfólio
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground mb-6 text-balance">
            Projetos em <span className="gradient-text">destaque</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Uma seleção dos meus trabalhos mais recentes. Cada projeto é uma
            oportunidade de criar algo especial.
          </p>
        </div>

        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === category
                  ? "bg-sage text-background"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-sage/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.slug}
              className={`group relative rounded-3xl overflow-hidden bg-card border border-border transition-all duration-500 hover-lift ${
                project.featured && index === 0 ? "md:col-span-2" : ""
              } ${gridVisible ? "animate-scale-in" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.15}s` }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => router.push(`/projetos/${project.slug}`)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  router.push(`/projetos/${project.slug}`);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Abrir detalhes de ${project.title}`}
            >
              <div
                className={`relative overflow-hidden ${
                  project.featured && index === 0
                    ? "aspect-2/1"
                    : "aspect-video"
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1200}
                  height={600}
                  className="object- w-full h-full transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div
                  className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-500 ${
                    hoveredProject === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="p-4 rounded-full bg-background text-foreground hover:bg-sage hover:text-background transition-all duration-300 hover:scale-110"
                      aria-label="Ver projeto ao vivo"
                    >
                      <ExternalLink size={24} />
                    </a>
                  ) : null}
                  {project.figmaUrl ? (
                    <a
                      href={project.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="p-4 rounded-full bg-background text-foreground hover:bg-sage hover:text-background transition-all duration-300 hover:scale-110"
                      aria-label="Ver projeto no Figma"
                    >
                      <Figma size={24} />
                    </a>
                  ) : project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="p-4 rounded-full bg-background text-foreground hover:bg-sage hover:text-background transition-all duration-300 hover:scale-110"
                      aria-label="Ver codigo no GitHub"
                    >
                      <Github size={24} />
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-serif text-2xl text-foreground group-hover:text-sage transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight
                    size={20}
                    className="text-muted-foreground group-hover:text-sage group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                  />
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-sage/10 text-sage border border-sage/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-16 text-center transition-all duration-700 delay-500 ${
            gridVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-muted-foreground mb-6">
            Quer ver mais projetos ou colaborar comigo?
          </p>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1 transition-all duration-300"
          >
            Vamos conversar
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

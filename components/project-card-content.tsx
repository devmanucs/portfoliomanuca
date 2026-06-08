"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { focusLabels, type Project } from "@/lib/projects-data";
import { ArrowUpRight, Figma, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProjectCardContentProps = {
  project: Project;
};

export function ProjectCardContent({ project }: ProjectCardContentProps) {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-4 text-xs text-muted-foreground">galeria</p>
        <Carousel opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {project.images.map((image, index) => (
              <CarouselItem key={`${project.slug}-${index}`}>
                <div className="overflow-hidden rounded-2xl border border-border bg-background/60 p-2">
                  <Image
                    src={image}
                    alt={`${project.title} — ${index + 1}`}
                    width={1200}
                    height={700}
                    className="h-auto w-full rounded-xl object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-terracotta/20 bg-terracotta/10 px-3 py-1 text-xs text-terracotta">
          {focusLabels[project.focus]}
        </span>
        <span className="rounded-full border border-sage/20 bg-sage/10 px-3 py-1 text-xs text-sage">
          {project.category.toLowerCase()}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
        {project.description.toLowerCase()}
      </p>

      <p className="rounded-2xl border border-sage/20 bg-sage/5 p-4 text-sm leading-relaxed text-sage">
        {project.impact.toLowerCase()}
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-muted/30 p-5">
          <h4 className="mb-2 text-sm font-medium text-foreground">
            problema
          </h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.problem.toLowerCase()}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-muted/30 p-5">
          <h4 className="mb-2 text-sm font-medium text-foreground">
            resultado
          </h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.result.toLowerCase()}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-sage/20 bg-sage/10 px-3 py-1 text-xs text-sage"
          >
            {tag.toLowerCase()}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProjectModalActions({ project }: ProjectCardContentProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={`/projetos/${project.slug}`}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg"
      >
        ver case completo
        <ArrowUpRight size={16} />
      </Link>

      {project.figmaUrl ? (
        <a
          href={project.figmaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground transition-all hover:border-sage/50 hover:text-sage"
        >
          abrir no figma
          <Figma size={16} />
        </a>
      ) : null}

      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground transition-all hover:border-sage/50 hover:text-sage"
        >
          ver código
          <Github size={16} />
        </a>
      ) : null}
    </div>
  );
}

"use client";

import { focusLabels, type Project, type ProjectFocus } from "../data/projects-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Code2, Layers, Palette, Sparkles, type LucideIcon } from "lucide-react";
import Image from "next/image";

const focusIcons: Record<ProjectFocus, LucideIcon> = {
  design: Palette,
  development: Code2,
  hybrid: Layers,
};

type ProjectShowcaseCardProps = {
  project: Project;
  index: number;
  onClick: () => void;
};

export function ProjectShowcaseCard({
  project,
  index,
  onClick,
}: ProjectShowcaseCardProps) {
  const FocusIcon = focusIcons[project.focus];

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      onClick={onClick}
      className="group h-full w-full text-left"
    >
      <Card
        className={cn(
          "relative h-full gap-0 overflow-hidden border-border/80 bg-card/90 py-0 shadow-sm backdrop-blur-sm",
          "transition-[transform,box-shadow,border-color,background-color] duration-500 ease-out",
          "group-hover:-translate-y-1 group-hover:border-primary/25 group-hover:bg-card/95",
          "group-hover:shadow-[0_24px_50px_-28px_color-mix(in_oklch,var(--primary)_38%,transparent)]",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0",
            "bg-linear-to-br from-white/12 via-white/4 to-primary/10",
            "ring-1 ring-inset ring-white/10 transition-opacity duration-500 group-hover:opacity-100",
            "dark:from-white/8 dark:via-transparent dark:to-primary/15",
          )}
        />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 -left-1/3 z-20 w-1/2 -skew-x-16 opacity-0",
            "bg-linear-to-r from-transparent via-white/35 to-transparent",
            "dark:via-white/15",
            "group-hover:animate-card-shine group-hover:opacity-100",
          )}
        />

        <CardContent className="relative z-1 flex flex-col gap-4 p-4">
          <div className="relative h-48 w-full overflow-hidden rounded-lg">
            <Image
              src={project.image}
              alt={`Preview do projeto ${project.title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.025]"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <Badge variant="outline">
              <FocusIcon aria-hidden="true" />
              {focusLabels[project.focus]}
            </Badge>
            {project.featured ? (
              <div className="flex items-center gap-1 text-secondary-foreground">
                <Sparkles aria-hidden="true" className="size-3.5" />
                <span className="text-xs font-medium">Destaque</span>
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">
                {project.category.toLowerCase()}
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <h3 className="text-base font-semibold leading-snug text-foreground">
              {project.title}
            </h3>
            <p className="line-clamp-3 text-sm leading-6 text-body">
              {project.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.button>
  );
}

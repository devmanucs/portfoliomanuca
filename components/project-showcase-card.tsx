"use client";

import { focusLabels, type Project } from "@/lib/projects-data";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

type ProjectShowcaseCardProps = {
  project: Project;
  index: number;
  featured?: boolean;
  onClick: () => void;
};

export function ProjectShowcaseCard({
  project,
  index,
  featured = false,
  onClick,
}: ProjectShowcaseCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      onClick={onClick}
      className={cn(
        "group flex shrink-0 snap-center flex-col justify-between rounded-2xl border border-border bg-card p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-sage/40 hover:shadow-md",
        featured ? "min-h-[160px] w-[min(88vw,360px)]" : "min-h-[140px] w-[min(88vw,300px)]",
      )}
    >
      <div>
        <p className="mb-3 text-xs text-muted-foreground">
          {focusLabels[project.focus]} · {project.category.toLowerCase()}
        </p>
        <h3 className="text-base font-medium leading-snug text-foreground md:text-lg">
          {project.title.toLowerCase()}
        </h3>
      </div>

      <ArrowUpRight
        size={16}
        className="mt-6 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sage"
      />
    </motion.button>
  );
}

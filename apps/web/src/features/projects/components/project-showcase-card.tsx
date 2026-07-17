"use client";

import { focusLabels, type Project } from "../data/projects-data";
import { Badge } from "@/components/ui/badge";
import { Frame, FramePanel } from "@/components/ui/frame";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

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
        "group shrink-0 snap-center text-left",
        featured
          ? "w-[min(88vw,27rem)]"
          : "w-[min(84vw,22rem)]",
      )}
    >
      <Frame className="h-full transition-colors group-hover:border-primary/40">
        <FramePanel className="h-56 overflow-hidden p-0">
          <Image
            src={project.image}
            alt={`Preview do projeto ${project.title}`}
            fill
            sizes={featured ? "(max-width: 640px) 88vw, 432px" : "(max-width: 640px) 84vw, 352px"}
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          />
        </FramePanel>

        <FramePanel className="flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="mb-2 text-xs text-muted-foreground">
                {focusLabels[project.focus]} · {project.category.toLowerCase()}
              </p>
              <h3 className="text-lg font-semibold leading-snug text-foreground">
                {project.title}
              </h3>
            </div>
            <ArrowUpRight
              size={18}
              className="mt-1 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
            />
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-body">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 ? (
              <Badge variant="outline">+{project.tags.length - 3}</Badge>
            ) : null}
          </div>
        </FramePanel>
      </Frame>
    </motion.button>
  );
}

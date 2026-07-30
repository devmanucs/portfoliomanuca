"use client";

import {
  ProjectCardContent,
  ProjectModalActions,
} from "./project-card-content";
import { focusLabels, type Project } from "../data/projects-data";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ProjectShowcaseModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectShowcaseModal({
  project,
  onClose,
}: ProjectShowcaseModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          key={project.slug}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`project-modal-${project.slug}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden p-4 sm:p-6"
        >
          <motion.button
            type="button"
            aria-label="Fechar modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 flex max-h-[min(88vh,820px)] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-border-strong bg-card md:max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="shrink-0 border-b border-border px-5 py-5 pr-14 sm:px-8 sm:py-6">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-sage/15 sm:right-5 sm:top-5"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>

              <p className="text-xs text-muted-foreground">
                {focusLabels[project.focus]} · {project.category.toLowerCase()}
              </p>
              <h3
                id={`project-modal-${project.slug}`}
                className="mt-2 text-xl font-medium tracking-tight text-foreground md:text-2xl"
              >
                {project.title.toLowerCase()}
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8">
              <ProjectCardContent project={project} />
            </div>

            <div className="shrink-0 border-t border-border bg-card px-5 py-4 sm:px-8 sm:py-5">
              <ProjectModalActions project={project} />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

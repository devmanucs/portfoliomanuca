"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <AuroraBackground className="min-h-screen bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-6 pb-16 pt-28"
      >
        <h1 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">
          Manuella Carvalho
        </h1>

        <p className="mt-4 text-lg text-foreground md:text-xl">
          Front-end Developer & UI/UX Designer
        </p>

        <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          Desenvolvimento web e design de interfaces com foco em experiência do
          usuário.
        </p>

        <div className="mt-12 flex items-center gap-5 text-muted-foreground">
          <a
            href="https://github.com/devmanucs"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/manuella-carvalho-7663352b0"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:manuhcsantos@gmail.com"
            className="transition-colors hover:text-foreground"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  PulsingCircle,
  ShaderBackground,
} from "@/components/ui/shaders-hero-section";
import { useTypewriterLoop } from "@/hooks/use-typewriter-loop";
import type { IProfile } from "@portfoliomanuca/types";
import { motion, useReducedMotion } from "motion/react";

type HeroProps = {
  profile: IProfile;
};

export function Hero({ profile }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const whoamiCommand = `whoami --name "${profile.fullName}" --stack front-end,ui-ux`;
  const typedCommand = useTypewriterLoop(whoamiCommand, {
    enabled: !shouldReduceMotion,
  });

  return (
    <section id="inicio">
      <ShaderBackground>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="content-container relative z-20 flex min-h-svh items-end pb-28 pt-32 sm:pb-32 lg:pb-24"
        >
          <div className="w-full max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-white/70">
              <span>&gt;</span>
              <span>{typedCommand}</span>
              <span
                className="inline-block h-3 w-[2px] shrink-0 bg-white/70 motion-safe:animate-pulse"
                aria-hidden
              />
            </p>

            <h1 className="max-w-2xl text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.96] tracking-[-0.035em] text-white">
              hello World! manuca here.
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" variant="secondary" radius="pill">
                <a href="#projetos">ver projetos</a>
              </Button>

              <Button asChild size="lg" variant="secondary" radius="pill">
                <a href="#contato">vamos conversar</a>
              </Button>
            </div>
          </div>
        </motion.div>

        <PulsingCircle />

        {/* <div
          className="pointer-events-none absolute inset-x-0 bottom-20 z-10 h-56 bg-[linear-gradient(to_bottom,transparent_0%,color-mix(in_oklch,var(--canvas-soft)_18%,transparent)_45%,color-mix(in_oklch,var(--canvas-soft)_42%,transparent)_100%)] md:bottom-28"
          aria-hidden
        /> */}

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 overflow-hidden text-canvas-soft md:h-28"
          aria-hidden
        >
          <svg
            className="h-full w-[200%] motion-safe:animate-[marquee_46s_linear_infinite]"
            viewBox="0 0 2880 100"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,55 C240,80 480,30 720,55 C960,80 1200,30 1440,55 C1680,80 1920,30 2160,55 C2400,80 2640,30 2880,55 L2880,100 L0,100 Z"
            />
          </svg>
        </div>
      </ShaderBackground>
    </section>
  );
}

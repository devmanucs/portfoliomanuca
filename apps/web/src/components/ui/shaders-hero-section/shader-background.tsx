"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type ShaderBackgroundProps = {
  children: ReactNode;
};

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-[125svh] w-full overflow-hidden bg-[#120d0b] text-white">
      <MeshGradient
        className="absolute inset-0 size-full"
        colors={["#120d0b", "#3a241b", "#72503e", "#b8b4ae", "#241713"]}
        distortion={0.76}
        swirl={0.12}
        grainMixer={0.16}
        grainOverlay={0.1}
        speed={shouldReduceMotion ? 0 : 0.18}
        fit="cover"
        minPixelRatio={1}
        maxPixelCount={1920 * 1080}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 bg-black/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_78%_at_12%_92%,rgba(18,10,7,0.82)_0%,rgba(18,10,7,0.38)_48%,transparent_78%)]"
        aria-hidden
      />

      {children}
    </div>
  );
}

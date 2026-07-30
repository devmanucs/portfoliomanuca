"use client";

import { PulsingBorder } from "@paper-design/shaders-react";
import { motion, useReducedMotion } from "motion/react";

export function PulsingCircle() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="absolute bottom-20 right-5 z-20 hidden size-20 items-center justify-center sm:flex lg:bottom-70 lg:right-9"
      aria-hidden
    >
      <PulsingBorder
        colors={["#d8d5cf", "#a8a39d", "#b58a6a", "#76503d", "#ffffff"]}
        colorBack="#00000000"
        speed={shouldReduceMotion ? 0 : 0.7}
        roundness={1}
        thickness={0.08}
        softness={0.24}
        intensity={4}
        spots={5}
        spotSize={0.12}
        pulse={0.18}
        smoke={0.45}
        smokeSize={3}
        scale={0.7}
        width={60}
        height={60}
        minPixelRatio={1}
        style={{ borderRadius: "50%" }}
      />

      <motion.svg
        className="absolute inset-0 size-full overflow-visible"
        viewBox="0 0 100 100"
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path
            id="portfolio-orbit"
            d="M 50,50 m -39,0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0"
          />
        </defs>
        <text className="fill-white/80 text-[8px] font-medium tracking-[0.13em]">
          <textPath href="#portfolio-orbit">
            MANUCADEV • FRONT-END &amp; UI/UX •
          </textPath>
        </text>
      </motion.svg>
    </div>
  );
}

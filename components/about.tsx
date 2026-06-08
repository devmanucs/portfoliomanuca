"use client";

import { AboutTerminal } from "@/components/about-terminal";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Download } from "lucide-react";

export function About() {
  const { ref: sectionRef } = useScrollAnimation<HTMLElement>();
  const { ref: terminalRef, isVisible: terminalVisible } =
    useScrollAnimation<HTMLDivElement>();
  const { ref: contentRef, isVisible: contentVisible } =
    useScrollAnimation<HTMLDivElement>();

  return (
    <section
      id="sobre"
      className="relative px-6 py-20 text-left md:py-24"
      ref={sectionRef}
    >
      <div className="absolute top-0 right-0 -z-10 h-full w-1/2 bg-linear-to-l from-sage/5 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-14">
          <div
            ref={terminalRef}
            className={`relative transition-all duration-1000 ${
              terminalVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div
              className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-linear-to-br from-sage/30 via-transparent to-terracotta/20 blur-2xl"
              aria-hidden
            />

            <AboutTerminal />

            <div className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 animate-float rounded-2xl bg-sage/25 blur-sm" />
            <div
              className="absolute -top-6 -left-6 -z-10 h-24 w-24 animate-float rounded-2xl bg-terracotta/15 blur-sm"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <div
            ref={contentRef}
            className={`transition-all duration-1000 delay-200 ${
              contentVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <p className="mb-3 text-xs uppercase tracking-widest text-sage">
              sobre
            </p>
            <h2 className="mb-8 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              entusiasta por design e{" "}
              <span className="gradient-text">tecnologia</span>
            </h2>

            <a
              href="/assets/Curriculo_Manuella_Carvalho.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-foreground transition-all duration-300 hover:border-sage/50 hover:bg-sage/10"
            >
              <Download size={18} className="group-hover:animate-bounce" />
              download cv
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

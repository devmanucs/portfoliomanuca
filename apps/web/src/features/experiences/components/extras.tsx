"use client";

import { Badge } from "@/components/ui/badge";
import { Frame, FramePanel } from "@/components/ui/frame";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import type { LandingEducation, LandingExperience } from "@/lib/content";
import { cn } from "@/lib/utils";
import { BriefcaseIcon, GraduationCapIcon } from "lucide-react";

type ExtrasProps = {
  experiences: LandingExperience[];
  education: LandingEducation[];
  interests: string[];
};

export function Extras({ experiences, education, interests }: ExtrasProps) {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="experiencias"
      className="section-band relative bg-accent/45 text-left"
      ref={sectionRef}
    >
      <div className="content-container">
        <div
          className={`mb-10 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="display-lg flex items-center gap-2">
            Experiência e formação
          </h2>
        </div>

        <div
          className={`grid gap-12 md:grid-cols-[minmax(0,1.35fr)_minmax(17rem,0.65fr)] md:gap-16 transition-all duration-500 delay-75 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-sm font-medium text-foreground">
              <BriefcaseIcon className="size-5" />
            </h3>
            <ol aria-label="Linha do tempo profissional">
              {experiences.map((exp, index) => {
                const isCurrent = index === 0;
                const showCurrentBadge =
                  isCurrent && !exp.period.toLowerCase().includes("atual");
                return (
                  <li
                    key={`${exp.role}-${exp.company}`}
                    className={cn(
                      "grid grid-cols-[0.875rem_1fr] gap-4 pb-9 opacity-0 last:pb-0",
                      isVisible && "animate-fade-in-up",
                    )}
                    style={{
                      animationDelay: isVisible ? `${150 + index * 90}ms` : undefined,
                      animationFillMode: "both",
                    }}
                  >
                    <div className="relative flex justify-center">
                      <span
                        className={cn(
                          "relative z-10 mt-1.5 size-3 rounded-full",
                          isCurrent
                            ? "animate-pulse bg-success ring-4 ring-success/20"
                            : "border-2 border-primary/45 bg-transparent ring-4 ring-accent",
                        )}
                        aria-hidden
                      />
                      {index < experiences.length - 1 ? (
                        <span
                          className="absolute bottom-[-2.25rem] top-4 w-px bg-border-soft"
                          aria-hidden
                        />
                      ) : null}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-mono text-xs font-medium text-primary">
                          {exp.period}
                        </p>
                        {showCurrentBadge ? (
                          <Badge className="border-success/25 bg-success/15 text-success">
                            Atual
                          </Badge>
                        ) : null}
                      </div>
                      <h4 className="mt-2 font-heading text-xl leading-tight text-foreground">
                        {exp.role}
                      </h4>
                      <p className="mt-1 text-sm font-medium text-muted-foreground">
                        {exp.company}
                      </p>
                      <p className="mt-3 max-w-[65ch] text-sm leading-6 text-body">
                        {exp.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <h3 className="mb-6 flex items-center gap-2 text-sm font-medium text-foreground">
                <GraduationCapIcon className="size-5" />
              </h3>
              <div className="flex flex-col gap-4">
                {education.map((edu) => (
                  <Frame
                    key={`${edu.degree}-${edu.institution}`}
                    className="transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/25"
                  >
                    <FramePanel>
                      <p className="caption-uppercase text-primary">
                        {edu.period}
                      </p>
                      <p className="mt-3 text-base font-semibold text-foreground">
                        {edu.degree}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {edu.institution}
                      </p>
                    </FramePanel>
                  </Frame>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

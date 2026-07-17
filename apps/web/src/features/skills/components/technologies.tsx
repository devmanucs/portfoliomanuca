"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Frame, FramePanel } from "@/components/ui/frame";
import type { ISkill } from "@portfoliomanuca/types";
import type { IconType } from "react-icons";
import {
  SiCss,
  SiFigma,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const iconMap: Record<string, IconType> = {
  react: SiReact,
  "next.js": SiNextdotjs,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  "tailwind css": SiTailwindcss,
  tailwind: SiTailwindcss,
  figma: SiFigma,
  javascript: SiJavascript,
  html: SiHtml5,
  css: SiCss,
};

const defaultTechnologies = [
  { name: "react", icon: SiReact, color: "currentColor" },
  {
    name: "next.js",
    icon: SiNextdotjs,
    color: "currentColor",
    iconClassName: "text-foreground",
  },
  { name: "typescript", icon: SiTypescript, color: "currentColor" },
  { name: "tailwind css", icon: SiTailwindcss, color: "currentColor" },
  { name: "figma", icon: SiFigma, color: "currentColor" },
  { name: "javascript", icon: SiJavascript, color: "currentColor" },
  { name: "html", icon: SiHtml5, color: "currentColor" },
  { name: "css", icon: SiCss, color: "currentColor" },
];

type TechnologiesProps = {
  skills?: ISkill[];
  additionalSkills?: string[];
  activitySlot?: React.ReactNode;
};

export function Technologies({
  skills = [],
  additionalSkills = [],
  activitySlot,
}: TechnologiesProps) {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();

  const primarySkills =
    skills.length > 0
      ? skills
          .filter((skill) => skill.iconKey || iconMap[skill.name.toLowerCase()])
          .map((skill) => {
            const key = (skill.iconKey ?? skill.name).toLowerCase();
            const Icon = iconMap[key] ?? SiReact;
            return {
              name: skill.name.toLowerCase(),
              icon: Icon,
              color: skill.color ?? "currentColor",
            };
          })
      : defaultTechnologies;

  const extras =
    additionalSkills.length > 0
      ? additionalSkills
      : skills
          .filter(
            (skill) =>
              !skill.iconKey && !iconMap[skill.name.toLowerCase()],
          )
          .map((skill) => skill.name.toLowerCase());

  return (
    <section
      id="stacks"
      className="section-band relative bg-background text-left"
      ref={sectionRef}
    >
      <div className="content-container">
        <div
          className={`mb-10 text-left transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="display-lg">
            Stacks
          </h2>

          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            tecnologias que utilizo no dia a dia.
          </p>
        </div>

        <Frame
          className={`mb-12 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 md:grid-cols-4 transition-all duration-500 delay-75 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <FramePanel className="col-span-full grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 md:grid-cols-4">
            {primarySkills.map((tech) => {
              const Icon = tech.icon;

              return (
                <div
                  key={tech.name}
                  className="flex items-center gap-3 text-foreground"
                >
                  <Icon size={18} aria-hidden />
                  <span className="text-sm">{tech.name}</span>
                </div>
              );
            })}
          </FramePanel>
        </Frame>

        {extras.length > 0 ? (
          <div
            className={`transition-all duration-500 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h3 className="mb-4 text-sm font-medium text-foreground">
              habilidades adicionais
            </h3>

            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {extras.join(" · ")}
            </p>
          </div>
        ) : null}

        {activitySlot ? (
          <div
            className={`mt-12 transition-all duration-500 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {activitySlot}
          </div>
        ) : null}
      </div>
    </section>
  );
}

"use client";

import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { SECTION_IDS } from "../constants";

const SECTION_LABELS: Record<string, string> = {
  inicio: "início",
  sobre: "sobre",
  stacks: "stacks",
  projetos: "projetos",
  experiencias: "experiências",
  contato: "contato",
};

export function ScrollProgressRail() {
  const activeSection = useActiveSection([...SECTION_IDS]);

  return (
    <div
      className="group fixed right-5 top-1/2 z-40 mix-blend-difference hidden -translate-y-1/2 lg:block"
    >
      <nav aria-label="Progresso da página" className="py-2">
        <ul className="flex flex-col items-end gap-1.5 px-2.5">
          {SECTION_IDS.map((id) => {
            const isActive = id === activeSection;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "location" : undefined}
                  className="flex items-center justify-end gap-2 py-0.5"
                >
                  <span
                    className={cn(
                      "max-w-0 overflow-hidden whitespace-nowrap font-mono text-xs opacity-0 transition-all duration-300 ease-out group-hover:max-w-[8rem] group-hover:opacity-100",
                      isActive ? "text-white" : "text-white/60",
                    )}
                  >
                    {SECTION_LABELS[id]}
                  </span>
                  <span
                    className={cn(
                      "block h-px shrink-0 bg-white transition-all duration-300",
                      isActive ? "w-6" : "w-3 opacity-50",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

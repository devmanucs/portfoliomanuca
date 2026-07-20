import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  muted?: boolean;
};

export function Section({ id, children, className, muted }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative px-6 py-20 text-left md:py-24",
        muted && "bg-card/30",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

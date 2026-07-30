"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-background text-foreground",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute inset-[40%] animate-aurora opacity-70 blur-[80px]",
            "[background-image:linear-gradient(120deg,rgba(107,158,122,0.55),rgba(201,166,107,0.45),rgba(184,122,90,0.5),rgba(107,158,122,0.4))]",
            "[background-size:400%_400%]",
          )}
        />
        <div
          className={cn(
            "absolute -inset-[30%] animate-aurora opacity-50 blur-[100px]",
            "[background-image:linear-gradient(200deg,rgba(107,158,122,0.35),rgba(201,166,107,0.25),rgba(184,122,90,0.35))]",
            "[background-size:300%_300%]",
            "[animation-delay:-20s]",
          )}
        />
        {showRadialGradient ? (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,transparent_0%,var(--background)_75%)]" />
        ) : null}
      </div>
      {children}
    </div>
  );
};

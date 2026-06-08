"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const FloatingNav = ({
  navItems,
  className,
  leftSlot,
  rightSlot,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-4xl items-center justify-between gap-4 rounded-full border border-border bg-background/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:px-6 sm:py-3.5",
        className,
      )}
    >
      {leftSlot ? <div className="shrink-0">{leftSlot}</div> : <div className="w-9" />}

      <div className="flex flex-1 items-center justify-center gap-1 sm:gap-2 md:gap-6">
        {navItems.map((navItem, idx) => (
          <a
            key={`nav-${idx}`}
            href={navItem.link}
            className="flex items-center gap-2 rounded-full px-2 py-2 text-muted-foreground transition-colors hover:bg-sage/10 hover:text-foreground sm:px-3"
          >
            <span className="flex h-5 w-5 items-center justify-center md:hidden">
              {navItem.icon}
            </span>
            <span className="hidden text-sm font-medium md:inline md:text-base">
              {navItem.name}
            </span>
          </a>
        ))}
      </div>

      {rightSlot ? <div className="shrink-0">{rightSlot}</div> : <div className="w-9" />}
    </motion.nav>
  );
};

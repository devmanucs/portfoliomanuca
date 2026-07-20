"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const FloatingNav = ({
  navItems,
  className,
  leftSlot,
  rightSlot,
  activeLink,
  overlay = false,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  activeLink?: string;
  overlay?: boolean;
}) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-3 z-50 mx-auto flex min-h-14 w-[calc(100%-1rem)] items-center justify-between gap-1.5 p-1.5 transition-[background-color,border-color,border-radius,max-width] duration-300 sm:top-4 sm:w-[calc(100%-2rem)] sm:gap-3",
        overlay
          ? "max-w-none rounded-none border border-transparent bg-transparent sm:px-5"
          : "max-w-5xl rounded-xl border border-border bg-background/95",
        className,
      )}
    >
      {leftSlot ? <div className="shrink-0">{leftSlot}</div> : <div className="w-9" />}

      <div className="flex flex-1 items-center justify-center gap-0.5 sm:gap-1">
        {navItems.map((navItem) => (
          <a
            key={navItem.link}
            href={navItem.link}
            aria-current={activeLink === navItem.link ? "location" : undefined}
            className={cn(
              "flex min-h-9 items-center gap-1.5 rounded-md px-2 text-sm font-medium transition-colors sm:px-3",
              overlay
                ? "text-white/70 hover:bg-white/10 hover:text-white"
                : "text-muted-foreground hover:bg-background hover:text-foreground",
              activeLink === navItem.link && overlay && "text-white",
              activeLink === navItem.link &&
                !overlay &&
                "bg-primary text-primary-foreground hover:bg-primary-active hover:text-primary-foreground",
            )}
          >
            <span className="flex size-5 items-center justify-center md:hidden">
              {navItem.icon}
            </span>
            <span className="hidden md:inline">
              {navItem.name}
            </span>
          </a>
        ))}
      </div>

      {rightSlot ? <div className="shrink-0">{rightSlot}</div> : <div className="w-9" />}
    </motion.nav>
  );
};

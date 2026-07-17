"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { SVGProps } from "react";

export const StickyBanner = ({
  className,
  children,
  onClose,
}: {
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
}) => {
  return (
    <motion.div
      className={cn(
        "flex w-full items-center justify-center",
        className,
      )}
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -48, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}

      {onClose ? (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1.5 transition-colors hover:bg-white/15"
          onClick={onClose}
          aria-label="Fechar banner"
        >
          <CloseIcon className="h-4 w-4 text-white" />
        </button>
      ) : null}
    </motion.div>
  );
};

const CloseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};

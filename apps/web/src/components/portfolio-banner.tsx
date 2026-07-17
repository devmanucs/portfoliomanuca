"use client";

import { StickyBanner } from "@/components/ui/sticky-banner";

type PortfolioBannerProps = {
  onClose?: () => void;
};

export function PortfolioBanner({ onClose }: PortfolioBannerProps) {
  return (
    <StickyBanner
      onClose={onClose}
      className="fixed top-0 z-60 min-h-12 bg-linear-to-r from-sage to-terracotta/90 px-6 py-2.5"
    >
      <p className="mx-auto max-w-3xl text-center text-sm text-white drop-shadow-sm md:text-base">
        Disponível para projetos de front-end e UI/UX.{" "}
        <a
          href="#contato"
          className="font-semibold underline-offset-2 transition duration-200 hover:underline"
        >
          Entre em contato
        </a>
      </p>
    </StickyBanner>
  );
}

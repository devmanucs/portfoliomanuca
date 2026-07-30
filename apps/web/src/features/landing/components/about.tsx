"use client";

import { AboutTerminal } from "./about-terminal";
import { Button } from "@/components/ui/button";
import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame";
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
      className="section-band relative bg-canvas-soft text-left"
      ref={sectionRef}
    >
      <div className="content-container">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-14">
          <div
            ref={terminalRef}
            className={`relative transition-transform duration-500 ${
              terminalVisible ? "translate-x-0" : "-translate-x-2"
            }`}
          >
            <Frame>
              <FramePanel className="overflow-hidden bg-canvas-soft p-0">
                <AboutTerminal />
              </FramePanel>
            </Frame>
          </div>

          <div
            ref={contentRef}
            className={`transition-transform duration-500 ${
              contentVisible ? "translate-x-0" : "translate-x-2"
            }`}
          >
            <p className="mb-5 text-sm text-muted-foreground">
              Design que chega ao código
            </p>
            <h2 className="display-lg mb-8 max-w-lg">
              Do problema à interface, com intenção em cada decisão.
            </h2>

            <Button asChild variant="outline" size="lg" radius="pill">
              <a
                href="/assets/Curriculo_Manuella_Carvalho.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download data-icon="inline-start" />
                Download do currículo
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import type { IProfile } from "@portfoliomanuca/types";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#inicio", label: "início" },
  { href: "#sobre", label: "sobre" },
  { href: "#stacks", label: "stacks" },
  { href: "#projetos", label: "projetos" },
  { href: "#contato", label: "contato" },
];

const whatsappLink =
  "https://wa.me/5599985110790?text=Oi%2C%20vim%20pelo%20seu%20portf%C3%B3lio%20e%20queria%20conversar!";

type FooterProps = {
  profile: IProfile;
};

export function Footer({ profile }: FooterProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      id="contato"
      className="relative bg-background px-6 py-20 text-left md:py-24"
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-40 flex size-10 items-center justify-center rounded-full border border-border-soft bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-primary ${
          showScrollTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-label="Voltar ao topo"
      >
        <ArrowUp size={16} />
      </button>

      <div className="mx-auto max-w-6xl">
        <div className="max-w-lg">
          <p className="mb-3 text-xs uppercase tracking-widest text-sage">
            contato
          </p>
          <h2 className="mb-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            fale comigo
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            aberta a projetos, colaborações e oportunidades.
          </p>

          <div className="space-y-4 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-foreground transition-colors hover:text-sage"
            >
              <Mail size={16} className="text-sage" />
              {profile.email}
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-foreground underline-offset-4 transition-colors hover:text-sage hover:underline"
            >
              WhatsApp
            </a>
            {profile.location ? (
              <p className="text-muted-foreground">{profile.location}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-sage"
            >
              {link.label}
            </a>
          ))}
          {profile.github ? (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-sage"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
          ) : null}
          {profile.linkedin ? (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-sage"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
          ) : null}
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.fullName}
          </p>
        </div>
      </div>
    </footer>
  );
}

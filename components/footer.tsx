"use client";

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#tecnologias", label: "Tecnologias" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-16 px-6 border-t border-border bg-card relative">
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-sage text-background shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-40 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Voltar ao topo"
      >
        <ArrowUp size={20} />
      </button>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <a
            href="#"
            className="font-serif text-2xl tracking-tight text-foreground hover:text-sage transition-colors duration-300"
          >
            {mounted && (
              <Image
                src={
                  theme === "dark"
                    ? "/logo-primary-dark.svg"
                    : "/logo-primary-light.svg"
                }
                alt="Logo"
                width={30}
                height={30}
              />
            )}
          </a>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors duration-300 relative animate-line"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/devmanucs"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-sage/10 transition-all duration-300"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/manuella-carvalho-7663352b0"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-sage/10 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:manuhcsantos@gmail.com"
              className="p-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-sage/10 transition-all duration-300"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            Desenvolvido com Next.js, Tailwind CSS e shadcn/ui
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

export function Contact() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();
  const whatsappLink =
    "https://wa.me/5599985110790?text=Oi%2C%20vim%20pelo%20seu%20portf%C3%B3lio%20e%20queria%20conversar!";

  return (
    <section
      id="contato"
      className="py-32 px-6 relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute top-0 left-0 w-1/2 h-full bg-linear-to-r from-sage/5 to-transparent -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <span className="text-sm uppercase tracking-widest text-sage mb-4 block">
              Contato
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground mb-6 text-balance">
              Vamos criar algo <span className="gradient-text">incrível</span>{" "}
              juntos?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Estou sempre aberto a novos projetos e oportunidades. Entre em
              contato e vamos conversar sobre como posso ajudar a transformar
              sua ideia em realidade.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:manuhcsantos@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-card transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-sage/10 text-sage group-hover:scale-110 transition-transform duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground group-hover:text-sage transition-colors">
                    manuhcsantos@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl">
                <div className="p-3 rounded-xl bg-terracotta/10 text-terracotta">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Localização</p>
                  <p className="text-foreground">
                    Imperatriz - MA / Açailândia - MA {"(Brasil)"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <a
                  href="https://github.com/devmanucs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-sage/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github size={22} />
                </a>
                <a
                  href="https://linkedin.com/in/manuella-carvalho-7663352b0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-sage/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="p-8 rounded-3xl bg-card border border-border">
              <p className="text-foreground font-serif text-3xl mb-3">
                Gostaria de entrar em contato?
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Me chama no{" "}
                <span className="font-semibold text-foreground">WhatsApp</span>{" "}
                ou, se preferir, me envie um e-mail também.
              </p>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 flex items-center gap-4 rounded-2xl border border-primary/20 bg-primary/10 px-5 py-5 text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/15"
                aria-label="Falar no WhatsApp"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background/60">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>

                <span className="text-lg font-medium">
                  Fale comigo via WhatsApp.
                </span>
                <span className="ml-auto text-xl transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowUpRight size={20} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

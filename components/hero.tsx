"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Github, Linkedin, Mail, ChevronDown } from "lucide-react"

const roles = [
  "Front-end Developer",
  "UI/UX Designer",
]

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sage/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-amber/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10 text-sage mb-8 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
          <span className="text-sm font-medium overflow-hidden">
            <span
              key={currentRole}
              className="inline-block animate-fade-in-up"
            >
              {roles[currentRole]}
            </span>
          </span>
        </div>

        <h1
          className={`font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight text-foreground leading-[1.1] text-balance mb-8 transition-all duration-700 delay-100 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Transformo ideias em
          <br />
          <span className="italic gradient-text">interfaces incríveis</span>
        </h1>

        <p
          className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12 transition-all duration-700 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Desenvolvo soluções web com alta performance, total responsividade e forte foco na experiência do usuário.
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-700 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#projetos"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full text-base hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1 transition-all duration-300"
          >
            Ver projetos
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <a
            href="#sobre"
            className="inline-flex items-center gap-2 px-8 py-4 text-muted-foreground hover:text-foreground transition-colors duration-300 relative animate-line"
          >
            Conheça mais sobre mim
          </a>
        </div>

        <div
          className={`flex items-center justify-center gap-6 transition-all duration-700 delay-400 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="https://github.com/devmanucs"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-sage/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-sage/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:manuhcsantos@gmail.com"
            className="p-3 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-sage/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} className="text-muted-foreground animate-bounce" />
      </div>
    </section>
  )
}

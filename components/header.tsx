"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"

const navLinks = [
  { href: "#sobre", label: "Sobre mim" },
  { href: "#tecnologias", label: "Tecnologias" },
  { href: "#projetos", label: "Projetos" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map((link) => link.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 flex items-center justify-between">
        <a
          href="#"
          className="font-serif text-2xl tracking-tight text-foreground hover:text-sage transition-colors duration-300"
        >
          {mounted && (
            <Image
              src={theme === "dark" ? "/logo-primary-dark.svg" : "/logo-primary-light.svg"}
              alt="Logo"
              width={30}
              height={30}
            />
          )}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-sm transition-colors duration-300 ${
                activeSection === link.href.slice(1)
                  ? "text-sage"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-sage transition-all duration-300 ${
                  activeSection === link.href.slice(1) ? "w-full" : "w-0"
                }`}
              />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-2.5 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-sage/20 transition-all duration-300"
            aria-label="Alternar tema"
          >
            {mounted && (
              <>
                <Sun
                  size={18}
                  className={`absolute inset-0 m-auto transition-all duration-300 ${
                    theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
                  }`}
                />
                <Moon
                  size={18}
                  className={`transition-all duration-300 ${
                    theme === "dark" ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
                  }`}
                />
              </>
            )}
          </button>

          <a
            href="#contato"
            className="px-5 py-2.5 bg-primary text-primary-foreground text-sm rounded-full hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300"
          >
            Vamos conversar
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground hover:text-sage transition-colors"
          aria-label="Abrir menu"
        >
          <div className="relative w-6 h-6">
            <Menu
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
              }`}
            />
            <X
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
              }`}
            />
          </div>
        </button>
      </nav>

      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-6 gap-4">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-lg transition-all duration-300 ${
                activeSection === link.href.slice(1)
                  ? "text-sage translate-x-2"
                  : "text-muted-foreground hover:text-foreground hover:translate-x-2"
              }`}
              style={{ transitionDelay: isOpen ? `${index * 50}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-all duration-300"
                style={{ transitionDelay: isOpen ? "200ms" : "0ms" }}
              >
                {mounted && (
                  <>
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    <span>{theme === "dark" ? "Modo claro" : "Modo escuro"}</span>
                  </>
                )}
              </button>
            </div>
            <a
              href="#contato"
              onClick={() => setIsOpen(false)}
              className="px-5 py-3 bg-primary text-primary-foreground text-sm rounded-full text-center hover:shadow-lg transition-all duration-300"
              style={{ transitionDelay: isOpen ? "250ms" : "0ms" }}
            >
              Vamos conversar
            </a>
          </div>
        </div>
      </header>
    )
  }

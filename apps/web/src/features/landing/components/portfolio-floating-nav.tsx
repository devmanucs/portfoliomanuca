"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { useActiveSection } from "@/hooks/use-active-section";
import { AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import {
  Briefcase,
  Code2,
  History,
  Home,
  Mail,
  Moon,
  Sun,
  User,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SECTION_IDS } from "../constants";

export function PortfolioFloatingNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const activeSection = useActiveSection([...SECTION_IDS]);
  const activeLink = `#${activeSection}`;

  useEffect(() => {
    setMounted(true);

    const updateHeroVisibility = () => {
      const hero = document.getElementById("inicio");
      setIsHeroVisible(Boolean(hero && hero.getBoundingClientRect().bottom > 80));
    };

    updateHeroVisibility();
    window.addEventListener("scroll", updateHeroVisibility, { passive: true });
    window.addEventListener("resize", updateHeroVisibility);

    return () => {
      window.removeEventListener("scroll", updateHeroVisibility);
      window.removeEventListener("resize", updateHeroVisibility);
    };
  }, []);

  const navItems = [
    {
      name: "início",
      link: "#inicio",
      icon: <Home className="size-5" />,
    },
    {
      name: "projetos",
      link: "#projetos",
      icon: <Briefcase className="size-5" />,
    },
    {
      name: "stacks",
      link: "#stacks",
      icon: <Code2 className="size-5" />,
    },
    {
      name: "experiências",
      link: "#experiencias",
      icon: <History className="size-5" />,
    },
    {
      name: "sobre",
      link: "#sobre",
      icon: <User className="size-5" />,
    },
    {
      name: "contato",
      link: "#contato",
      icon: <Mail className="size-5" />,
    },
  ];

  return (
    <AnimatePresence>
      {isHeroVisible ? (
        <FloatingNav
          navItems={navItems}
          activeLink={activeLink}
          overlay
          leftSlot={
            <a
              href="#inicio"
              className="flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
              aria-label="início"
            >
              {mounted ? (
                <Image
                  src="/logo-primary-dark.svg"
                  alt="Logo"
                  width={22}
                  height={22}
                />
              ) : null}
            </a>
          }
          rightSlot={
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex size-10 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Alternar tema"
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )
              ) : (
                <Moon size={18} />
              )}
            </button>
          }
        />
      ) : null}
    </AnimatePresence>
  );
}

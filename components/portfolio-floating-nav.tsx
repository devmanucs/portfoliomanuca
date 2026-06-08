"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { useTheme } from "next-themes";
import {
  Briefcase,
  Code2,
  Home,
  Mail,
  Moon,
  Sun,
  User,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function PortfolioFloatingNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    {
      name: "início",
      link: "#inicio",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "sobre",
      link: "#sobre",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "stacks",
      link: "#stacks",
      icon: <Code2 className="h-5 w-5" />,
    },
    {
      name: "projetos",
      link: "#projetos",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      name: "contato",
      link: "#contato",
      icon: <Mail className="h-5 w-5" />,
    },
  ];

  return (
    <>
      <FloatingNav
        className="top-8"
        navItems={navItems}
        leftSlot={
          <a
            href="#inicio"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-sage/10"
            aria-label="início"
          >
            {mounted ? (
              <Image
                src={
                  theme === "dark"
                    ? "/logo-primary-dark.svg"
                    : "/logo-primary-light.svg"
                }
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
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-sage/10 hover:text-foreground"
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
    </>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/features/admin-auth";
import { cn } from "@/lib/utils";
import {
  ArrowRightFromLineIcon,
  Moon02Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projetos", label: "Projetos" },
  { href: "/admin/experiencias", label: "Experiências" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/perfil", label: "Perfil" },
  { href: "/admin/curriculo", label: "Currículo" },
  { href: "/admin/aparencia", label: "Temas" },
];

function isActiveHref(pathname: string, href: string) {
  return pathname === href || (href !== "/admin" && pathname.startsWith(href));
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLogin) {
    return <div className="admin-scope">{children}</div>;
  }

  async function handleLogout() {
    try {
      await logout();
      toast.success("Logout realizado");
      router.push("/admin/login");
      router.refresh();
    } catch {
      toast.error("Erro ao sair");
    }
  }

  return (
    <div className="admin-scope min-h-svh bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Navegação do admin"
            className="hidden items-center gap-1 md:flex"
          >
            {navItems.map((item) => {
              const active = isActiveHref(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Alternar tema"
            >
              {mounted ? (
                theme === "dark" ? (
                  <HugeiconsIcon icon={Sun03Icon} size={16} />
                ) : (
                  <HugeiconsIcon icon={Moon02Icon} size={16} />
                )
              ) : null}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-1.5"
            >
              <HugeiconsIcon icon={ArrowRightFromLineIcon} size={14} />
            </Button>
          </div>
        </div>

        <nav
          aria-label="Navegação do admin (mobile)"
          className="flex items-center gap-1 overflow-x-auto border-t border-border px-4 py-2 md:hidden"
        >
          {navItems.map((item) => {
            const active = isActiveHref(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {children}
      </main>
    </div>
  );
}

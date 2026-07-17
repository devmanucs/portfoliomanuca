"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Sparkles,
  User,
} from "lucide-react";
import { logout } from "@/features/admin-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projetos", label: "Projetos", icon: FolderKanban },
  { href: "/admin/experiencias", label: "Experiências", icon: Briefcase },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/perfil", label: "Perfil", icon: User },
  { href: "/admin/curriculo", label: "Currículo", icon: FileText },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <>{children}</>;
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
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background p-3 md:hidden">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary font-heading text-sm text-primary-foreground">
              M
            </span>
            <div>
              <p className="caption-uppercase text-muted-foreground">admin</p>
              <p className="font-heading text-lg leading-none">Portfólio</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            aria-label="Sair"
          >
            <LogOut size={17} />
          </button>
        </div>

        <nav className="flex gap-1 overflow-x-auto rounded-lg bg-muted/70 p-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-10 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-background hover:text-foreground",
                )}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <div className="mx-auto flex min-h-screen max-w-[90rem]">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 p-4 md:block">
          <div className="flex h-full flex-col rounded-xl border border-border bg-card p-3">
            <div className="mb-6 flex items-center gap-3 px-2 pt-2">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary font-heading text-base text-primary-foreground">
                M
              </span>
              <div>
                <p className="caption-uppercase text-muted-foreground">admin</p>
                <h1 className="font-heading text-xl leading-none">Portfólio</h1>
              </div>
            </div>

            <nav className="space-y-1 rounded-lg bg-muted/50 p-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-background hover:text-foreground",
                    )}
                  >
                    <Icon size={17} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-auto flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut size={17} />
              Sair
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}

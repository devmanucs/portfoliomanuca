"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Palette,
  Sparkles,
  User,
} from "lucide-react";
import { logout } from "@/features/admin-auth";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projetos", label: "Projetos", icon: FolderKanban },
  { href: "/admin/experiencias", label: "Experiências", icon: Briefcase },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/perfil", label: "Perfil", icon: User },
  { href: "/admin/curriculo", label: "Currículo", icon: FileText },
  { href: "/admin/aparencia", label: "Aparência", icon: Palette },
];

function isActiveHref(pathname: string, href: string) {
  return pathname === href || (href !== "/admin" && pathname.startsWith(href));
}

export function AdminShell({
  children,
  defaultSidebarOpen = true,
}: {
  children: React.ReactNode;
  defaultSidebarOpen?: boolean;
}) {
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

  const activeItem = navItems.find((item) => isActiveHref(pathname, item.href));

  return (
    <SidebarProvider defaultOpen={defaultSidebarOpen}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-3 px-2 py-1.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary font-heading text-sm text-primary-foreground">
              M
            </span>
            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
              <p className="caption-uppercase text-muted-foreground">admin</p>
              <h1 className="truncate font-heading text-base leading-none">Portfólio</h1>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActiveHref(pathname, item.href);

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                        <Link href={item.href}>
                          <Icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                tooltip="Sair"
                className={cn(
                  "text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
                )}
              >
                <LogOut />
                <span>Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/95 px-4 backdrop-blur">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>{activeItem?.label ?? "Admin"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

"use client";

import { PageHeader } from "@/components/ds/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetch } from "@/hooks/use-crud";
import type { IExperience, IProject, ISkill } from "@portfoliomanuca/types";
import Link from "next/link";
import {
  Briefcase,
  FileText,
  FolderKanban,
  Sparkles,
  User,
} from "lucide-react";

const links = [
  { href: "/admin/projetos", label: "Projetos", icon: FolderKanban },
  { href: "/admin/experiencias", label: "Experiências", icon: Briefcase },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/perfil", label: "Perfil", icon: User },
  { href: "/admin/curriculo", label: "Currículo", icon: FileText },
];

export default function AdminDashboardPage() {
  const { data: projects = [] } = useFetch<IProject[]>({
    queryKey: ["projects"],
    route: "/projects",
  });
  const { data: experiences = [] } = useFetch<IExperience[]>({
    queryKey: ["experiences"],
    route: "/experiences",
  });
  const { data: skills = [] } = useFetch<ISkill[]>({
    queryKey: ["skills"],
    route: "/skills",
  });

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="admin"
        title="Dashboard"
        description="Gerencie o conteúdo do portfólio e currículo."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Projetos publicados
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-medium">{projects.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Experiências
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-medium">
            {experiences.length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Skills</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-medium">{skills.length}</CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-sage/40"
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-sage" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

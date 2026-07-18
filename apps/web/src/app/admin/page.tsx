"use client";

import { PageHeader } from "@/components/ds/page-header";
import { EmptyState } from "@/components/ds/empty-state";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useFetch } from "@/hooks/use-crud";
import type { IExperience, IProject, ISkill } from "@portfoliomanuca/types";
import Link from "next/link";
import { differenceInCalendarMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { Briefcase, FolderKanban, Sparkles } from "lucide-react";

const focusLabels: Record<IProject["focus"], string> = {
  design: "Design",
  development: "Desenvolvimento",
  hybrid: "Híbrido",
};

const chartColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
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

  const skillsByCategory = groupCount(skills, (skill) => skill.category).sort(
    (a, b) => b.value - a.value,
  );

  const projectsByFocus = groupCount(projects, (project) => focusLabels[project.focus]);

  const timeline = [...experiences]
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .map((experience) => ({
      name: experience.company,
      months: Math.max(
        1,
        differenceInCalendarMonths(
          experience.endDate ? new Date(experience.endDate) : new Date(),
          new Date(experience.startDate),
        ),
      ),
    }));

  const recentProjects = [...projects]
    .filter((project) => project.updatedAt)
    .sort(
      (a, b) => new Date(b.updatedAt ?? 0).getTime() - new Date(a.updatedAt ?? 0).getTime(),
    )
    .slice(0, 5);

  const skillsChartConfig = {
    value: { label: "Skills" },
  } satisfies ChartConfig;

  const focusChartConfig = Object.fromEntries(
    projectsByFocus.map((item, index) => [
      item.name,
      { label: item.name, color: chartColors[index % chartColors.length] },
    ]),
  ) satisfies ChartConfig;

  const timelineChartConfig = {
    months: { label: "Meses", color: "var(--color-chart-1)" },
  } satisfies ChartConfig;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="admin"
        title="Dashboard"
        description="Visão geral do conteúdo do portfólio e currículo."
      />

      <div className="grid grid-cols-1 gap-4 rounded-xl border border-border bg-card p-4 sm:grid-cols-3 sm:divide-x sm:divide-border">
        <KpiStat icon={FolderKanban} label="Projetos" value={projects.length} />
        <KpiStat icon={Briefcase} label="Experiências" value={experiences.length} />
        <KpiStat icon={Sparkles} label="Skills" value={skills.length} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Skills por categoria</CardTitle>
            <CardDescription>Distribuição das skills cadastradas.</CardDescription>
          </CardHeader>
          <CardContent>
            {skillsByCategory.length === 0 ? (
              <EmptyState
                title="Nenhuma skill cadastrada"
                description="Adicione skills para ver a distribuição por categoria."
              />
            ) : (
              <ChartContainer config={skillsChartConfig} className="aspect-auto h-64 w-full">
                <BarChart data={skillsByCategory} layout="vertical" margin={{ left: 8 }}>
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    width={110}
                  />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="value" radius={4}>
                    {skillsByCategory.map((entry, index) => (
                      <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projetos por foco</CardTitle>
            <CardDescription>Design, desenvolvimento ou híbrido.</CardDescription>
          </CardHeader>
          <CardContent>
            {projectsByFocus.length === 0 ? (
              <EmptyState
                title="Nenhum projeto cadastrado"
                description="Cadastre projetos para ver a distribuição por foco."
              />
            ) : (
              <ChartContainer config={focusChartConfig} className="aspect-square h-64 w-full">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={projectsByFocus}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={48}
                    outerRadius={80}
                    strokeWidth={4}
                  >
                    {projectsByFocus.map((entry, index) => (
                      <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Linha do tempo de experiências</CardTitle>
            <CardDescription>Duração de cada experiência, em meses.</CardDescription>
          </CardHeader>
          <CardContent>
            {timeline.length === 0 ? (
              <EmptyState
                title="Nenhuma experiência cadastrada"
                description="Adicione experiências para ver a linha do tempo."
              />
            ) : (
              <ChartContainer config={timelineChartConfig} className="aspect-auto h-64 w-full">
                <BarChart data={timeline} layout="vertical" margin={{ left: 8 }}>
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    width={110}
                  />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="months" fill="var(--color-months)" radius={4} />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atualizados recentemente</CardTitle>
            <CardDescription>Últimos projetos editados.</CardDescription>
          </CardHeader>
          <CardContent>
            {recentProjects.length === 0 ? (
              <EmptyState
                title="Nenhum projeto ainda"
                description="Projetos editados vão aparecer aqui."
              />
            ) : (
              <ul className="space-y-1">
                {recentProjects.map((project) => (
                  <li key={project.id}>
                    <Link
                      href="/admin/projetos"
                      className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-accent"
                    >
                      <span className="truncate font-medium text-foreground">
                        {project.title}
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {format(new Date(project.updatedAt ?? Date.now()), "d MMM", {
                          locale: ptBR,
                        })}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function groupCount<T>(items: T[], getKey: (item: T) => string) {
  const counts = new Map<string, number>();
  for (const item of items) {
    const key = getKey(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return Array.from(counts, ([name, value]) => ({ name, value }));
}

function KpiStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof FolderKanban;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-3 sm:pl-4 first:sm:pl-0">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon size={16} />
      </span>
      <div>
        <p className="text-xl font-medium tabular-nums text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

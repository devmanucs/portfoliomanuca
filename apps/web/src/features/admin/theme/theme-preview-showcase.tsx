"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Frame, FrameDescription, FrameHeader, FramePanel, FrameTitle } from "@/components/ui/frame";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDownRight01Icon,
  ArrowUpRight01Icon,
  Folder02Icon as HugeFolderIcon,
  PlusSignIcon as HugePlusIcon,
} from "@hugeicons/core-free-icons";
import { FolderPlus as LucideFolderIcon, Plus as LucidePlusIcon } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

type IconLibraryId = "hugeicons" | "lucide";

const statCards = [
  { label: "Visitantes (30d)", value: "12.4K", trend: "+18%", up: true },
  { label: "Projetos publicados", value: "24", trend: "+3", up: true },
  { label: "Taxa de conversão", value: "4.6%", trend: "-0.4%", up: false },
  { label: "Skills cadastradas", value: "35", trend: "+5", up: true },
];

const visitsData = [
  { month: "Fev", visits: 3200 },
  { month: "Mar", visits: 4100 },
  { month: "Abr", visits: 3800 },
  { month: "Mai", visits: 5200 },
  { month: "Jun", visits: 6100 },
  { month: "Jul", visits: 7400 },
];

const visitsChartConfig = {
  visits: { label: "Visitantes", color: "var(--color-chart-1)" },
} satisfies ChartConfig;

const recentRows = [
  { name: "Dashboard de Monitoramento", category: "Dashboard", status: "Publicado" },
  { name: "Modelo de CRUD de Usuários", category: "Web App", status: "Publicado" },
  { name: "Criação de Branding", category: "UI/UX", status: "Rascunho" },
];

const skillsData = [
  { name: "Frontend", value: 12, fill: "var(--color-chart-1)" },
  { name: "Design", value: 9, fill: "var(--color-chart-2)" },
  { name: "Backend", value: 7, fill: "var(--color-chart-3)" },
  { name: "Testes", value: 4, fill: "var(--color-chart-4)" },
];

const skillsChartConfig = { value: { label: "Skills" } } satisfies ChartConfig;

const goals = [
  { label: "Projetos publicados", current: 5, target: 8 },
  { label: "Skills documentadas", current: 35, target: 40 },
  { label: "Depoimentos coletados", current: 2, target: 6 },
];

type ThemePreviewShowcaseProps = {
  iconLibrary?: IconLibraryId;
};

export function ThemePreviewShowcase({ iconLibrary = "hugeicons" }: ThemePreviewShowcaseProps) {
  const [threshold, setThreshold] = useState(70);

  const FolderIcon =
    iconLibrary === "hugeicons"
      ? ({ size }: { size: number }) => <HugeiconsIcon icon={HugeFolderIcon} size={size} />
      : ({ size }: { size: number }) => <LucideFolderIcon size={size} />;
  const PlusIcon =
    iconLibrary === "hugeicons"
      ? ({ size }: { size: number }) => <HugeiconsIcon icon={HugePlusIcon} size={size} />
      : ({ size }: { size: number }) => <LucidePlusIcon size={size} />;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <Frame key={stat.label}>
            <FramePanel className="flex flex-col gap-1.5">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <span className="text-2xl font-medium tabular-nums text-foreground">
                {stat.value}
              </span>
              <span
                className={
                  "inline-flex w-fit items-center gap-1 text-xs font-medium " +
                  (stat.up ? "text-success" : "text-destructive")
                }
              >
                <HugeiconsIcon icon={stat.up ? ArrowUpRight01Icon : ArrowDownRight01Icon} size={12} />
                {stat.trend}
              </span>
            </FramePanel>
          </Frame>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Frame className="xl:col-span-2">
          <FrameHeader>
            <FrameTitle>Visão geral</FrameTitle>
            <FrameDescription>Visitantes do portfólio nos últimos 6 meses.</FrameDescription>
          </FrameHeader>
          <FramePanel className="pt-0">
            <ChartContainer config={visitsChartConfig} className="aspect-auto h-52 w-full">
              <AreaChart data={visitsData} margin={{ left: 0, right: 8 }}>
                <defs>
                  <linearGradient id="theme-preview-visits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  dataKey="visits"
                  type="monotone"
                  fill="url(#theme-preview-visits)"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </FramePanel>
        </Frame>

        <Frame>
          <FrameHeader>
            <FrameTitle>Projetos recentes</FrameTitle>
            <FrameDescription>Últimos cases atualizados.</FrameDescription>
          </FrameHeader>
          <FramePanel className="pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentRows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="max-w-40 truncate font-medium">{row.name}</TableCell>
                    <TableCell>
                      <Badge variant={row.status === "Publicado" ? "secondary" : "outline"}>
                        {row.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </FramePanel>
        </Frame>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Frame>
          <FrameHeader>
            <FrameTitle>Nenhum case em destaque</FrameTitle>
            <FrameDescription>Assim fica um estado vazio.</FrameDescription>
          </FrameHeader>
          <FramePanel className="flex flex-col items-center gap-3 pt-0 text-center">
            <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <FolderIcon size={18} />
            </span>
            <p className="text-sm text-muted-foreground">
              Destaque um projeto para abrir o portfólio com o seu melhor trabalho.
            </p>
            <Button size="sm" variant="outline" className="gap-1.5">
              <PlusIcon size={14} />
              Destacar projeto
            </Button>
          </FramePanel>
        </Frame>

        <Frame>
          <FrameHeader>
            <FrameTitle>Meta de leitura</FrameTitle>
            <FrameDescription>Notifica quando o currículo bate essa marca.</FrameDescription>
          </FrameHeader>
          <FramePanel className="flex flex-col gap-4 pt-0">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Visualizações mínimas</span>
              <span className="font-medium text-foreground">{threshold}%</span>
            </div>
            <Slider value={[threshold]} min={10} max={100} step={5} onValueChange={([v]) => setThreshold(v)} />
            <Textarea placeholder="Nota sobre essa meta..." rows={2} className="resize-none text-sm" />
            <Button size="sm" className="self-start">
              Salvar meta
            </Button>
          </FramePanel>
        </Frame>

        <Frame>
          <FrameHeader>
            <FrameTitle>Metas do portfólio</FrameTitle>
            <FrameDescription>Progresso das metas ativas.</FrameDescription>
          </FrameHeader>
          <FramePanel className="flex flex-col gap-4 pt-0">
            {goals.map((goal) => (
              <div key={goal.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{goal.label}</span>
                  <span className="font-medium text-foreground">
                    {goal.current}/{goal.target}
                  </span>
                </div>
                <Progress value={(goal.current / goal.target) * 100} />
              </div>
            ))}
          </FramePanel>
        </Frame>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Frame>
          <FrameHeader>
            <FrameTitle>Ações</FrameTitle>
            <FrameDescription>Botões e badges do design system.</FrameDescription>
          </FrameHeader>
          <FramePanel className="flex flex-col gap-4 pt-0">
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Primário</Button>
              <Button size="sm" variant="secondary">
                Secundário
              </Button>
              <Button size="sm" variant="outline">
                Contorno
              </Button>
              <Button size="sm" variant="ghost">
                Discreto
              </Button>
              <Button size="sm" variant="destructive">
                Excluir
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Badge>React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="outline">Figma</Badge>
              <Badge variant="destructive">Deprecated</Badge>
            </div>
          </FramePanel>
        </Frame>

        <Frame>
          <FrameHeader>
            <FrameTitle>Formulário</FrameTitle>
            <FrameDescription>Campos, foco e estados de input.</FrameDescription>
          </FrameHeader>
          <FramePanel className="flex flex-col gap-4 pt-0">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="theme-preview-title">Título do projeto</Label>
              <Input id="theme-preview-title" defaultValue="Painel de aparência" readOnly />
            </div>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2">
              <Label htmlFor="theme-preview-publish" className="text-sm font-normal">
                Publicar no site
              </Label>
              <Switch id="theme-preview-publish" defaultChecked />
            </div>
            <Button size="sm" className="self-start">
              Salvar
            </Button>
          </FramePanel>
        </Frame>

        <Frame>
          <FrameHeader>
            <FrameTitle>Dados</FrameTitle>
            <FrameDescription>Charts e indicadores de progresso.</FrameDescription>
          </FrameHeader>
          <FramePanel className="flex flex-col gap-4 pt-0">
            <ChartContainer config={skillsChartConfig} className="aspect-auto h-24 w-full">
              <BarChart data={skillsData} layout="vertical" margin={{ left: 0, right: 8 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  width={64}
                  fontSize={11}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="value" radius={4}>
                  {skillsData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Perfil completo</span>
                <span className="font-medium text-foreground">72%</span>
              </div>
              <Progress value={72} />
            </div>
          </FramePanel>
        </Frame>

        <Frame>
          <FrameHeader>
            <FrameTitle>Cartão</FrameTitle>
            <FrameDescription>Como fica um card de projeto.</FrameDescription>
          </FrameHeader>
          <FramePanel className="pt-0">
            <div className="rounded-lg border border-border p-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="text-xs font-medium">MC</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    Manuella Carvalho
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    Product Designer & Dev
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Refatoração do painel de aparência com presets de cor e preview ao vivo.
              </p>
              <div className="mt-3 flex items-center justify-between">
                <Badge variant="secondary">Em andamento</Badge>
                <span className="text-xs text-muted-foreground">Hoje</span>
              </div>
            </div>
          </FramePanel>
        </Frame>
      </div>
    </div>
  );
}

"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";

const skillsData = [
  { name: "Frontend", value: 12, fill: "var(--color-chart-1)" },
  { name: "Design", value: 9, fill: "var(--color-chart-2)" },
  { name: "Backend", value: 7, fill: "var(--color-chart-3)" },
  { name: "Testes", value: 4, fill: "var(--color-chart-4)" },
];

const skillsChartConfig = { value: { label: "Skills" } } satisfies ChartConfig;

export function ThemePreviewShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ações</CardTitle>
          <CardDescription>Botões e badges do design system.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Formulário</CardTitle>
          <CardDescription>Campos, foco e estados de input.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Dados</CardTitle>
          <CardDescription>Charts e indicadores de progresso.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ChartContainer config={skillsChartConfig} className="aspect-auto h-24 w-full">
            <BarChart data={skillsData} layout="vertical" margin={{ left: 0, right: 8 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={64} fontSize={11} />
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cartão</CardTitle>
          <CardDescription>Como fica um card de projeto.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border p-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="text-xs font-medium">MC</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">Manuella Carvalho</p>
                <p className="truncate text-xs text-muted-foreground">Product Designer & Dev</p>
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
        </CardContent>
      </Card>
    </div>
  );
}

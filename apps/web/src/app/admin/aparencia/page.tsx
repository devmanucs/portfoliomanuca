"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/ds/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import {
  NumberField,
  NumberFieldGroup,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
import { OklchColorField } from "@/features/admin/components/oklch-color-field";
import { useFetch } from "@/hooks/use-crud";
import { api } from "@/core/api/axios-instance";
import type { ISiteTheme } from "@portfoliomanuca/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { contrastRatio, formatOklch, meetsAA, parseOklch, type Oklch } from "@/lib/oklch";
import { RotateCcw } from "lucide-react";

type Mode = "light" | "dark";
type TokenMap = Record<string, string>;

const DEFAULT_RADIUS_REM = 0.5;

const DEFAULTS: Record<Mode, TokenMap> = {
  light: {
    "--background": "oklch(0.965 0.006 65)",
    "--foreground": "oklch(0.245 0.025 45)",
    "--card": "oklch(0.985 0.003 65)",
    "--secondary": "oklch(0.925 0.006 70)",
    "--muted": "oklch(0.925 0.008 65)",
    "--border": "oklch(0.84 0.008 65)",
    "--primary": "oklch(0.405 0.06 45)",
    "--primary-active": "oklch(0.34 0.055 45)",
    "--accent": "oklch(0.86 0.025 55)",
    "--ring": "oklch(0.405 0.06 45)",
    "--destructive": "oklch(0.49 0.16 28)",
    "--success": "oklch(0.45 0.08 145)",
    "--chart-1": "oklch(0.405 0.06 45)",
    "--chart-2": "oklch(0.54 0.08 45)",
    "--chart-3": "oklch(0.66 0.07 65)",
    "--chart-4": "oklch(0.58 0.02 70)",
    "--chart-5": "oklch(0.45 0.08 145)",
  },
  dark: {
    "--background": "oklch(0.135 0.012 48)",
    "--foreground": "oklch(0.92 0.008 65)",
    "--card": "oklch(0.175 0.014 48)",
    "--secondary": "oklch(0.205 0.012 52)",
    "--muted": "oklch(0.22 0.014 48)",
    "--border": "oklch(0.29 0.014 52)",
    "--primary": "oklch(0.72 0.055 58)",
    "--primary-active": "oklch(0.79 0.045 62)",
    "--accent": "oklch(0.27 0.025 48)",
    "--ring": "oklch(0.72 0.055 58)",
    "--destructive": "oklch(0.68 0.14 28)",
    "--success": "oklch(0.7 0.075 145)",
    "--chart-1": "oklch(0.405 0.06 45)",
    "--chart-2": "oklch(0.54 0.08 45)",
    "--chart-3": "oklch(0.66 0.07 65)",
    "--chart-4": "oklch(0.58 0.02 70)",
    "--chart-5": "oklch(0.45 0.08 145)",
  },
};

const PRIMARY_FOREGROUND: Record<Mode, string> = {
  light: "oklch(0.985 0.003 65)",
  dark: "oklch(0.16 0.015 45)",
};

const TOKEN_GROUPS: { name: string; tokens: { key: string; label: string; description?: string }[] }[] = [
  {
    name: "Superfícies",
    tokens: [
      { key: "--background", label: "Fundo" },
      { key: "--foreground", label: "Texto" },
      { key: "--card", label: "Card" },
      { key: "--secondary", label: "Secundária" },
      { key: "--muted", label: "Discreta" },
      { key: "--border", label: "Borda" },
    ],
  },
  {
    name: "Ações",
    tokens: [
      { key: "--primary", label: "Primária", description: "Botões e ações principais" },
      { key: "--primary-active", label: "Primária (ativa)" },
      { key: "--accent", label: "Destaque" },
      { key: "--ring", label: "Foco" },
    ],
  },
  {
    name: "Estado",
    tokens: [
      { key: "--destructive", label: "Erro" },
      { key: "--success", label: "Sucesso" },
    ],
  },
  {
    name: "Charts",
    tokens: [
      { key: "--chart-1", label: "Chart 1" },
      { key: "--chart-2", label: "Chart 2" },
      { key: "--chart-3", label: "Chart 3" },
      { key: "--chart-4", label: "Chart 4" },
      { key: "--chart-5", label: "Chart 5" },
    ],
  },
];

export default function AparenciaPage() {
  const queryClient = useQueryClient();
  const { data: siteTheme, isLoading } = useFetch<ISiteTheme>({
    queryKey: ["site-theme"],
    route: "/site-theme",
  });

  const [mode, setMode] = useState<Mode>("light");
  const [draft, setDraft] = useState<{ light: TokenMap; dark: TokenMap }>({
    light: {},
    dark: {},
  });
  const [radiusRem, setRadiusRem] = useState(DEFAULT_RADIUS_REM);

  useEffect(() => {
    if (siteTheme) {
      setDraft({ light: siteTheme.tokens.light, dark: siteTheme.tokens.dark });
      const savedRadius = siteTheme.tokens.light["--radius"];
      if (savedRadius) {
        const parsed = Number.parseFloat(savedRadius);
        if (!Number.isNaN(parsed)) setRadiusRem(parsed);
      }
    }
  }, [siteTheme]);

  // Live preview: a single persistent <style> tag, updated in place, so
  // unsaved edits reflect across the whole app immediately without
  // re-creating a DOM node on every slider tick.
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.id = "theme-live-preview";
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  useEffect(() => {
    const styleEl = document.getElementById("theme-live-preview");
    if (!styleEl) return;

    const lightRules = Object.entries({ ...draft.light, "--radius": `${radiusRem}rem` })
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ");
    const darkRules = Object.entries(draft.dark)
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ");

    styleEl.textContent = `:root { ${lightRules} } .dark { ${darkRules} }`;
  }, [draft, radiusRem]);

  const updateMutation = useMutation({
    mutationKey: ["update-site-theme"],
    mutationFn: async () => {
      const light = { ...draft.light };
      if (radiusRem === DEFAULT_RADIUS_REM) {
        delete light["--radius"];
      } else {
        light["--radius"] = `${radiusRem}rem`;
      }

      const { data } = await api.patch<ISiteTheme>(
        "/site-theme",
        { light, dark: draft.dark },
        { showToast: false, operation: "atualizar" },
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Aparência salva");
      queryClient.invalidateQueries({ queryKey: ["site-theme"] });
    },
    onError: () => toast.error("Erro ao salvar aparência"),
  });

  function getValue(currentMode: Mode, key: string): Oklch {
    const raw = draft[currentMode][key] ?? DEFAULTS[currentMode][key];
    return parseOklch(raw) ?? { l: 0.5, c: 0, h: 0 };
  }

  function isOverridden(currentMode: Mode, key: string): boolean {
    return draft[currentMode][key] !== undefined && draft[currentMode][key] !== DEFAULTS[currentMode][key];
  }

  function setValue(currentMode: Mode, key: string, value: Oklch) {
    setDraft((prev) => ({
      ...prev,
      [currentMode]: { ...prev[currentMode], [key]: formatOklch(value) },
    }));
  }

  function resetToken(currentMode: Mode, key: string) {
    setDraft((prev) => {
      const next = { ...prev[currentMode] };
      delete next[key];
      return { ...prev, [currentMode]: next };
    });
  }

  function resetAll(currentMode: Mode) {
    setDraft((prev) => ({ ...prev, [currentMode]: {} }));
  }

  const textContrast = useMemo(() => {
    const ratio = contrastRatio(getValue(mode, "--foreground"), getValue(mode, "--background"));
    return { ratio, pass: meetsAA(ratio) };
  }, [draft, mode]);

  const primaryContrast = useMemo(() => {
    const primaryForeground = parseOklch(PRIMARY_FOREGROUND[mode]) ?? { l: 1, c: 0, h: 0 };
    const ratio = contrastRatio(primaryForeground, getValue(mode, "--primary"));
    return { ratio, pass: meetsAA(ratio) };
  }, [draft, mode]);

  const isRadiusOverridden = radiusRem !== DEFAULT_RADIUS_REM;

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        eyebrow="admin"
        title="Aparência"
        description="Edite os tokens de cor e o raio do design system. As mudanças aparecem em tempo real e valem pro site inteiro depois de salvas."
      />

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Formato</CardTitle>
              <CardDescription>Raio de borda usado em botões, cards e inputs.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <NumberField
                  value={radiusRem}
                  onValueChange={(value) => value !== null && setRadiusRem(value)}
                  min={0}
                  max={1.5}
                  step={0.125}
                  className="w-40"
                >
                  <NumberFieldGroup>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldGroup>
                </NumberField>
                <span className="text-xs text-muted-foreground">rem</span>
                <div
                  className="ml-auto size-10 border-2 border-primary"
                  style={{ borderRadius: `${radiusRem}rem` }}
                  aria-hidden
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="disabled:opacity-30"
                  disabled={!isRadiusOverridden}
                  onClick={() => setRadiusRem(DEFAULT_RADIUS_REM)}
                  aria-label="Restaurar raio padrão"
                  title="Restaurar padrão"
                >
                  <RotateCcw size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle>Cores</CardTitle>
                <CardDescription>Tokens semânticos do design system.</CardDescription>
              </div>
              <Tabs value={mode} onValueChange={(value) => setMode(value as Mode)}>
                <TabsList>
                  <TabsTrigger value="light">Claro</TabsTrigger>
                  <TabsTrigger value="dark">Escuro</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span>
                    Contraste texto: <strong className="text-foreground">{textContrast.ratio.toFixed(2)}</strong>
                  </span>
                  <Badge variant={textContrast.pass ? "secondary" : "destructive"}>
                    {textContrast.pass ? "AA ✓" : "AA ✗"}
                  </Badge>
                  <span>
                    Contraste primária: <strong className="text-foreground">{primaryContrast.ratio.toFixed(2)}</strong>
                  </span>
                  <Badge variant={primaryContrast.pass ? "secondary" : "destructive"}>
                    {primaryContrast.pass ? "AA ✓" : "AA ✗"}
                  </Badge>
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={() => resetAll(mode)}>
                  Restaurar tudo
                </Button>
              </div>

              <FieldGroup>
                {TOKEN_GROUPS.map((group) => (
                  <FieldSet key={group.name}>
                    <FieldLegend variant="label">{group.name}</FieldLegend>
                    {group.tokens.map((token) => (
                      <OklchColorField
                        key={token.key}
                        label={token.label}
                        description={token.description}
                        value={getValue(mode, token.key)}
                        isOverridden={isOverridden(mode, token.key)}
                        onChange={(value) => setValue(mode, token.key, value)}
                        onReset={() => resetToken(mode, token.key)}
                      />
                    ))}
                  </FieldSet>
                ))}
              </FieldGroup>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => updateMutation.mutate()}
              disabled={updateMutation.isPending}
            >
              Salvar aparência
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

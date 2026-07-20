"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PageHeader } from "@/components/ds/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFetch } from "@/hooks/use-crud";
import { api } from "@/core/api/axios-instance";
import type { ISiteTheme } from "@portfoliomanuca/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { contrastRatio, formatOklch, meetsAA, parseOklch, type Oklch } from "@/lib/oklch";
import { Palette } from "lucide-react";
import {
  DEFAULT_RADIUS_REM,
  ESPRESSO_PRESET,
  PRIMARY_FOREGROUND,
  findActivePreset,
  resolvePresetTokens,
  sameTokens,
  type Mode,
  type ThemePreset,
  type ThemeTokens,
  type TokenMap,
} from "@/features/admin/theme/presets";
import { ThemePreviewShowcase } from "@/features/admin/theme/theme-preview-showcase";
import { ThemeCustomizerSheet } from "@/features/admin/theme/theme-customizer-sheet";
import { useThemeDraftCache } from "@/features/admin/theme/use-theme-draft-cache";

function stripRadius(light: TokenMap): TokenMap {
  if (!("--radius" in light)) return light;
  const { "--radius": _radius, ...rest } = light;
  return rest;
}

function radiusFromLight(light: TokenMap): number {
  const raw = light["--radius"];
  if (!raw) return DEFAULT_RADIUS_REM;
  const parsed = Number.parseFloat(raw);
  return Number.isNaN(parsed) ? DEFAULT_RADIUS_REM : parsed;
}

export default function AparenciaPage() {
  const queryClient = useQueryClient();
  const { data: siteTheme, isLoading } = useFetch<ISiteTheme>({
    queryKey: ["site-theme"],
    route: "/site-theme",
  });
  const cache = useThemeDraftCache();

  const [mode, setMode] = useState<Mode>("light");
  const [draft, setDraft] = useState<{ light: TokenMap; dark: TokenMap }>({
    light: {},
    dark: {},
  });
  const [radiusRem, setRadiusRem] = useState(DEFAULT_RADIUS_REM);
  const [sheetOpen, setSheetOpen] = useState(false);
  const hasCachedDraft = useRef(false);

  // Cache wins over the server value so an unsaved draft survives reloads
  // and re-visiting this page until it's explicitly saved or discarded.
  useEffect(() => {
    const cached = cache.read();
    if (cached) {
      setDraft({ light: stripRadius(cached.light), dark: cached.dark });
      setRadiusRem(cached.radiusRem);
      hasCachedDraft.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!siteTheme || hasCachedDraft.current) return;
    const light = stripRadius(siteTheme.tokens.light);
    setDraft({ light, dark: siteTheme.tokens.dark });
    setRadiusRem(radiusFromLight(siteTheme.tokens.light));
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

  // Mirror the draft to localStorage so it survives reload/navigation until
  // the user explicitly saves or discards it.
  useEffect(() => {
    cache.write({ light: draft.light, dark: draft.dark, radiusRem });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      cache.clear();
      queryClient.invalidateQueries({ queryKey: ["site-theme"] });
    },
    onError: () => toast.error("Erro ao salvar aparência"),
  });

  const activePreset = useMemo<ThemePreset | null>(
    () => findActivePreset({ light: draft.light, dark: draft.dark }),
    [draft],
  );
  const baselineTokens = resolvePresetTokens(activePreset ?? ESPRESSO_PRESET);

  function getValue(currentMode: Mode, key: string): Oklch {
    const raw = draft[currentMode][key] ?? baselineTokens[currentMode][key];
    return parseOklch(raw ?? "") ?? { l: 0.5, c: 0, h: 0 };
  }

  function isOverridden(currentMode: Mode, key: string): boolean {
    return draft[currentMode][key] !== undefined && draft[currentMode][key] !== baselineTokens[currentMode][key];
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

  function selectPreset(preset: ThemePreset) {
    setDraft({ light: { ...preset.tokens.light }, dark: { ...preset.tokens.dark } });
  }

  const savedTokens: ThemeTokens = useMemo(
    () => ({
      light: siteTheme ? stripRadius(siteTheme.tokens.light) : {},
      dark: siteTheme?.tokens.dark ?? {},
    }),
    [siteTheme],
  );
  const savedRadiusRem = siteTheme ? radiusFromLight(siteTheme.tokens.light) : DEFAULT_RADIUS_REM;
  const isDirty =
    !!siteTheme && (!sameTokens({ light: draft.light, dark: draft.dark }, savedTokens) || radiusRem !== savedRadiusRem);

  function discardDraft() {
    if (!siteTheme) return;
    setDraft(savedTokens);
    setRadiusRem(savedRadiusRem);
    hasCachedDraft.current = false;
    cache.clear();
  }

  const textContrast = useMemo(() => {
    const ratio = contrastRatio(getValue(mode, "--foreground"), getValue(mode, "--background"));
    return { ratio, pass: meetsAA(ratio) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft, mode]);

  const primaryContrast = useMemo(() => {
    const primaryForeground = parseOklch(PRIMARY_FOREGROUND[mode]) ?? { l: 1, c: 0, h: 0 };
    const ratio = contrastRatio(primaryForeground, getValue(mode, "--primary"));
    return { ratio, pass: meetsAA(ratio) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft, mode]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="admin"
        title="Aparência"
        description="Escolha um preset de cor e veja o impacto nos componentes ao lado. Só vale pro site depois de salvar."
        actions={
          <div className="flex items-center gap-2">
            {isDirty ? (
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Alterações não salvas
              </Badge>
            ) : null}
            <Button type="button" onClick={() => setSheetOpen(true)} className="gap-1.5">
              <Palette size={14} />
              Personalizar
            </Button>
          </div>
        }
      />

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : (
        <ThemePreviewShowcase />
      )}

      <ThemeCustomizerSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        activePresetId={activePreset?.id ?? null}
        onSelectPreset={selectPreset}
        radiusRem={radiusRem}
        onRadiusChange={setRadiusRem}
        mode={mode}
        onModeChange={setMode}
        getValue={getValue}
        isOverridden={isOverridden}
        onValueChange={setValue}
        onResetToken={resetToken}
        textContrast={textContrast}
        primaryContrast={primaryContrast}
        isDirty={isDirty}
        isSaving={updateMutation.isPending}
        onDiscard={discardDraft}
        onSave={() => updateMutation.mutate()}
      />
    </div>
  );
}

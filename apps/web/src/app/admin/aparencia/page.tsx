"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PageHeader } from "@/components/ds/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FieldLegend, FieldSet } from "@/components/ui/field";
import { Frame, FrameDescription, FrameHeader, FramePanel, FrameTitle } from "@/components/ui/frame";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useFetch } from "@/hooks/use-crud";
import { api } from "@/core/api/axios-instance";
import type { ISiteTheme } from "@portfoliomanuca/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { contrastRatio, formatOklch, meetsAA, parseOklch, type Oklch } from "@/lib/oklch";
import { HugeiconsIcon } from "@hugeicons/react";
import { PaintBrush02Icon, ShuffleIcon } from "@hugeicons/core-free-icons";
import {
  BODY_FONT_OPTIONS,
  CHART_KEYS,
  DEFAULT_RADIUS_REM,
  FONT_KEYS,
  HEADING_FONT_OPTIONS,
  NEUTRAL_PRESET,
  PRESETS,
  PRIMARY_FOREGROUND,
  RADIUS_OPTIONS,
  findActiveChartPreset,
  findActivePreset,
  pickKeys,
  resolvePresetTokens,
  sameTokens,
  type FontOption,
  type Mode,
  type ThemePreset,
  type ThemeTokens,
  type TokenMap,
} from "@/features/admin/theme/presets";
import { ThemePreviewShowcase } from "@/features/admin/theme/theme-preview-showcase";
import { ThemeCustomizerSheet } from "@/features/admin/theme/theme-customizer-sheet";
import { useGoogleFont } from "@/features/admin/theme/use-google-font";
import { useThemeDraftCache } from "@/features/admin/theme/use-theme-draft-cache";

const STYLE_OPTIONS = [
  { id: "flat", label: "Padrão" },
  { id: "elevated", label: "Elevado" },
] as const;

const ICON_LIBRARY_OPTIONS = [
  { id: "hugeicons", label: "Hugeicons" },
  { id: "lucide", label: "Lucide" },
] as const;

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

function resolveActiveFont(options: FontOption[], value: string | undefined, fallbackId: string): FontOption {
  return options.find((option) => option.stack === value) ?? options.find((option) => option.id === fallbackId)!;
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
  const [style, setStyle] = useState<(typeof STYLE_OPTIONS)[number]["id"]>("flat");
  const [iconLibrary, setIconLibrary] = useState<(typeof ICON_LIBRARY_OPTIONS)[number]["id"]>("hugeicons");
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

    styleEl.textContent = `.admin-scope { ${lightRules} } .admin-scope.dark, .dark .admin-scope { ${darkRules} }`;
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
  const activeChartPreset = useMemo<ThemePreset | null>(
    () => findActiveChartPreset({ light: draft.light, dark: draft.dark }),
    [draft],
  );
  const baselineTokens = resolvePresetTokens(activePreset ?? NEUTRAL_PRESET);

  const activeHeadingFont = resolveActiveFont(HEADING_FONT_OPTIONS, draft.light["--admin-font-heading"], "bricolage");
  const activeBodyFont = resolveActiveFont(BODY_FONT_OPTIONS, draft.light["--admin-font-sans"], "inter");
  useGoogleFont(activeHeadingFont.googleFamily);
  useGoogleFont(activeBodyFont.googleFamily);

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

  // Base Color replaces most tokens wholesale, but Chart Color and the
  // chosen fonts are independent controls -- preserve whatever the user set
  // there instead of letting a new Base Color silently wipe them out.
  function selectBaseColor(preset: ThemePreset) {
    setDraft((prev) => ({
      light: { ...preset.tokens.light, ...pickKeys(prev.light, CHART_KEYS), ...pickKeys(prev.light, FONT_KEYS) },
      dark: { ...preset.tokens.dark, ...pickKeys(prev.dark, CHART_KEYS) },
    }));
  }

  function selectChartColor(preset: ThemePreset) {
    const resolved = resolvePresetTokens(preset);
    setDraft((prev) => ({
      light: { ...prev.light, ...pickKeys(resolved.light, CHART_KEYS) },
      dark: { ...prev.dark, ...pickKeys(resolved.dark, CHART_KEYS) },
    }));
  }

  function selectHeadingFont(font: FontOption) {
    setDraft((prev) => ({ ...prev, light: { ...prev.light, "--admin-font-heading": font.stack } }));
  }

  function selectBodyFont(font: FontOption) {
    setDraft((prev) => ({ ...prev, light: { ...prev.light, "--admin-font-sans": font.stack } }));
  }

  function shuffleBaseColor() {
    const candidates = PRESETS.filter((preset) => preset.id !== activePreset?.id);
    const next = candidates[Math.floor(Math.random() * candidates.length)];
    if (next) selectBaseColor(next);
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

  const closestRadiusOption =
    RADIUS_OPTIONS.find((option) => Math.abs(option.value - radiusRem) < 0.01)?.value ?? null;

  return (
    <div className="space-y-6">
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : (
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
          <aside className="w-full shrink-0 xl:w-80">
            <Frame className="xl:sticky xl:top-20">
              <FrameHeader>
                <FrameTitle>Personalizar</FrameTitle>
                <FrameDescription>Ajustes refletem no preview ao lado.</FrameDescription>
              </FrameHeader>
              <FramePanel className="space-y-5 pt-0">
                <FieldSet>
                  <FieldLegend variant="label">Base Color</FieldLegend>
                  <Select
                    value={activePreset?.id ?? ""}
                    onValueChange={(id) => {
                      const preset = PRESETS.find((p) => p.id === id);
                      if (preset) selectBaseColor(preset);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Personalizado" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRESETS.map((preset) => (
                        <SelectItem key={preset.id} value={preset.id}>
                          <span
                            aria-hidden
                            className="size-3 shrink-0 rounded-full border border-border-strong/40"
                            style={{ backgroundColor: preset.swatch }}
                          />
                          {preset.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldSet>

                <FieldSet>
                  <FieldLegend variant="label">Chart Color</FieldLegend>
                  <Select
                    value={activeChartPreset?.id ?? ""}
                    onValueChange={(id) => {
                      const preset = PRESETS.find((p) => p.id === id);
                      if (preset) selectChartColor(preset);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Personalizado" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRESETS.map((preset) => (
                        <SelectItem key={preset.id} value={preset.id}>
                          <span
                            aria-hidden
                            className="size-3 shrink-0 rounded-full border border-border-strong/40"
                            style={{ backgroundColor: preset.swatch }}
                          />
                          {preset.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldSet>

                <FieldSet>
                  <FieldLegend variant="label">Radius</FieldLegend>
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    value={closestRadiusOption !== null ? String(closestRadiusOption) : undefined}
                    onValueChange={(value) => {
                      if (value) setRadiusRem(Number(value));
                    }}
                    className="w-full"
                  >
                    {RADIUS_OPTIONS.map((option) => (
                      <ToggleGroupItem key={option.value} value={String(option.value)} className="text-xs">
                        {option.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </FieldSet>

                <FieldSet>
                  <FieldLegend variant="label">Heading</FieldLegend>
                  <Select
                    value={activeHeadingFont.id}
                    onValueChange={(id) => {
                      const font = HEADING_FONT_OPTIONS.find((option) => option.id === id);
                      if (font) selectHeadingFont(font);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {HEADING_FONT_OPTIONS.map((font) => (
                        <SelectItem key={font.id} value={font.id}>
                          <span style={{ fontFamily: font.stack }}>Aa</span> {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldSet>

                <FieldSet>
                  <FieldLegend variant="label">Font</FieldLegend>
                  <Select
                    value={activeBodyFont.id}
                    onValueChange={(id) => {
                      const font = BODY_FONT_OPTIONS.find((option) => option.id === id);
                      if (font) selectBodyFont(font);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {BODY_FONT_OPTIONS.map((font) => (
                        <SelectItem key={font.id} value={font.id}>
                          <span style={{ fontFamily: font.stack }}>Aa</span> {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldSet>

                <FieldSet>
                  <FieldLegend variant="label">Icon Library</FieldLegend>
                  <Select value={iconLibrary} onValueChange={(id) => setIconLibrary(id as typeof iconLibrary)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ICON_LIBRARY_OPTIONS.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldSet>

                <FieldSet>
                  <FieldLegend variant="label">Style</FieldLegend>
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    value={style}
                    onValueChange={(value) => {
                      if (value) setStyle(value as typeof style);
                    }}
                    className="w-full"
                  >
                    {STYLE_OPTIONS.map((option) => (
                      <ToggleGroupItem key={option.id} value={option.id} className="text-xs">
                        {option.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </FieldSet>

                <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>
                      Texto: <strong className="text-foreground">{textContrast.ratio.toFixed(2)}</strong>
                    </span>
                    <Badge variant={textContrast.pass ? "secondary" : "destructive"}>
                      {textContrast.pass ? "AA ✓" : "AA ✗"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>
                      Primária: <strong className="text-foreground">{primaryContrast.ratio.toFixed(2)}</strong>
                    </span>
                    <Badge variant={primaryContrast.pass ? "secondary" : "destructive"}>
                      {primaryContrast.pass ? "AA ✓" : "AA ✗"}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-border pt-4">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 gap-1.5"
                      onClick={() => setSheetOpen(true)}
                    >
                      <HugeiconsIcon icon={PaintBrush02Icon} size={14} />
                      Open Preset
                    </Button>
                    <Button type="button" variant="ghost" className="flex-1 gap-1.5" onClick={shuffleBaseColor}>
                      <HugeiconsIcon icon={ShuffleIcon} size={14} />
                      Shuffle
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      className="flex-1"
                      disabled={!isDirty}
                      onClick={discardDraft}
                    >
                      Descartar
                    </Button>
                    <Button
                      type="button"
                      className="flex-1"
                      onClick={() => updateMutation.mutate()}
                      disabled={updateMutation.isPending}
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
              </FramePanel>
            </Frame>
          </aside>

          <main className={"min-w-0 flex-1" + (style === "elevated" ? " [&_[data-slot=frame]]:shadow-md" : "")}>
            <ThemePreviewShowcase iconLibrary={iconLibrary} />
          </main>
        </div>
      )}

      <ThemeCustomizerSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        mode={mode}
        onModeChange={setMode}
        getValue={getValue}
        isOverridden={isOverridden}
        onValueChange={setValue}
        onResetToken={resetToken}
        isDirty={isDirty}
        isSaving={updateMutation.isPending}
        onDiscard={discardDraft}
        onSave={() => updateMutation.mutate()}
      />
    </div>
  );
}

import { formatOklch } from "@/lib/oklch";

export type Mode = "light" | "dark";
export type TokenMap = Record<string, string>;
export type ThemeTokens = { light: TokenMap; dark: TokenMap };

export const DEFAULT_RADIUS_REM = 0.5;

/**
 * The theme currently shipped in globals.css. Selecting this preset means
 * "use the base CSS defaults" -- its token maps stay empty so it behaves
 * exactly like "restore defaults" instead of duplicating the same values.
 */
const ESPRESSO_TOKENS: ThemeTokens = { light: {}, dark: {} };

/**
 * The literal values ESPRESSO_TOKENS falls back to. Needed because the
 * advanced editor and contrast checks must always have a concrete color to
 * read, even when nothing is overridden yet.
 */
export const ESPRESSO_RESOLVED_DEFAULTS: ThemeTokens = {
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

export const PRIMARY_FOREGROUND: Record<Mode, string> = {
  light: "oklch(0.985 0.003 65)",
  dark: "oklch(0.16 0.015 45)",
};

// Error/success carry meaning, not brand identity -- every preset keeps them fixed.
const FIXED_DESTRUCTIVE: Record<Mode, string> = {
  light: "oklch(0.49 0.16 28)",
  dark: "oklch(0.68 0.14 28)",
};
const FIXED_SUCCESS: Record<Mode, string> = {
  light: "oklch(0.45 0.08 145)",
  dark: "oklch(0.7 0.075 145)",
};
// chart-5 mirrors the light "success" value in both modes, matching the
// original Espresso defaults (a stable "positive" data color).
const FIXED_CHART_5 = FIXED_SUCCESS.light;

export const TOKEN_GROUPS: { name: string; tokens: { key: string; label: string; description?: string }[] }[] = [
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

type PresetConfig = {
  id: string;
  name: string;
  /** Shared hue for surfaces and the brand color -- chroma stays tiny on
   * surfaces, so the hue only shows up as a faint, cohesive tint. */
  hue: number;
  neutralChromaLight: number;
  neutralChromaDark: number;
  primaryLLight: number;
  primaryCLight: number;
  primaryLDark: number;
  primaryCDark: number;
  accentCLight: number;
  accentCDark: number;
};

function buildPresetTokens(cfg: Omit<PresetConfig, "id" | "name">): ThemeTokens {
  const {
    hue,
    neutralChromaLight,
    neutralChromaDark,
    primaryLLight,
    primaryCLight,
    primaryLDark,
    primaryCDark,
    accentCLight,
    accentCDark,
  } = cfg;

  const c = (l: number, chroma: number, h: number = hue) => formatOklch({ l, c: chroma, h });

  const chart1 = c(primaryLLight, primaryCLight);
  const chart2 = c(Math.min(primaryLLight + 0.135, 0.72), primaryCLight * 0.85);
  const chart3 = c(Math.min(primaryLLight + 0.255, 0.8), primaryCLight * 0.55, hue + 20);
  const chart4 = c(0.58, 0.02);

  const light: TokenMap = {
    "--background": c(0.965, neutralChromaLight),
    "--foreground": c(0.245, 0.024),
    "--card": c(0.985, neutralChromaLight * 0.5),
    "--secondary": c(0.925, neutralChromaLight),
    "--muted": c(0.925, neutralChromaLight * 1.3),
    "--border": c(0.84, neutralChromaLight * 1.3),
    "--primary": c(primaryLLight, primaryCLight),
    "--primary-active": c(primaryLLight - 0.065, primaryCLight),
    "--accent": c(0.87, accentCLight),
    "--ring": c(primaryLLight, primaryCLight),
    "--destructive": FIXED_DESTRUCTIVE.light,
    "--success": FIXED_SUCCESS.light,
    "--chart-1": chart1,
    "--chart-2": chart2,
    "--chart-3": chart3,
    "--chart-4": chart4,
    "--chart-5": FIXED_CHART_5,
  };

  const dark: TokenMap = {
    "--background": c(0.135, neutralChromaDark),
    "--foreground": c(0.92, 0.01),
    "--card": c(0.175, neutralChromaDark * 1.15),
    "--secondary": c(0.205, neutralChromaDark),
    "--muted": c(0.22, neutralChromaDark * 1.15),
    "--border": c(0.29, neutralChromaDark * 1.15),
    "--primary": c(primaryLDark, primaryCDark),
    "--primary-active": c(Math.min(primaryLDark + 0.07, 0.9), primaryCDark * 0.85),
    "--accent": c(0.27, accentCDark),
    "--ring": c(primaryLDark, primaryCDark),
    "--destructive": FIXED_DESTRUCTIVE.dark,
    "--success": FIXED_SUCCESS.dark,
    "--chart-1": chart1,
    "--chart-2": chart2,
    "--chart-3": chart3,
    "--chart-4": chart4,
    "--chart-5": FIXED_CHART_5,
  };

  return { light, dark };
}

const GENERATED_PRESET_CONFIGS: PresetConfig[] = [
  {
    id: "neutral",
    name: "Neutral",
    hue: 60,
    neutralChromaLight: 0.003,
    neutralChromaDark: 0.006,
    primaryLLight: 0.22,
    primaryCLight: 0.01,
    primaryLDark: 0.85,
    primaryCDark: 0.01,
    accentCLight: 0.012,
    accentCDark: 0.012,
  },
  {
    id: "slate",
    name: "Slate",
    hue: 230,
    neutralChromaLight: 0.006,
    neutralChromaDark: 0.012,
    primaryLLight: 0.4,
    primaryCLight: 0.035,
    primaryLDark: 0.74,
    primaryCDark: 0.03,
    accentCLight: 0.03,
    accentCDark: 0.03,
  },
  {
    id: "rose",
    name: "Rose",
    hue: 10,
    neutralChromaLight: 0.006,
    neutralChromaDark: 0.012,
    primaryLLight: 0.5,
    primaryCLight: 0.18,
    primaryLDark: 0.72,
    primaryCDark: 0.15,
    accentCLight: 0.045,
    accentCDark: 0.035,
  },
  {
    id: "blue",
    name: "Blue",
    hue: 250,
    neutralChromaLight: 0.006,
    neutralChromaDark: 0.012,
    primaryLLight: 0.46,
    primaryCLight: 0.125,
    primaryLDark: 0.72,
    primaryCDark: 0.14,
    accentCLight: 0.04,
    accentCDark: 0.032,
  },
  {
    id: "teal",
    name: "Teal",
    hue: 195,
    neutralChromaLight: 0.006,
    neutralChromaDark: 0.012,
    primaryLLight: 0.42,
    primaryCLight: 0.068,
    primaryLDark: 0.72,
    primaryCDark: 0.1,
    accentCLight: 0.035,
    accentCDark: 0.028,
  },
  {
    id: "green",
    name: "Green",
    hue: 142,
    neutralChromaLight: 0.006,
    neutralChromaDark: 0.012,
    primaryLLight: 0.45,
    primaryCLight: 0.14,
    primaryLDark: 0.74,
    primaryCDark: 0.13,
    accentCLight: 0.04,
    accentCDark: 0.032,
  },
  {
    id: "violet",
    name: "Violet",
    hue: 300,
    neutralChromaLight: 0.006,
    neutralChromaDark: 0.012,
    primaryLLight: 0.42,
    primaryCLight: 0.19,
    primaryLDark: 0.74,
    primaryCDark: 0.15,
    accentCLight: 0.045,
    accentCDark: 0.035,
  },
  {
    id: "amber",
    name: "Amber",
    hue: 75,
    neutralChromaLight: 0.006,
    neutralChromaDark: 0.012,
    primaryLLight: 0.5,
    primaryCLight: 0.1,
    primaryLDark: 0.78,
    primaryCDark: 0.13,
    accentCLight: 0.04,
    accentCDark: 0.032,
  },
];

export type ThemePreset = {
  id: string;
  name: string;
  /** oklch() string used to paint the swatch button. */
  swatch: string;
  tokens: ThemeTokens;
};

export const PRESETS: ThemePreset[] = [
  {
    id: "espresso",
    name: "Espresso",
    swatch: "oklch(0.405 0.06 45)",
    tokens: ESPRESSO_TOKENS,
  },
  ...GENERATED_PRESET_CONFIGS.map((cfg) => ({
    id: cfg.id,
    name: cfg.name,
    swatch: formatOklch({ l: cfg.primaryLLight, c: cfg.primaryCLight, h: cfg.hue }),
    tokens: buildPresetTokens(cfg),
  })),
];

export const ESPRESSO_PRESET = PRESETS[0];

function normalizeTokenMap(tokens: TokenMap): string {
  return JSON.stringify(
    Object.entries(tokens)
      .filter(([, value]) => value !== undefined)
      .sort(([a], [b]) => a.localeCompare(b)),
  );
}

export function sameTokens(a: ThemeTokens, b: ThemeTokens): boolean {
  return normalizeTokenMap(a.light) === normalizeTokenMap(b.light) && normalizeTokenMap(a.dark) === normalizeTokenMap(b.dark);
}

export function findActivePreset(tokens: ThemeTokens): ThemePreset | null {
  return PRESETS.find((preset) => sameTokens(preset.tokens, tokens)) ?? null;
}

/**
 * A preset's own tokens, filled in with the Espresso resolved defaults for
 * any key it leaves unset (in practice, only Espresso itself is sparse).
 * Use this wherever a concrete color is needed, e.g. for the advanced
 * editor's baseline values.
 */
export function resolvePresetTokens(preset: ThemePreset): ThemeTokens {
  return {
    light: { ...ESPRESSO_RESOLVED_DEFAULTS.light, ...preset.tokens.light },
    dark: { ...ESPRESSO_RESOLVED_DEFAULTS.dark, ...preset.tokens.dark },
  };
}

import { formatOklch } from "@/lib/oklch";

export type Mode = "light" | "dark";
export type TokenMap = Record<string, string>;
export type ThemeTokens = { light: TokenMap; dark: TokenMap };

export const DEFAULT_RADIUS_REM = 0.5;

export const RADIUS_OPTIONS: { label: string; value: number }[] = [
  { label: "Nenhum", value: 0 },
  { label: "Pequeno", value: 0.3 },
  { label: "Padrão", value: DEFAULT_RADIUS_REM },
  { label: "Grande", value: 0.75 },
];

export type FontOption = {
  id: string;
  label: string;
  /** Family name as registered with the Google Fonts CSS2 API. */
  googleFamily: string;
  /** Value written to the CSS var: quoted family + generic fallback. */
  stack: string;
};

// A small curated set (not the full Google Fonts catalog) -- each is loaded
// on demand via a <link> tag when selected (see use-google-font.ts), same
// approach shadcn's own theme playground uses so arbitrary fonts don't have
// to be bundled at build time.
export const HEADING_FONT_OPTIONS: FontOption[] = [
  { id: "bricolage", label: "Bricolage Grotesque", googleFamily: "Bricolage Grotesque", stack: "'Bricolage Grotesque', system-ui, sans-serif" },
  { id: "space-grotesk", label: "Space Grotesk", googleFamily: "Space Grotesk", stack: "'Space Grotesk', system-ui, sans-serif" },
  { id: "playfair", label: "Playfair Display", googleFamily: "Playfair Display", stack: "'Playfair Display', Georgia, serif" },
  { id: "poppins", label: "Poppins", googleFamily: "Poppins", stack: "'Poppins', system-ui, sans-serif" },
  { id: "inter-heading", label: "Inter", googleFamily: "Inter", stack: "'Inter', system-ui, sans-serif" },
];

export const BODY_FONT_OPTIONS: FontOption[] = [
  { id: "inter", label: "Inter", googleFamily: "Inter", stack: "'Inter', system-ui, sans-serif" },
  { id: "roboto", label: "Roboto", googleFamily: "Roboto", stack: "'Roboto', system-ui, sans-serif" },
  { id: "ibm-plex", label: "IBM Plex Sans", googleFamily: "IBM Plex Sans", stack: "'IBM Plex Sans', system-ui, sans-serif" },
  { id: "source-sans", label: "Source Sans 3", googleFamily: "Source Sans 3", stack: "'Source Sans 3', system-ui, sans-serif" },
  { id: "jetbrains-mono", label: "JetBrains Mono", googleFamily: "JetBrains Mono", stack: "'JetBrains Mono', monospace" },
];

/**
 * The neutral shadcn-style theme shipped as the `.admin-scope` CSS defaults
 * in globals.css. Selecting this preset means "use those base defaults" --
 * its token maps stay empty so it behaves like "restore defaults" instead of
 * duplicating the same values. This is the admin panel's default preset.
 */
const NEUTRAL_TOKENS: ThemeTokens = { light: {}, dark: {} };

/**
 * The literal values NEUTRAL_TOKENS falls back to (mirrors `.admin-scope` /
 * `.dark .admin-scope` in globals.css). Needed because the advanced editor
 * and contrast checks must always have a concrete color to read, even when
 * nothing is overridden yet.
 */
export const NEUTRAL_RESOLVED_DEFAULTS: ThemeTokens = {
  light: {
    "--background": "oklch(1 0 0)",
    "--foreground": "oklch(0% 0 0)",
    "--card": "oklch(1 0 0)",
    "--secondary": "oklch(0.97 0 0)",
    "--muted": "oklch(0.97 0 0)",
    "--border": "oklch(0.922 0 0)",
    "--primary": "oklch(0% 0 0)",
    "--primary-active": "oklch(0.269 0 0)",
    "--accent": "oklch(0.97 0 0)",
    "--ring": "oklch(0.708 0 0)",
    "--destructive": "oklch(0.577 0.245 27.325)",
    "--success": "oklch(0.52 0.13 145)",
    "--chart-1": "oklch(0.205 0 0)",
    "--chart-2": "oklch(0.446 0 0)",
    "--chart-3": "oklch(0.556 0 0)",
    "--chart-4": "oklch(0.708 0 0)",
    "--chart-5": "oklch(0.52 0.13 145)",
  },
  dark: {
    "--background": "oklch(0.145 0 0)",
    "--foreground": "oklch(0.985 0 0)",
    "--card": "oklch(0.205 0 0)",
    "--secondary": "oklch(0.269 0 0)",
    "--muted": "oklch(0.269 0 0)",
    "--border": "oklch(1 0 0 / 10%)",
    "--primary": "oklch(0.922 0 0)",
    "--primary-active": "oklch(0.78 0 0)",
    "--accent": "oklch(0.371 0 0)",
    "--ring": "oklch(0.556 0 0)",
    "--destructive": "oklch(0.704 0.191 22.216)",
    "--success": "oklch(0.72 0.14 145)",
    "--chart-1": "oklch(0.92 0 0)",
    "--chart-2": "oklch(0.78 0 0)",
    "--chart-3": "oklch(0.65 0 0)",
    "--chart-4": "oklch(0.45 0 0)",
    "--chart-5": "oklch(0.72 0.14 145)",
  },
};

/**
 * Literal values for the old brand ("Espresso") look, kept as a selectable
 * preset so the admin can still opt back into it -- but it's no longer the
 * default, and it never touches the landing page's own :root/.dark tokens.
 */
const ESPRESSO_TOKENS_CONCRETE: ThemeTokens = {
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
  light: "oklch(0.985 0 0)",
  dark: "oklch(0.205 0 0)",
};

// Error/success carry meaning, not brand identity -- every preset keeps them fixed.
const FIXED_DESTRUCTIVE: Record<Mode, string> = {
  light: "oklch(0.577 0.245 27.325)",
  dark: "oklch(0.704 0.191 22.216)",
};
const FIXED_SUCCESS: Record<Mode, string> = {
  light: "oklch(0.52 0.13 145)",
  dark: "oklch(0.72 0.14 145)",
};
// chart-5 mirrors the light "success" value in both modes, matching the
// neutral defaults (a stable "positive" data color).
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
    id: "neutral",
    name: "Neutral",
    swatch: "oklch(0% 0 0)",
    tokens: NEUTRAL_TOKENS,
  },
  {
    id: "espresso",
    name: "Espresso",
    swatch: "oklch(0.405 0.06 45)",
    tokens: ESPRESSO_TOKENS_CONCRETE,
  },
  ...GENERATED_PRESET_CONFIGS.map((cfg) => ({
    id: cfg.id,
    name: cfg.name,
    swatch: formatOklch({ l: cfg.primaryLLight, c: cfg.primaryCLight, h: cfg.hue }),
    tokens: buildPresetTokens(cfg),
  })),
];

/** Default/baseline preset for the admin panel -- neutral shadcn palette. */
export const NEUTRAL_PRESET = PRESETS[0];

export const CHART_KEYS = ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"] as const;
export const FONT_KEYS = ["--admin-font-heading", "--admin-font-sans"] as const;
// Keys that are managed by their own independent picker, not by Base Color.
const INDEPENDENT_KEYS: readonly string[] = [...CHART_KEYS, ...FONT_KEYS];

export function pickKeys(map: TokenMap, keys: readonly string[]): TokenMap {
  return Object.fromEntries(Object.entries(map).filter(([key]) => keys.includes(key)));
}

export function omitKeys(map: TokenMap, keys: readonly string[]): TokenMap {
  return Object.fromEntries(Object.entries(map).filter(([key]) => !keys.includes(key)));
}

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

/**
 * "Base Color" preset detection -- ignores chart and font keys so it stays
 * accurate once Chart Color and fonts are picked independently (see
 * findActiveChartPreset below).
 */
export function findActivePreset(tokens: ThemeTokens): ThemePreset | null {
  const targetLight = omitKeys(tokens.light, INDEPENDENT_KEYS);
  const targetDark = omitKeys(tokens.dark, INDEPENDENT_KEYS);
  return (
    PRESETS.find((preset) => {
      const presetLight = omitKeys(preset.tokens.light, INDEPENDENT_KEYS);
      const presetDark = omitKeys(preset.tokens.dark, INDEPENDENT_KEYS);
      return (
        normalizeTokenMap(presetLight) === normalizeTokenMap(targetLight) &&
        normalizeTokenMap(presetDark) === normalizeTokenMap(targetDark)
      );
    }) ?? null
  );
}

/**
 * "Chart Color" preset detection -- the inverse of the above: only compares
 * --chart-*, against each preset's *resolved* (concrete) values, since a
 * sparse preset like Neutral has no chart overrides of its own.
 */
export function findActiveChartPreset(tokens: ThemeTokens): ThemePreset | null {
  const targetLight = pickKeys(tokens.light, CHART_KEYS);
  const targetDark = pickKeys(tokens.dark, CHART_KEYS);
  return (
    PRESETS.find((preset) => {
      const resolved = resolvePresetTokens(preset);
      return (
        normalizeTokenMap(pickKeys(resolved.light, CHART_KEYS)) === normalizeTokenMap(targetLight) &&
        normalizeTokenMap(pickKeys(resolved.dark, CHART_KEYS)) === normalizeTokenMap(targetDark)
      );
    }) ?? null
  );
}

/**
 * A preset's own tokens, filled in with the neutral resolved defaults for
 * any key it leaves unset (in practice, only Neutral itself is sparse).
 * Use this wherever a concrete color is needed, e.g. for the advanced
 * editor's baseline values.
 */
export function resolvePresetTokens(preset: ThemePreset): ThemeTokens {
  return {
    light: { ...NEUTRAL_RESOLVED_DEFAULTS.light, ...preset.tokens.light },
    dark: { ...NEUTRAL_RESOLVED_DEFAULTS.dark, ...preset.tokens.dark },
  };
}

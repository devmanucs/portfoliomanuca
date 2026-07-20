export type Oklch = { l: number; c: number; h: number };

const OKLCH_RE = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/i;

export function parseOklch(value: string): Oklch | null {
  const match = OKLCH_RE.exec(value.trim());
  if (!match) return null;
  const [, l, c, h] = match;
  return { l: Number(l), c: Number(c), h: Number(h) };
}

export function formatOklch({ l, c, h }: Oklch): string {
  const round = (n: number, digits: number) => Number(n.toFixed(digits));
  return `oklch(${round(l, 3)} ${round(c, 3)} ${round(h, 1)})`;
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

/** OKLCH -> linear sRGB, using Björn Ottosson's OKLab matrices. Components may fall outside [0,1] for out-of-gamut colors. */
export function oklchToLinearSrgb({ l, c, h }: Oklch): { r: number; g: number; b: number } {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const lCubed = l_ ** 3;
  const mCubed = m_ ** 3;
  const sCubed = s_ ** 3;

  return {
    r: 4.0767416621 * lCubed - 3.3077115913 * mCubed + 0.2309699292 * sCubed,
    g: -1.2684380046 * lCubed + 2.6097574011 * mCubed - 0.3413193965 * sCubed,
    b: -0.0041960863 * lCubed - 0.7034186147 * mCubed + 1.707614701 * sCubed,
  };
}

function linearToGamma(channel: number): number {
  const c = clamp01(channel);
  return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
}

/** OKLCH -> #rrggbb, for contexts that can't render oklch() directly (e.g. canvas). */
export function oklchToHex(color: Oklch): string {
  const { r, g, b } = oklchToLinearSrgb(color);
  const toByte = (channel: number) => Math.round(linearToGamma(channel) * 255);
  const hex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${hex(toByte(r))}${hex(toByte(g))}${hex(toByte(b))}`;
}

function relativeLuminance({ r, g, b }: { r: number; g: number; b: number }): number {
  return 0.2126 * clamp01(r) + 0.7152 * clamp01(g) + 0.0722 * clamp01(b);
}

/** WCAG contrast ratio (1-21) between two OKLCH colors. */
export function contrastRatio(a: Oklch, b: Oklch): number {
  const lumA = relativeLuminance(oklchToLinearSrgb(a));
  const lumB = relativeLuminance(oklchToLinearSrgb(b));
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
}

export function meetsAA(ratio: number, largeText = false): boolean {
  return ratio >= (largeText ? 3 : 4.5);
}

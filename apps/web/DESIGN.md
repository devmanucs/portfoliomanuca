# Design System

## Direction

Ateliê digital: madeira escura, metal escovado e a precisão de uma bancada de trabalho traduzidos com clareza de produto. A paleta combina espresso, prata e bronze em baixa dosagem; tipografia e padrões podem ser expressivos, enquanto frames e formulários permanecem precisos.

## Color

- Canvas: `oklch(0.965 0.006 65)`
- Canvas soft: `oklch(0.94 0.008 65)`
- Card: `oklch(0.985 0.003 65)`
- Ink: `oklch(0.245 0.025 45)`
- Body: `oklch(0.37 0.02 50)`
- Muted: `oklch(0.49 0.014 55)`
- Hairline: `oklch(0.84 0.008 65)`
- Hairline soft: `oklch(0.91 0.006 65)`
- Hairline strong: `oklch(0.74 0.012 60)`
- Primary / Espresso: `oklch(0.405 0.06 45)`
- Primary active: `oklch(0.34 0.055 45)`
- Copper: `oklch(0.54 0.08 45)`
- Bronze: `oklch(0.66 0.07 65)`
- Silver: `oklch(0.79 0.012 65)`
- Success: `oklch(0.45 0.08 145)`
- Error: `oklch(0.49 0.16 28)`

Timeline colors are scoped to in-product agent timelines only and use tonal variations of bronze, taupe, silver and cocoa.

## Typography

Inter carries body and product UI. Bricolage Grotesque gives titles a playful, poster-like character without sacrificing legibility. JetBrains Mono is mandatory for code, terminal and IDE surfaces.

- Mega display: fluid 40–72px, 1.1 line-height, `-0.03em`
- Large display: fluid 30–36px, 1.2 line-height, `-0.02em`
- Medium display: 26px, 1.25 line-height
- Body: 16px, 1.5 line-height
- Small body: 14px, 1.5 line-height
- Caption: 13px
- Uppercase caption: 11px / 600 / `0.08em`

## Layout

Content caps at 1200px. Sections use a fluid rhythm that reaches 80px. Cards and frames use 16–24px internal gaps. Layout is editorial but evidence-led: project imagery and product frames carry the page.

## Shape and Depth

Inputs and small controls use 8px radius. Frames and cards use 12–16px. Primary CTAs on brand/marketing surfaces (hero, section actions) use full pill radius (`radius="pill"` on `Button`) for a warmer, less corporate hand — this is scoped to the public portfolio, not the admin product UI, which keeps the 8px default. Tags and badges are pill-shaped. Depth comes from card-on-silver surface contrast and 1px hairlines only—no decorative drop shadows or glass effects.

## Components

- `Frame` is a single-bordered, `overflow-hidden` container. Stacked `FramePanel`s inside it are divided by a single hairline (`border-t` on the panel that follows another panel), never by two independently-bordered panels — nested double borders are a bug, not a style.
- Buttons use espresso for primary actions. Copper and bronze are narrative accents, never competing CTAs. Public-facing CTAs are pill-shaped; admin/product buttons stay 8px.
- Cards remain for true independent records; avoid nested cards.
- Badges use strong neutral surfaces and pill radius. Timeline pastels never represent generic states — a single hue (primary) carries timeline dots, distinguished by fill (current) vs. outline (past), not by hue-per-item.
- Code and terminal surfaces use the soft canvas, mono type and a single pane divider. No decorative macOS-style traffic-light dots — a single accent dot plus the filename is enough chrome.
- The hero avoids a hard-bordered card floating over the animated background; content sits directly on it with a soft radial scrim (not a rectangle) for legibility.

## Motion

Use short ease-out movement only where it clarifies entry or state. The page must remain fully readable before animation runs. Respect `prefers-reduced-motion`.

## Responsive

Mobile below 640px uses 32–40px hero type and single-column frames. Tablet compresses multi-pane compositions. Desktop restores the full 12-column editorial layout and 72px hero ceiling.

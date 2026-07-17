---
target: src/features/calendario-de-producao/components/drawers/ancora-producao-sheet.tsx
total_score: 17
p0_count: 0
p1_count: 3
timestamp: 2026-06-30T18-55-51Z
slug: ducao-components-drawers-ancora-producao-sheet-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Add/remove saves immediately, but there is no visible saved/saving confirmation. |
| 2 | Match System / Real World | 2 | Domain labels are compact but missing accents and context; configured date is shown as raw ISO-like date. |
| 3 | User Control and Freedom | 2 | User can close and remove, but there is no undo, cancel/revert, or edit existing anchor. |
| 4 | Consistency and Standards | 2 | Uses project primitives, but delete is a raw icon button and close label is English. |
| 5 | Error Prevention | 1 | Invalid states silently disable Add; delete is immediate; switching type clears draft. |
| 6 | Recognition Rather Than Recall | 2 | Options are visible, but disabled action does not explain what is missing. |
| 7 | Flexibility and Efficiency | 1 | No edit path, no keyboard affordance communicated, no efficient handling for repeated anchors. |
| 8 | Aesthetic and Minimalist Design | 3 | Compact and focused, but hierarchy is too flat for a production-critical form. |
| 9 | Error Recovery | 1 | No inline validation, recovery copy, or preservation guarantee on invalid input. |
| 10 | Help and Documentation | 1 | No contextual explanation for what each anchor type means. |
| **Total** | | **17/40** | **Poor** |

## Anti-Patterns Verdict

**LLM assessment**: This does not read as AI-generated. It reads as a real internal product component that is under-specified: compact, sober, and on-system, but too quiet about state, validation, and consequence. The biggest issue is not visual slop; it is operational ambiguity.

**Deterministic scan**: `detect.mjs --json src/features/calendario-de-producao/components/drawers/ancora-producao-sheet.tsx` returned exit code `0` and `[]`. No automated slop findings, no rule names, and no file locations.

**Visual overlays**: No reliable overlay was produced. Browser automation was not exposed to the assessment agent, and local Playwright was not available from the project.

## Overall Impression

The drawer is visually restrained and mostly aligned with the product shell, but it is too implicit for a production scheduling workflow. It asks the user to trust that "Adicionar" mutates the configured anchors immediately, while offering no save confirmation, no undo, no validation reason, and no edit path.

## What's Working

- The task is scoped: configured anchors, type selection, required fields, and add action all live in one compact drawer.
- The visual treatment matches the product register: dark surface, modest typography, clear modal boundary, and no decorative noise.
- The type selector keeps the main decision visible instead of hiding it behind a dropdown.

## Priority Issues

### [P1] Save model is ambiguous

**Why it matters**: `handleAdd` and `handleRemove` call `onSave` immediately, but the UI reads like a temporary form inside a drawer. Users cannot tell whether closing cancels, saves, or preserves current changes.

**Fix**: Either make it clearly autosaving with a small status line and success feedback, or switch to explicit footer actions: `Cancelar` and `Salvar ancoras`. If immediate save stays, label the action more specifically, such as `Adicionar ancora`, and show a saved state after mutation.

**Suggested command**: `$impeccable harden src/features/calendario-de-producao/components/drawers/ancora-producao-sheet.tsx`

### [P1] Validation is silent

**Why it matters**: The primary button is disabled until the draft is valid, but the user gets no reason. For date/time and numeric thresholds, this creates guesswork.

**Fix**: Add inline helper/error text under the active input. Use clear rules: date required, value must be greater than zero, and selected type determines the required unit.

**Suggested command**: `$impeccable clarify src/features/calendario-de-producao/components/drawers/ancora-producao-sheet.tsx`

### [P1] Labels are not programmatically associated

**Why it matters**: The `Label` components are not connected to inputs through `htmlFor`/`id`, so screen-reader and click-target behavior is weaker than it should be for a form-heavy operational surface.

**Fix**: Add stable ids for each active input and connect the labels. Also localize the close sr-only text from `Close` to `Fechar`.

**Suggested command**: `$impeccable audit src/features/calendario-de-producao/components/drawers/ancora-producao-sheet.tsx`

### [P2] Destructive remove action has no recovery

**Why it matters**: The trash icon immediately saves the removed list. A misclick changes production configuration without confirmation or undo.

**Fix**: Add undo toast for removal, or require confirmation when removing an anchor that already existed before opening the drawer. At minimum, use the shared `Button` primitive for consistent focus/size states.

**Suggested command**: `$impeccable harden src/features/calendario-de-producao/components/drawers/ancora-producao-sheet.tsx`

### [P2] Information hierarchy is too compressed

**Why it matters**: Existing anchors compress type, date, value, and delete into one low-contrast row. This is okay for one anchor, but weak once multiple anchors exist or values are similar.

**Fix**: Use a small structured row: type as primary label, date/value as labeled metadata, and a consistent action cell. Format dates with locale, accents, and units.

**Suggested command**: `$impeccable layout src/features/calendario-de-producao/components/drawers/ancora-producao-sheet.tsx`

## Persona Red Flags

**Alex (Power User)**: Cannot edit an existing anchor in place. Repeated anchors require manual re-entry. There is no visible keyboard accelerator or bulk path, and the immediate-save model makes fast correction risky.

**Sam (Accessibility-Dependent User)**: Form labels are visually present but not associated with inputs. The trash action is a small icon button. Disabled `Adicionar` communicates state visually but not the missing requirement.

**Jordan (First-Timer)**: "Ancora", "Inicio fixo", "Horas", and "Toneladas" are domain terms with no helper text. The disabled button does not explain what needs to happen next.

**Riley (Stress Tester)**: Switching type erases draft input. `datetime-local` is converted with `toISOString`, which may shift apparent date/time across timezone boundaries. Deletion persists immediately with no recovery.

## Minor Observations

- Text lacks Portuguese accents: `Ancoras`, `producao`, `Inicio`, `inicio`.
- The existing anchor display uses `2026-05-25 — 100` without unit labeling.
- `min={0}` permits `0` at the input level while code rejects `<= 0`.
- Button height `h-7` and trash icon size are compact; verify touch and keyboard focus affordance.
- `key={data.produtoName}` may reset local draft when product name changes, but not when anchor identity changes for the same product.

## Questions to Consider

- Is this drawer meant to autosave, or should it behave like a draft with an explicit final save?
- Should users be able to edit anchors, or is delete-and-recreate acceptable for production planning?
- What does each anchor type mean operationally, and can the UI teach that in one sentence without opening docs?
- What is the safest recovery path after removing the wrong anchor?

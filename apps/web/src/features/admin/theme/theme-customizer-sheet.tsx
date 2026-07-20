"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { OklchColorField } from "@/features/admin/components/oklch-color-field";
import type { Oklch } from "@/lib/oklch";
import { DEFAULT_RADIUS_REM, TOKEN_GROUPS, type Mode, type ThemePreset } from "./presets";
import { ThemePresetPicker } from "./theme-preset-picker";

const RADIUS_OPTIONS: { label: string; value: number }[] = [
  { label: "Nenhum", value: 0 },
  { label: "Pequeno", value: 0.3 },
  { label: "Padrão", value: DEFAULT_RADIUS_REM },
  { label: "Grande", value: 0.75 },
];

type ContrastCheck = { ratio: number; pass: boolean };

type ThemeCustomizerSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activePresetId: string | null;
  onSelectPreset: (preset: ThemePreset) => void;
  radiusRem: number;
  onRadiusChange: (value: number) => void;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  getValue: (mode: Mode, key: string) => Oklch;
  isOverridden: (mode: Mode, key: string) => boolean;
  onValueChange: (mode: Mode, key: string, value: Oklch) => void;
  onResetToken: (mode: Mode, key: string) => void;
  textContrast: ContrastCheck;
  primaryContrast: ContrastCheck;
  isDirty: boolean;
  isSaving: boolean;
  onDiscard: () => void;
  onSave: () => void;
};

export function ThemeCustomizerSheet({
  open,
  onOpenChange,
  activePresetId,
  onSelectPreset,
  radiusRem,
  onRadiusChange,
  mode,
  onModeChange,
  getValue,
  isOverridden,
  onValueChange,
  onResetToken,
  textContrast,
  primaryContrast,
  isDirty,
  isSaving,
  onDiscard,
  onSave,
}: ThemeCustomizerSheetProps) {
  const closestRadiusOption =
    RADIUS_OPTIONS.find((option) => Math.abs(option.value - radiusRem) < 0.01)?.value ?? null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border">
          <SheetTitle>Personalizar aparência</SheetTitle>
          <SheetDescription>
            Escolha um preset de cor e veja o impacto ao lado. As mudanças ficam em rascunho até você salvar.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
          <FieldSet>
            <FieldLegend variant="label">Cor</FieldLegend>
            <ThemePresetPicker activePresetId={activePresetId} onSelect={onSelectPreset} />
          </FieldSet>

          <FieldSet>
            <FieldLegend variant="label">Raio</FieldLegend>
            <ToggleGroup
              type="single"
              variant="outline"
              value={closestRadiusOption !== null ? String(closestRadiusOption) : undefined}
              onValueChange={(value) => {
                if (value) onRadiusChange(Number(value));
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

          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
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

          <Accordion type="single" collapsible>
            <AccordionItem value="advanced">
              <AccordionTrigger className="text-sm">Personalização avançada</AccordionTrigger>
              <AccordionContent>
                <div className="mb-4">
                  <Tabs value={mode} onValueChange={(value) => onModeChange(value as Mode)}>
                    <TabsList>
                      <TabsTrigger value="light">Claro</TabsTrigger>
                      <TabsTrigger value="dark">Escuro</TabsTrigger>
                    </TabsList>
                  </Tabs>
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
                          onChange={(value) => onValueChange(mode, token.key, value)}
                          onReset={() => onResetToken(mode, token.key)}
                        />
                      ))}
                    </FieldSet>
                  ))}
                </FieldGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <SheetFooter className="flex-row justify-end gap-2 border-t border-border">
          <Button type="button" variant="ghost" disabled={!isDirty} onClick={onDiscard}>
            Descartar rascunho
          </Button>
          <Button type="button" onClick={onSave} disabled={isSaving}>
            Salvar aparência
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

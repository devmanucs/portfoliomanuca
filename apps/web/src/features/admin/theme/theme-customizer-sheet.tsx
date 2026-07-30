"use client";

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
import { OklchColorField } from "@/features/admin/components/oklch-color-field";
import type { Oklch } from "@/lib/oklch";
import { TOKEN_GROUPS, type Mode } from "./presets";

type ThemeCustomizerSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  getValue: (mode: Mode, key: string) => Oklch;
  isOverridden: (mode: Mode, key: string) => boolean;
  onValueChange: (mode: Mode, key: string, value: Oklch) => void;
  onResetToken: (mode: Mode, key: string) => void;
  isDirty: boolean;
  isSaving: boolean;
  onDiscard: () => void;
  onSave: () => void;
};

export function ThemeCustomizerSheet({
  open,
  onOpenChange,
  mode,
  onModeChange,
  getValue,
  isOverridden,
  onValueChange,
  onResetToken,
  isDirty,
  isSaving,
  onDiscard,
  onSave,
}: ThemeCustomizerSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border">
          <SheetTitle>Personalização avançada</SheetTitle>
          <SheetDescription>
            Ajuste cada token de cor manualmente. As mudanças ficam em rascunho até você salvar.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          <Tabs value={mode} onValueChange={(value) => onModeChange(value as Mode)}>
            <TabsList>
              <TabsTrigger value="light">Claro</TabsTrigger>
              <TabsTrigger value="dark">Escuro</TabsTrigger>
            </TabsList>
          </Tabs>

          <Accordion type="single" collapsible defaultValue={TOKEN_GROUPS[0]?.name}>
            {TOKEN_GROUPS.map((group) => (
              <AccordionItem key={group.name} value={group.name}>
                <AccordionTrigger className="text-sm">{group.name}</AccordionTrigger>
                <AccordionContent>
                  <FieldGroup>
                    <FieldSet>
                      <FieldLegend variant="label" className="sr-only">
                        {group.name}
                      </FieldLegend>
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
                  </FieldGroup>
                </AccordionContent>
              </AccordionItem>
            ))}
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

"use client";

import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRESETS, type ThemePreset } from "./presets";

type ThemePresetPickerProps = {
  activePresetId: string | null;
  onSelect: (preset: ThemePreset) => void;
};

export function ThemePresetPicker({ activePresetId, onSelect }: ThemePresetPickerProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {PRESETS.map((preset) => {
        const active = preset.id === activePresetId;
        return (
          <button
            key={preset.id}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(preset)}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-lg border border-border bg-card px-2 py-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted",
              active && "border-ring bg-muted text-foreground",
            )}
          >
            <span
              aria-hidden
              className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-border-strong/40"
              style={{ backgroundColor: preset.swatch }}
            >
              {active ? (
                <CheckIcon size={14} className="text-white mix-blend-difference" />
              ) : null}
            </span>
            <span className="truncate">{preset.name}</span>
          </button>
        );
      })}
    </div>
  );
}

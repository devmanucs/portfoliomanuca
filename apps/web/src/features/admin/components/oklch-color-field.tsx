"use client";

import { useEffect, useId, useState } from "react";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatOklch, parseOklch, type Oklch } from "@/lib/oklch";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowTurnBackwardIcon } from "@hugeicons/core-free-icons";

type OklchColorFieldProps = {
  label: string;
  description?: string;
  value: Oklch;
  isOverridden?: boolean;
  onChange: (value: Oklch) => void;
  onReset?: () => void;
};

export function OklchColorField({
  label,
  description,
  value,
  isOverridden = false,
  onChange,
  onReset,
}: OklchColorFieldProps) {
  const fieldId = useId();
  const [rawValue, setRawValue] = useState(() => formatOklch(value));

  // Resync the raw text field whenever the value changes from outside this
  // component (reset button, tab switch, async load) rather than from the
  // slider/input handlers below, which already keep it in sync themselves.
  useEffect(() => {
    setRawValue(formatOklch(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.l, value.c, value.h]);

  function commitRaw(next: string) {
    setRawValue(next);
    const parsed = parseOklch(next);
    if (parsed) onChange(parsed);
  }

  function updateChannel(channel: keyof Oklch, channelValue: number) {
    const next = { ...value, [channel]: channelValue };
    onChange(next);
    setRawValue(formatOklch(next));
  }

  return (
    <Field orientation="responsive">
      <FieldLabel htmlFor={fieldId} className="w-40 shrink-0">
        <span
          aria-hidden
          className="size-6 shrink-0 rounded-md border border-border"
          style={{ backgroundColor: formatOklch(value) }}
        />
        <span className="flex flex-col gap-0.5">
          <span>{label}</span>
          {description ? <FieldDescription>{description}</FieldDescription> : null}
        </span>
      </FieldLabel>

      <FieldContent className={cn("gap-2", isOverridden && "text-foreground")}>
        <div className="flex items-center gap-2">
          <Input
            id={fieldId}
            value={rawValue}
            onChange={(event) => setRawValue(event.target.value)}
            onBlur={(event) => commitRaw(event.target.value)}
            className="h-8 font-mono text-xs"
            spellCheck={false}
          />
          {onReset ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 shrink-0 text-muted-foreground disabled:opacity-30"
              onClick={onReset}
              disabled={!isOverridden}
              aria-label={`Restaurar ${label} para o padrão`}
              title="Restaurar padrão"
            >
              <HugeiconsIcon icon={ArrowTurnBackwardIcon} size={14} />
            </Button>
          ) : null}
        </div>

        <ChannelSlider
          label="L"
          value={value.l}
          min={0}
          max={1}
          step={0.005}
          onChange={(next) => updateChannel("l", next)}
        />
        <ChannelSlider
          label="C"
          value={value.c}
          min={0}
          max={0.37}
          step={0.002}
          onChange={(next) => updateChannel("c", next)}
        />
        <ChannelSlider
          label="H"
          value={value.h}
          min={0}
          max={360}
          step={1}
          onChange={(next) => updateChannel("h", next)}
        />
      </FieldContent>
    </Field>
  );
}

function ChannelSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-3 shrink-0 text-[11px] text-muted-foreground">{label}</span>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([next]) => onChange(next)}
      />
      <span className="w-10 shrink-0 text-right font-mono text-[11px] tabular-nums text-muted-foreground">
        {value.toFixed(step < 1 ? 3 : 0)}
      </span>
    </div>
  );
}

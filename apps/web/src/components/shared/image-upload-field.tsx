"use client";

import { useRef, useState } from "react";
import { Controller, useFormContext, type FieldValues, type Path } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";
import { HugeiconsIcon } from "@hugeicons/react";
import { AlertCircleIcon, Image02Icon, Upload04Icon } from "@hugeicons/core-free-icons";

type ImageUploadFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  description?: string;
};

/**
 * Single-image field: paste a URL (kept for convenience/existing data) or
 * send a file from disk, which uploads via POST /uploads and swaps the
 * field value for the returned public URL. Shows a live preview so it's
 * unambiguous which image is set here (as opposed to the gallery list).
 */
export function ImageUploadField<T extends FieldValues>({ name, label, description }: ImageUploadFieldProps<T>) {
  const form = useFormContext<T>();
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, isUploading } = useFileUpload();
  const [broken, setBroken] = useState(false);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label ? <FieldLabel htmlFor={name}>{label}</FieldLabel> : null}
          <div className="flex items-center gap-3">
            {field.value && !broken ? (
              // eslint-disable-next-line @next/next/no-img-element -- arbitrary external URLs, not a static asset
              <img
                src={field.value}
                alt=""
                onError={() => setBroken(true)}
                onLoad={() => setBroken(false)}
                className="size-16 shrink-0 rounded-lg border border-border object-cover"
              />
            ) : (
              <span
                className="flex size-16 shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg border border-dashed border-border text-muted-foreground"
                title={broken ? "Não foi possível carregar essa URL" : undefined}
              >
                <HugeiconsIcon icon={field.value && broken ? AlertCircleIcon : Image02Icon} size={18} />
                {field.value && broken ? <span className="text-[9px]">inválida</span> : null}
              </span>
            )}

            <div className="flex flex-1 flex-col gap-1.5">
              <Input
                id={name}
                value={field.value ?? ""}
                onChange={(event) => {
                  setBroken(false);
                  field.onChange(event);
                }}
                placeholder="Cole uma URL ou envie um arquivo"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  if (!file) return;
                  const url = await upload(file);
                  if (url) {
                    setBroken(false);
                    field.onChange(url);
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-fit gap-1.5"
                disabled={isUploading}
                onClick={() => inputRef.current?.click()}
              >
                <HugeiconsIcon icon={Upload04Icon} size={14} />
                {isUploading ? "Enviando..." : "Enviar do computador"}
              </Button>
            </div>
          </div>
          {description ? <FieldDescription>{description}</FieldDescription> : null}
          {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
        </Field>
      )}
    />
  );
}

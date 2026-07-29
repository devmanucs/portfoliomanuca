"use client";

import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFileUpload } from "@/hooks/use-file-upload";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete02Icon,
  Image02Icon,
  PlusSignIcon,
  Upload04Icon,
  Video01Icon,
} from "@hugeicons/core-free-icons";
import {
  useFieldArray,
  useFormContext,
  type ArrayPath,
  type FieldValues,
  type Path,
} from "react-hook-form";

const VIDEO_MARKERS = [".mp4", ".webm", ".ogg", ".mov", "youtube.com", "youtu.be", "vimeo.com"];

function isVideoUrl(url: string): boolean {
  const lower = url.toLowerCase();
  return VIDEO_MARKERS.some((marker) => lower.includes(marker));
}

type MediaListFieldProps<T extends FieldValues> = {
  name: ArrayPath<T>;
  label?: string;
  description?: string;
};

/**
 * Repeatable list of media URLs (images or videos, auto-detected by
 * extension/host so the schema stays a plain string[] -- no upload backend
 * yet, just a friendlier way to manage more than one URL than a raw
 * newline-separated textarea).
 */
export function MediaListField<T extends FieldValues>({ name, label, description }: MediaListFieldProps<T>) {
  const form = useFormContext<T>();
  const { fields, append, remove } = useFieldArray({ control: form.control, name });
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, isUploading } = useFileUpload();

  async function handleFilesSelected(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    for (const file of Array.from(fileList)) {
      const url = await upload(file);
      if (url) append({ url } as never);
    }
  }

  return (
    <div className="space-y-2">
      {label ? <p className="text-sm font-medium text-foreground">{label}</p> : null}

      {fields.length > 0 ? (
        <div className="space-y-2">
          {fields.map((field, index) => {
            const urlPath = `${name}.${index}.url` as Path<T>;
            const url: string = form.watch(urlPath) ?? "";
            const video = isVideoUrl(url);
            return (
              <div key={field.id} className="flex items-center gap-2">
                <Badge variant="outline" className="w-20 shrink-0 justify-center gap-1">
                  <HugeiconsIcon icon={video ? Video01Icon : Image02Icon} size={12} />
                  {video ? "Vídeo" : "Imagem"}
                </Badge>
                <Input {...form.register(urlPath)} placeholder="https://..." className="flex-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0 text-destructive"
                  onClick={() => remove(index)}
                  aria-label="Remover mídia"
                >
                  <HugeiconsIcon icon={Delete02Icon} size={14} />
                </Button>
              </div>
            );
          })}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => append({ url: "" } as never)}
        >
          <HugeiconsIcon icon={PlusSignIcon} size={14} />
          Adicionar URL
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={(event) => {
            void handleFilesSelected(event.target.files);
            event.target.value = "";
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
        >
          <HugeiconsIcon icon={Upload04Icon} size={14} />
          {isUploading ? "Enviando..." : "Enviar do computador"}
        </Button>
      </div>

      {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
    </div>
  );
}

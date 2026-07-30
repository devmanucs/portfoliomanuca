"use client";

import { useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "@/core/api/axios-instance";

/**
 * Uploads a file to POST /uploads (apps/api/src/uploads) and returns its
 * public URL. Uses native fetch instead of the shared axios instance so we
 * don't have to fight its fixed `Content-Type: application/json` default --
 * the browser sets the correct multipart boundary on its own for FormData.
 */
export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);

  async function upload(file: File): Promise<string | null> {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE_URL}/uploads`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(data?.message ?? "Falha ao enviar arquivo.");
      }

      const data = (await response.json()) as { url: string };
      return data.url;
    } catch (error) {
      toast.error("Erro ao enviar arquivo", {
        description: error instanceof Error ? error.message : undefined,
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  }

  return { upload, isUploading };
}

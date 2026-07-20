"use client";

import { useRef } from "react";
import type { TokenMap } from "./presets";

const CACHE_KEY = "pm:theme-draft";
const WRITE_DEBOUNCE_MS = 250;

export type ThemeDraftCacheValue = {
  light: TokenMap;
  dark: TokenMap;
  radiusRem: number;
};

export function useThemeDraftCache() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function read(): ThemeDraftCacheValue | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (
        typeof parsed !== "object" ||
        parsed === null ||
        typeof parsed.light !== "object" ||
        typeof parsed.dark !== "object" ||
        typeof parsed.radiusRem !== "number"
      ) {
        return null;
      }
      return parsed as ThemeDraftCacheValue;
    } catch {
      return null;
    }
  }

  function write(value: ThemeDraftCacheValue) {
    if (typeof window === "undefined") return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      try {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify(value));
      } catch {
        // Storage full or unavailable (private mode) -- the draft still
        // works in-memory for this session, it just won't survive reload.
      }
    }, WRITE_DEBOUNCE_MS);
  }

  function clear() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(CACHE_KEY);
  }

  return { read, write, clear };
}

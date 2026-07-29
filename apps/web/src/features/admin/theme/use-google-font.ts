"use client";

import { useEffect } from "react";

const loadedFamilies = new Set<string>();

/**
 * Injects a Google Fonts <link> for each family the moment it's selected in
 * the customizer, so the curated list in presets.ts (HEADING_FONT_OPTIONS /
 * BODY_FONT_OPTIONS) doesn't need every font bundled at build time. Links
 * are cached by family and never removed, so switching back and forth
 * between previously-picked fonts doesn't re-fetch them.
 */
export function useGoogleFont(googleFamily: string | undefined) {
  useEffect(() => {
    if (!googleFamily || loadedFamilies.has(googleFamily)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      googleFamily,
    )}:wght@400;500;600;700&display=swap`;
    document.head.appendChild(link);
    loadedFamilies.add(googleFamily);
  }, [googleFamily]);
}

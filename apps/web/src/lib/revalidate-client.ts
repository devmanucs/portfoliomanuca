"use client";

// Best-effort: called from admin mutations so the public landing page picks
// up the change immediately instead of waiting out the ISR fallback window
// (see lib/api-server.ts). A failure here never blocks the mutation itself.
export async function triggerRevalidate(tags: string[]) {
  if (!tags.length) return;

  try {
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tags }),
    });
  } catch {
    // Ignored -- the 1h fallback revalidate still applies.
  }
}

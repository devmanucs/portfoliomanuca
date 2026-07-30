const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

// `tags` let admin mutations invalidate exactly the resource they changed via
// POST /api/revalidate (see hooks/use-crud.ts), instead of waiting out the
// revalidate window below -- which stays only as a safety-net fallback.
export async function serverFetch<T>(path: string, tags?: string[]): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 3600, tags },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

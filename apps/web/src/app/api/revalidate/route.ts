import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Lets admin mutations invalidate exactly the landing-page fetches they
// changed (see lib/revalidate-client.ts + hooks/use-crud.ts) instead of
// waiting out the 1h fallback revalidate window in lib/api-server.ts.
// Gated the same way /admin pages are (the `access_token` cookie set by
// admin login) rather than a separate secret -- only a logged-in admin can
// reach this.
export async function POST(request: NextRequest) {
  const token = request.cookies.get("access_token");
  if (!token?.value) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { tags?: string[] } | null;
  const tags = body?.tags?.filter((tag) => typeof tag === "string" && tag.length > 0);

  if (!tags?.length) {
    return NextResponse.json({ error: "missing tags" }, { status: 400 });
  }

  for (const tag of tags) {
    // Next 16 requires a cache-life profile as the 2nd arg; "max" means
    // "invalidate regardless of profile" (recommended for Route Handlers,
    // where the Server-Action-only `updateTag` isn't available).
    revalidateTag(tag, "max");
  }

  return NextResponse.json({ revalidated: tags });
}

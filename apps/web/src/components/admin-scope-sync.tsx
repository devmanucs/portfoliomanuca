"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Keeps `admin-scope` on <html> in sync with the current route on
 * client-side (App Router) navigations. The blocking inline script in
 * layout.tsx only covers the very first paint (hard load/refresh) -- SPA
 * transitions between "/" and "/admin/**" never re-run it, so without this
 * the class would get stuck from whichever route was loaded first.
 */
export function AdminScopeSync() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.toggle(
      "admin-scope",
      pathname?.startsWith("/admin") ?? false,
    );
  }, [pathname]);

  return null;
}

import { cookies } from "next/headers";
import { AdminShell } from "@/features/admin/components/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultSidebarOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return <AdminShell defaultSidebarOpen={defaultSidebarOpen}>{children}</AdminShell>;
}

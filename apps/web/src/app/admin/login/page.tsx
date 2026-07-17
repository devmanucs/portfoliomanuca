import { Suspense } from "react";
import AdminLoginPageClient from "./login-client";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-muted-foreground">Carregando...</div>}>
      <AdminLoginPageClient />
    </Suspense>
  );
}

"use client";

import { FormFields } from "@/components/shared/form-fields";
import { Button } from "@/components/ui/button";
import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame";
import { login } from "@/features/admin-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, File02Icon, Folder02Icon, Loading03Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Informe um email válido"),
  password: z.string().min(1, "Informe a senha"),
});

type LoginForm = z.infer<typeof loginSchema>;

const benefits = [
  {
    icon: Folder02Icon,
    title: "Projetos sempre atuais",
    description: "Edite cases, experiências e skills sem alterar o código.",
  },
  {
    icon: File02Icon,
    title: "Currículo conectado",
    description: "O PDF usa a mesma fonte de dados do seu portfólio.",
  },
];

export default function AdminLoginPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginForm) {
    try {
      await login(values);
      toast.success("Bem-vinda ao seu painel");
      const from = searchParams.get("from") ?? "/admin";
      router.push(from);
      router.refresh();
    } catch {
      toast.error("Não foi possível entrar", {
        description: "Confira o email, a senha e se a API está rodando.",
      });
    }
  }

  return (
    <main className="min-h-screen bg-background p-4 sm:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] flex-col sm:min-h-[calc(100vh-4rem)]">
        <Button asChild variant="ghost" className="mb-6 w-fit">
          <Link href="/">
            <HugeiconsIcon icon={ArrowLeft02Icon} data-icon="inline-start" />
            Voltar ao portfólio
          </Link>
        </Button>

        <Frame className="my-auto max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] ">
            <FramePanel className="flex justify-between bg-muted gap-12 border-0 items-center p-7 sm:p-10 lg:rounded-r-none">
              <div>
                <p className="mb-3 text-sm font-medium text-primary">
                  Área privada!
                </p>
                <h1 className="max-w-md text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl">
                  Meu portfólio, organizado em um só lugar.
                </h1>
              </div>
            </FramePanel>

            <FramePanel className="flex min-h-136 flex-col justify-center border-0 p-7 sm:p-10 lg:rounded-l-none">
              <div className="mx-auto w-full max-w-sm">
                <FormProvider {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                  >
                    <FormFields.Input<LoginForm>
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="exemplo@email.com"
                      autoComplete="email"
                      autoFocus
                    />
                    <FormFields.Input<LoginForm>
                      name="password"
                      label="Senha"
                      type="password"
                      placeholder="Digite sua senha"
                      autoComplete="current-password"
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="mt-1 w-full"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                          <HugeiconsIcon icon={Loading03Icon}
                            data-icon="inline-start"
                            className="animate-spin"
                          />
                      ) : (
                        "Entrar"
                      )}
                    </Button>
                  </form>
                </FormProvider>
              </div>
            </FramePanel>
          </div>
        </Frame>

      </div>
    </main>
  );
}

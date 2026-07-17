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
import {
  ArrowLeft,
  FileText,
  FolderKanban,
  LoaderCircle,
  LockKeyhole,
} from "lucide-react";
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
    icon: FolderKanban,
    title: "Projetos sempre atuais",
    description: "Edite cases, experiências e skills sem alterar o código.",
  },
  {
    icon: FileText,
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
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-5xl flex-col sm:min-h-[calc(100vh-4rem)]">
        <Button asChild variant="ghost" className="mb-6 w-fit">
          <Link href="/">
            <ArrowLeft data-icon="inline-start" />
            Voltar ao portfólio
          </Link>
        </Button>

        <Frame className="my-auto w-full">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <FramePanel className="flex flex-col justify-between gap-12 border-0 bg-muted p-7 sm:p-10 lg:rounded-r-none">
              <div>
                <div className="mb-10 flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-lg font-semibold">M</span>
                </div>
                <p className="mb-3 text-sm font-medium text-primary">
                  Área privada
                </p>
                <h1 className="max-w-md text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl">
                  Seu portfólio, organizado em um só lugar.
                </h1>
                <p className="mt-5 max-w-md text-sm leading-6 text-body">
                  Atualize seu trabalho e gere o currículo sem duplicar
                  informações.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                {benefits.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border-strong bg-card text-primary">
                      <Icon size={16} aria-hidden />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {title}
                      </p>
                      <p className="mt-1 text-sm leading-5 text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FramePanel>

            <FramePanel className="flex min-h-[34rem] flex-col justify-center border-0 p-7 sm:p-10 lg:rounded-l-none">
              <div className="mx-auto w-full max-w-sm">
                <FrameHeader className="mb-8 px-0 py-0">
                  <div className="mb-4 flex size-10 items-center justify-center rounded-md border border-border bg-canvas-soft text-primary">
                    <LockKeyhole size={18} aria-hidden />
                  </div>
                  <FrameTitle className="text-2xl font-semibold">
                    Bem-vinda de volta
                  </FrameTitle>
                  <FrameDescription className="mt-2 leading-6">
                    Entre com as credenciais definidas no seed da API.
                  </FrameDescription>
                </FrameHeader>

                <FormProvider {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                  >
                    <FormFields.Input<LoginForm>
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="seu@email.com"
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
                        <>
                          <LoaderCircle
                            data-icon="inline-start"
                            className="animate-spin"
                          />
                          Entrando...
                        </>
                      ) : (
                        "Entrar no painel"
                      )}
                    </Button>
                  </form>
                </FormProvider>

                <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
                  Este acesso não possui cadastro público nem recuperação de
                  senha. As credenciais são administradas pela API.
                </p>
              </div>
            </FramePanel>
          </div>
        </Frame>
      </div>
    </main>
  );
}

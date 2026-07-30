"use client";

import { PageHeader } from "@/components/ds/page-header";
import { FormFields } from "@/components/shared/form-fields";
import { Button } from "@/components/ui/button";
import { api } from "@/core/api/axios-instance";
import { useFetch } from "@/hooks/use-crud";
import { triggerRevalidate } from "@/lib/revalidate-client";
import type { IProfile } from "@portfoliomanuca/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useEffect } from "react";

const profileSchema = z.object({
  fullName: z.string().min(1),
  headline: z.string().min(1),
  bio: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  website: z.string().optional(),
  avatarUrl: z.string().optional(),
  resumeSummary: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function AdminProfilePage() {
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useFetch<IProfile>({
    queryKey: ["profile"],
    route: "/profile",
  });

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      headline: "",
      bio: "",
      email: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        fullName: profile.fullName,
        headline: profile.headline,
        bio: profile.bio,
        email: profile.email,
        phone: profile.phone ?? "",
        location: profile.location ?? "",
        linkedin: profile.linkedin ?? "",
        github: profile.github ?? "",
        website: profile.website ?? "",
        avatarUrl: profile.avatarUrl ?? "",
        resumeSummary: profile.resumeSummary ?? "",
      });
    }
  }, [profile, form]);

  const updateMutation = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (values: ProfileForm) => {
      const { data } = await api.patch<IProfile>("/profile", values, {
        showToast: false,
        operation: "atualizar",
      });
      // Awaited so the landing page's cache is already purged by the time
      // the success toast shows -- otherwise a fast reload could still race
      // the revalidation and briefly show stale data.
      await triggerRevalidate(["profile"]);
      return data;
    },
    onSuccess: () => {
      toast.success("Perfil atualizado");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => toast.error("Erro ao atualizar perfil"),
  });

  function onSubmit(values: ProfileForm) {
    updateMutation.mutate(values);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="conteúdo"
        title="Perfil"
        description="Informações exibidas no hero e no currículo."
      />

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-3">
              <FormFields.Section title="Identidade" className="xl:col-span-2">
                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormFields.Input<ProfileForm> name="fullName" label="Nome completo" />
                    <FormFields.Input<ProfileForm> name="headline" label="Headline" />
                  </div>
                  <FormFields.Textarea<ProfileForm> name="bio" label="Bio" rows={4} />
                  <FormFields.Textarea<ProfileForm>
                    name="resumeSummary"
                    label="Resumo do currículo"
                    rows={3}
                  />
                </div>
              </FormFields.Section>

              <FormFields.Section title="Contato">
                <div className="grid gap-4">
                  <FormFields.Input<ProfileForm> name="email" label="Email" type="email" />
                  <FormFields.Input<ProfileForm> name="phone" label="Telefone" />
                  <FormFields.Input<ProfileForm> name="location" label="Localização" />
                  <FormFields.Input<ProfileForm> name="avatarUrl" label="Avatar URL" />
                </div>
              </FormFields.Section>
            </div>

            <FormFields.Section title="Redes & Links">
              <div className="grid gap-4 sm:grid-cols-3">
                <FormFields.Input<ProfileForm> name="linkedin" label="LinkedIn" />
                <FormFields.Input<ProfileForm> name="github" label="GitHub" />
                <FormFields.Input<ProfileForm> name="website" label="Website" />
              </div>
            </FormFields.Section>

            <Button type="submit" disabled={updateMutation.isPending}>
              Salvar perfil
            </Button>
          </form>
        </FormProvider>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import { EmptyState } from "@/components/ds/empty-state";
import { PageHeader } from "@/components/ds/page-header";
import { FormFields } from "@/components/shared/form-fields";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreate, useDelete, useFetch, useUpdate } from "@/hooks/use-crud";
import { useModal } from "@/hooks/use-modal";
import type { EmploymentType, IExperience } from "@portfoliomanuca/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const experienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  location: z.string().optional(),
  employmentType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "FREELANCE",
    "INTERNSHIP",
  ]),
  periodLabel: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  description: z.string().min(1),
  highlights: z.string().optional(),
  includeInResume: z.boolean().optional(),
});

type ExperienceForm = z.infer<typeof experienceSchema>;

const employmentOptions = [
  { value: "FULL_TIME", label: "Tempo integral" },
  { value: "PART_TIME", label: "Meio período" },
  { value: "FREELANCE", label: "Freelance" },
  { value: "INTERNSHIP", label: "Estágio" },
];

function toFormValues(item?: IExperience): ExperienceForm {
  return {
    company: item?.company ?? "",
    role: item?.role ?? "",
    location: item?.location ?? "",
    employmentType: item?.employmentType ?? "FULL_TIME",
    periodLabel: item?.periodLabel ?? "",
    startDate: item?.startDate?.slice(0, 10) ?? "",
    endDate: item?.endDate?.slice(0, 10) ?? "",
    description: item?.description ?? "",
    highlights: item?.highlights?.join("\n") ?? "",
    includeInResume: item?.includeInResume ?? true,
  };
}

export default function AdminExperiencesPage() {
  const modal = useModal();
  const [editing, setEditing] = React.useState<IExperience | null>(null);

  const { data: experiences = [], isLoading } = useFetch<IExperience[]>({
    queryKey: ["experiences"],
    route: "/experiences",
    sortBy: "order",
  });

  const form = useForm<ExperienceForm>({
    resolver: zodResolver(experienceSchema),
    defaultValues: toFormValues(),
  });

  const createMutation = useCreate<Partial<IExperience>>({
    route: "/experiences",
    mutationKey: ["create-experience"],
    queryInvalidationKeys: ["experiences"],
    onSuccess: () => modal.onClose(),
  });

  const updateMutation = useUpdate<Partial<IExperience>>({
    route: "/experiences",
    mutationKey: ["update-experience"],
    queryInvalidationKeys: ["experiences"],
    onSuccess: () => modal.onClose(),
  });

  const deleteMutation = useDelete({
    route: "/experiences",
    mutationKey: ["delete-experience"],
    queryInvalidationKeys: ["experiences"],
  });

  function openCreate() {
    setEditing(null);
    form.reset(toFormValues());
    modal.onOpen();
  }

  function openEdit(item: IExperience) {
    setEditing(item);
    form.reset(toFormValues(item));
    modal.onOpen();
  }

  function onSubmit(values: ExperienceForm) {
    const payload = {
      ...values,
      employmentType: values.employmentType as EmploymentType,
      highlights: values.highlights?.split("\n").filter(Boolean) ?? [],
      endDate: values.endDate || undefined,
    };

    if (editing) {
      updateMutation.mutate({ id: editing.id, formData: payload });
      return;
    }
    createMutation.mutate({ formData: payload });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="conteúdo"
        title="Experiências"
        description="Histórico profissional exibido no portfólio e currículo."
        actions={
          <Button onClick={openCreate} className="bg-sage text-background hover:bg-sage/90">
            <Plus size={16} />
            Nova experiência
          </Button>
        }
      />

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : experiences.length === 0 ? (
        <EmptyState title="Nenhuma experiência" description="Adicione a primeira experiência." />
      ) : (
        <div className="space-y-3">
          {experiences.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <div>
                <p className="font-medium">{item.role}</p>
                <p className="text-sm text-muted-foreground">
                  {item.company} · {item.periodLabel ?? "—"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEdit(item)}>
                  <Pencil size={14} />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                  onClick={() => deleteMutation.mutate({ id: item.id })}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={modal.open} onOpenChange={modal.onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar experiência" : "Nova experiência"}
            </DialogTitle>
          </DialogHeader>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormFields.Input<ExperienceForm> name="role" label="Cargo" />
              <FormFields.Input<ExperienceForm> name="company" label="Empresa" />
              <FormFields.Input<ExperienceForm> name="location" label="Local" />
              <FormFields.Select<ExperienceForm>
                name="employmentType"
                label="Tipo"
                options={employmentOptions}
              />
              <FormFields.Input<ExperienceForm>
                name="periodLabel"
                label="Período (rótulo)"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <FormFields.Input<ExperienceForm>
                  name="startDate"
                  label="Início"
                  type="date"
                />
                <FormFields.Input<ExperienceForm>
                  name="endDate"
                  label="Fim"
                  type="date"
                />
              </div>
              <FormFields.Textarea<ExperienceForm>
                name="description"
                label="Descrição"
                rows={3}
              />
              <FormFields.Textarea<ExperienceForm>
                name="highlights"
                label="Destaques (uma linha por item)"
                rows={3}
              />
              <FormFields.Switch<ExperienceForm>
                name="includeInResume"
                label="Incluir no currículo"
              />
              <DialogFooter>
                <Button type="submit" className="bg-sage text-background hover:bg-sage/90">
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}

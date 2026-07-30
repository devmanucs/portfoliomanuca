"use client";

import * as React from "react";
import { EmptyState } from "@/components/ds/empty-state";
import { PageHeader } from "@/components/ds/page-header";
import { AdminFormSheet } from "@/components/shared/admin-form-sheet";
import { FormFields } from "@/components/shared/form-fields";
import { TablePagination } from "@/components/shared/table-pagination";
import { Button } from "@/components/ui/button";
import { Frame, FrameDescription, FrameHeader, FramePanel, FrameTitle } from "@/components/ui/frame";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCreate, useDelete, useFetch, useUpdate } from "@/hooks/use-crud";
import { useModal } from "@/hooks/use-modal";
import { usePagination } from "@/hooks/use-pagination";
import type { EmploymentType, IExperience } from "@portfoliomanuca/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon, PencilEdit02Icon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const employmentLabels: Record<EmploymentType, string> = {
  FULL_TIME: "Tempo integral",
  PART_TIME: "Meio período",
  FREELANCE: "Freelance",
  INTERNSHIP: "Estágio",
};

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

  const { pageItems, page, pageCount, pageSize, setPage, setPageSize, total } = usePagination(experiences);

  const form = useForm<ExperienceForm>({
    resolver: zodResolver(experienceSchema),
    defaultValues: toFormValues(),
  });

  const createMutation = useCreate<Partial<IExperience>>({
    route: "/experiences",
    mutationKey: ["create-experience"],
    queryInvalidationKeys: ["experiences"],
    revalidateTags: ["experiences"],
    onSuccess: () => modal.onClose(),
  });

  const updateMutation = useUpdate<Partial<IExperience>>({
    route: "/experiences",
    mutationKey: ["update-experience"],
    queryInvalidationKeys: ["experiences"],
    revalidateTags: ["experiences"],
    onSuccess: () => modal.onClose(),
  });

  const deleteMutation = useDelete({
    route: "/experiences",
    mutationKey: ["delete-experience"],
    queryInvalidationKeys: ["experiences"],
    revalidateTags: ["experiences"],
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

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="conteúdo"
        title="Experiências"
        description="Histórico profissional exibido no portfólio e currículo."
        actions={
          <Button onClick={openCreate}>
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Nova experiência
          </Button>
        }
      />

      <Frame>
        <FrameHeader>
          <FrameTitle>Experiências cadastradas</FrameTitle>
          <FrameDescription>{experiences.length} registros no histórico.</FrameDescription>
        </FrameHeader>
        <FramePanel className="pt-0">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Carregando...</p>
          ) : experiences.length === 0 ? (
            <EmptyState title="Nenhuma experiência" description="Adicione a primeira experiência." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.role}</TableCell>
                    <TableCell className="text-muted-foreground">{item.company}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.periodLabel ?? "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {employmentLabels[item.employmentType]}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon-sm" onClick={() => openEdit(item)}>
                          <HugeiconsIcon icon={PencilEdit02Icon} size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive"
                          onClick={() => deleteMutation.mutate({ id: item.id })}
                        >
                          <HugeiconsIcon icon={Delete02Icon} size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <TablePagination
            page={page}
            pageCount={pageCount}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </FramePanel>
      </Frame>

      <FormProvider {...form}>
        <AdminFormSheet
          open={modal.open}
          onOpenChange={modal.onOpenChange}
          title={editing ? "Editar experiência" : "Nova experiência"}
          description="Histórico profissional exibido no portfólio e no currículo."
          onSubmit={form.handleSubmit(onSubmit)}
          isSubmitting={isSaving}
        >
          <FormFields.Section title="Cargo">
            <div className="grid gap-4">
              <FormFields.Input<ExperienceForm> name="role" label="Cargo" />
              <FormFields.Input<ExperienceForm> name="company" label="Empresa" />
              <div className="grid gap-4 sm:grid-cols-2">
                <FormFields.Input<ExperienceForm> name="location" label="Local" />
                <FormFields.Select<ExperienceForm>
                  name="employmentType"
                  label="Tipo"
                  options={employmentOptions}
                />
              </div>
            </div>
          </FormFields.Section>

          <FormFields.Section title="Período">
            <div className="grid gap-4">
              <FormFields.Input<ExperienceForm> name="periodLabel" label="Período (rótulo)" />
              <div className="grid gap-4 sm:grid-cols-2">
                <FormFields.Input<ExperienceForm> name="startDate" label="Início" type="date" />
                <FormFields.Input<ExperienceForm> name="endDate" label="Fim" type="date" />
              </div>
            </div>
          </FormFields.Section>

          <FormFields.Section title="Descrição">
            <div className="grid gap-4">
              <FormFields.Textarea<ExperienceForm> name="description" label="Descrição" rows={3} />
              <FormFields.Textarea<ExperienceForm>
                name="highlights"
                label="Destaques (uma linha por item)"
                rows={3}
              />
              <FormFields.Switch<ExperienceForm>
                name="includeInResume"
                label="Incluir no currículo"
              />
            </div>
          </FormFields.Section>
        </AdminFormSheet>
      </FormProvider>
    </div>
  );
}

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
import type { ISkill } from "@portfoliomanuca/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon, PencilEdit02Icon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const skillSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  level: z.coerce.number().optional(),
  iconKey: z.string().optional(),
  color: z.string().optional(),
  order: z.coerce.number().optional(),
});

type SkillForm = z.infer<typeof skillSchema>;

function toFormValues(item?: ISkill): SkillForm {
  return {
    name: item?.name ?? "",
    category: item?.category ?? "general",
    level: item?.level ?? undefined,
    iconKey: item?.iconKey ?? "",
    color: item?.color ?? "",
    order: item?.order ?? 0,
  };
}

export default function AdminSkillsPage() {
  const modal = useModal();
  const [editing, setEditing] = React.useState<ISkill | null>(null);

  const { data: skills = [], isLoading } = useFetch<ISkill[]>({
    queryKey: ["skills"],
    route: "/skills",
    sortBy: "order",
  });

  const { pageItems, page, pageCount, pageSize, setPage, setPageSize, total } = usePagination(skills);

  const form = useForm<SkillForm>({
    resolver: zodResolver(skillSchema),
    defaultValues: toFormValues(),
  });

  const createMutation = useCreate<Partial<ISkill>>({
    route: "/skills",
    mutationKey: ["create-skill"],
    queryInvalidationKeys: ["skills"],
    revalidateTags: ["skills"],
    onSuccess: () => modal.onClose(),
  });

  const updateMutation = useUpdate<Partial<ISkill>>({
    route: "/skills",
    mutationKey: ["update-skill"],
    queryInvalidationKeys: ["skills"],
    revalidateTags: ["skills"],
    onSuccess: () => modal.onClose(),
  });

  const deleteMutation = useDelete({
    route: "/skills",
    mutationKey: ["delete-skill"],
    queryInvalidationKeys: ["skills"],
    revalidateTags: ["skills"],
  });

  function openCreate() {
    setEditing(null);
    form.reset(toFormValues());
    modal.onOpen();
  }

  function openEdit(item: ISkill) {
    setEditing(item);
    form.reset(toFormValues(item));
    modal.onOpen();
  }

  function onSubmit(values: SkillForm) {
    const payload = {
      ...values,
      iconKey: values.iconKey || undefined,
      color: values.color || undefined,
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
        title="Skills"
        description="Tecnologias e habilidades exibidas no portfólio."
        actions={
          <Button onClick={openCreate}>
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Nova skill
          </Button>
        }
      />

      <Frame>
        <FrameHeader>
          <FrameTitle>Skills cadastradas</FrameTitle>
          <FrameDescription>{skills.length} no total, ordenadas por prioridade.</FrameDescription>
        </FrameHeader>
        <FramePanel className="pt-0">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Carregando...</p>
          ) : skills.length === 0 ? (
            <EmptyState title="Nenhuma skill" description="Adicione skills ao portfólio." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-muted-foreground">{item.category}</TableCell>
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
          title={editing ? "Editar skill" : "Nova skill"}
          description="Tecnologia ou habilidade exibida no portfólio."
          onSubmit={form.handleSubmit(onSubmit)}
          isSubmitting={isSaving}
        >
          <FormFields.Section title="Detalhes">
            <div className="grid gap-4">
              <FormFields.Input<SkillForm> name="name" label="Nome" />
              <FormFields.Input<SkillForm> name="category" label="Categoria" />
              <div className="grid gap-4 sm:grid-cols-2">
                <FormFields.Input<SkillForm> name="iconKey" label="Icon key (opcional)" />
                <FormFields.Input<SkillForm> name="color" label="Cor (hex)" />
              </div>
              <FormFields.Input<SkillForm> name="order" label="Ordem" type="number" />
            </div>
          </FormFields.Section>
        </AdminFormSheet>
      </FormProvider>
    </div>
  );
}

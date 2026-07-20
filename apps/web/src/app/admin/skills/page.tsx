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
import type { ISkill } from "@portfoliomanuca/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus, Trash2 } from "lucide-react";
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

  const form = useForm<SkillForm>({
    resolver: zodResolver(skillSchema),
    defaultValues: toFormValues(),
  });

  const createMutation = useCreate<Partial<ISkill>>({
    route: "/skills",
    mutationKey: ["create-skill"],
    queryInvalidationKeys: ["skills"],
    onSuccess: () => modal.onClose(),
  });

  const updateMutation = useUpdate<Partial<ISkill>>({
    route: "/skills",
    mutationKey: ["update-skill"],
    queryInvalidationKeys: ["skills"],
    onSuccess: () => modal.onClose(),
  });

  const deleteMutation = useDelete({
    route: "/skills",
    mutationKey: ["delete-skill"],
    queryInvalidationKeys: ["skills"],
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

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="conteúdo"
        title="Skills"
        description="Tecnologias e habilidades exibidas no portfólio."
        actions={
          <Button onClick={openCreate} className="bg-sage text-background hover:bg-sage/90">
            <Plus size={16} />
            Nova skill
          </Button>
        }
      />

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : skills.length === 0 ? (
        <EmptyState title="Nenhuma skill" description="Adicione skills ao portfólio." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {skills.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.category}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEdit(item)}>
                  <Pencil size={14} />
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar skill" : "Nova skill"}</DialogTitle>
          </DialogHeader>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormFields.Input<SkillForm> name="name" label="Nome" />
              <FormFields.Input<SkillForm> name="category" label="Categoria" />
              <FormFields.Input<SkillForm>
                name="iconKey"
                label="Icon key (opcional)"
              />
              <FormFields.Input<SkillForm>
                name="color"
                label="Cor (hex)"
              />
              <FormFields.Input<SkillForm>
                name="order"
                label="Ordem"
                type="number"
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

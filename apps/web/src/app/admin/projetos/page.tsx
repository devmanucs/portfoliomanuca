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
import type { IProject, ProjectFocus } from "@portfoliomanuca/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  focus: z.enum(["design", "development", "hybrid"]),
  description: z.string().min(1),
  impact: z.string().min(1),
  context: z.string().min(1),
  problem: z.string().min(1),
  process: z.string().min(1),
  result: z.string().min(1),
  myRole: z.string().min(1),
  coverImage: z.string().min(1),
  gallery: z.string().optional(),
  featured: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
  includeInResume: z.boolean().optional(),
});

type ProjectForm = z.infer<typeof projectSchema>;

const focusOptions = [
  { value: "design", label: "Design" },
  { value: "development", label: "Desenvolvimento" },
  { value: "hybrid", label: "Híbrido" },
];

const statusOptions = [
  { value: "PUBLISHED", label: "Publicado" },
  { value: "DRAFT", label: "Rascunho" },
];

function toFormValues(project?: IProject): ProjectForm {
  return {
    slug: project?.slug ?? "",
    title: project?.title ?? "",
    category: project?.category ?? "",
    focus: project?.focus ?? "development",
    description: project?.description ?? "",
    impact: project?.impact ?? "",
    context: project?.context ?? "",
    problem: project?.problem ?? "",
    process: project?.process?.join("\n") ?? "",
    result: project?.result ?? "",
    myRole: project?.myRole ?? "",
    coverImage: project?.coverImage ?? "",
    gallery: project?.gallery?.join("\n") ?? "",
    featured: project?.featured ?? false,
    status: project?.status ?? "PUBLISHED",
    includeInResume: project?.includeInResume ?? false,
  };
}

function toPayload(values: ProjectForm) {
  return {
    ...values,
    process: values.process.split("\n").filter(Boolean),
    gallery: values.gallery?.split("\n").filter(Boolean) ?? [],
    focus: values.focus as ProjectFocus,
  };
}

export default function AdminProjectsPage() {
  const modal = useModal();
  const [editing, setEditing] = React.useState<IProject | null>(null);

  const { data: projects = [], isLoading } = useFetch<IProject[]>({
    queryKey: ["projects", "admin"],
    route: "/projects/admin/all",
  });

  const form = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: toFormValues(),
  });

  const createMutation = useCreate<Partial<IProject>>({
    route: "/projects",
    mutationKey: ["create-project"],
    queryInvalidationKeys: ["projects"],
    onSuccess: () => modal.onClose(),
  });

  const updateMutation = useUpdate<Partial<IProject>>({
    route: "/projects",
    mutationKey: ["update-project"],
    queryInvalidationKeys: ["projects"],
    onSuccess: () => modal.onClose(),
  });

  const deleteMutation = useDelete({
    route: "/projects",
    mutationKey: ["delete-project"],
    queryInvalidationKeys: ["projects"],
  });

  function openCreate() {
    setEditing(null);
    form.reset(toFormValues());
    modal.onOpen();
  }

  function openEdit(project: IProject) {
    setEditing(project);
    form.reset(toFormValues(project));
    modal.onOpen();
  }

  function onSubmit(values: ProjectForm) {
    const payload = toPayload(values);
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
        title="Projetos"
        description="Gerencie cases publicados no portfólio."
        actions={
          <Button onClick={openCreate} className="bg-sage text-background hover:bg-sage/90">
            <Plus size={16} />
            Novo projeto
          </Button>
        }
      />

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : projects.length === 0 ? (
        <EmptyState
          title="Nenhum projeto"
          description="Crie o primeiro projeto ou publique via seed da API."
        />
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <div>
                <p className="font-medium">{project.title}</p>
                <p className="text-sm text-muted-foreground">
                  {project.category} · {project.status}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEdit(project)}>
                  <Pencil size={14} />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                  onClick={() => deleteMutation.mutate({ id: project.id })}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={modal.open} onOpenChange={modal.onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar projeto" : "Novo projeto"}
            </DialogTitle>
          </DialogHeader>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormFields.Input<ProjectForm> name="title" label="Título" />
                <FormFields.Input<ProjectForm> name="slug" label="Slug" />
                <FormFields.Input<ProjectForm> name="category" label="Categoria" />
                <FormFields.Select<ProjectForm>
                  name="focus"
                  label="Foco"
                  options={focusOptions}
                />
                <FormFields.Select<ProjectForm>
                  name="status"
                  label="Status"
                  options={statusOptions}
                />
                <FormFields.Input<ProjectForm>
                  name="coverImage"
                  label="Imagem de capa"
                />
              </div>
              <FormFields.Textarea<ProjectForm>
                name="description"
                label="Descrição"
                rows={3}
              />
              <FormFields.Textarea<ProjectForm>
                name="context"
                label="Contexto"
                rows={2}
              />
              <FormFields.Textarea<ProjectForm>
                name="problem"
                label="Problema"
                rows={2}
              />
              <FormFields.Textarea<ProjectForm>
                name="process"
                label="Processo (uma linha por item)"
                rows={4}
              />
              <FormFields.Textarea<ProjectForm>
                name="result"
                label="Resultado"
                rows={2}
              />
              <FormFields.Textarea<ProjectForm>
                name="myRole"
                label="Meu papel"
                rows={2}
              />
              <FormFields.Textarea<ProjectForm>
                name="gallery"
                label="Galeria (uma URL por linha)"
                rows={3}
              />
              <div className="flex gap-6">
                <FormFields.Switch<ProjectForm>
                  name="featured"
                  label="Destaque"
                />
                <FormFields.Switch<ProjectForm>
                  name="includeInResume"
                  label="Incluir no currículo"
                />
              </div>
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

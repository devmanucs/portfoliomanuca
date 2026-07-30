"use client";

import * as React from "react";
import { EmptyState } from "@/components/ds/empty-state";
import { PageHeader } from "@/components/ds/page-header";
import { AdminFormSheet } from "@/components/shared/admin-form-sheet";
import { FormFields } from "@/components/shared/form-fields";
import { ImageUploadField } from "@/components/shared/image-upload-field";
import { MediaListField } from "@/components/shared/media-list-field";
import { TablePagination } from "@/components/shared/table-pagination";
import { Badge } from "@/components/ui/badge";
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
import type { IProject, ProjectFocus } from "@portfoliomanuca/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon, PencilEdit02Icon, PlusSignIcon } from "@hugeicons/core-free-icons";
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
  gallery: z.array(z.object({ url: z.string().min(1, "Informe a URL") })).optional(),
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
    gallery: project?.gallery?.map((url) => ({ url })) ?? [],
    featured: project?.featured ?? false,
    status: project?.status ?? "PUBLISHED",
    includeInResume: project?.includeInResume ?? false,
  };
}

function toPayload(values: ProjectForm) {
  return {
    ...values,
    process: values.process.split("\n").filter(Boolean),
    gallery: values.gallery?.map((item) => item.url).filter(Boolean) ?? [],
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

  const { pageItems, page, pageCount, pageSize, setPage, setPageSize, total } = usePagination(projects);

  const form = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: toFormValues(),
  });

  const createMutation = useCreate<Partial<IProject>>({
    route: "/projects",
    mutationKey: ["create-project"],
    queryInvalidationKeys: ["projects"],
    revalidateTags: ["projects"],
    onSuccess: () => modal.onClose(),
  });

  const updateMutation = useUpdate<Partial<IProject>>({
    route: "/projects",
    mutationKey: ["update-project"],
    queryInvalidationKeys: ["projects"],
    revalidateTags: ["projects"],
    onSuccess: () => modal.onClose(),
  });

  const deleteMutation = useDelete({
    route: "/projects",
    mutationKey: ["delete-project"],
    queryInvalidationKeys: ["projects"],
    revalidateTags: ["projects"],
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

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="conteúdo"
        title="Projetos"
        description="Gerencie cases publicados no portfólio."
        actions={
          <Button onClick={openCreate}>
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Novo projeto
          </Button>
        }
      />

      <Frame>
        <FrameHeader>
          <FrameTitle>Projetos cadastrados</FrameTitle>
          <FrameDescription>{projects.length} cases publicados ou em rascunho.</FrameDescription>
        </FrameHeader>
        <FramePanel className="pt-0">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Carregando...</p>
          ) : projects.length === 0 ? (
            <EmptyState
              title="Nenhum projeto"
              description="Crie o primeiro projeto ou publique via seed da API."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageItems.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="max-w-64 truncate font-medium">
                      {project.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{project.category}</TableCell>
                    <TableCell>
                      <Badge variant={project.status === "PUBLISHED" ? "secondary" : "outline"}>
                        {project.status === "PUBLISHED" ? "Publicado" : "Rascunho"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon-sm" onClick={() => openEdit(project)}>
                          <HugeiconsIcon icon={PencilEdit02Icon} size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive"
                          onClick={() => deleteMutation.mutate({ id: project.id })}
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
          title={editing ? "Editar projeto" : "Novo projeto"}
          description="Case exibido na listagem e na página de detalhe do portfólio."
          onSubmit={form.handleSubmit(onSubmit)}
          isSubmitting={isSaving}
          className="sm:max-w-2xl"
        >
          <FormFields.Section title="Básico">
            <div className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormFields.Input<ProjectForm> name="title" label="Título" />
                <FormFields.Input<ProjectForm> name="slug" label="Slug" />
                <FormFields.Input<ProjectForm> name="category" label="Categoria" />
                <FormFields.Select<ProjectForm> name="focus" label="Foco" options={focusOptions} />
                <FormFields.Select<ProjectForm>
                  name="status"
                  label="Status"
                  options={statusOptions}
                />
              </div>
              <ImageUploadField<ProjectForm>
                name="coverImage"
                label="Imagem de capa"
                description="Esta é a imagem exibida no card da listagem de projetos (a primeira que aparece na home)."
              />
            </div>
          </FormFields.Section>

          <FormFields.Section title="Conteúdo do case">
            <div className="grid gap-4">
              <FormFields.Textarea<ProjectForm> name="description" label="Descrição" rows={3} />
              <FormFields.Textarea<ProjectForm> name="impact" label="Impacto" rows={2} />
              <FormFields.Textarea<ProjectForm> name="context" label="Contexto" rows={2} />
              <FormFields.Textarea<ProjectForm> name="problem" label="Problema" rows={2} />
              <FormFields.Textarea<ProjectForm>
                name="process"
                label="Processo (uma linha por item)"
                rows={4}
              />
              <FormFields.Textarea<ProjectForm> name="result" label="Resultado" rows={2} />
              <FormFields.Textarea<ProjectForm> name="myRole" label="Meu papel" rows={2} />
            </div>
          </FormFields.Section>

          <FormFields.Section title="Galeria & Currículo">
            <div className="grid gap-4">
              <MediaListField<ProjectForm>
                name="gallery"
                label="Galeria do case"
                description="Aparecem na página de detalhe do projeto (não no card da listagem -- isso é a Imagem de capa, lá em Básico)."
              />
              <div className="flex gap-6">
                <FormFields.Switch<ProjectForm> name="featured" label="Destacar projeto (selo especial na listagem)" />
                <FormFields.Switch<ProjectForm>
                  name="includeInResume"
                  label="Incluir no currículo"
                />
              </div>
            </div>
          </FormFields.Section>
        </AdminFormSheet>
      </FormProvider>
    </div>
  );
}

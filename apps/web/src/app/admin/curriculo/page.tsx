"use client";

import { PageHeader } from "@/components/ds/page-header";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { API_BASE_URL, api } from "@/core/api/axios-instance";
import { ResumePreview } from "@/features/resume-builder";
import { useFetch, useUpdate } from "@/hooks/use-crud";
import type { IExperience, IProject, IResume } from "@portfoliomanuca/types";
import { Download } from "lucide-react";
import { toast } from "sonner";

export default function AdminResumePage() {
  const { data: resume, isLoading: resumeLoading } = useFetch<IResume>({
    queryKey: ["resume"],
    route: "/resume",
  });

  const { data: experiences = [] } = useFetch<IExperience[]>({
    queryKey: ["experiences"],
    route: "/experiences",
    sortBy: "order",
  });

  const { data: projects = [] } = useFetch<IProject[]>({
    queryKey: ["projects"],
    route: "/projects",
  });

  const updateExperience = useUpdate<Partial<IExperience>>({
    route: "/experiences",
    mutationKey: ["toggle-experience-resume"],
    queryInvalidationKeys: ["experiences", "resume"],
  });

  const updateProject = useUpdate<Partial<IProject>>({
    route: "/projects",
    mutationKey: ["toggle-project-resume"],
    queryInvalidationKeys: ["projects", "resume"],
  });

  async function downloadPdf() {
    try {
      const response = await api.get("/resume/pdf", {
        responseType: "blob",
        showToast: false,
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "curriculo.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch {
      toast.error("Não foi possível gerar o PDF. Abra a API em " + API_BASE_URL);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="currículo"
        title="Currículo"
        description="Escolha o que entra no PDF e visualize o resultado."
        actions={
          <Button
            onClick={downloadPdf}
            className="bg-sage text-background hover:bg-sage/90"
          >
            <Download size={16} />
            Baixar PDF
          </Button>
        }
      />

      <div className="grid gap-8 xl:grid-cols-2">
        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-4 text-sm font-medium text-foreground">
              Experiências no currículo
            </h2>
            <div className="space-y-3">
              {experiences.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border/60 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium">{item.role}</p>
                    <p className="text-xs text-muted-foreground">{item.company}</p>
                  </div>
                  <Switch
                    checked={item.includeInResume}
                    onCheckedChange={(checked) =>
                      updateExperience.mutate({
                        id: item.id,
                        formData: { includeInResume: checked },
                      })
                    }
                  />
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-4 text-sm font-medium text-foreground">
              Projetos no currículo
            </h2>
            <div className="space-y-3">
              {projects.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border/60 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <Switch
                    checked={item.includeInResume}
                    onCheckedChange={(checked) =>
                      updateProject.mutate({
                        id: item.id,
                        formData: { includeInResume: checked },
                      })
                    }
                  />
                </label>
              ))}
            </div>
          </section>
        </div>

        <section>
          <h2 className="mb-4 text-sm font-medium text-foreground">Preview</h2>
          {resumeLoading ? (
            <p className="text-sm text-muted-foreground">Carregando preview...</p>
          ) : resume ? (
            <ResumePreview resume={resume} />
          ) : (
            <p className="text-sm text-muted-foreground">
              Preview indisponível. Verifique se a API está rodando.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

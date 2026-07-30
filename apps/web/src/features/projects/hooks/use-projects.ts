import { useFetch } from "@/hooks/use-crud";
import type { IProject } from "@portfoliomanuca/types";

export function useProjects() {
  return useFetch<IProject[]>({
    queryKey: ["projects"],
    route: "/projects",
    sortBy: "order",
    sortOrder: "asc",
  });
}

export function useProject(slug: string, enabled = true) {
  return useFetch<IProject>({
    queryKey: ["projects", slug],
    route: `/projects/${slug}`,
    enabled: enabled && Boolean(slug),
  });
}

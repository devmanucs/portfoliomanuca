export { Projects } from "./components/projects";
export {
  projects,
  getProjectBySlug,
  focusLabels,
  type Project,
  type ProjectFocus,
} from "./data/projects-data";
export { mapApiProjectToUi, mapApiProjectsToUi } from "./utils/project-mapper";
export { useProjects, useProject } from "./hooks/use-projects";

import { loadGithubContributions, loadGithubRecentCommits } from "@/lib/github";
import { Github } from "lucide-react";
import { GithubCommitList } from "./github-commit-list";
import { GithubHeatmap } from "./github-heatmap";

export async function GithubActivity() {
  const [contributions, commits] = await Promise.all([
    loadGithubContributions(),
    loadGithubRecentCommits(),
  ]);

  if (contributions.length === 0 && commits.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-border-soft bg-card">
      <div className="grid divide-y divide-border-soft md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:divide-x md:divide-y-0">
        <div className="min-w-0 p-5">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Github size={16} className="text-primary" aria-hidden />
            atividade no github
          </div>

          {contributions.length > 0 ? (
            <div className="mt-5">
              <GithubHeatmap contributions={contributions} />
            </div>
          ) : null}
        </div>

        {commits.length > 0 ? (
          <div className="min-w-0 p-5">
            <p className="mb-3 text-xs font-medium text-muted-foreground">
              commits recentes
            </p>
            <GithubCommitList commits={commits} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

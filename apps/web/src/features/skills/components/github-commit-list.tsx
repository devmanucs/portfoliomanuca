"use client";

import { Button } from "@/components/ui/button";
import type { GithubCommit } from "@/lib/github";
import { GitCommitHorizontal } from "lucide-react";
import { useState } from "react";

function formatCommitDate(iso: string): string {
  const date = new Date(iso);
  const days = Math.floor((Date.now() - date.getTime()) / 86_400_000);

  if (days <= 0) return "hoje";
  if (days === 1) return "ontem";
  if (days < 30) return `há ${days} dias`;

  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function CommitRow({ commit }: { commit: GithubCommit }) {
  return (
    <li>
      <a
        href={commit.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-3 rounded-lg px-2 py-1.5 -mx-2 transition-colors hover:bg-muted"
      >
        <GitCommitHorizontal
          size={16}
          className="mt-0.5 shrink-0 text-primary"
          aria-hidden
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm text-foreground group-hover:text-primary">
            {commit.message}
          </span>
          <span className="mt-0.5 block font-mono text-xs text-muted-foreground">
            {commit.repo} · {formatCommitDate(commit.date)}
          </span>
        </span>
      </a>
    </li>
  );
}

type GithubCommitListProps = {
  commits: GithubCommit[];
};

export function GithubCommitList({ commits }: GithubCommitListProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleCount = 3;
  const shown = expanded ? commits : commits.slice(0, visibleCount);
  const hidden = commits.slice(visibleCount);

  if (commits.length === 0) return null;

  return (
    <div>
      <ol className="flex flex-col gap-1">
        {shown.map((commit) => (
          <CommitRow key={commit.sha} commit={commit} />
        ))}
      </ol>

      {hidden.length > 0 && !expanded ? (
        <div className="relative mt-1">
          <ol
            aria-hidden
            className="pointer-events-none flex select-none flex-col gap-1 opacity-70 blur-[3px]"
          >
            {hidden.slice(0, 2).map((commit) => (
              <CommitRow key={commit.sha} commit={commit} />
            ))}
          </ol>
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-card via-card/85 to-transparent pb-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              radius="pill"
              onClick={() => setExpanded(true)}
            >
              ver mais {hidden.length} commits
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

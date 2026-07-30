import type { ContributionDay } from "@/lib/github";

const LEVEL_CLASSES = [
  "bg-border-soft",
  "bg-primary/25",
  "bg-primary/50",
  "bg-primary/75",
  "bg-primary",
];

function chunkIntoWeeks(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

type GithubHeatmapProps = {
  contributions: ContributionDay[];
};

export function GithubHeatmap({ contributions }: GithubHeatmapProps) {
  if (contributions.length === 0) return null;

  const weeks = chunkIntoWeeks(contributions);
  const total = contributions.reduce((sum, day) => sum + day.count, 0);

  return (
    <div>
      <div className="overflow-x-auto pb-1">
        <div className="grid w-max grid-flow-col grid-rows-7 gap-1">
          {weeks.map((week, weekIndex) =>
            week.map((day) => (
              <span
                key={day.date}
                title={`${day.count} contribuições em ${new Date(day.date).toLocaleDateString("pt-BR")}`}
                className={`size-2.5 rounded-[2px] ${LEVEL_CLASSES[Math.min(day.level, 4)]}`}
              />
            )),
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>{total} contribuições no último ano</span>
        <span className="flex items-center gap-1">
          menos
          {LEVEL_CLASSES.map((cls) => (
            <span key={cls} className={`size-2.5 rounded-[2px] ${cls}`} />
          ))}
          mais
        </span>
      </div>
    </div>
  );
}

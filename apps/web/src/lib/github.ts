const GITHUB_USERNAME = "devmanucs";
const GITHUB_HEADERS = { Accept: "application/vnd.github+json" };
const REVALIDATE_SECONDS = 3600;

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type GithubCommit = {
  sha: string;
  message: string;
  repo: string;
  date: string;
  url: string;
};

type GithubPushEvent = {
  type: string;
  created_at: string;
  repo: { name: string };
  payload: { head?: string };
};

export async function loadGithubContributions(): Promise<ContributionDay[]> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { contributions?: ContributionDay[] };
    return data.contributions ?? [];
  } catch {
    return [];
  }
}

export async function loadGithubRecentCommits(limit = 8): Promise<GithubCommit[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public`,
      { next: { revalidate: REVALIDATE_SECONDS }, headers: GITHUB_HEADERS },
    );
    if (!res.ok) return [];

    const events = (await res.json()) as GithubPushEvent[];
    const pushEvents = events
      .filter((event) => event.type === "PushEvent" && event.payload.head)
      .slice(0, limit);

    const commits = await Promise.all(
      pushEvents.map(async (event): Promise<GithubCommit | null> => {
        try {
          const commitRes = await fetch(
            `https://api.github.com/repos/${event.repo.name}/commits/${event.payload.head}`,
            { next: { revalidate: REVALIDATE_SECONDS }, headers: GITHUB_HEADERS },
          );
          if (!commitRes.ok) return null;

          const commitData = (await commitRes.json()) as {
            sha: string;
            html_url: string;
            commit: { message: string };
          };

          return {
            sha: commitData.sha,
            message: commitData.commit.message.split("\n")[0],
            repo: event.repo.name.split("/")[1] ?? event.repo.name,
            date: event.created_at,
            url: commitData.html_url,
          };
        } catch {
          return null;
        }
      }),
    );

    const seen = new Set<string>();
    return commits.filter((commit): commit is GithubCommit => {
      if (!commit || seen.has(commit.sha)) return false;
      seen.add(commit.sha);
      return true;
    });
  } catch {
    return [];
  }
}

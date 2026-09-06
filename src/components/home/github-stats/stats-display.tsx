import { GitBranch, type LucideIcon, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { GITHUB_USERNAME } from "@/data/github-data";

// GitHub's events endpoint isn't real-time — GitHub's own docs note latency
// of up to 6 hours depending on load. "Recent activity" below is framed
// honestly around that, not as live/instant.
const CACHE_KEY = `github-stats-${GITHUB_USERNAME}`;
const CACHE_TTL_MS = 10 * 60 * 1000;
const API_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2026-03-10",
};
const MAX_ACTIVITY_ITEMS = 4;
const MAX_LANGUAGES = 4;

interface GitHubUser {
  public_repos: number;
  followers: number;
}

interface GitHubRepo {
  fork: boolean;
  stargazers_count: number;
  language: string | null;
}

interface GitHubEventPayload {
  action?: string;
  ref_type?: string;
  ref?: string;
  size?: number;
  commits?: unknown[];
  pull_request?: { html_url?: string };
  issue?: { html_url?: string };
  release?: { html_url?: string };
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  payload: GitHubEventPayload;
  created_at: string;
}

interface ActivityItem {
  id: string;
  text: string;
  url: string;
  createdAt: string;
}

interface GitHubStatsData {
  publicRepos: number;
  totalStars: number;
  followers: number;
  topLanguages: { name: string; count: number }[];
  recentActivity: ActivityItem[];
}

const numberFormatter = new Intl.NumberFormat("en", { notation: "compact" });

const formatRelativeTime = (dateStr: string): string => {
  const diffSec = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay}d ago`;
  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12) return `${diffMonth}mo ago`;
  return `${Math.floor(diffMonth / 12)}y ago`;
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const describeEvent = (
  event: GitHubEvent,
): { text: string; url: string } | null => {
  const repoName = event.repo.name;
  const repoUrl = `https://github.com/${repoName}`;
  const payload = event.payload;

  switch (event.type) {
    case "PushEvent": {
      const count = payload.commits?.length ?? payload.size ?? 1;
      return {
        text: `Pushed ${count} commit${count === 1 ? "" : "s"} to ${repoName}`,
        url: repoUrl,
      };
    }
    case "PullRequestEvent":
      return {
        text: `${capitalize(payload.action ?? "updated")} a pull request in ${repoName}`,
        url: payload.pull_request?.html_url ?? repoUrl,
      };
    case "IssuesEvent":
      return {
        text: `${capitalize(payload.action ?? "updated")} an issue in ${repoName}`,
        url: payload.issue?.html_url ?? repoUrl,
      };
    case "CreateEvent":
      if (payload.ref_type === "repository") {
        return { text: `Created a new repository: ${repoName}`, url: repoUrl };
      }
      if (payload.ref_type === "branch") {
        return {
          text: `Created branch ${payload.ref} in ${repoName}`,
          url: repoUrl,
        };
      }
      return null;
    case "ForkEvent":
      return { text: `Forked ${repoName}`, url: repoUrl };
    case "ReleaseEvent":
      return {
        text: `Published a release in ${repoName}`,
        url: payload.release?.html_url ?? repoUrl,
      };
    default:
      return null;
  }
};

const buildStats = (
  user: GitHubUser,
  repos: GitHubRepo[],
  events: GitHubEvent[],
): GitHubStatsData => {
  const original = repos.filter((r) => !r.fork);

  const totalStars = original.reduce(
    (sum, r) => sum + (r.stargazers_count ?? 0),
    0,
  );

  const languageCounts = new Map<string, number>();
  for (const repo of original) {
    if (!repo.language) continue;
    languageCounts.set(
      repo.language,
      (languageCounts.get(repo.language) ?? 0) + 1,
    );
  }
  const topLanguages = Array.from(languageCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_LANGUAGES)
    .map(([name, count]) => ({ name, count }));

  const recentActivity: ActivityItem[] = [];
  for (const event of events) {
    const described = describeEvent(event);
    if (!described) continue;
    recentActivity.push({
      id: event.id,
      ...described,
      createdAt: event.created_at,
    });
    if (recentActivity.length >= MAX_ACTIVITY_ITEMS) break;
  }

  return {
    publicRepos: user.public_repos ?? 0,
    totalStars,
    followers: user.followers ?? 0,
    topLanguages,
    recentActivity,
  };
};

interface CacheEntry {
  data: GitHubStatsData;
  cachedAt: number;
}

const readCache = (): GitHubStatsData | null => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    if (Date.now() - parsed.cachedAt > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
};

const writeCache = (data: GitHubStatsData) => {
  try {
    const entry: CacheEntry = { data, cachedAt: Date.now() };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // sessionStorage unavailable (e.g. private browsing) — safe to skip caching
  }
};

type Status = "loading" | "ready" | "error";

interface StatBlockProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
}

const StatBlock = ({ icon: Icon, value, label }: StatBlockProps) => (
  <div className="flex flex-col items-start gap-2">
    <div className="flex items-center gap-2">
      <span className="glass-panel flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-bioglow">
        <Icon className="h-4 w-4" />
      </span>
      <p className="text-lg font-bold leading-tight text-foam">{value}</p>
    </div>
    <p className="text-[11px] text-mist">{label}</p>
  </div>
);

const GitHubStats = () => {
  const [stats, setStats] = useState<GitHubStatsData | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;

    const cached = readCache();
    if (cached) {
      setStats(cached);
      setStatus("ready");
      return;
    }

    const load = async () => {
      try {
        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
            headers: API_HEADERS,
          }),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
            { headers: API_HEADERS },
          ),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`,
            { headers: API_HEADERS },
          ),
        ]);

        if (!userRes.ok || !reposRes.ok) {
          throw new Error("GitHub API request failed");
        }

        const user = (await userRes.json()) as GitHubUser;
        const repos = (await reposRes.json()) as GitHubRepo[];
        const events = eventsRes.ok
          ? ((await eventsRes.json()) as GitHubEvent[])
          : [];

        if (!Array.isArray(repos)) throw new Error("Unexpected repos response");

        const data = buildStats(
          user,
          repos,
          Array.isArray(events) ? events : [],
        );
        if (cancelled) return;
        setStats(data);
        setStatus("ready");
        writeCache(data);
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="glass glass-panel rounded-2xl p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-foam">Live Stats</h3>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-bioglow transition-colors duration-200 hover:text-jelly"
        >
          @{GITHUB_USERNAME} →
        </a>
      </div>

      {status === "loading" && (
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-14 animate-pulse rounded-lg bg-surface-raised/40"
            />
          ))}
        </div>
      )}

      {status === "error" && (
        <p className="text-sm text-mist">
          Couldn't load live stats right now — the profile link above still
          works.
        </p>
      )}

      {status === "ready" && stats && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <StatBlock
              icon={GitBranch}
              value={stats.publicRepos}
              label="Public Repos"
            />
            <StatBlock
              icon={Star}
              value={numberFormatter.format(stats.totalStars)}
              label="Stars Earned"
            />
            <StatBlock
              icon={Users}
              value={numberFormatter.format(stats.followers)}
              label="Followers"
            />
          </div>

          {stats.topLanguages.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-xs font-medium text-mist">
                Most used languages
              </p>
              <div className="flex flex-wrap gap-2">
                {stats.topLanguages.map((lang) => (
                  <span
                    key={lang.name}
                    className="rounded-lg border border-mist/20 bg-surface-raised/60 px-2.5 py-1 text-xs text-foam"
                  >
                    {lang.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {stats.recentActivity.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-xs font-medium text-mist">
                Recent activity
              </p>
              <ul className="flex flex-col gap-2">
                {stats.recentActivity.map((item) => (
                  <li key={item.id} className="text-sm">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foam transition-colors duration-200 hover:text-bioglow"
                    >
                      {item.text}
                    </a>
                    <span className="text-mist">
                      {" "}
                      · {formatRelativeTime(item.createdAt)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GitHubStats;

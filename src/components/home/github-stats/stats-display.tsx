import { GitBranch, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { GITHUB_USERNAME } from "@/data/github-data";
import { API_HEADERS, buildStats } from "./build-stats";
import StatBlock from "./stat-block";
import { readCache, writeCache } from "./stats-cache";
import type {
  GitHubEvent,
  GitHubRepo,
  GitHubStatsData,
  GitHubUser,
  Status,
} from "./stats-types";
import { formatRelativeTime, numberFormatter } from "./stats-utils";

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

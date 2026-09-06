import type {
  ActivityItem,
  GitHubEvent,
  GitHubRepo,
  GitHubStatsData,
  GitHubUser,
} from "./stats-types";
import { capitalize } from "./stats-utils";

export const API_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2026-03-10",
};
export const MAX_ACTIVITY_ITEMS = 4;
export const MAX_LANGUAGES = 4;

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

export const buildStats = (
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

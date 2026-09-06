export interface GitHubUser {
  public_repos: number;
  followers: number;
}

export interface GitHubRepo {
  fork: boolean;
  stargazers_count: number;
  language: string | null;
}

export interface GitHubEventPayload {
  action?: string;
  ref_type?: string;
  ref?: string;
  size?: number;
  commits?: unknown[];
  pull_request?: { html_url?: string };
  issue?: { html_url?: string };
  release?: { html_url?: string };
}

export interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  payload: GitHubEventPayload;
  created_at: string;
}

export interface ActivityItem {
  id: string;
  text: string;
  url: string;
  createdAt: string;
}

export interface GitHubStatsData {
  publicRepos: number;
  totalStars: number;
  followers: number;
  topLanguages: { name: string; count: number }[];
  recentActivity: ActivityItem[];
}

export type Status = "loading" | "ready" | "error";

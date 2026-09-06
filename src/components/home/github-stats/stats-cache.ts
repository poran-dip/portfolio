import { GITHUB_USERNAME } from "@/data/github-data";
import type { GitHubStatsData } from "./stats-types";

export const CACHE_KEY = `github-stats-${GITHUB_USERNAME}`;
export const CACHE_TTL_MS = 10 * 60 * 1000;

interface CacheEntry {
  data: GitHubStatsData;
  cachedAt: number;
}

export const readCache = (): GitHubStatsData | null => {
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

export const writeCache = (data: GitHubStatsData) => {
  try {
    const entry: CacheEntry = { data, cachedAt: Date.now() };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // sessionStorage unavailable (e.g. private browsing) — safe to skip caching
  }
};

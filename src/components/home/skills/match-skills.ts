import Fuse from "fuse.js";
import { skillCategories } from "@/data/skills-data";

interface FlatSkill {
  name: string;
  aliases: string[];
  category: string;
}

const flatSkills: FlatSkill[] = skillCategories.flatMap((category) =>
  category.skills.map((skill) => ({
    name: skill.name,
    aliases: skill.aliases ?? [],
    category: category.title,
  })),
);

const fuse = new Fuse(flatSkills, {
  keys: ["name", "aliases"],
  threshold: 0.25,
  ignoreLocation: true,
  includeScore: true,
});

const MATCH_THRESHOLD = 0.25;

// Fuzzy string matching alone can't tell "Java" and "JavaScript" apart (one is
// a literal prefix of the other), so this explicitly blocks known false
// positives rather than silently mismatching them.
const KNOWN_MISMATCHES: Record<string, string[]> = {
  java: ["javascript", "typescript"],
};

const isKnownMismatch = (query: string, matchedName: string): boolean => {
  const excluded = KNOWN_MISMATCHES[query.toLowerCase().trim()];
  return excluded?.includes(matchedName.toLowerCase()) ?? false;
};

// Fuzzy scoring breaks down for very short queries — with ignoreLocation on,
// a single character (or two) trivially "fuzzy-matches" almost anything at a
// perfect 0.000 score (e.g. "C" matching "Socket.IO"), and threshold tuning
// can't fix this since correct and incorrect matches score identically.
// Short queries fall back to exact matching instead, where there's little
// room for typos anyway.
const EXACT_MATCH_MAX_LENGTH = 3;

const findExactMatch = (term: string): FlatSkill | null => {
  const normalized = term.toLowerCase();
  return (
    flatSkills.find(
      (skill) =>
        skill.name.toLowerCase() === normalized ||
        skill.aliases.some((alias) => alias.toLowerCase() === normalized),
    ) ?? null
  );
};

const matchTerm = (term: string): FlatSkill | null => {
  if (term.length <= EXACT_MATCH_MAX_LENGTH) {
    return findExactMatch(term);
  }
  const results = fuse.search(term, { limit: 1 });
  const best = results[0];
  if (!best || (best.score ?? 1) > MATCH_THRESHOLD) return null;
  if (isKnownMismatch(term, best.item.name)) return null;
  return best.item;
};

export interface SkillMatchResult {
  knownSkills: string[];
  unknownTerms: string[];
}

/** Splits a comma-separated list of pasted skill terms into ones we have
 * (matched, deduped by canonical name) and ones we don't. */
export const matchSkills = (query: string): SkillMatchResult => {
  const terms = Array.from(
    new Set(
      query
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    ),
  );

  const known = new Set<string>();
  const unknown: string[] = [];

  for (const term of terms) {
    const match = matchTerm(term);
    if (match) {
      known.add(match.name);
    } else {
      unknown.push(term);
    }
  }

  return { knownSkills: Array.from(known), unknownTerms: unknown };
};

import Fuse from "fuse.js";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { skillCategories } from "@/data/skills";

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

interface SkillMatchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SkillMatchDialog = ({ isOpen, onClose }: SkillMatchDialogProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = "skill-match-dialog-title";

  const { knownSkills, unknownTerms } = useMemo(() => {
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
  }, [query]);

  // Move focus into the dialog when it opens (this component stays mounted
  // for the fade transition, so a plain `autoFocus` prop only fires once on
  // page load rather than every time the dialog actually opens).
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-70 flex items-center justify-center p-4 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        type="button"
        aria-label="Close dialog overlay"
        className="absolute inset-0 bg-abyss/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="glass glass-panel relative w-full max-w-md rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <h4 id={titleId} className="text-lg font-bold text-foam">
            Am I a good fit?
          </h4>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-mist hover:text-bioglow transition-colors duration-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-2 text-sm text-mist">
          Paste the skills you're looking for (separated by commas).
        </p>

        <div className="mt-4 relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mist" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Next.js, Docker, LangChain, Vue..."
            className="glass-field pl-9"
          />
        </div>

        <div className="mt-4 min-h-16" aria-live="polite">
          {query.trim() === "" ? (
            <p className="text-sm text-mist">
              Paste a few and I'll sort out what I know.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {knownSkills.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-bioglow mb-2">
                    I know these
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {knownSkills.map((name) => (
                      <span
                        key={name}
                        className="rounded-lg border border-bioglow/30 bg-bioglow/10 px-3 py-1 text-sm text-foam"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {unknownTerms.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-mist mb-2">Not yet</p>
                  <div className="flex flex-wrap gap-2">
                    {unknownTerms.map((term) => (
                      <span
                        key={term}
                        className="rounded-lg border border-mist/15 bg-surface-raised/40 px-3 py-1 text-sm text-mist"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {knownSkills.length > 0 && unknownTerms.length === 0 && (
                <div className="border-t border-mist/10 pt-4">
                  <p className="text-sm text-foam">
                    Looks like I've got all of these covered 👀
                  </p>
                  {/* biome-ignore lint/a11y/useValidAnchor: genuine navigational link — onClick only closes the dialog before navigating */}
                  <a
                    href="/#contact"
                    onClick={onClose}
                    className="glass-hover glass-primary mt-3 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer"
                  >
                    Get In Touch
                  </a>
                </div>
              )}

              {knownSkills.length > 0 && unknownTerms.length > 0 && (
                <div className="border-t border-mist/10 pt-4">
                  <p className="text-sm text-foam">
                    I know some of these already, and I'm always eager to pick
                    up the rest.
                  </p>
                  {/* biome-ignore lint/a11y/useValidAnchor: genuine navigational link — onClick only closes the dialog before navigating */}
                  <a
                    href="/#contact"
                    onClick={onClose}
                    className="glass-hover glass-primary mt-3 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer"
                  >
                    Get In Touch
                  </a>
                </div>
              )}

              {knownSkills.length === 0 && unknownTerms.length > 0 && (
                <div className="border-t border-mist/10 pt-4">
                  <p className="text-sm text-foam">
                    Doesn't look like a match for this one — yet 😅
                  </p>
                  <p className="mt-1 text-sm text-mist">
                    No pressure though —{" "}
                    {/* biome-ignore lint/a11y/useValidAnchor: genuine navigational link inline in a sentence — a button would be semantically wrong here */}
                    <a
                      href="/#contact"
                      onClick={onClose}
                      className="text-bioglow underline decoration-dotted transition-colors duration-200 hover:text-jelly"
                    >
                      say hi anyway
                    </a>
                    , I pick things up fast.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillMatchDialog;

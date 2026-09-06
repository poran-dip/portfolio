import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { matchSkills } from "./match-skills";

interface SkillMatchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SkillMatchDialog = ({ isOpen, onClose }: SkillMatchDialogProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = "skill-match-dialog-title";

  useBodyScrollLock(isOpen);

  const { knownSkills, unknownTerms } = useMemo(
    () => matchSkills(query),
    [query],
  );

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
          <h3 id={titleId} className="text-lg font-bold text-foam">
            Am I a good fit?
          </h3>
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
            id="search-skills"
            name="search-skills"
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

              {knownSkills.length > 0 && (
                <div className="border-t border-mist/10 pt-4">
                  <p className="text-sm text-foam">
                    {unknownTerms.length === 0
                      ? "Looks like I've got all of these covered 👀"
                      : "I know some of these already, and I'm always eager to pick up the rest."}
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

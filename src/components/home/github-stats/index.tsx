import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import GitHubStats from "./stats-display";

const LG_BREAKPOINT_QUERY = "(min-width: 1024px)";

const GitHubStatsPanel = () => {
  // null = not yet known (SSR / before first client measurement)
  const [isLarge, setIsLarge] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(LG_BREAKPOINT_QUERY);
    setIsLarge(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsLarge(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  // Deliberately renders exactly one <GitHubStats /> at a time (never both a
  // hidden desktop copy and a hidden mobile copy) — GitHubStats fetches on
  // mount, so mounting two simultaneously would double the GitHub API calls
  // for no benefit, since only one is ever visible.
  if (isLarge === null) {
    return (
      <div>
        <div className="glass glass-panel h-48 animate-pulse rounded-2xl lg:sticky lg:top-20 lg:h-64" />
      </div>
    );
  }

  if (isLarge) {
    return (
      <div>
        <div className="lg:sticky lg:top-20">
          <GitHubStats />
        </div>
      </div>
    );
  }

  const toggle = () => {
    setOpen((prev) => !prev);
    setHasOpened(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="github-stats-panel"
        className="glass glass-hover-sm flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-3"
      >
        <span className="text-sm font-medium text-mist">Live GitHub Stats</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-mist transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        id="github-stats-panel"
        className={`grid transition-all duration-300 ${open ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          {/* Lazy-mounted: only fetches once actually opened, not on page load */}
          {hasOpened && <GitHubStats />}
        </div>
      </div>
    </div>
  );
};

export default GitHubStatsPanel;

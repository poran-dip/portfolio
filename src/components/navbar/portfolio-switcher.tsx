import {
  Check,
  ChevronDown,
  Code2,
  Gamepad2,
  type LucideIcon,
  Music,
} from "lucide-react";
import type { Ref } from "react";

interface PortfolioOption {
  id: string;
  shortLabel: string;
  // fullLabel/domain aren't shown yet (kept minimal per design) — reserved for
  // when the other portfolios (poran.dev, beats.poran.dev, studios.poran.dev) exist.
  fullLabel: string;
  domain: string;
  icon: LucideIcon;
  active: boolean;
}

export const PORTFOLIOS: PortfolioOption[] = [
  {
    id: "dev",
    shortLabel: "sw_dev",
    fullLabel: "Software Developer",
    domain: "poran.dev",
    icon: Code2,
    active: true,
  },
  {
    id: "music",
    shortLabel: "music_prod",
    fullLabel: "Music Producer",
    domain: "beats.poran.dev",
    icon: Music,
    active: false,
  },
  {
    id: "game",
    shortLabel: "game_dev",
    fullLabel: "Game Developer",
    domain: "studios.poran.dev",
    icon: Gamepad2,
    active: false,
  },
];

export const PortfolioSwitcherRow = ({
  option,
}: {
  option: PortfolioOption;
}) => {
  const Icon = option.icon;
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors duration-200 ${
        option.active
          ? "bg-bioglow/10 hover:bg-bioglow/15 cursor-pointer"
          : "cursor-not-allowed opacity-50 hover:opacity-75"
      }`}
    >
      <Icon
        className={`w-4 h-4 shrink-0 ${option.active ? "text-bioglow" : "text-mist"}`}
      />
      <span
        className={`text-sm font-medium ${option.active ? "text-foam" : "text-mist"}`}
      >
        {option.shortLabel}
      </span>
      {option.active && (
        <Check className="w-3.5 h-3.5 text-bioglow shrink-0 ml-auto" />
      )}
    </div>
  );
};

interface SwitcherProps {
  containerRef: Ref<HTMLDivElement>;
  activeLabel?: string;
  isOpen: boolean;
  onToggle: () => void;
}

/** Secondary nav row above the primary bar — desktop only, collapses away
 * on scroll (collapse is handled by the parent via `scrolled`). */
export const DesktopPortfolioSwitcher = ({
  containerRef,
  activeLabel,
  isOpen,
  onToggle,
  scrolled,
}: SwitcherProps & { scrolled: boolean }) => (
  <div ref={containerRef} className="hidden md:block relative z-20">
    <div
      className={`overflow-hidden bg-abyss/60 backdrop-blur-sm transition-all duration-300 ${
        scrolled
          ? "max-h-0 opacity-0 pointer-events-none border-b-0"
          : "max-h-10 opacity-100 border-b border-mist/10"
      }`}
    >
      <div className="container mx-auto px-6 h-10 flex items-center justify-end overflow-hidden">
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center gap-1.5 text-sm font-medium text-mist hover:text-bioglow transition-colors duration-200 cursor-pointer"
        >
          {activeLabel}
          <ChevronDown
            className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>

    {isOpen && (
      <div className="absolute right-6 top-full mt-2 w-48 rounded-xl border border-mist/10 bg-surface-raised p-2 shadow-lg shadow-abyss/40">
        {PORTFOLIOS.map((option) => (
          <PortfolioSwitcherRow key={option.id} option={option} />
        ))}
      </div>
    )}
  </div>
);

/** Same switcher, laid out for the bottom of the mobile sheet — dropdown
 * opens upward since it's pinned to the bottom of the panel. */
export const MobilePortfolioSwitcher = ({
  containerRef,
  activeLabel,
  isOpen,
  onToggle,
}: SwitcherProps) => (
  <div ref={containerRef} className="relative mt-auto pt-6">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-2 rounded-lg border border-mist/15 px-3 py-2.5 text-mist hover:text-bioglow transition-colors duration-200 cursor-pointer"
    >
      <span className="text-sm font-medium">{activeLabel}</span>
      <ChevronDown
        className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>

    {isOpen && (
      <div className="glass glass-panel absolute bottom-full left-0 right-0 mb-2 rounded-xl p-2">
        {PORTFOLIOS.map((option) => (
          <PortfolioSwitcherRow key={option.id} option={option} />
        ))}
      </div>
    )}
  </div>
);

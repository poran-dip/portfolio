import {
  Check,
  ChevronDown,
  Code2,
  Gamepad2,
  type LucideIcon,
  Menu,
  Music,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

const PORTFOLIOS: PortfolioOption[] = [
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

const NAV_LINKS = [
  { label: "about", href: "/#about" },
  { label: "projects", href: "/#projects" },
  { label: "experience", href: "/#experience" },
  { label: "contact", href: "/#contact" },
];

const RESUME_HREF = "/Poran_Dip_Resume.pdf";

const PortfolioSwitcherRow = ({ option }: { option: PortfolioOption }) => {
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

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const desktopSwitcherRef = useRef<HTMLDivElement>(null);
  const mobileSwitcherRef = useRef<HTMLDivElement>(null);

  const activePortfolio = PORTFOLIOS.find((p) => p.active) ?? PORTFOLIOS[0];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
      if (isScrolled) setIsSwitcherOpen(false);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isSwitcherOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideDesktop = desktopSwitcherRef.current?.contains(target);
      const insideMobile = mobileSwitcherRef.current?.contains(target);
      if (!insideDesktop && !insideMobile) setIsSwitcherOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSwitcherOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        {/* Secondary nav — desktop only, collapses away on scroll */}
        <div ref={desktopSwitcherRef} className="hidden md:block relative z-20">
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
                onClick={() => setIsSwitcherOpen((prev) => !prev)}
                className="flex items-center gap-1.5 text-sm font-medium text-mist hover:text-bioglow transition-colors duration-200 cursor-pointer"
              >
                {activePortfolio?.shortLabel}
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${isSwitcherOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>

          {isSwitcherOpen && (
            <div className="absolute right-6 top-full mt-2 w-48 rounded-xl border border-mist/10 bg-surface-raised p-2 shadow-lg shadow-abyss/40">
              {PORTFOLIOS.map((option) => (
                <PortfolioSwitcherRow key={option.id} option={option} />
              ))}
            </div>
          )}
        </div>

        {/* Primary nav */}
        <nav
          className={`relative z-10 transition-all duration-300 ${
            scrolled
              ? "glass bg-abyss/80 shadow-lg shadow-abyss/40"
              : "bg-transparent border-b border-transparent"
          }`}
        >
          <div
            className={`container mx-auto px-4 md:px-6 ${scrolled ? "py-3" : "py-5 sm:py-4"} flex items-center justify-between transition-all duration-300`}
          >
            <a
              href="/"
              className="text-lg md:text-xl font-bold text-foam hover:text-bioglow transition-colors duration-200"
            >
              Poran Dip
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group nav-link text-sm font-medium"
                >
                  <span className="text-bioglow/70 transition-colors duration-200 ease-[ease] group-hover:text-bioglow">
                    #
                  </span>
                  {link.label}
                </a>
              ))}
              <a
                href={RESUME_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-hover glass-primary rounded-lg px-4 py-1.5 text-sm font-semibold"
              >
                Resume
              </a>
            </div>

            {/* Mobile hamburger — floating, no container */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden text-foam hover:text-bioglow transition-colors duration-200 cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu overlay"
          className="absolute inset-0 bg-abyss/80 backdrop-blur-sm"
          onClick={closeMenu}
        />

        <div
          className={`glass absolute inset-y-0 right-0 w-[85%] max-w-sm bg-deep flex flex-col transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5">
            <span className="text-lg font-bold text-foam">Poran Dip</span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="text-foam hover:text-bioglow transition-colors duration-200 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col">
            {/* Nav links */}
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="group nav-link text-lg font-medium py-3 border-b border-mist/10"
                >
                  <span className="text-bioglow/70 transition-colors duration-200 ease-[ease] group-hover:text-bioglow">
                    #
                  </span>
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <a
              href={RESUME_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="glass-hover glass-primary rounded-xl mt-6 py-3 text-center text-base font-semibold"
            >
              Resume
            </a>

            {/* Portfolio switcher — pushed to the bottom, dropdown opens upward */}
            <div ref={mobileSwitcherRef} className="relative mt-auto pt-6">
              <button
                type="button"
                onClick={() => setIsSwitcherOpen((prev) => !prev)}
                className="w-full flex items-center justify-between gap-2 rounded-lg border border-mist/15 px-3 py-2.5 text-mist hover:text-bioglow transition-colors duration-200 cursor-pointer"
              >
                <span className="text-sm font-medium">
                  {activePortfolio?.shortLabel}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isSwitcherOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isSwitcherOpen && (
                <div className="glass glass-panel absolute bottom-full left-0 right-0 mb-2 rounded-xl p-2">
                  {PORTFOLIOS.map((option) => (
                    <PortfolioSwitcherRow key={option.id} option={option} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

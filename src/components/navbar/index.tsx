import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/data/nav-links";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import MobileMenu from "./mobile-menu";
import { DesktopPortfolioSwitcher, PORTFOLIOS } from "./portfolio-switcher";

const RESUME_HREF = "/Poran_Dip_Resume.pdf";

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

  useBodyScrollLock(isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleSwitcher = () => setIsSwitcherOpen((prev) => !prev);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        <DesktopPortfolioSwitcher
          containerRef={desktopSwitcherRef}
          activeLabel={activePortfolio?.shortLabel}
          isOpen={isSwitcherOpen}
          onToggle={toggleSwitcher}
          scrolled={scrolled}
        />

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
              {navLinks.map((link) => (
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

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        resumeHref={RESUME_HREF}
        switcherRef={mobileSwitcherRef}
        activeLabel={activePortfolio?.shortLabel}
        isSwitcherOpen={isSwitcherOpen}
        onToggleSwitcher={toggleSwitcher}
      />
    </>
  );
};

export default Navbar;

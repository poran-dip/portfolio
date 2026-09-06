import { X } from "lucide-react";
import type { Ref } from "react";
import { navLinks } from "@/data/nav-links";
import { MobilePortfolioSwitcher } from "./portfolio-switcher";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  resumeHref: string;
  switcherRef: Ref<HTMLDivElement>;
  activeLabel?: string;
  isSwitcherOpen: boolean;
  onToggleSwitcher: () => void;
}

const MobileMenu = ({
  isOpen,
  onClose,
  resumeHref,
  switcherRef,
  activeLabel,
  isSwitcherOpen,
  onToggleSwitcher,
}: MobileMenuProps) => {
  return (
    <div
      className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        type="button"
        aria-label="Close menu overlay"
        className="absolute inset-0 bg-abyss/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`glass absolute inset-y-0 right-0 w-[85%] max-w-sm bg-deep flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="text-lg font-bold text-foam">Poran Dip</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="text-foam hover:text-bioglow transition-colors duration-200 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col">
          {/* Nav links */}
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
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
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="glass-hover glass-primary rounded-xl mt-6 py-3 text-center text-base font-semibold"
          >
            Resume
          </a>

          {/* Portfolio switcher — pushed to the bottom, dropdown opens upward */}
          <MobilePortfolioSwitcher
            containerRef={switcherRef}
            activeLabel={activeLabel}
            isOpen={isSwitcherOpen}
            onToggle={onToggleSwitcher}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

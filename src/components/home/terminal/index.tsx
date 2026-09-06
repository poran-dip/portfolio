import { X } from "lucide-react";
import { useEffect, useState } from "react";
import DevTerminal from "./dev-terminal";

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const update = () => setIsDesktop(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isDesktop;
};

const TerminalWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* desktop — only mounted on desktop */}
      {isDesktop && <DevTerminal className="h-60 w-full" />}

      {/* mobile — teaser */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="glass glass-hover-sm lg:hidden w-full cursor-pointer rounded-xl p-4 text-left"
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-vent/70" />
          <span className="h-2 w-2 rounded-full bg-lure/70" />
          <span className="h-2 w-2 rounded-full bg-bioglow/70" />
          <span className="ml-2 text-xs text-mist">guest@poran.dev</span>
        </div>
        <p className="font-mono text-sm">
          <span className="text-bioglow">guest@poran.dev</span>
          <span className="text-jelly">:~$</span>{" "}
          <span className="text-mist">tap to open terminal_</span>
        </p>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Interactive terminal"
          className="lg:hidden fixed inset-0 z-70 flex flex-col gap-3 bg-abyss/95 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close terminal"
            className="self-end text-mist transition-colors duration-200 hover:text-bioglow cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <DevTerminal
            className="flex-1"
            autoFocus
            onNavigate={() => setIsOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default TerminalWidget;

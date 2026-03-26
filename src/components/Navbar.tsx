import { useEffect, useState } from "react";
import { GlassHeading, GlassLink } from "./ui";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const scrolledStyles = `
    backdrop-blur-sm bg-white/20 dark:bg-black/20
    border-b border-white/20 dark:border-white/10
    opacity-80 hover:opacity-100 shadow-sm
    hover:backdrop-blur-md hover:bg-white/30 dark:hover:bg-black/30
  `;

  const topStyles = `
    bg-transparent
    border-b border-transparent
    shadow-none
  `;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-40
        transition-all duration-300
        ${scrolled ? scrolledStyles : topStyles}
      `}
    >
      <div className={`container mx-auto px-3 md:px-6 ${scrolled ? 'py-3' : 'py-5'} flex items-center justify-between transition-all duration-300`}>
        <GlassHeading level={4}>
          <a href="/#">Poran Dip</a>
        </GlassHeading>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12 text-lg">
          <GlassLink href="/#about" variant="internal">
            ABOUT
          </GlassLink>
          <GlassLink href="/#projects" variant="internal">
            WORK
          </GlassLink>
          <GlassLink
            href="https://open.spotify.com/artist/07acxSnyhPk5oDLqfgfEgM"
            variant="external"
          >
            MUSIC
          </GlassLink>
          <GlassLink href="/#contact" variant="internal">
            CONTACT
          </GlassLink>

          <ThemeToggle />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg backdrop-blur-sm bg-white/20 dark:bg-black/20 border border-white/20 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`block h-0.5 bg-black/80 dark:bg-white/80 transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1.75" : ""}`}
            ></span>
            <span
              className={`block h-0.5 bg-black/80 dark:bg-white/80 transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block h-0.5 bg-black/80 dark:bg-white/80 transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.75" : ""}`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden backdrop-blur-md bg-white/30 dark:bg-black/30 transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
      >
        <div className="px-6 py-4 space-y-4 border-t border-white/20 dark:border-white/10">
          <div className="flex flex-col space-y-4">
            <GlassLink
              href="#about"
              variant="internal"
              onClick={closeMenu}
              className="border-b border-white/15 pb-4"
            >
              ABOUT
            </GlassLink>
            <GlassLink
              href="#projects"
              variant="internal"
              onClick={closeMenu}
              className="border-b border-white/15 pb-4"
            >
              WORK
            </GlassLink>
            <GlassLink
              href="https://open.spotify.com/artist/07acxSnyhPk5oDLqfgfEgM"
              variant="external"
              onClick={closeMenu}
              className="border-b border-white/15 pb-4"
            >
              MUSIC
            </GlassLink>
            <GlassLink
              href="#contact"
              variant="internal"
              onClick={closeMenu}
              className="border-b border-white/15 pb-4"
            >
              CONTACT
            </GlassLink>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

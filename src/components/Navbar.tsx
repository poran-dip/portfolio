import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { GlassHeading } from "./ui/GlassHeading";
import { GlassLink } from "./ui/GlassLink";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className="
        fixed top-0 left-0 right-0 z-40
        backdrop-blur-sm bg-white/20 dark:bg-black/20
        border-b border-white/20 dark:border-white/10
        opacity-70 hover:opacity-100
        hover:backdrop-blur-md hover:bg-white/30 dark:hover:bg-black/30
        transition-all duration-300
        shadow-sm py-4
      "
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <GlassHeading level={3}>Poran Dip</GlassHeading>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-20 text-xl">
          <GlassLink href="/#projects" variant="internal">PROJECTS</GlassLink>
          <GlassLink href="https://open.spotify.com/artist/07acxSnyhPk5oDLqfgfEgM" variant="external">MUSIC</GlassLink>
          <GlassLink href="/#about" variant="internal">ABOUT</GlassLink>
          <GlassLink href="/#contact" variant="internal">CONTACT</GlassLink>
        </div>
        
        {/* Desktop Theme Toggle */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg backdrop-blur-sm bg-white/20 dark:bg-black/20 border border-white/20 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="px-6 py-4 space-y-4 backdrop-blur-md bg-white/30 dark:bg-black/30 border-t border-white/20 dark:border-white/10">
          <div className="flex flex-col space-y-4 text-lg">
            <GlassLink href="#projects" variant="internal" onClick={closeMenu}>PROJECTS</GlassLink>
            <GlassLink href="https://open.spotify.com/artist/07acxSnyhPk5oDLqfgfEgM" variant="external" onClick={closeMenu}>MUSIC</GlassLink>
            <GlassLink href="#about" variant="internal" onClick={closeMenu}>ABOUT</GlassLink>
            <GlassLink href="#contact" variant="internal" onClick={closeMenu}>CONTACT</GlassLink>
          </div>
          <div className="pt-4 border-t border-white/20 dark:border-white/10">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

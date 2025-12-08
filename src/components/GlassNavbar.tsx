import type { HTMLAttributes } from "react";
import type { BaseProps } from "../types/glass.types";

interface GlassNavbarProps extends BaseProps, Omit<HTMLAttributes<HTMLElement>, 'className'> {}

// GlassNavbar Component
export const GlassNavbar: React.FC<GlassNavbarProps> = ({ children, className = "", ...props }) => (
  <nav
    className={`
      fixed top-0 left-0 right-0 z-40
      backdrop-blur-sm bg-white/20 dark:bg-black/20
      border-b border-white/20 dark:border-white/10
      opacity-70 hover:opacity-100
      hover:backdrop-blur-md hover:bg-white/30 dark:hover:bg-black/30
      transition-all duration-300
      shadow-sm
      ${className}
    `}
    {...props}
  >
    <div className="container mx-auto px-6 py-4">
      {children}
    </div>
  </nav>
);

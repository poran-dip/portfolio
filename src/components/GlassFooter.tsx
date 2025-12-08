import type { HTMLAttributes } from "react";
import type { BaseProps } from "../types/glass.types";
import { glassBase } from "../styles/glass";
import { glassAnimations } from "../styles/glass";

interface GlassFooterProps extends BaseProps, Omit<HTMLAttributes<HTMLElement>, 'className'> {}

// GlassFooter Component
export const GlassFooter: React.FC<GlassFooterProps> = ({ children, className = "", ...props }) => (
  <footer
    className={`
      ${glassBase} ${glassAnimations.hoverSubtle}
      mt-16 p-8 rounded-t-3xl
      bg-gradient-to-t from-zinc-200/80 to-zinc-100/60
      dark:from-zinc-900/80 dark:to-zinc-800/60
      text-gray-800 dark:text-white
      shadow-2xl
      ${className}
    `}
    {...props}
  >
    {children}
  </footer>
);

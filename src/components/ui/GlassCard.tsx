import type { HTMLAttributes } from "react";
import type { BaseProps } from "../../types/glass.types";
import { glassBase, glassHover } from "../../styles/glass";

interface GlassCardProps extends BaseProps, Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  hoverable?: boolean
}

// GlassCard Component
export const GlassCard: React.FC<GlassCardProps> = ({ children, hoverable = true, className = "", ...props }) => (
  <div
    className={`
      ${glassBase} ${hoverable ? glassHover : ""}
      p-6 rounded-2xl shadow-lg
      bg-linear-to-br from-zinc-100/40 to-zinc-200/40
      dark:from-zinc-900/40 dark:to-zinc-800/40
      text-gray-800 dark:text-white
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
);

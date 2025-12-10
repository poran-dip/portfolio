import type { BaseProps } from "../types/glass.types";

interface GlassLayoutProps extends BaseProps {
  className?: string;
}

// GlassLayout Component (for root wrapper)
export const GlassLayout: React.FC<GlassLayoutProps> = ({ children, className = "" }) => (
  <div
    className={`
      min-h-screen
      bg-linear-to-br from-slate-200 via-blue-200 to-purple-200
      dark:from-slate-900 dark:via-blue-950 dark:to-purple-950
      transition-colors duration-300
      ${className}
    `}
  >
    {children}
  </div>
);

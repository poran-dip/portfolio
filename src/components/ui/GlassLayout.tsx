import { cn } from "@/lib/utils";
import type { BaseProps } from "@/types/glass.types";

interface GlassLayoutProps extends BaseProps {
  className?: string;
}

// GlassLayout Component (for root wrapper)
export const GlassLayout: React.FC<GlassLayoutProps> = ({
  children,
  className = "",
}) => (
  <div
    className={cn(
      "min-h-screen bg-linear-to-br from-slate-200 via-blue-200 to-purple-200 transition-colors duration-300",
      className,
    )}
  >
    {children}
  </div>
);

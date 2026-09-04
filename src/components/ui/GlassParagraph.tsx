import { cn } from "@/lib/utils";
import type { BaseProps } from "@/types/glass.types";

interface GlassParagraphProps
  extends BaseProps,
    Omit<React.HTMLAttributes<HTMLParagraphElement>, "className"> {}

// GlassParagraph Component
export const GlassParagraph: React.FC<GlassParagraphProps> = ({
  children,
  className = "",
  ...props
}) => (
  <p className={cn("text-gray-700 leading-relaxed", className)} {...props}>
    {children}
  </p>
);

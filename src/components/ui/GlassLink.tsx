import { cn } from "@/lib/utils";
import { glassAnimations } from "@/styles/glass";
import type { BaseProps } from "@/types/glass.types";

interface GlassLinkProps
  extends BaseProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> {
  href: string;
  variant?: "external" | "internal";
}

// GlassLink Component
export const GlassLink: React.FC<GlassLinkProps> = ({
  children,
  href,
  variant = "external",
  className = "",
  ...props
}) => {
  const baseClasses = cn(
    "text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium underline-offset-4 hover:underline",
    glassAnimations.hoverSubtle,
    className,
  );

  if (variant === "internal") {
    return (
      <a href={href} className={baseClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={baseClasses}
      {...props}
    >
      {children}
    </a>
  );
};

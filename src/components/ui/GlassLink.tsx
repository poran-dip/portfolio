import type { AnchorHTMLAttributes } from "react";
import type { BaseProps } from "../../types/glass.types";
import { glassAnimations } from "../../styles/glass";

interface GlassLinkProps extends BaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  href: string;
  variant?: 'external' | 'internal';
}

// GlassLink Component
export const GlassLink: React.FC<GlassLinkProps> = ({ 
  children, 
  href, 
  variant = "external", 
  className = "", 
  ...props 
}) => {
  const baseClasses: string = `
    text-blue-600 dark:text-blue-400
    hover:text-blue-800 dark:hover:text-blue-200
    transition-colors duration-200
    font-medium underline-offset-4
    hover:underline
    ${glassAnimations.hoverSubtle}
    ${className}
  `;

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

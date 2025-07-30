import type { SelectHTMLAttributes } from "react";
import type { BaseProps } from "../../types/glass.types";
import { glassBase } from "../../styles/glass";

interface GlassSelectProps extends BaseProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  error?: boolean;
}

// GlassSelect Component
export const GlassSelect: React.FC<GlassSelectProps> = ({ 
  children, 
  className = "", 
  error = false, 
  ...props 
}) => (
  <select
    className={`
      ${glassBase}
      w-full px-4 py-3 rounded-xl 
      bg-gradient-to-r from-zinc-100/50 to-zinc-200/30
      dark:from-zinc-800/50 dark:to-zinc-700/30
      focus:bg-zinc-200 dark:focus:bg-zinc-800
      text-gray-800 dark:text-white
      focus:outline-none focus:ring-2 focus:ring-blue-500/50
      focus:scale-[1.01] focus:-translate-y-px
      ${error ? "border-red-500/50 focus:ring-red-500/50" : ""}
      shadow-md transition-all duration-300
      ${className}
    `}
    {...props}
  >
    {children}
  </select>
);

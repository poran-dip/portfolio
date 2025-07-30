import type { TextareaHTMLAttributes } from "react";
import { glassBase } from "../../styles/glass";

interface GlassTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  className?: string;
  error?: boolean;
}

// GlassTextarea Component
export const GlassTextarea: React.FC<GlassTextareaProps> = ({ className = "", error = false, ...props }) => (
  <textarea
    className={`
      ${glassBase}
      w-full px-4 py-3 rounded-xl
      bg-gradient-to-r from-zinc-100/50 to-zinc-200/30
      dark:from-zinc-800/50 dark:to-zinc-700/30
      text-gray-800 dark:text-white
      placeholder-gray-500 dark:placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-blue-500/50
      focus:scale-[1.01] focus:-translate-y-px
      ${error ? "border-red-500/50 focus:ring-red-500/50" : ""}
      shadow-md transition-all duration-300
      min-h-[100px] resize-none
      ${className}
    `}
    {...props}
  />
);

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";

interface GlassTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  className?: string;
  error?: boolean;
}

// GlassTextarea Component
export const GlassTextarea: React.FC<GlassTextareaProps> = ({
  className = "",
  error = false,
  ...props
}) => (
  <textarea
    className={cn(
      glass.base,
      "w-full px-3 py-2 rounded-xl bg-linear-to-r from-zinc-100/50 to-zinc-200/30 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:scale-[1.01] focus:-translate-y-px shadow-md transition-all duration-300 min-h-25 resize-none",
      error && "border-red-500/50 focus:ring-red-500/50",
      className,
    )}
    {...props}
  />
);

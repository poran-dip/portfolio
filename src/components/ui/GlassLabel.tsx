import { cn } from "@/lib/utils";

interface GlassLabelProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "className"> {
  className?: string;
  required?: boolean;
  htmlFor: string;
}

// GlassLabel Component
export const GlassLabel: React.FC<GlassLabelProps> = ({
  className = "",
  required = false,
  htmlFor,
  children,
  ...props
}) => (
  <label
    htmlFor={htmlFor}
    className={cn("block mb-2 text-sm font-semibold text-gray-700", className)}
    {...props}
  >
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

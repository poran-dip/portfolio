import type { LabelHTMLAttributes } from "react";

interface GlassLabelProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'className'> {
  className?: string;
  required?: boolean;
}

// GlassLabel Component
export const GlassLabel: React.FC<GlassLabelProps> = ({ 
  className = "", 
  required = false, 
  children, 
  ...props 
}) => (
  <label
    className={`
      block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200
      ${className}
    `}
    {...props}
  >
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

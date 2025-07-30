import type { ButtonHTMLAttributes } from "react";
import type { BaseProps } from "../../types/glass.types";
import { glassBase, glassHover } from "../../styles/glass";

interface GlassButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  disabled?: boolean;
}

// GlassButton Component
export const GlassButton: React.FC<GlassButtonProps> = ({ 
  children, 
  variant = "primary", 
  className = "", 
  disabled = false, 
  ...props 
}) => {
  const variants: Record<NonNullable<GlassButtonProps['variant']>, string> = {
    primary: "bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-900 dark:text-blue-100",
    secondary: "bg-gradient-to-r from-zinc-400/20 to-zinc-500/20 hover:from-zinc-400/30 hover:to-zinc-500/30 text-gray-800 dark:text-gray-200",
    success: "bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-900 dark:text-green-100",
    danger: "bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-red-900 dark:text-red-100"
  };

  return (
    <button
      className={`
        ${glassBase} ${!disabled ? glassHover : "opacity-50 cursor-not-allowed"}
        px-6 py-3 rounded-xl shadow-md font-medium
        ${variants[variant]}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

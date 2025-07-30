import { glassBase, glassHover } from "../../styles/glass";
import type { BaseProps } from "../../types/glass.types";

// Add this to your GlassButton file or create a separate component
interface GlassFilePickerProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  disabled?: boolean;
  name: string;
  accept?: string;
}

export const GlassFilePicker: React.FC<GlassFilePickerProps> = ({ 
  children, 
  variant = "success", 
  className = "", 
  disabled = false,
  name,
  accept,
  ...props 
}) => {
  const variants: Record<NonNullable<GlassFilePickerProps['variant']>, string> = {
    primary: "bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-900 dark:text-blue-100",
    secondary: "bg-gradient-to-r from-zinc-400/20 to-zinc-500/20 hover:from-zinc-400/30 hover:to-zinc-500/30 text-gray-800 dark:text-gray-200",
    success: "bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-900 dark:text-green-100",
    danger: "bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-red-900 dark:text-red-100"
  };

  return (
    <label
      className={`
        ${glassBase} ${!disabled ? glassHover : "opacity-50 cursor-not-allowed"}
        px-6 py-3 rounded-xl shadow-md font-medium
        ${variants[variant]}
        flex items-center justify-center cursor-pointer
        ${className}
      `}
      {...props}
    >
      {children}
      <input 
        type="file" 
        name={name}
        accept={accept}
        className="hidden" 
        disabled={disabled}
      />
    </label>
  );
};

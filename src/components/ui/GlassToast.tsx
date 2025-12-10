import { glassBase, glassHover } from "../../styles/glass";
import { glassAnimations } from "../../styles/glass";

interface GlassToastProps {
  message: string;
  variant?: 'info' | 'success' | 'error';
  isVisible?: boolean;
  onClose?: () => void;
  className?: string;
}

// GlassToast Component
export const GlassToast: React.FC<GlassToastProps> = ({ 
  message, 
  variant = "info", 
  isVisible = true, 
  onClose, 
  className = "" 
}) => {
  const variants: Record<NonNullable<GlassToastProps['variant']>, string> = {
    info: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-900 dark:text-blue-100",
    success: "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-900 dark:text-green-100",
    error: "from-red-500/20 to-pink-500/20 border-red-500/30 text-red-900 dark:text-red-100"
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        ${glassBase} ${glassHover}
        fixed top-4 right-4 p-4 rounded-xl shadow-lg
        bg-linear-to-r ${variants[variant]}
        transform transition-all duration-300
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        z-50 max-w-sm
        ${className}
      `}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className={`ml-3 text-current hover:opacity-70 transition-opacity ${glassAnimations.hoverSubtle}`}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

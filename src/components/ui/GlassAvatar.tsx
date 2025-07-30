import type { HTMLAttributes } from "react";
import { glassBase, glassHover } from "../../styles/glass";

interface GlassAvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// GlassAvatar Component
export const GlassAvatar: React.FC<GlassAvatarProps> = ({ 
  src, 
  alt, 
  size = "md", 
  className = "", 
  ...props 
}) => {
  const sizes: Record<NonNullable<GlassAvatarProps['size']>, string> = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  return (
    <div
      className={`
        ${glassBase} ${glassHover}
        ${sizes[size]} rounded-full overflow-hidden
        bg-gradient-to-br from-zinc-200/50 to-zinc-300/50
        dark:from-zinc-700/50 dark:to-zinc-600/50
        shadow-lg
        ${className}
      `}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

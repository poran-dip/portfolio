// Base glass styles
export const glass = {
  base: "backdrop-blur-md border border-white/20 transition-all duration-200",
  hover: "hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-xl",
  hoverLg: "hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl",
} as const;

// Reusable hover animations
export const glassAnimations = {
  hover:
    "hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300",
  hoverLg:
    "hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300",
  hoverXl:
    "hover:scale-[1.05] hover:-translate-y-2 transition-all duration-300",
  hoverSubtle:
    "hover:scale-[1.01] hover:-translate-y-px transition-all duration-300",
} as const;

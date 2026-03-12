// Base glass styles
export const glass = {
	base: "backdrop-blur-md border border-white/20 dark:border-white/10 transition-all duration-200",
	hover:
		"hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-xl dark:hover:shadow-white/20",
	hoverLg:
		"hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-white/30",
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

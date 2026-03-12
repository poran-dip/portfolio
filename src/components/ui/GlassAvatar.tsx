import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";

interface GlassAvatarProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
	src: string;
	alt: string;
	size?: "sm" | "md" | "lg" | "xl";
	className?: string;
}

export function GlassAvatar({
	src,
	alt,
	size = "md",
	className = "",
	...props
}: GlassAvatarProps) {
	const sizes: Record<NonNullable<GlassAvatarProps["size"]>, string> = {
		sm: "w-8 h-8",
		md: "w-12 h-12",
		lg: "w-16 h-16",
		xl: "w-24 h-24",
	};

	return (
		<div
			className={cn(
				glass.base,
				glass.hover,
				sizes[size],
				"rounded-full overflow-hidden bg-linear-to-br from-zinc-200/50 to-zinc-300/50 dark:from-zinc-700/50 dark:to-zinc-600/50 shadow-lg",
				className,
			)}
			{...props}
		>
			<img src={src} alt={alt} className="w-full h-full object-cover" />
		</div>
	);
}

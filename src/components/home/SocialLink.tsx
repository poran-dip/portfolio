import type { LucideIcon } from "lucide-react";
import { GlassLink } from "@/components/ui";

export interface SocialLinkProps {
  href: string;
  Icon: LucideIcon;
  platform: string;
  description: string;
}

const SocialLink = ({ href, Icon, platform, description }: SocialLinkProps) => {
  return (
    <GlassLink
      href={href}
      className="p-2 sm:p-3 flex items-center gap-4 sm:gap-6 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200"
    >
      <Icon className="shrink-0 w-5 sm:w-6 h-5 sm:h-6" />
      <div className="flex flex-col">
        <span className="text-sm sm:text-base">{platform}</span>
        <span className="text-xs sm:text-sm opacity-60">{description}</span>
      </div>
    </GlassLink>
  );
};

export default SocialLink;

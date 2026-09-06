import type { SocialLinkEntry } from "@/types/social-links.types";

const SocialLink = ({ href, Icon, platform, description }: SocialLinkEntry) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="glass glass-hover-sm group flex items-center gap-3 rounded-xl p-3 sm:p-4"
    >
      <span className="glass-panel flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg text-bioglow transition-colors duration-200 group-hover:text-jelly">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </span>
      <div className="flex flex-col min-w-0">
        <span className="text-sm sm:text-base font-medium text-foam truncate">
          {platform}
        </span>
        <span className="text-xs sm:text-sm text-mist truncate">
          {description}
        </span>
      </div>
    </a>
  );
};

export default SocialLink;

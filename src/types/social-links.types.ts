import type { LucideIcon } from "lucide-react";

export interface SocialLinkEntry {
  href: string;
  Icon: LucideIcon;
  platform: string;
  description: string;
  primary?: boolean;
}

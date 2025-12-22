import type { LucideIcon } from "lucide-react"
import { GlassLink } from "./ui/GlassLink"

export interface SocialLinkProps {
  href: string
  Icon: LucideIcon
  platform: string
  description: string
}

const SocialLink = ({ href, Icon, platform, description}: SocialLinkProps) => {
  return (
    <GlassLink href={href} className="flex items-center gap-2 justify-center p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-100">
      <Icon className="w-6 h-6" />
      <div className="flex flex-col ml-4 items-center">
        <span className="text-sm">{platform}</span>
        <span className="text-xs opacity-60 text-center">{description}</span>
      </div>
    </GlassLink>
  )
}

export default SocialLink

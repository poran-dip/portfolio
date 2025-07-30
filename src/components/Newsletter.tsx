import { GlassCard } from "./ui/GlassCard"
import { GlassHeading } from "./ui/GlassHeading"
import { GlassParagraph } from "./ui/GlassParagraph"

const Newsletter = () => {
  return (
    <GlassCard>
      <GlassHeading level={2}>Subscribe to my newsletter</GlassHeading>
      <GlassParagraph className="pt-4 italic opacity-60">Stay tuned, coming soon!</GlassParagraph>
    </GlassCard>
  )
}

export default Newsletter

import { GlassCard } from "./ui/GlassCard"
import { GlassHeading } from "./ui/GlassHeading"
import TimelineCard, { type TimelineCardProps } from "./TimelineCard"
import { GlassParagraph } from "./ui/GlassParagraph"
import { Dot } from "lucide-react"

const milestones: TimelineCardProps[] = [
  {
    title: "KrishiAI Development",
    date: "Sep 2025 - Present",
    location: "Smart India Hackathon 2025",
    description: "Led team Nexhaust for SIH 2025; built KrishiAI, lead developer/system architect",
    status: 'ongoing'
  },
  {
    title: "Released LotL",
    date: "Aug 2025",
    location: "npmjs",
    description: "Released LotL, a CLI tool for converting Markdown documents to PDF, on npm"
  },
  {
    title: "Full-Stack & SBC Intern",
    date: "Jul 2025",
    location: "IIT Guwahati",
    description: "Developed ODStream (look at projects above) for underwater object detection applications"
  }
]

const Timeline = () => {
  return (
    <GlassCard id="timeline" hoverable={false} className="scroll-mt-20">
      <GlassHeading>MY JOURNEY</GlassHeading>
      <GlassParagraph className="mt-6 text-lg!">Leveling up with every project I venture on.</GlassParagraph>

      <div className="my-4 flex flex-col">
        {milestones.map((m, i) => (
          <TimelineCard key={`timeline-${i}`} title={m.title} location={m.location} date={m.date} description={m.description} status={m.status} />
        ))}

        <div className="flex">
          <div className="flex flex-col items-center pt-1">
            <Dot size={60} strokeWidth={0.35} />
            
            <div className={`grow w-0.5 bg-linear-to-b from-white/30 to-transparent`} />
          </div>

          <div className="flex-1 space-y-5 pt-5 pb-6">
            <div className="space-y-px">
              <GlassHeading level={5}>Journey begins</GlassHeading>
              
            </div>
            <p className="text-white/80">
              And thus, a little radish sprouted!
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

export default Timeline

import { GlassCard } from "./ui/GlassCard"
import { GlassHeading } from "./ui/GlassHeading"
import TimelineCard, { type TimelineCardProps } from "./TimelineCard"
import { GlassParagraph } from "./ui/GlassParagraph"

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
    <GlassCard hoverable={false}>
      <GlassHeading>MY JOURNEY</GlassHeading>
      <GlassParagraph className="mt-6 text-lg!">Leveling up with every project I venture on.</GlassParagraph>

      <div className="my-4 flex flex-col">
        {milestones.map((m, i) => (
          <TimelineCard key={`timeline-${i}`} title={m.title} location={m.location} date={m.date} description={m.description} status={m.status} />
        ))}
      </div>
    </GlassCard>
  )
}

export default Timeline

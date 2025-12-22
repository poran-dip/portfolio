import { Dot, Star } from "lucide-react"
import { GlassHeading } from "./ui/GlassHeading"
import { GlassParagraph } from "./ui/GlassParagraph"

export interface TimelineCardProps {
  title: string
  location?: string
  date: string
  description: string
  status?: 'done' | 'ongoing'
}

const TimelineCard = ({ title, location, date, description, status = 'done' }: TimelineCardProps) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center pt-1">
        {status === 'done' ?
          <Dot size={60} /> :
          <Star size={20} className="m-5" />
        }
        <div className={`grow w-0.5 border-l-2 border-gray-900/30 dark:border-gray-100/30 ${status === 'ongoing' && 'border-dashed'}`} />
      </div>

      <div className="flex-1 space-y-5 pt-2 pb-6">
        <div className="space-y-px">
          <GlassHeading level={5}>{title}</GlassHeading>
          <GlassParagraph className="text-sm">
            {location && `${location} • `}{date}
          </GlassParagraph>
        </div>
        <GlassParagraph>
          {description}
        </GlassParagraph>
      </div>
    </div>
  )
}

export default TimelineCard

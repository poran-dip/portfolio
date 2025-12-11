import { Dot, Star } from "lucide-react"
import { GlassHeading } from "./ui/GlassHeading"

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
        <div className={`grow w-0.5 border-l-2 border-white/30 ${status === 'ongoing' && 'border-dashed'}`} />
      </div>

      <div className="flex-1 space-y-5 pt-2 pb-6">
        <div className="space-y-px">
          <GlassHeading level={5}>{title}</GlassHeading>
          <p className="text-sm text-white/80">
            {location && `${location} • `}{date}
          </p>
        </div>
        <p className="text-white/80">
          {description}
        </p>
      </div>
    </div>
  )
}

export default TimelineCard

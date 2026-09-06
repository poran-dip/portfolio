import { Dot, Star } from "lucide-react";
import type { ExperienceEntry } from "@/types/experience.types";

const ExperienceCard = ({
  title,
  location,
  date,
  description,
  status = "done",
  link,
}: ExperienceEntry) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center pt-1">
        {status === "done" ? (
          <Dot size={60} className="text-bioglow" />
        ) : (
          <Star size={20} className="m-5 text-bioglow" />
        )}
        <div
          className={`grow w-0.5 border-l-2 border-mist/50 ${status === "ongoing" && "border-dashed"}`}
        />
      </div>

      <div className="flex-1 space-y-5 pt-2 pb-6">
        <div className="space-y-px">
          <p className="font-bold text-foam">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-bioglow transition-colors duration-200"
              >
                {title}
              </a>
            ) : (
              title
            )}
          </p>
          <p className="text-sm italic text-mist">
            {location && `${location} · `}
            {date}
          </p>
        </div>
        <p className="text-foam">{description}</p>
      </div>
    </div>
  );
};

export default ExperienceCard;

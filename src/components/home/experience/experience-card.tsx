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
        <ul className="flex flex-col gap-2">
          {description.map((point) => (
            <li key={point} className="flex gap-2 text-foam">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-bioglow" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceCard;

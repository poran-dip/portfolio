import { Dot } from "lucide-react";
import { timeline } from "@/data/timeline";
import TimelineCard from "./TimelineCard";

const Timeline = () => {
  return (
    <div className="w-full bg-deep">
      <section
        id="experience"
        className="scroll-mt-12 md:scroll-mt-14 mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16"
      >
        <h3 className="glass-hover-sm inline-block font-bold whitespace-nowrap text-2xl">
          <span className="text-jelly">&gt; </span>
          <span className="text-bioglow">./</span>
          <span className="text-foam">experience</span>
        </h3>

        <div className="mt-6 flex flex-col gap-6">
          <p className="text-mist">
            A timeline of projects, roles, and everything in between.
          </p>

          <div className="flex flex-col">
            {timeline.map((m) => (
              <TimelineCard
                key={m.date}
                title={m.title}
                location={m.location}
                date={m.date}
                description={m.description}
                status={m.status}
                link={m.link}
              />
            ))}

            <div className="flex">
              <div className="flex flex-col items-center pt-1">
                <Dot size={60} strokeWidth={0.35} className="text-bioglow" />

                <div
                  className={`grow w-0.5 bg-linear-to-b from-bioglow/30 to-transparent`}
                />
              </div>

              <div className="flex-1 space-y-5 pt-5 pb-6">
                <div className="space-y-px">
                  <p className="font-bold text-foam">Journey begins</p>
                </div>
                <p className="text-foam">
                  And so, a tiny glimmer first pierced the abyss.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Timeline;

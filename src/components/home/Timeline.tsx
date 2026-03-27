import { Dot } from "lucide-react";
import { GlassHeading, GlassParagraph } from "@/components/ui";
import TimelineCard, { type TimelineCardProps } from "./TimelineCard";

const milestones: TimelineCardProps[] = [
  {
    title: "Web Wing Coordinator",
    date: "Aug 2025 - Present",
    location: "Coding Club, Assam Engineering College",
    description:
      "Leading the web wing; developing official platforms like CodeWar and mentoring junior developers",
    status: "ongoing",
  },
  {
    title: "Released lotl",
    date: "Aug 2025",
    location: "npmjs",
    description:
      "Released lotl, a CLI tool for converting Markdown documents to PDF, on npm",
  },
  {
    title: "Full-Stack & SBC Intern",
    date: "Jul 2025",
    location: "IIT Guwahati",
    description:
      "Developed ODStream (look at projects above) for underwater object detection applications",
  },
];

const Timeline = () => {
  return (
    <section
      id="timeline"
      className="scroll-mt-16 md:scroll-mt-12 py-4 md:py-12"
    >
      <div className="flex items-center gap-4">
        <GlassHeading level={3} className="font-bold whitespace-nowrap">
          MY JOURNEY
        </GlassHeading>
        <div className="h-px flex-1 bg-black/20 dark:bg-white/20" />
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <GlassParagraph>
          A timeline of projects, roles, and everything in between.
        </GlassParagraph>

        <div className="flex flex-col">
          {milestones.map((m, i) => (
            <TimelineCard
              key={`timeline-${i}`}
              title={m.title}
              location={m.location}
              date={m.date}
              description={m.description}
              status={m.status}
            />
          ))}

          <div className="flex">
            <div className="flex flex-col items-center pt-1">
              <Dot
                size={60}
                strokeWidth={0.35}
                className="text-black dark:text-white"
              />

              <div
                className={`grow w-0.5 bg-linear-to-b from-gray-900/30 dark:from-gray-100/30 to-transparent`}
              />
            </div>

            <div className="flex-1 space-y-5 pt-5 pb-6">
              <div className="space-y-px">
                <GlassHeading level={6} className="font-bold">
                  Journey begins
                </GlassHeading>
              </div>
              <GlassParagraph>
                And thus, a little radish sprouted!
              </GlassParagraph>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;

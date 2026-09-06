import { Dot } from "lucide-react";
import GitHubStatsPanel from "@/components/home/github-stats";
import { experiences } from "@/data/experience-data";
import ExperienceCard from "./experience-card";

const Experience = () => {
  return (
    <div className="w-full bg-deep">
      <section
        id="experience"
        className="scroll-mt-12 md:scroll-mt-14 mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16"
      >
        <h2 className="glass-hover-sm inline-block font-bold whitespace-nowrap text-2xl">
          <span className="text-jelly">&gt; </span>
          <span className="text-bioglow">./</span>
          <span className="text-foam">experience</span>
        </h2>

        <div className="mt-6 flex flex-col gap-6">
          <p className="text-mist">
            A timeline of projects, roles, and everything in between.
          </p>

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[2fr_1fr] lg:gap-8">
            <div className="flex flex-col">
              {experiences.map((m) => (
                <ExperienceCard
                  key={m.id}
                  id={m.id}
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

            <GitHubStatsPanel />
          </div>

          {/* CTA buttons */}
          <div className="pt-3 sm:pt-6 flex flex-col sm:flex-row gap-3 sm:gap-6 sm:justify-center">
            <a
              href="/Poran_Dip_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-hover glass-primary flex items-center justify-center rounded-xl w-full sm:w-40 lg:w-48 h-10 lg:h-12 text-sm lg:text-base font-semibold cursor-pointer"
            >
              View Full Resume
            </a>
            <a
              href="/#skills"
              className="glass glass-hover glass-secondary flex items-center justify-center rounded-xl w-full sm:w-40 lg:w-48 h-10 lg:h-12 text-sm lg:text-base font-semibold cursor-pointer"
            >
              View Skills
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;

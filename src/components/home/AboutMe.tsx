import FunFacts from "./FunFacts";
import SkillsSection from "./SkillsSection";
import TerminalWidget from "./TerminalWidget";

const AboutMe = () => {
  return (
    <div className="w-full bg-deep">
      <section
        id="about"
        className="scroll-mt-12 md:scroll-mt-14 mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16"
      >
        <h2 className="font-bold whitespace-nowrap text-2xl">
          <span className="text-jelly">&gt; </span>
          <span className="text-bioglow">./</span>
          <span className="text-foam">about</span>
        </h2>

        <div className="mt-6 flex flex-col gap-12">
          {/* Story + terminal */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            <div className="flex flex-col gap-4 max-w-3xl lg:flex-1 text-foam opacity-90">
              <p>
                I'm a full-stack developer who builds things that are useful and
                figures out whatever it takes to make them work. Most of what I
                build lives across the frontend and backend — polished
                interfaces, real-time systems, and everything in between.
                Whatever a project calls for, I pick it up as I go — that's half
                the fun.
              </p>
              <p>
                These days, I'm particularly drawn to interfaces that are
                accessible, scalable, and genuinely pleasant to use — and to
                falling down rabbit holes of distributed systems, home
                networking, and AI/ML on the side. Ultimately, I want to become
                a really good programmer, and build experiences people remember,
                not just projects that happen to work.
              </p>
            </div>

            <div className="lg:w-105 shrink-0">
              <TerminalWidget />
            </div>
          </div>

          <SkillsSection />

          <FunFacts />

          {/* CTA buttons */}
          <div className="pt-3 sm:pt-6 flex flex-col sm:flex-row gap-3 sm:gap-6 sm:justify-center">
            <a
              href="/#projects"
              className="glass-hover glass-primary flex items-center justify-center rounded-xl w-full sm:w-40 lg:w-48 h-10 lg:h-12 text-sm lg:text-base font-semibold cursor-pointer"
            >
              View Projects
            </a>
            <a
              href="/#experience"
              className="glass glass-hover glass-secondary flex items-center justify-center rounded-xl w-full sm:w-40 lg:w-48 h-10 lg:h-12 text-sm lg:text-base font-semibold cursor-pointer"
            >
              View Experience
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutMe;

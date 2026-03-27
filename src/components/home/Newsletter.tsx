import { GlassHeading, GlassParagraph } from "@/components/ui";

const Newsletter = () => {
  return (
    <section id="newsletter" className="scroll-mt-8 py-4 md:py-12">
      <div className="flex items-center gap-4">
        <GlassHeading level={3} className="font-bold whitespace-nowrap">
          NEWSLETTER
        </GlassHeading>
        <div className="h-px flex-1 bg-white/20" />
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <GlassParagraph>
          Subscribe to my newsletter and follow along as I share updates on my
          projects, music, and whatever I'm building next.
        </GlassParagraph>
        <GlassParagraph className="text-sm sm:text-base italic opacity-60">
          Coming soon, stay tuned!
        </GlassParagraph>
      </div>
    </section>
  );
};

export default Newsletter;

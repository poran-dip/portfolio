import { Star } from "lucide-react";
import {
  GlassAvatar,
  GlassCard,
  GlassHeading,
  GlassParagraph,
} from "@/components/ui";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Mom",
      role: "My Mom",
      rating: 5,
      review:
        "The website looks so cute! You know, so many intelligent people have changed the world with their computers. This is truly awesome, beta. Though I still don't understand why you stay up all night coding...",
      avatar: "mom.png",
    },
    {
      name: "Memu",
      role: "Best-est Cat",
      rating: 4,
      review:
        "Meow mrrrow! *purrs approvingly* Mrow meow. Meow.",
      avatar: "memu.png",
    },
    {
      name: "Me (2020)",
      role: "Past Self",
      rating: 5,
      review:
        "This looks insane! I have no idea how you made this, but I'm excited to build this in the future! Wait... if I build this now, would that cause a time paradox?",
      avatar: "profile.png",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-400"
        }`}
      />
    ));
  };

  return (
    <GlassCard id="testimonials" hoverable={false} className="scroll-mt-20">
      <GlassHeading>TESTIMONIALS</GlassHeading>
      <GlassParagraph className="mt-6 text-lg! mb-8!">
        What people are saying about my work...
      </GlassParagraph>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <GlassCard
            key={index}
            className="flex flex-col h-full from-blue-500/30! to-cyan-300/30!"
          >
            {/* Header with avatar and rating */}
            <div className="flex items-center gap-4 mb-4">
              <GlassAvatar
                src={testimonial.avatar}
                alt={`${testimonial.name} avatar`}
                size="lg"
                className="mr-2"
              />
              <div className="flex-1">
                <GlassHeading level={4} className="mb-1!">
                  {testimonial.name}
                </GlassHeading>
                <GlassParagraph className="text-sm! opacity-75 mb-2!">
                  {testimonial.role}
                </GlassParagraph>
                <div className="flex gap-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            </div>

            {/* Review content */}
            <GlassParagraph className="flex-1 text-base! leading-relaxed italic">
              "{testimonial.review}"
            </GlassParagraph>
          </GlassCard>
        ))}
      </div>

      <div className="mt-8 text-center">
        <GlassParagraph className="text-sm! opacity-60 italic">
          * Testimonials may be slightly fabricated for comedic effect. Will
          be updated with real content later (or not).
        </GlassParagraph>
      </div>
    </GlassCard>
  );
};

export default Testimonials;

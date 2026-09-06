import { Star } from "lucide-react";

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
      review: "Meow mrrrow! *purrs approvingly* Mrow meow. Meow.",
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
        // biome-ignore lint: stable
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-400"
        }`}
      />
    ));
  };

  return (
    <div className="w-full bg-deep">
      <section
        id="testimonials"
        className="scroll-mt-12 md:scroll-mt-14 mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16"
      >
        <h2 className="font-bold whitespace-nowrap text-2xl">
          <span className="text-jelly">&gt; </span>
          <span className="text-bioglow">./</span>
          <span className="text-foam">testimonials</span>
        </h2>

        <div className="mt-6 flex flex-col gap-6">
          <p className="text-foam">What people are saying about my work...</p>

          <div className="grid lg:grid-cols-3 gap-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="glass glass-panel glass-hover-sm p-3 md:p-5 flex flex-col h-full rounded-2xl"
              >
                {/* Header with avatar and rating */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="mr-2 w-12 h-12 shrink-0 rounded-full overflow-hidden">
                    <img
                      src={testimonial.avatar}
                      alt={`${testimonial.name} avatar`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foam">{testimonial.name}</p>
                    <p className="text-sm text-mist mb-1">{testimonial.role}</p>
                    <div className="flex gap-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>

                {/* Review content */}
                <p className="flex-1 text-base leading-relaxed italic text-foam">
                  "{testimonial.review}"
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2 text-center">
            <p className="text-sm sm:text-base italic text-mist">
              * Testimonials may be slightly fabricated for comedic effect. Will
              be updated with real content later (or not).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;

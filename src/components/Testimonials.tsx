import { GlassAvatar } from "./ui/GlassAvatar"
import { GlassCard } from "./ui/GlassCard"
import { GlassHeading } from "./ui/GlassHeading"
import { GlassParagraph } from "./ui/GlassParagraph"
import { Star } from "lucide-react"

const Testimonials = () => {
  const testimonials = [
    {
      name: "Mom",
      role: "Professional Life Giver",
      rating: 5,
      review: "The website looks so cute! You know, so many intelligent people have changed the world with their computers. This is truly awesome, beta. Though I still don't understand why you stay up all night coding...",
      avatar: "mom.png"
    },
    {
      name: "Memu",
      role: "Chief Feline Officer",
      rating: 4,
      review: "Meow mrrrow! *purrs approvingly* Mrow meow meow. *knocks over water glass* Meow.",
      avatar: "memu.png"
    },
    {
      name: "My 2020 Self",
      role: "Past Me (Innocent Era)",
      rating: 5,
      review: "Dude, I never knew I had a glass fetish until I saw this design. The transparency, the blur effects, the subtle gradients... *chef's kiss* Future me has taste!",
      avatar: "profile.png"
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-400'
        }`}
      />
    ))
  }

  return (
    <GlassCard id="testimonials" className="scroll-mt-20">
      <GlassHeading>TESTIMONIALS</GlassHeading>
      <GlassParagraph className="mt-6 !text-lg !mb-8">
        What people (and cats) are saying about my work...
      </GlassParagraph>
      
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <GlassCard key={index} className="flex flex-col h-full !from-blue-500/30 !to-cyan-300/30">
            {/* Header with avatar and rating */}
            <div className="flex items-center gap-4 mb-4">
              <GlassAvatar src={testimonial.avatar} alt={`${testimonial.name} avatar`} size="lg" className="mr-2" />
              <div className="flex-1">
                <GlassHeading level={4} className="!mb-1">{testimonial.name}</GlassHeading>
                <GlassParagraph className="!text-sm opacity-75 !mb-2">
                  {testimonial.role}
                </GlassParagraph>
                <div className="flex gap-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            </div>
            
            {/* Review content */}
            <GlassParagraph className="flex-1 !text-base leading-relaxed italic">
              "{testimonial.review}"
            </GlassParagraph>
          </GlassCard>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <GlassParagraph className="!text-sm opacity-60 italic">
          * Testimonials may be slightly fabricated for comedic effect. Memu's review was translated from Cat. Will be updated with real content later (or not).
        </GlassParagraph>
      </div>
    </GlassCard>
  )
}

export default Testimonials

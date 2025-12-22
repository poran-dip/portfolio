import { ChevronDown } from "lucide-react"
import { GlassAvatar } from "./ui/GlassAvatar"
import { GlassButton } from "./ui/GlassButton"
import { GlassCard } from "./ui/GlassCard"
import { GlassHeading } from "./ui/GlassHeading"
import { GlassLink } from "./ui/GlassLink"
import { useState, useEffect } from "react"

const HeroCard = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const titles = ["CS Student", "Web Developer", "Music Producer", "Pixel Wizard", "Sound Architect"]
  const [currentTitle, setCurrentTitle] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-blue-700 dark:bg-blue-400 rounded-full animate-bounce"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + (i % 3)}s`
            }}
          ></div>
        ))}
      </div>

      <GlassCard hoverable={false} className={`relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8 pt-24 md:pt-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Animated background gradients */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 animate-pulse"></div>
      
        {/* Mouse follower glow */}
        <div
          className="absolute w-80 h-80 rounded-full pointer-events-none transition-all duration-50 ease-out"
          style={{
            left: mousePosition.x + scrollX - 160,
            top: mousePosition.y + scrollY - 160,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 70%)'
          }}
        ></div>
        <div className="max-w-7xl w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-12 items-center space-y-8 lg:space-y-0">
          
            {/* Avatar section */}
            <div className="w-full flex justify-center lg:col-span-1 lg:justify-end">
              <div className="relative group">
                {/* Glowing rings around avatar */}
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-cyan-500 animate-spin opacity-75 scale-110 blur-sm"></div>
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin opacity-50 scale-125 blur-md" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
                
                <GlassAvatar 
                  src="profile.png" 
                  alt="Poran Dip" 
                  className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 border-4 border-white/20 hover:scale-105 transition-transform duration-500 shadow-2xl shadow-blue-500/25" 
                />
                
                {/* Floating emoji */}
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 text-2xl sm:text-4xl animate-bounce">🎵</div>
                <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 text-2xl sm:text-4xl animate-pulse">✨</div>
              </div>
            </div>

            {/* Content section */}
            <div className="w-full lg:col-span-2 space-y-6 lg:space-y-8 text-center lg:text-left px-4 lg:px-0">
              
              {/* Name */}
              <div className="space-y-3 lg:space-y-4">
                <GlassHeading className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                  Poran Dip
                </GlassHeading>
                
                {/* Animated role titles */}
                <div className="h-6 sm:h-8 overflow-hidden">
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-blue-400 transition-all duration-500 transform">
                    {titles[currentTitle]}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-4 lg:space-y-6 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <p className="opacity-90 hover:opacity-100 transition-opacity duration-300">
                  I make pixels dance and sound waves sing 🎶 – crafting digital experiences
                  that blur the line between art and code.
                </p>
                
                <p className="opacity-80 hover:opacity-100 transition-opacity duration-300">
                  Late-night experimenter, certified{" "}
                  <a
                    href="https://youtu.be/7zkCp_kVtj4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300 group"
                  >
                    <span className="relative z-10">Radish Enjoyer™</span>
                    <span className="absolute inset-0 bg-green-400/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded"></span>
                  </a>{" "}
                  (Yuegui supremacy).
                </p>
                
                <p className="opacity-80 hover:opacity-100 transition-opacity duration-300 text-lg sm:text-xl font-medium">
                  Welcome to my corner of the internet – wipe your feet, grab a snack, and vibe ✨
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-row gap-4 sm:gap-6 justify-center lg:justify-start pt-6 lg:pt-8 w-full">
                <GlassLink href="#projects" variant="internal">
                  <GlassButton className="w-full sm:w-48 lg:w-64 h-12 lg:h-14 text-base lg:text-lg font-semibold hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                    <span className="relative z-10">View Projects</span>
                    <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-purple-500/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </GlassButton>
                </GlassLink>
                
                <GlassLink href="#contact" variant="internal">
                  <GlassButton variant="success" className="w-full sm:w-48 lg:w-64 h-12 lg:h-14 text-base lg:text-lg font-semibold hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                    <span className="relative z-10">Let's Connect</span>
                    <div className="absolute inset-0 bg-linear-to-r from-green-500/20 to-cyan-500/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </GlassButton>
                </GlassLink>

                <GlassLink href="/blog" variant="internal" target="_blank">
                  <GlassButton variant="danger" className="w-full sm:w-48 lg:w-64 h-12 lg:h-14 text-base lg:text-lg font-semibold hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                    <span className="relative z-10">Read Blog</span>
                    <div className="absolute inset-0 bg-linear-to-r from-red-500/20 to-orange-500/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </GlassButton>
                </GlassLink>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint indicator - Hidden on mobile */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden lg:block">
          <ChevronDown className="w-10 h-10 text-blue-600 hover:text-blue-400 transition-colors duration-300 animate-bounce" />
        </div>
      </GlassCard>
    </div>
  )
}

export default HeroCard

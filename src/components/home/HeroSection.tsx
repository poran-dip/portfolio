import { useState, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import {
  GlassAvatar,
  GlassButton,
  GlassCard,
  GlassHeading,
} from "@/components/ui";

const HeroCard = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const scrollX = typeof window !== "undefined" ? window.scrollX : 0;
  const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const titles = ["CS Student", "Software Developer", "Music Producer"];
  const [currentTitle, setCurrentTitle] = useState(0);

  const particles = useMemo(
    () =>
      [
        [...Array(20)].map((_, i) => {
          const t = i / 19;
          return { left: t * 100, top: t * 100 };
        }),
        [...Array(10)].map((_, i) => {
          const t = i / 9;
          return { left: 50 + t * 50, top: t * 50 };
        }),
        [...Array(10)].map((_, i) => {
          const t = i / 9;
          return { left: t * 50, top: 50 + t * 50 };
        }),
      ].flat(),
    [],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          ></div>
        ))}
      </div>

      <GlassCard
        hoverable={false}
        className={`relative z-10 min-h-screen bg-linear-to-br from-blue-900/5 via-purple-900/5 to-cyan-900/5 flex items-center justify-center p-4 md:p-8 pt-20 md:pt-16 lg:pt-8 rounded-none transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Mouse follower glow */}
        {mounted && (
          <div
            className="absolute w-120 h-120 rounded-full pointer-events-none"
            style={{
              left: mousePosition.x + scrollX - 240,
              top: mousePosition.y + scrollY - 240,
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 70%)",
            }}
          ></div>
        )}

        <div className="max-w-7xl w-full mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-12 items-center space-y-8 lg:space-y-0">
            {/* Avatar section */}
            <div className="w-full flex justify-center lg:col-span-1">
              <div className="relative group">
                {/* Glowing rings around avatar */}
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-cyan-500 animate-spin opacity-75 scale-110 blur-sm"></div>
                <div
                  className="absolute inset-0 rounded-full bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin opacity-50 scale-125 blur-md"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "3s",
                  }}
                ></div>

                <GlassAvatar
                  src="profile.png"
                  alt="Poran Dip"
                  className="relative w-36 h-36 sm:w-48 sm:h-48 lg:w-64 lg:h-64 border-4 border-white/20 hover:scale-105 transition-transform duration-500 shadow-2xl shadow-blue-500/25"
                />
              </div>
            </div>

            {/* Content section */}
            <div className="w-full lg:col-span-2 space-y-6 lg:space-y-8 text-center lg:text-left px-4 lg:px-0">
              {/* Name */}
              <div className="space-y-3 lg:space-y-4">
                <GlassHeading className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                  Poran Dip
                </GlassHeading>

                {/* Animated role titles */}
                <div className="h-6 sm:h-8 overflow-hidden">
                  <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-400 transition-all duration-500 transform">
                    {titles[currentTitle]}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-4 sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <p className="opacity-90">
                  I build full-stack apps and occasionally overengineer things
                  for fun. I also produce music. 🎶
                </p>

                <p className="opacity-90">
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

                <p className="opacity-90">Based in Assam, India. 🇮🇳</p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-row gap-4 sm:gap-6 justify-center lg:justify-start pt-6 w-full">
                <a href="#projects" className="no-underline">
                  <GlassButton className="w-full sm:w-40 lg:w-48 h-10 lg:h-12 text-sm lg:text-base font-semibold hover:scale-105 transition-all duration-300 relative overflow-hidden group cursor-pointer">
                    <span className="relative z-10">View Projects</span>
                    <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-purple-500/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </GlassButton>
                </a>

                <a href="#contact" className="no-underline">
                  <GlassButton
                    variant="success"
                    className="w-full sm:w-40 lg:w-48 h-10 lg:h-12 text-sm lg:text-base font-semibold hover:scale-105 transition-all duration-300 relative overflow-hidden group cursor-pointer"
                  >
                    <span className="relative z-10">Get In Touch</span>
                    <div className="absolute inset-0 bg-linear-to-r from-green-500/20 to-cyan-500/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </GlassButton>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint indicator - Hidden on mobile */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden lg:block">
          <ChevronDown className="w-8 h-8 text-blue-600 hover:text-blue-400 transition-colors duration-300 animate-bounce" />
        </div>
      </GlassCard>
    </div>
  );
};

export default HeroCard;

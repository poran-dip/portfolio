import { ChevronDown, MapPin } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const ROLES = [
  "Full-Stack Developer",
  "Real-Time Systems Engineer",
  "Open Source Contributor",
];

const BUBBLE_COUNT = 22;
const BUBBLE_SPEED = 0.07;

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  accent: "bioglow" | "jelly";
}

const createBubbles = (): Bubble[] =>
  Array.from({ length: BUBBLE_COUNT }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    vx: (Math.random() - 0.5) * BUBBLE_SPEED,
    vy: (Math.random() - 0.5) * BUBBLE_SPEED,
    size: 4 + Math.random() * 7,
    accent: i % 3 === 0 ? "jelly" : "bioglow",
  }));

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  const bubbles = useMemo(() => createBubbles(), []);
  const bubblesRef = useRef<Bubble[]>(bubbles);
  const bubbleElRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef<number>(0);

  const trailDotRef = useRef<HTMLDivElement>(null);
  const trailHaloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Short glow trail following the cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { pageX: x, pageY: y } = e;
      if (trailDotRef.current) {
        trailDotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (trailHaloRef.current) {
        trailHaloRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Bubbles drifting slowly, bouncing off the hero's edges
  useEffect(() => {
    const tick = () => {
      const list = bubblesRef.current;
      for (let i = 0; i < list.length; i++) {
        const b = list[i];
        if (!b) continue;
        b.x += b.vx;
        b.y += b.vy;

        if (b.x <= 0 || b.x >= 100) {
          b.vx *= -1;
          b.x = Math.min(100, Math.max(0, b.x));
        }
        if (b.y <= 0 || b.y >= 100) {
          b.vy *= -1;
          b.y = Math.min(100, Math.max(0, b.y));
        }

        const el = bubbleElRefs.current[i];
        if (el) {
          el.style.left = `${b.x}%`;
          el.style.top = `${b.y}%`;
        }
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-deep">
      {/* Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map((b, i) => (
          <div
            key={`bubble-${
              // biome-ignore lint: stable bubble count, index is a fine key here
              i
            }`}
            ref={(el) => {
              bubbleElRefs.current[i] = el;
            }}
            className="absolute rounded-full"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: b.size,
              height: b.size,
              background: `color-mix(in oklab, var(--color-${b.accent}) 45%, transparent)`,
              border: `1px solid color-mix(in oklab, var(--color-${b.accent}) 70%, transparent)`,
              boxShadow: `0 0 ${b.size}px color-mix(in oklab, var(--color-${b.accent}) 35%, transparent)`,
            }}
          />
        ))}
      </div>

      {/* Short cursor glow trail */}
      <div
        ref={trailHaloRef}
        className="absolute -top-10 -left-10 w-20 h-20 rounded-full pointer-events-none blur-xl transition-transform duration-300 ease-out"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-jelly) 35%, transparent) 0%, transparent 70%)",
        }}
      />
      <div
        ref={trailDotRef}
        className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full pointer-events-none blur-[2px] transition-transform duration-100 ease-out"
        style={{
          background:
            "color-mix(in oklab, var(--color-bioglow) 70%, transparent)",
        }}
      />

      <div
        className={`glass relative z-10 min-h-screen bg-linear-to-br from-bioglow/5 via-jelly/5 to-tide/5 flex items-center justify-center p-4 md:p-8 pt-16 lg:pt-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl w-full mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-12 items-center space-y-8 lg:space-y-0">
            {/* Avatar section */}
            <div className="w-full flex justify-center lg:col-span-1">
              <div className="relative group">
                {/* Glowing rings around avatar */}
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-bioglow via-jelly to-tide animate-spin opacity-75 scale-110 blur-sm" />
                <div
                  className="absolute inset-0 rounded-full bg-linear-to-r from-tide via-bioglow to-jelly animate-spin opacity-50 scale-125 blur-md"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "3s",
                  }}
                />

                <div className="glass glass-hover relative w-28 h-28 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-2xl shadow-bioglow/25">
                  <img
                    src="profile.png"
                    alt="Poran Dip"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content section */}
            <div className="w-full lg:col-span-2 space-y-3 md:space-y-6 lg:space-y-8 text-center lg:text-left px-4 lg:px-0">
              {/* Name */}
              <div className="space-y-3 lg:space-y-4">
                {/* Availability status badge */}
                <div className="glass inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-2.5 py-1.5 sm:px-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bioglow opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-bioglow" />
                  </span>
                  <span className="text-xs font-medium text-foam whitespace-nowrap">
                    Open to opportunities
                  </span>
                </div>

                <h1 className="glass-hover-sm text-glow-bio text-4xl sm:text-5xl lg:text-5xl font-bold text-foam">
                  Poran Dip
                </h1>

                {/* Animated role titles */}
                <div className="h-6 sm:h-8 overflow-hidden">
                  <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-bioglow">
                    {ROLES[roleIndex]}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-4 sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 text-foam">
                <p className="opacity-90">
                  Humble dev living his best life building cool stuff with
                  React, Hono, and Postgres.
                </p>

                <p className="opacity-90">
                  Always experimenting, usually overengineering, still shipping.
                </p>

                <p className="opacity-90 flex items-center gap-2 justify-center lg:justify-start">
                  <MapPin className="w-4 h-4 text-bioglow shrink-0" />
                  Assam, India
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-row gap-4 sm:gap-6 justify-center lg:justify-start pt-2 md:pt-3 w-full">
                <a
                  href="/Poran_Dip_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-hover glass-primary flex items-center justify-center rounded-xl w-full sm:w-40 lg:w-48 h-10 lg:h-12 text-sm lg:text-base font-semibold cursor-pointer"
                >
                  View Resume
                </a>

                <a
                  href="#projects"
                  className="glass glass-hover glass-secondary flex items-center justify-center rounded-xl w-full sm:w-40 lg:w-48 h-10 lg:h-12 text-sm lg:text-base font-semibold cursor-pointer"
                >
                  Explore Projects
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint indicator - Hidden on mobile */}
        <a
          href="/#about"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden lg:block"
          aria-label="Scroll to about section"
        >
          <ChevronDown className="w-8 h-8 text-bioglow hover:text-jelly transition-colors duration-300 animate-bounce" />
        </a>
      </div>
    </div>
  );
};

export default HeroSection;

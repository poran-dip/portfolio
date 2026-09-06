import { ChevronDown, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import AmbientBubbles from "./ambient-bubbles";
import CursorTrail from "./cursor-trail";

const ROLES = [
  "Full-Stack Developer",
  "Real-Time Systems Engineer",
  "Open Source Contributor",
];

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-deep">
      <AmbientBubbles />
      <CursorTrail />

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
                  href="/#projects"
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

export default Hero;

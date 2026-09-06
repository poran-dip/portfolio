import { useEffect, useState } from "react";
import type { Route } from "./+types/not-found";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "404 · Poran Dip" },
    {
      name: "description",
      content:
        "The page you're looking for doesn't exist. Explore Poran Dip's portfolio, projects, and work.",
    },
  ];
}

const BUBBLE_COUNT = 14;

interface Bubble {
  left: number;
  size: number;
  delay: number;
  duration: number;
  accent: "bioglow" | "jelly";
}

const createBubbles = (): Bubble[] =>
  Array.from({ length: BUBBLE_COUNT }, (_, i) => ({
    left: Math.random() * 100,
    size: 4 + Math.random() * 8,
    delay: Math.random() * 5,
    duration: 6 + Math.random() * 5,
    accent: i % 3 === 0 ? "jelly" : "bioglow",
  }));

const NotFound404 = () => {
  // Bubbles are generated client-side only (empty on first render) to avoid
  // a hydration mismatch between server and client random values.
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    setBubbles(createBubbles());
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-deep flex items-center justify-center px-6">
      {/* Ambient rising bubbles — this layer extends below the visible
          viewport so bubbles start out of frame and rise into view, instead
          of popping in stuck to the bottom edge. The parent's
          overflow-hidden clips the extra height. */}
      <div className="absolute inset-x-0 top-0 -bottom-10 pointer-events-none">
        {bubbles.map((b, i) => (
          <div
            key={`bubble-${
              // biome-ignore lint: stable bubble count, index is a fine key here
              i
            }`}
            className="bubble-drift absolute bottom-0 rounded-full"
            style={{
              left: `${b.left}%`,
              width: b.size,
              height: b.size,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
              background: `color-mix(in oklab, var(--color-${b.accent}) 45%, transparent)`,
              border: `1px solid color-mix(in oklab, var(--color-${b.accent}) 70%, transparent)`,
              boxShadow: `0 0 ${b.size}px color-mix(in oklab, var(--color-${b.accent}) 35%, transparent)`,
            }}
          />
        ))}
      </div>

      {/* Content card */}
      <div className="glass relative z-10 w-full max-w-xl rounded-3xl bg-linear-to-br from-bioglow/5 via-jelly/5 to-tide/5 flex flex-col items-center gap-6 px-8 py-14 text-center">
        <h1 className="text-glow-bio text-6xl sm:text-7xl font-bold text-foam">
          404
        </h1>

        <div className="space-y-3 max-w-md">
          <p className="text-lg sm:text-xl font-semibold text-bioglow">
            Lost in the deep
          </p>
          <p className="text-foam opacity-90 leading-relaxed">
            The page you're looking for isn't here. It may have moved, been
            renamed, or never existed at this address.
          </p>
        </div>

        <a
          href="/"
          className="glass-hover glass-primary flex items-center justify-center rounded-xl w-full sm:w-48 h-10 lg:h-12 text-sm lg:text-base font-semibold cursor-pointer"
        >
          Back to Surface
        </a>
      </div>
    </div>
  );
};

export default NotFound404;

import { useEffect, useRef, useState } from "react";

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

/** Bubbles drifting slowly, bouncing off the hero's edges. Positions are
 * mutated directly on the DOM inside requestAnimationFrame rather than via
 * setState, so the animation never triggers a React re-render. */
const AmbientBubbles = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const bubblesRef = useRef<Bubble[]>([]);
  const bubbleElRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const initialBubbles = createBubbles();
    setBubbles(initialBubbles);
    bubblesRef.current = initialBubbles;
  }, []);

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
  );
};

export default AmbientBubbles;

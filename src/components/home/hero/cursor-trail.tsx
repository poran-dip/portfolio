import { useEffect, useRef } from "react";

/** Short glow trail following the cursor. Position is applied directly via
 * refs on mousemove rather than setState, so it never triggers a re-render. */
const CursorTrail = () => {
  const trailDotRef = useRef<HTMLDivElement>(null);
  const trailHaloRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
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
    </>
  );
};

export default CursorTrail;

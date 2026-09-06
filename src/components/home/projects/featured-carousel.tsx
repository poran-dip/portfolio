import { ChevronLeft, ChevronRight, ExternalLink, Link } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectEntry } from "@/types/projects.types";

const ROTATE_INTERVAL = 3500;
const PAUSE_DURATION = 6500;
// Must stay in sync with the 450ms duration on the carousel-slide-* utilities in index.css
const ANIMATION_MS = 450;

const DESCRIPTION_PREVIEW_LENGTH = 120;

/** Truncates at the last full word within maxLength, never cutting a word
 * in half, and never leaving trailing whitespace or punctuation before the
 * ellipsis. */
const truncateAtWord = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");
  const trimmed = (
    lastSpaceIndex > 0 ? truncated.slice(0, lastSpaceIndex) : truncated
  )
    .trimEnd()
    .replace(/[.,;:!?]+$/, "");
  return `${trimmed}...`;
};

type Direction = 1 | -1;

interface SlideContentProps {
  project: ProjectEntry;
  onSelect: (project: ProjectEntry) => void;
}

const SlideContent = ({ project, onSelect }: SlideContentProps) => {
  const coverImage = project.images[0];

  return (
    <>
      {coverImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 blur-[3px]"
          style={{ backgroundImage: `url(${coverImage})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-bioglow/20 via-surface to-jelly/20" />
      )}

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-abyss via-abyss/40 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 sm:p-8 lg:p-10">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foam">
          {project.title}
        </h3>
        <p className="max-w-xl text-sm sm:text-base text-foam">
          {project.tagline}
        </p>

        <p className="mt-2 max-w-xl text-sm sm:text-base text-mist">
          {truncateAtWord(project.description, DESCRIPTION_PREVIEW_LENGTH)}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-mist/20 bg-surface-raised/60 px-2.5 py-1 text-xs text-foam"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="glass-hover glass-primary cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold"
          >
            Details
          </button>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="glass-hover glass-secondary flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="glass-hover glass-secondary flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
            >
              <Link className="w-4 h-4" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </>
  );
};

interface FeaturedCarouselProps {
  projects: ProjectEntry[];
  onSelect: (project: ProjectEntry) => void;
  onActiveChange?: (project: ProjectEntry) => void;
}

const FeaturedCarousel = ({
  projects,
  onSelect,
  onActiveChange,
}: FeaturedCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<Direction>(1);

  const currentIndexRef = useRef(currentIndex);
  const pausedUntilRef = useRef(0);
  const transitionTimerRef = useRef<number>(0);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const goTo = useCallback((index: number, dir: Direction) => {
    if (index === currentIndexRef.current) return;
    setPrevIndex(currentIndexRef.current);
    setDirection(dir);
    setCurrentIndex(index);
    window.clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = window.setTimeout(
      () => setPrevIndex(null),
      ANIMATION_MS,
    );
  }, []);

  useEffect(() => {
    if (projects.length <= 1) return;
    const interval = setInterval(() => {
      if (Date.now() < pausedUntilRef.current) return;
      goTo((currentIndexRef.current + 1) % projects.length, 1);
    }, ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [projects.length, goTo]);

  useEffect(() => {
    return () => window.clearTimeout(transitionTimerRef.current);
  }, []);

  const project = projects[currentIndex];
  const outgoingProject = prevIndex !== null ? projects[prevIndex] : null;

  // biome-ignore lint/correctness/useExhaustiveDependencies: onActiveChange is intentionally excluded — callers rarely memoize it, and including it would refire this on every parent render, not just when the active project changes
  useEffect(() => {
    if (project) onActiveChange?.(project);
  }, [project]);

  if (!project) return null;

  const goToManual = (index: number, dir: Direction) => {
    goTo(index, dir);
    pausedUntilRef.current = Date.now() + PAUSE_DURATION;
  };

  const goNext = () => goToManual((currentIndex + 1) % projects.length, 1);
  const goPrev = () =>
    goToManual((currentIndex - 1 + projects.length) % projects.length, -1);
  const goToDot = (index: number) =>
    goToManual(index, index > currentIndex ? 1 : -1);

  return (
    <div className="mx-auto max-w-2xl w-full">
      {/* biome-ignore lint/a11y/noStaticElementInteractions: mouse-only convenience click — the Details button inside provides the keyboard/screen-reader-accessible equivalent. Adding role="button" here would be worse: it'd wrap other real buttons/links, a recognized ARIA anti-pattern. */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: see above */}
      <div
        onClick={() => onSelect(project)}
        className="clip-corners group relative block h-105 sm:h-120 lg:h-100 w-full cursor-pointer overflow-hidden bg-linear-to-br from-bioglow/40 to-jelly/40 p-0.5 text-left transition-all duration-300 hover:from-bioglow hover:to-jelly hover:shadow-lg hover:shadow-bioglow/25"
      >
        {outgoingProject && (
          <div
            key={`out-${outgoingProject.id}`}
            className={`clip-corners absolute inset-0.5 overflow-hidden bg-surface ${
              direction === 1
                ? "carousel-slide-out-left"
                : "carousel-slide-out-right"
            }`}
          >
            <SlideContent project={outgoingProject} onSelect={onSelect} />
          </div>
        )}

        <div
          key={`in-${project.id}`}
          className={`clip-corners absolute inset-0.5 overflow-hidden bg-surface ${
            direction === 1
              ? "carousel-slide-in-right"
              : "carousel-slide-in-left"
          }`}
        >
          <SlideContent project={project} onSelect={onSelect} />
        </div>
      </div>

      {projects.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous project"
            className="flex h-9 w-9 items-center justify-center rounded-full text-mist transition-colors duration-200 hover:text-bioglow cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {projects.map((p, index) => (
              <button
                key={p.id}
                type="button"
                onClick={() => goToDot(index)}
                aria-label={`Show ${p.title}`}
                aria-current={index === currentIndex}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? "w-8 bg-bioglow"
                    : "w-4 bg-mist/30 hover:bg-mist/50"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next project"
            className="flex h-9 w-9 items-center justify-center rounded-full text-mist transition-colors duration-200 hover:text-bioglow cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedCarousel;

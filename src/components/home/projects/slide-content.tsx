import { ExternalLink, Link } from "lucide-react";
import type { ProjectEntry } from "@/types/projects.types";

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

export default SlideContent;

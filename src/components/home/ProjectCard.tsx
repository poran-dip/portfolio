import { ExternalLink, Link } from "lucide-react";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  highlighted?: boolean;
}

const ProjectCard = ({
  project,
  onSelect,
  highlighted = false,
}: ProjectCardProps) => {
  const coverImage = project.images[0];

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: mouse-only convenience click — the Details button below provides the keyboard/screen-reader-accessible equivalent. Adding role="button" here would be worse: it'd wrap other real buttons/links, a recognized ARIA anti-pattern.
    // biome-ignore lint/a11y/useKeyWithClickEvents: see above
    <div
      onClick={() => onSelect(project)}
      className={`clip-corners group relative flex cursor-pointer flex-col bg-linear-to-br p-0.5 transition-all duration-300 ${
        highlighted
          ? "from-bioglow to-jelly shadow-lg shadow-bioglow/30"
          : "from-bioglow/40 to-jelly/40 hover:from-bioglow hover:to-jelly hover:shadow-lg hover:shadow-bioglow/25"
      }`}
    >
      <div className="clip-corners flex flex-1 flex-col overflow-hidden bg-surface">
        <div className="relative h-36 sm:h-40 w-full shrink-0 overflow-hidden">
          {coverImage ? (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${coverImage})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-bioglow/15 via-surface to-jelly/15" />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <p className="font-semibold text-foam">{project.title}</p>
          <p className="text-sm text-mist">{project.tagline}</p>

          <div className="hidden sm:flex mt-1 flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded border border-mist/20 bg-surface-raised/60 px-1.5 py-0.5 text-[11px] text-foam"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="rounded border border-mist/20 bg-surface-raised/60 px-1.5 py-0.5 text-[11px] text-foam">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          <div className="mt-auto flex gap-2 pt-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(project);
              }}
              className="hidden sm:block glass-hover glass-secondary flex-1 cursor-pointer rounded-lg py-1.5 text-xs font-semibold"
            >
              Details
            </button>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="glass-hover glass-secondary flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-semibold"
              >
                <ExternalLink className="w-3 h-3" />
                Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="glass-hover glass-secondary flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-semibold"
              >
                <Link className="w-3 h-3" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

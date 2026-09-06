import { ExternalLink, Link, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ProjectEntry } from "@/types/projects.types";

interface ProjectModalProps {
  project: ProjectEntry | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const titleId = "project-modal-title";

  // Reset to the first image whenever a different project opens (this
  // component stays mounted between selections, so an empty dependency
  // array would only reset once on first mount, not on every new project).
  // biome-ignore lint/correctness/useExhaustiveDependencies: project?.id is intentional — the effect must re-run when the shown project changes, even though its body doesn't read `project` directly.
  useEffect(() => {
    setImageIndex(0);
    galleryRef.current?.scrollTo({ left: 0 });
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const handleScroll = () => {
    const el = galleryRef.current;
    if (!el || el.clientWidth === 0) return;
    setImageIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const scrollToImage = (index: number) => {
    const el = galleryRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close project details overlay"
        className="absolute inset-0 bg-abyss/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="glass glass-panel relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-abyss/60 text-foam backdrop-blur-sm transition-colors duration-200 hover:text-bioglow cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {project.images.length > 0 && (
          <div>
            <div
              ref={galleryRef}
              onScroll={handleScroll}
              className="flex snap-x snap-mandatory overflow-x-auto rounded-t-2xl"
            >
              {project.images.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={project.title}
                  className="h-48 sm:h-64 w-full shrink-0 snap-center object-cover"
                />
              ))}
            </div>

            {project.images.length > 1 && (
              <div className="flex items-center justify-center gap-2 py-3">
                {project.images.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => scrollToImage(index)}
                    aria-label={`Show image ${index + 1}`}
                    aria-current={index === imageIndex}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      index === imageIndex
                        ? "w-6 bg-bioglow"
                        : "w-1.5 bg-mist/30 hover:bg-mist/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="p-5 sm:p-6">
          <h3 id={titleId} className="text-2xl font-bold text-foam">
            {project.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-bioglow">
            {project.tagline}
          </p>

          <p className="mt-4 text-foam opacity-90">{project.description}</p>

          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold text-mist">Technologies</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-mist/15 bg-surface-raised/40 px-3 py-1 text-sm text-foam"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {(project.liveUrl || project.githubUrl) && (
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-hover glass-primary flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Live Site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-hover glass-secondary flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer"
                >
                  <Link className="w-4 h-4" />
                  View on GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

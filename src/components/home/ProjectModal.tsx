import type { Project } from "@/types/project";
import {
  GlassButton,
  GlassCard,
  GlassHeading,
  GlassLink,
  GlassParagraph,
} from "@/components/ui";
import { X } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 p-3 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center h-screen"
    >
      <GlassCard
        hoverable={false}
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 md:p-5"
      >
        <GlassButton
          variant="danger"
          onClick={onClose}
          className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 p-1 rounded-lg text-white/90 hover:text-white z-10 cursor-pointer"
        >
          <X />
        </GlassButton>

        <div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-40 sm:h-52 md:h-64 object-cover object-top rounded-lg mb-6"
          />
          <GlassHeading level={4} className="font-bold mb-4">
            {project.title}
          </GlassHeading>
          <GlassParagraph className="text-base mb-6">
            {project.description}
          </GlassParagraph>

          <div className="mb-6">
            <h4 className="text-white/90 font-semibold mb-3">
              Technologies Used:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-center">
            {project.liveUrl && (
              <a href={project.liveUrl}>
                <GlassButton className="w-full sm:w-40 lg:w-48 cursor-pointer text-sm lg:text-base h-10 lg:h-12">
                  Visit Live Site
                </GlassButton>
              </a>
            )}
            {project.githubUrl && (
              <GlassLink
                href={project.githubUrl}
                className="w-full sm:w-40 lg:w-48 pb-2 text-center text-sm lg:text-base"
              >
                View on GitHub
              </GlassLink>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ProjectModal;

import type { Project } from "@/types/project";
import { glass } from "@/styles/glass";
import {
  GlassButton,
  GlassCard,
  GlassHeading,
  GlassParagraph,
} from "@/components/ui";

interface ProjectCardProps {
  project: Project;
  setSelectedProject: (project: Project) => void;
}

const ProjectCard = ({ project, setSelectedProject }: ProjectCardProps) => {
  return (
    <GlassCard
      className="p-4 md:p-5 group relative overflow-hidden rounded-xl h-64 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
      onClick={() => setSelectedProject(project)}
    >
      {/* Background Image with Low Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:scale-110 opacity-50 dark:opacity-25"
        style={{
          backgroundImage: `url(${project.image})`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40" />

      {/* Glass Effect Background */}
      <div className={`absolute inset-0 ${glass.base}`} />

      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
            project.status === "Live" || project.status === "Complete"
              ? "bg-green-500/30 text-green-200 border border-green-500/50"
              : project.status === "Beta"
                ? "bg-blue-500/30 text-blue-200 border border-blue-500/50"
                : "bg-yellow-500/30 text-yellow-200 border border-yellow-500/50"
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Title at Top */}
        <div>
          <GlassHeading
            level={4}
            className="from-white! to-gray-300! font-bold group-hover:text-blue-300 transition-all duration-200 mb-2"
          >
            {project.title}
          </GlassHeading>

          <GlassParagraph className="text-white/90 line-clamp-3">
            {project.description}
          </GlassParagraph>
        </div>

        {/* Bottom Content */}
        <div className="space-y-4">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/10 backdrop-blur-sm rounded-md text-sm text-white/80 border border-white/20 hover:scale-105 hover:-translate-y-1 duration-200"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/10 backdrop-blur-sm rounded-md text-sm text-white/80 border border-white/20 hover:scale-105 hover:-translate-y-1 duration-200">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <GlassButton
              className="flex-1 text-sm py-2 bg-white/10 hover:bg-white/20 text-blue-100! backdrop-blur-sm border border-white/30 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(project);
              }}
            >
              Details
            </GlassButton>
            {project.githubUrl ? (
              <GlassButton
                className="flex-1 text-sm py-2 bg-white/10 hover:bg-white/20 text-blue-100! backdrop-blur-sm border border-white/30 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.githubUrl, "_blank");
                }}
              >
                GitHub
              </GlassButton>
            ) : (
              project.liveUrl && (
                <GlassButton
                  className="flex-1 text-sm py-2 bg-white/10 hover:bg-white/20 text-blue-100! backdrop-blur-sm border border-white/30 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.liveUrl!, "_blank");
                  }}
                >
                  Visit
                </GlassButton>
              )
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default ProjectCard;

import { useState } from "react";
import { glass } from "@/styles/glass";
import {
  GlassButton,
  GlassCard,
  GlassHeading,
  GlassLink,
  GlassParagraph,
} from "@/components/ui";
import ProjectModal, { type Project } from "./ProjectModal";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "ODStream",
      description:
        "Full-stack real-time object detection platform with multi-user LAN support, YOLOv5/v7 integration, and edge deployment pipeline. Compatible with Intel RealSense hardware.",
      image: "projects/odstream.jpg",
      technologies: ["React", "Flask", "SocketIO", "YOLOv5/v7", "MJPEG"],
      githubUrl: "https://github.com/poran-dip/uwod-rc",
      liveUrl: "https://github.com/poran-dip/uwod-rc",
      status: "Complete",
    },
    {
      id: 2,
      title: "CodeWar 7.0",
      description:
        "Immersive event website for Pyrokinesis' annual coding competition. Built with Three.js featuring game-like HUD and dynamic camera movement.",
      image: "projects/codewar.jpg",
      technologies: ["React", "Three.js", "Motion", "Next.js"],
      githubUrl: "",
      liveUrl: "https://codewar.aec.ac.in",
      status: "Live",
    },
    {
      id: 3,
      title: "lotl",
      description:
        "High-performance CLI and library to convert Markdown to PDF in under 2 seconds. Supports themes, layout customization, and programmatic usage.",
      image: "projects/lotl.jpg",
      technologies: ["Puppeteer", "Marked", "Commander", "Chalk"],
      githubUrl: "https://github.com/poran-dip/lotl",
      liveUrl: "https://www.npmjs.com/package/lotl",
      status: "Live",
    },
    {
      id: 4,
      title: "Eazydoc",
      description:
        "AI-powered healthcare platform for effortless specialist matching, streamlined appointment management, and powerful hospital admin controls.",
      image: "projects/eazydoc.jpg",
      technologies: ["React", "Next.js", "Prisma", "Supabase"],
      githubUrl: "https://github.com/poran-dip/eazy-doc",
      liveUrl: "https://eazydoc-jade.vercel.app",
      status: "Live",
    }
  ];

  return (
    <>
      <GlassCard id="projects" hoverable={false} className="scroll-mt-20">
        <GlassHeading>PROJECTS</GlassHeading>
        <GlassParagraph className="mt-6 text-lg!">
          Building not just projects, but experiences, innovations, and (insert
          trendy buzzword here)!
        </GlassParagraph>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-xl h-80 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
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
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                {/* Title at Top */}
                <div>
                  <GlassHeading
                    level={2}
                    className="from-white! to-gray-300! group-hover:text-blue-300 transition-colors mb-2"
                  >
                    {project.title}
                  </GlassHeading>

                  <GlassParagraph className="text-lg text-white/90 line-clamp-3">
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
                        className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-md text-sm text-white/80 border border-white/20 hover:scale-105 hover:-translate-y-1 duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-md text-sm text-white/80 border border-white/20 hover:scale-105 hover:-translate-y-1 duration-200">
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
                        GitHub →
                      </GlassButton>
                    ) : project.liveUrl && (
                      <GlassButton
                        className="flex-1 text-sm py-2 bg-white/10 hover:bg-white/20 text-blue-100! backdrop-blur-sm border border-white/30 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.liveUrl!, "_blank");
                        }}
                      >
                        Visit
                      </GlassButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <GlassLink href="https://github.com/poran-dip?tab=repositories">
            View All Projects
          </GlassLink>
        </div>
      </GlassCard>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default Projects;

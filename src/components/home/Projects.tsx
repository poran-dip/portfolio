import type { Project } from "@/types/project";
import { useState } from "react";
import { GlassButton, GlassHeading, GlassParagraph } from "@/components/ui";
import ProjectModal from "./ProjectModal";
import ProjectCard from "./ProjectCard";

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
      liveUrl: "",
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
    },
  ];

  return (
    <>
      <section
        id="projects"
        className="scroll-mt-16 md:scroll-mt-12 py-4 md:py-12"
      >
        <div className="flex items-center gap-4">
          <GlassHeading level={3} className="font-bold whitespace-nowrap">
            PROJECTS
          </GlassHeading>
          <div className="h-px flex-1 bg-white/20" />
        </div>

        <div className="mt-6 flex flex-col gap-12">
          <GlassParagraph>
            Building not just projects, but experiences (and occasionally
            overengineering a to-do app I made 2 years ago).
          </GlassParagraph>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                setSelectedProject={setSelectedProject}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <a href="https://github.com/poran-dip?tab=repositories">
              <GlassButton className="w-full sm:w-40 lg:w-48 cursor-pointer text-sm lg:text-base h-10 lg:h-12">
                View All Projects
              </GlassButton>
            </a>
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default Projects;

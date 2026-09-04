import { useState } from "react";
import { GlassButton, GlassHeading, GlassParagraph } from "@/components/ui";
import { projects } from "@/data/projects";
import type { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section
        id="projects"
        className="scroll-mt-16 md:scroll-mt-12 mx-auto max-w-7xl px-4 sm:px-6 py-4 md:py-12"
      >
        <div className="flex items-center gap-4">
          <GlassHeading level={3} className="font-bold whitespace-nowrap">
            PROJECTS
          </GlassHeading>
          <div className="h-px flex-1 bg-black/20" />
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

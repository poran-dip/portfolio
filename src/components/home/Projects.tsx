import { useCallback, useState } from "react";
import { projects } from "@/data/projects";
import type { Project } from "@/types/project";
import FeaturedCarousel from "./FeaturedCarousel";
import ProjectCard from "./ProjectCard";
import ProjectGrid from "./ProjectGrid";
import ProjectModal from "./ProjectModal";

const MAX_FEATURED = 4;

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const mainProjects = projects
    .filter((p) => p.featured === "main")
    .slice(0, MAX_FEATURED);
  const visibleProjects = projects.filter((p) => p.featured === "visible");

  const [activeFeaturedId, setActiveFeaturedId] = useState<number | null>(
    mainProjects[0]?.id ?? null,
  );

  const handleActiveChange = useCallback((project: Project) => {
    setActiveFeaturedId(project.id);
  }, []);

  return (
    <>
      <section
        id="projects"
        className="w-full scroll-mt-12 md:scroll-mt-14 mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16"
      >
        <h3 className="font-bold whitespace-nowrap text-2xl">
          <span className="text-jelly">&gt; </span>
          <span className="text-bioglow">./</span>
          <span className="text-foam">projects</span>
        </h3>

        <div className="mt-6 flex flex-col gap-10">
          <p className="text-foam opacity-90">
            Building not just projects, but experiences (and occasionally
            overengineering a to-do app I made 2 years ago).
          </p>

          {mainProjects.length > 0 && (
            <div className="flex flex-col gap-4">
              <FeaturedCarousel
                projects={mainProjects}
                onSelect={setSelectedProject}
                onActiveChange={handleActiveChange}
              />

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {mainProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={setSelectedProject}
                    highlighted={project.id === activeFeaturedId}
                  />
                ))}
              </div>
            </div>
          )}

          {visibleProjects.length > 0 && (
            <div>
              <h4 className="mb-4 text-xl font-bold text-foam">
                More notable projects
              </h4>
              <ProjectGrid
                projects={visibleProjects}
                onSelect={setSelectedProject}
              />
            </div>
          )}

          <div className="pt-3 sm:pt-6 flex flex-col sm:flex-row gap-3 sm:gap-6 sm:justify-center">
            <a
              href="/#experience"
              className="glass-hover glass-primary flex items-center justify-center rounded-xl w-full sm:w-40 lg:w-48 h-10 lg:h-12 text-sm lg:text-base font-semibold cursor-pointer"
            >
              View Experience
            </a>
            <a
              href="/#contact"
              className="glass glass-hover glass-secondary flex items-center justify-center rounded-xl w-full sm:w-40 lg:w-48 h-10 lg:h-12 text-sm lg:text-base font-semibold cursor-pointer"
            >
              Get In Touch
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

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import type { ProjectEntry } from "@/types/projects.types";
import ProjectCard from "./project-card";

const INITIAL_COUNT = 7;
const MAX_EXPANDED = 15;

const ViewMoreCard = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="clip-corners group relative flex min-h-48 w-full cursor-pointer bg-linear-to-br from-mist/20 to-mist/20 p-0.5 transition-all duration-300 hover:from-bioglow hover:to-jelly"
  >
    <div className="clip-corners flex h-full w-full flex-1 flex-col items-center justify-center gap-2 bg-surface">
      <Plus className="w-6 h-6 text-mist transition-colors duration-200 group-hover:text-bioglow" />
      <span className="text-sm font-semibold text-mist transition-colors duration-200 group-hover:text-foam">
        View More
      </span>
    </div>
  </button>
);

const CollapseCard = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="clip-corners group relative flex min-h-48 w-full cursor-pointer bg-linear-to-br from-bioglow/40 to-jelly/40 p-0.5 transition-all duration-300 hover:from-bioglow hover:to-jelly"
  >
    <div className="clip-corners flex h-full w-full flex-1 flex-col items-center justify-center gap-2 bg-surface">
      <Minus className="w-6 h-6 text-bioglow" />
      <span className="text-sm font-semibold text-foam">Collapse</span>
    </div>
  </button>
);

interface ProjectGridProps {
  projects: ProjectEntry[];
  onSelect: (project: ProjectEntry) => void;
}

const ProjectGrid = ({ projects, onSelect }: ProjectGridProps) => {
  const [expanded, setExpanded] = useState(false);

  const hasMore = projects.length > INITIAL_COUNT;
  const displayed = expanded
    ? projects.slice(0, MAX_EXPANDED)
    : projects.slice(0, INITIAL_COUNT);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {displayed.map((project) => (
        <ProjectCard key={project.id} project={project} onSelect={onSelect} />
      ))}

      {!expanded && hasMore && (
        <ViewMoreCard onClick={() => setExpanded(true)} />
      )}
      {expanded && <CollapseCard onClick={() => setExpanded(false)} />}
    </div>
  );
};

export default ProjectGrid;

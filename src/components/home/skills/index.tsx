import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { skillCategories } from "@/data/skills-data";
import type { SkillCategoryEntry } from "@/types/skills.types";
import SkillMatchDialog from "./skill-match-dialog";

interface SkillCategoryRowProps {
  category: SkillCategoryEntry;
  open: boolean;
  onToggle: () => void;
}

const SkillCategoryRow = ({
  category,
  open,
  onToggle,
}: SkillCategoryRowProps) => {
  const panelId = `skills-panel-${category.id}`;

  return (
    <div className="glass group rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-3 p-4 cursor-pointer transition-colors duration-200 group-hover:bg-bioglow/5"
      >
        <span className="flex items-center gap-3">
          <span className="font-semibold text-foam">{category.title}</span>
          <span className="text-xs text-mist">{category.skills.length}</span>
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-mist transition-all duration-200 group-hover:text-bioglow ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        id={panelId}
        className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-2 px-4 pb-4 transition-colors duration-200 group-hover:bg-bioglow/5">
            {category.skills.map((skill) => (
              <span
                key={skill.name}
                className="rounded-lg border border-mist/15 bg-surface-raised/40 px-3 py-1 text-sm text-foam"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  return (
    <div id="skills" className="scroll-mt-12 md:scroll-mt-14">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-foam">Skills</h3>
        <button
          type="button"
          onClick={() => setIsDialogOpen(true)}
          className="glass-hover glass-primary flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          Am I a good fit?
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {skillCategories.map((category) => (
          <SkillCategoryRow
            key={category.id}
            category={category}
            open={openCategoryId === category.id}
            onToggle={() =>
              setOpenCategoryId((prev) =>
                prev === category.id ? null : category.id,
              )
            }
          />
        ))}
      </div>

      <SkillMatchDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default SkillsSection;

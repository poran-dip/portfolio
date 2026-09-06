import type { LucideIcon } from "lucide-react";

interface StatBlockProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
}

const StatBlock = ({ icon: Icon, value, label }: StatBlockProps) => (
  <div className="flex flex-col items-start gap-2">
    <div className="flex items-center gap-2">
      <span className="glass-panel flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-bioglow">
        <Icon className="h-4 w-4" />
      </span>
      <p className="text-lg font-bold leading-tight text-foam">{value}</p>
    </div>
    <p className="text-[11px] text-mist">{label}</p>
  </div>
);

export default StatBlock;

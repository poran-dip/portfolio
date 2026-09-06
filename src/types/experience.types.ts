export interface ExperienceEntry {
  id: string;
  title: string;
  date: string;
  location?: string;
  description: string[];
  status?: "done" | "ongoing";
  link?: string;
}

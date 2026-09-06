export interface ExperienceEntry {
  title: string;
  date: string;
  location?: string;
  description: string;
  status?: "done" | "ongoing";
  link?: string;
}

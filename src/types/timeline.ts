export interface TimelineEntry {
  title: string;
  date: string;
  location?: string;
  description: string;
  status?: "done" | "ongoing";
}

type ProjectFeatured = "main" | "visible" | "hidden";

export interface Project {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  images: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: string;
  featured: ProjectFeatured;
}

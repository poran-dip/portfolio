import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: 1,
    slug: "odstream",
    title: "ODStream",
    tagline: "Real-time multi-user object detection platform.",
    description:
      "Full-stack real-time object detection platform with multi-user LAN support, YOLOv5/v7 integration, and edge deployment pipeline. Compatible with Intel RealSense hardware.",
    images: ["projects/odstream.jpg"],
    technologies: ["React", "Flask", "SocketIO", "YOLOv5/v8", "MJPEG"],
    githubUrl: "https://github.com/poran-dip/uwod-rc",
    status: "Complete",
    featured: "main",
  },
  {
    id: 2,
    slug: "codewar-7",
    title: "CodeWar 7.0",
    tagline: "An immersive Three.js event site with a game-like HUD.",
    description:
      "Immersive event website for Pyrokinesis' annual coding competition. Built with Three.js featuring game-like HUD and dynamic camera movement.",
    images: ["projects/codewar.jpg"],
    technologies: ["React", "Three.js", "Motion", "Next.js"],
    liveUrl: "https://codewar.aec.ac.in",
    status: "Live",
    featured: "main",
  },
  {
    id: 3,
    slug: "lotl",
    title: "lotl",
    tagline: "Markdown to PDF, in under 2 seconds. Available on npm.",
    description:
      "High-performance CLI and library to convert Markdown to PDF in under 2 seconds. Supports themes, layout customization, and programmatic usage.",
    images: ["projects/lotl.jpg"],
    technologies: ["Puppeteer", "Marked", "Commander", "Chalk"],
    githubUrl: "https://github.com/poran-dip/lotl",
    liveUrl: "https://www.npmjs.com/package/lotl",
    status: "Live",
    featured: "visible",
  },
  {
    id: 4,
    slug: "eazydoc",
    title: "Eazydoc",
    tagline: "AI-matched healthcare booking, built end to end.",
    description:
      "AI-powered healthcare platform for effortless specialist matching, streamlined appointment management, and powerful hospital admin controls.",
    images: ["projects/eazydoc.jpg"],
    technologies: ["React", "Next.js", "Prisma", "Supabase"],
    githubUrl: "https://github.com/poran-dip/eazy-doc",
    liveUrl: "https://eazydoc-jade.vercel.app",
    status: "Live",
    featured: "visible",
  },
];

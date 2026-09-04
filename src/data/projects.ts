import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "ODStream",
    description:
      "Full-stack real-time object detection platform with multi-user LAN support, YOLOv5/v7 integration, and edge deployment pipeline. Compatible with Intel RealSense hardware.",
    image: "projects/odstream.jpg",
    technologies: ["React", "Flask", "SocketIO", "YOLOv5/v7", "MJPEG"],
    githubUrl: "https://github.com/poran-dip/uwod-rc",
    liveUrl: "",
    status: "Complete",
  },
  {
    id: 2,
    title: "CodeWar 7.0",
    description:
      "Immersive event website for Pyrokinesis' annual coding competition. Built with Three.js featuring game-like HUD and dynamic camera movement.",
    image: "projects/codewar.jpg",
    technologies: ["React", "Three.js", "Motion", "Next.js"],
    githubUrl: "",
    liveUrl: "https://codewar.aec.ac.in",
    status: "Live",
  },
  {
    id: 3,
    title: "lotl",
    description:
      "High-performance CLI and library to convert Markdown to PDF in under 2 seconds. Supports themes, layout customization, and programmatic usage.",
    image: "projects/lotl.jpg",
    technologies: ["Puppeteer", "Marked", "Commander", "Chalk"],
    githubUrl: "https://github.com/poran-dip/lotl",
    liveUrl: "https://www.npmjs.com/package/lotl",
    status: "Live",
  },
  {
    id: 4,
    title: "Eazydoc",
    description:
      "AI-powered healthcare platform for effortless specialist matching, streamlined appointment management, and powerful hospital admin controls.",
    image: "projects/eazydoc.jpg",
    technologies: ["React", "Next.js", "Prisma", "Supabase"],
    githubUrl: "https://github.com/poran-dip/eazy-doc",
    liveUrl: "https://eazydoc-jade.vercel.app",
    status: "Live",
  },
];

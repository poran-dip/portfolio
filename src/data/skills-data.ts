import type { SkillCategoryEntry } from "@/types/skills.types";

export const skillCategories: SkillCategoryEntry[] = [
  {
    id: "languages",
    title: "Languages",
    skills: [
      { name: "JavaScript", aliases: ["javascript", "js", "jsx"] },
      { name: "TypeScript", aliases: ["typescript", "ts", "tsx"] },
      { name: "Python", aliases: ["python", "py"] },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "React", aliases: ["react", "reactjs", "react.js"] },
      {
        name: "React Router",
        aliases: ["react router", "reactrouter", "react-router"],
      },
      { name: "Next.js", aliases: ["next.js", "nextjs", "next"] },
      {
        name: "Tailwind CSS",
        aliases: ["tailwind", "tailwindcss", "tailwind css"],
      },
      { name: "Three.js", aliases: ["three.js", "threejs", "three"] },
    ],
  },
  {
    id: "backend",
    title: "Backend & Auth",
    skills: [
      { name: "Node.js", aliases: ["node.js", "nodejs", "node"] },
      { name: "Hono", aliases: ["hono"] },
      { name: "Express", aliases: ["express", "expressjs", "express.js"] },
      { name: "Flask", aliases: ["flask"] },
      {
        name: "Socket.IO",
        aliases: ["socket.io", "socketio", "websockets", "websocket"],
      },
      {
        name: "Better Auth",
        aliases: ["better auth", "betterauth", "better-auth"],
      },
      {
        name: "Auth.js",
        aliases: ["auth.js", "authjs", "nextauth", "next-auth"],
      },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    skills: [
      { name: "PostgreSQL", aliases: ["postgresql", "postgres", "psql"] },
      { name: "MongoDB", aliases: ["mongodb", "mongo"] },
      { name: "Drizzle", aliases: ["drizzle", "drizzle orm", "drizzleorm"] },
      { name: "Prisma", aliases: ["prisma", "prisma orm"] },
    ],
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    skills: [
      {
        name: "YOLOv5/v8",
        aliases: ["yolo", "yolov5", "yolov8", "yolo v5", "yolo v8"],
      },
      { name: "OpenCV", aliases: ["opencv", "open cv", "cv2"] },
      {
        name: "Intel RealSense",
        aliases: ["realsense", "intel realsense", "real sense"],
      },
      { name: "pandas", aliases: ["pandas"] },
      { name: "NumPy", aliases: ["numpy", "num py"] },
      {
        name: "scikit-learn",
        aliases: ["scikit-learn", "sklearn", "scikit learn"],
      },
      { name: "Matplotlib", aliases: ["matplotlib", "mat plot lib"] },
      { name: "Ollama", aliases: ["ollama"] },
      { name: "Langchain", aliases: ["langchain", "lang chain"] },
      { name: "Langgraph", aliases: ["langgraph", "lang graph"] },
    ],
  },
  {
    id: "tools-devops",
    title: "Tools & DevOps",
    skills: [
      { name: "Git", aliases: ["git"] },
      { name: "GitHub", aliases: ["github", "git hub"] },
      {
        name: "GitHub Actions",
        aliases: ["github actions", "gh actions", "ci/cd", "cicd"],
      },
      { name: "Docker", aliases: ["docker"] },
      {
        name: "Docker Compose",
        aliases: ["docker compose", "docker-compose", "compose"],
      },
      { name: "pnpm", aliases: ["pnpm"] },
      { name: "Turbo", aliases: ["turbo", "turborepo"] },
      { name: "Vitest", aliases: ["vitest"] },
      { name: "Playwright", aliases: ["playwright"] },
      {
        name: "Electron.js",
        aliases: ["electron", "electron.js", "electronjs"],
      },
      { name: "React Native", aliases: ["react native", "reactnative"] },
      {
        name: "MV3",
        aliases: [
          "mv3",
          "manifest v3",
          "browser extensions",
          "chrome extensions",
        ],
      },
      { name: "nginx", aliases: ["nginx"] },
    ],
  },
];

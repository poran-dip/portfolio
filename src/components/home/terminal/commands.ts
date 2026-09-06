import { experiences } from "@/data/experience-data";
import { projects } from "@/data/projects-data";
import { skillCategories } from "@/data/skills-data";

export const SECTIONS = [
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
];

export const WELCOME_MESSAGE =
  "Welcome to guest@poran.dev — type 'help' or '-h' to get started.";

export const HELP_TEXT = `Available commands:
  whoami          who's browsing this thing
  ls              list available files
  cat <file>      read a file
  cd <section>    jump to a section of the site
  history         show command history
  date            current date & time
  echo <text>     echo text back
  clear           clear the terminal

Files: about.md, skills.md, projects.md, experience.log, contact.sh
Sections: about, skills, projects, experience, contact`;

const WHOAMI_TEXT =
  "guest\n(you're browsing as a guest — I'm Poran Dip, full-stack developer.)";

const ABOUT_MD = `Full-stack developer who builds things that are useful and
figures out whatever it takes to make them work. Based in Assam, India.

Type 'cd about' for the full story.`;

const CONTACT_SH = `#!/bin/sh
echo "Let's talk."
# email is base64-guarded against bots — try 'cd contact' instead 👀`;

const buildSkillsMd = () =>
  skillCategories
    .map(
      (category) =>
        `${category.title}: ${category.skills.map((s) => s.name).join(", ")}`,
    )
    .join("\n");

const buildProjectsMd = () =>
  `${projects
    .filter((p) => p.featured !== "hidden")
    .map((p) => `${p.title} — ${p.tagline}`)
    .join("\n")}\n\nType 'cd projects' to see them all.`;

const buildExperienceLog = () =>
  `${experiences
    .map(
      (entry) =>
        `[${entry.date}] ${entry.title}${entry.location ? ` — ${entry.location}` : ""}`,
    )
    .join("\n")}\n\nType 'cd experience' for the full timeline.`;

const FILES: Record<string, string> = {
  "about.md": ABOUT_MD,
  "skills.md": buildSkillsMd(),
  "projects.md": buildProjectsMd(),
  "experience.log": buildExperienceLog(),
  "contact.sh": CONTACT_SH,
};

const catFile = (name: string): string => {
  if (!name) {
    return "cat: missing file operand. Try 'ls' to see available files.";
  }
  const content = FILES[name];
  if (!content) {
    return `cat: ${name}: No such file. Try 'ls' to see available files.`;
  }
  return content;
};

const cdSection = (target: string, onNavigate?: () => void): string => {
  const normalized = target.toLowerCase().replace(/^#/, "").trim();
  if (!normalized) {
    return `cd: missing section. Try: ${SECTIONS.join(", ")}`;
  }
  if (!SECTIONS.includes(normalized)) {
    return `cd: no such section: ${normalized}. Try: ${SECTIONS.join(", ")}`;
  }
  const el = document.getElementById(normalized);
  if (!el) {
    return `cd: couldn't find #${normalized} on the page.`;
  }
  el.scrollIntoView({ behavior: "smooth" });
  onNavigate?.();
  return `Navigating to #${normalized}...`;
};

/** Parses and runs a single terminal command line, returning its output
 * text. `clear` is handled by the caller (it needs to wipe history state,
 * not produce output), so it never reaches here. */
export const executeCommand = (
  raw: string,
  cmdHistory: string[],
  onNavigate?: () => void,
): string => {
  const [cmd, ...args] = raw.split(/\s+/);
  const arg = args.join(" ");
  const lower = cmd?.toLowerCase() ?? "";

  switch (lower) {
    case "help":
    case "-h":
    case "--help":
      return HELP_TEXT;
    case "whoami":
      return WHOAMI_TEXT;
    case "ls":
      return Object.keys(FILES).join("   ");
    case "cat":
      return catFile(arg);
    case "cd":
      return cdSection(arg, onNavigate);
    case "date":
      return new Date().toString();
    case "echo":
      return arg;
    case "history":
      return cmdHistory.map((c, i) => `${i + 1}  ${c}`).join("\n");
    case "sudo":
      return "Nice try. This isn't that kind of terminal 😏";
    default:
      return `command not found: ${lower}. Type 'help' for a list of commands.`;
  }
};

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { timeline } from "@/data/timeline";

const SECTIONS = ["about", "skills", "projects", "experience", "contact"];

const WELCOME_MESSAGE =
  "Welcome to guest@poran.dev — type 'help' or '-h' to get started.";

const HELP_TEXT = `Available commands:
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
  `${timeline
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

interface HistoryEntry {
  type: "input" | "output";
  content: string;
}

interface DevTerminalProps {
  className?: string;
  onNavigate?: () => void;
  autoFocus?: boolean;
}

const DevTerminal = ({
  className = "",
  onNavigate,
  autoFocus = false,
}: DevTerminalProps) => {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: "output", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const executeCommand = (raw: string, cmdHistory: string[]): string => {
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

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const newCommandHistory = [...commandHistory, trimmed];
    setCommandHistory(newCommandHistory);
    setHistoryPointer(null);

    const [cmd] = trimmed.split(/\s+/);
    if (cmd?.toLowerCase() === "clear") {
      setHistory([]);
      return;
    }

    const output = executeCommand(trimmed, newCommandHistory);
    setHistory((prev) => [
      ...prev,
      { type: "input", content: trimmed },
      { type: "output", content: output },
    ]);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: history is intentional — this must re-run whenever new output is added, even though the body only touches the scroll ref
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  const moveCaretToEnd = () => {
    const el = inputRef.current;
    if (!el) return;
    const len = el.value.length;
    // Deferred: on click/focus the browser sets the caret position itself
    // right after this handler runs, so we correct it on the next frame
    // instead of synchronously (which would just get overwritten).
    requestAnimationFrame(() => {
      el.setSelectionRange(len, len);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      return;
    }
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextPointer =
        historyPointer === null
          ? commandHistory.length - 1
          : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextPointer);
      setInput(commandHistory[nextPointer] ?? "");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyPointer === null) return;
      const nextPointer = historyPointer + 1;
      if (nextPointer >= commandHistory.length) {
        setHistoryPointer(null);
        setInput("");
      } else {
        setHistoryPointer(nextPointer);
        setInput(commandHistory[nextPointer] ?? "");
      }
    }
  };

  return (
    <div
      className={`glass glass-panel flex flex-col overflow-hidden rounded-xl ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-mist/10 px-4 py-3 shrink-0">
        <span className="h-2.5 w-2.5 rounded-full bg-vent/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-lure/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-bioglow/70" />
        <span className="ml-2 text-xs text-mist">
          guest@poran.dev — terminal
        </span>
      </div>

      <div
        ref={scrollRef}
        aria-live="polite"
        className="themed-scrollbar flex-1 overflow-y-auto px-4 py-3 font-mono text-sm"
      >
        {history.map((entry, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: history is append-only (or fully cleared), so index is stable
            key={i}
            className={
              entry.type === "output"
                ? "whitespace-pre-wrap text-mist mb-2"
                : "mb-1 text-foam"
            }
          >
            {entry.type === "input" ? (
              <span>
                <span className="text-bioglow">guest@poran.dev</span>
                <span className="text-jelly">:~$</span> {entry.content}
              </span>
            ) : (
              entry.content
            )}
          </div>
        ))}

        <div className="flex items-center gap-1.5">
          <span className="text-bioglow">guest@poran.dev</span>
          <span className="text-jelly">:~$</span>
          <div className="relative flex-1 min-w-0">
            <div
              aria-hidden="true"
              className="whitespace-pre text-foam pointer-events-none"
            >
              {input}
              <span
                className={`inline-block h-[1.1em] w-[0.55em] mb-[-0.15em] bg-bioglow align-middle ${
                  isFocused ? "terminal-cursor" : "opacity-0"
                }`}
              />
            </div>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onClick={moveCaretToEnd}
              onFocus={() => {
                setIsFocused(true);
                moveCaretToEnd();
              }}
              onBlur={() => setIsFocused(false)}
              aria-label="Terminal command input"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="absolute inset-0 w-full bg-transparent text-transparent caret-transparent outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevTerminal;

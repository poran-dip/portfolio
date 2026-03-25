import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { GlassButton } from "./ui";

const ThemeToggle = ({ className = "" }) => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleDarkMode = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <GlassButton
      onClick={toggleDarkMode}
      className={`p-0! px-0! py-0! h-8 md:h-10 w-8 md:w-10 flex items-center justify-center cursor-pointer ${className}`}
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="h-4 md:h-5 w-4 md:w-5 text-white" />
      ) : (
        <Moon className="h-4 md:h-5 w-4 md:w-5 text-black" />
      )}
    </GlassButton>
  );
};

export default ThemeToggle;

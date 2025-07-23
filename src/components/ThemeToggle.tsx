import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggleButton = ({ className = '' }) => {
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
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-800 ${className}`}
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="h-8 w-8 text-white" />
      ) : (
        <Moon className="h-8 w-8 text-black" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
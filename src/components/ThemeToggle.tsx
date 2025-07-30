import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { GlassButton } from './ui/GlassButton';

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
    <GlassButton
      onClick={toggleDarkMode}
      className={`!p-0 !px-0 !py-0 h-12 w-12 flex items-center justify-center ${className}`}
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="h-6 w-6 text-white" />
      ) : (
        <Moon className="h-6 w-6 text-black" />
      )}
    </GlassButton>
  );
};

export default ThemeToggleButton;
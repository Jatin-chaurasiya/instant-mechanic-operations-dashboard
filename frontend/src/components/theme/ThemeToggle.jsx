import {
  Moon,
  Sun,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const {
    isDark,
    toggleTheme,
  } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="
        flex h-10 w-10
        items-center justify-center
        rounded-xl
        border border-slate-200
        bg-white
        text-slate-500
        transition
        hover:bg-slate-50
        hover:text-slate-900
        dark:border-slate-700
        dark:bg-slate-900
        dark:text-slate-400
        dark:hover:bg-slate-800
        dark:hover:text-white
      "
      aria-label={
        isDark
          ? "Switch to light theme"
          : "Switch to dark theme"
      }
      title={
        isDark
          ? "Light theme"
          : "Dark theme"
      }
    >
      {isDark ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
};

export default ThemeToggle;
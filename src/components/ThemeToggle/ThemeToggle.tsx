import { MoonIcon, SunIcon } from "../icons";
import "./ThemeToggle.less";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

/** View only — all theme logic lives in the useTheme presenter. */
export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={onToggle}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

import { MoonIcon, SunIcon } from "../icons";
import "./ThemeToggle.less";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

/**
 * View only — all theme logic lives in the useTheme presenter.
 * Both icons stay mounted and stacked; `data-dark` cross-fades and
 * counter-rotates one out as the other comes in.
 */
export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      className="theme-toggle"
      data-dark={isDark || undefined}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={onToggle}
    >
      <SunIcon className="theme-toggle-icon theme-toggle-sun" />
      <MoonIcon className="theme-toggle-icon theme-toggle-moon" />
    </button>
  );
}

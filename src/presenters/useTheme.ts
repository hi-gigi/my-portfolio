// ============================================================
//  PRESENTER — theme
//  Owns the light/dark model: reads the stored preference, tracks
//  the OS setting, writes `data-theme` on <html>, persists choices.
//  Views receive a plain view-model and never touch localStorage
//  or matchMedia themselves.
// ============================================================

import { useCallback, useEffect, useRef, useState } from "react";
import type { ThemeMode, ThemePreference } from "@/model/types";

const STORAGE_KEY = "theme";

/** Palette cross-fade window — keep in sync with @ease-swap in tokens.less. */
const SWAP_MS = 700;

let swapTimer: number | undefined;

const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Flag <html> for the length of a light/dark change. While the flag is
 * up, global.less lets every themed colour tween instead of cut. Skipped
 * under reduced motion, and never fired on first paint.
 */
function flagThemeSwap(): void {
  if (prefersReducedMotion()) return;
  const root = document.documentElement;
  root.setAttribute("data-theme-changing", "");
  window.clearTimeout(swapTimer);
  swapTimer = window.setTimeout(() => {
    root.removeAttribute("data-theme-changing");
  }, SWAP_MS + 80);
}

const darkQuery = (): MediaQueryList =>
  window.matchMedia("(prefers-color-scheme: dark)");

function readStoredPreference(): ThemePreference {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "dark" || value === "light" ? value : "system";
  } catch {
    return "system";
  }
}

function currentSystemMode(): ThemeMode {
  return darkQuery().matches ? "dark" : "light";
}

function applyToDocument(preference: ThemePreference): void {
  const root = document.documentElement;
  if (preference === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", preference);
  }
}

export interface ThemeViewModel {
  /** What the visitor chose: an explicit mode or "system". */
  preference: ThemePreference;
  /** The mode actually in effect right now. */
  resolved: ThemeMode;
  isDark: boolean;
  toggle: () => void;
  setPreference: (preference: ThemePreference) => void;
}

export function useTheme(): ThemeViewModel {
  const [preference, setPreferenceState] = useState<ThemePreference>(
    readStoredPreference,
  );
  const [systemMode, setSystemMode] = useState<ThemeMode>(currentSystemMode);

  // Follow the OS setting while it changes.
  useEffect(() => {
    const query = darkQuery();
    const onChange = () => setSystemMode(currentSystemMode());
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Keep the <html> attribute in sync with the chosen preference.
  useEffect(() => {
    applyToDocument(preference);
  }, [preference]);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    try {
      if (next === "system") {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, next);
      }
    } catch {
      /* storage unavailable — the in-memory state still works */
    }
  }, []);

  const resolved: ThemeMode =
    preference === "system" ? systemMode : preference;

  // Cross-fade the whole palette whenever the effective mode changes —
  // toggle or OS flip — but not on the initial mount.
  const lastResolved = useRef<ThemeMode | null>(null);
  useEffect(() => {
    if (lastResolved.current !== null && lastResolved.current !== resolved) {
      flagThemeSwap();
    }
    lastResolved.current = resolved;
  }, [resolved]);

  const toggle = useCallback(() => {
    setPreference(resolved === "dark" ? "light" : "dark");
  }, [resolved, setPreference]);

  return { preference, resolved, isDark: resolved === "dark", toggle, setPreference };
}

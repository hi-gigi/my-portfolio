// ============================================================
//  PRESENTER — theme
//  Owns the light/dark model: reads the stored preference, tracks
//  the OS setting, writes `data-theme` on <html>, persists choices.
//  Views receive a plain view-model and never touch localStorage
//  or matchMedia themselves.
// ============================================================

import { useCallback, useEffect, useState } from "react";
import type { ThemeMode, ThemePreference } from "@/model/types";

const STORAGE_KEY = "theme";

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

  const toggle = useCallback(() => {
    setPreference(resolved === "dark" ? "light" : "dark");
  }, [resolved, setPreference]);

  return { preference, resolved, isDark: resolved === "dark", toggle, setPreference };
}

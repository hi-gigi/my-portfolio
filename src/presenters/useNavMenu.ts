// ============================================================
//  PRESENTER — collapsed nav menu
//  Owns the open/close state for the mobile dropdown plus the
//  dismissal behaviour (outside pointer-down, Escape, grow-to-desktop).
// ============================================================

import { useCallback, useEffect, useRef, useState } from "react";

/** One pixel past @bp-nav-collapse (560px) in tokens.less. */
const DESKTOP_MIN_WIDTH = 561;

export interface NavMenuViewModel {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  /** Attach to the dropdown container so outside-clicks can be detected. */
  containerRef: React.RefObject<HTMLElement>;
  /** Attach to the trigger button so its own clicks are ignored. */
  triggerRef: React.RefObject<HTMLButtonElement>;
}

export function useNavMenu(): NavMenuViewModel {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((value) => !value), []);

  // Mirror state onto <body> for any page-level styling hooks.
  useEffect(() => {
    document.body.classList.toggle("nav-open", isOpen);
    return () => document.body.classList.remove("nav-open");
  }, [isOpen]);

  // Dismiss on outside pointer-down / Escape — only while open.
  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: Event) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (containerRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    // Attach on the next tick, so the same pointer-down that opened the
    // menu (still mid-dispatch) is never read back as an outside click.
    const timer = window.setTimeout(() => {
      document.addEventListener("pointerdown", onPointerDown);
    }, 0);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  // Collapse the menu only when the viewport actually crosses back to
  // desktop width — not on every incidental resize event.
  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return { isOpen, open, close, toggle, containerRef, triggerRef };
}

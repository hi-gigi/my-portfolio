// ============================================================
//  PRESENTER — collapsed nav menu
//  Owns the open/close state for the mobile dropdown plus the
//  dismissal behaviour (outside click, Escape, grow-to-desktop).
//  lodash.debounce keeps the resize handler cheap — and doubles
//  as a smoke test that the utility layer is wired up.
// ============================================================

import { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";

/** One pixel past @bp-nav-collapse (560px) in tokens.less. */
const DESKTOP_MIN_WIDTH = 561;

const RESIZE_DEBOUNCE_MS = 150;

export interface NavMenuViewModel {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  /** Attach to the dropdown container so outside-clicks can be detected. */
  containerRef: React.RefObject<HTMLElement>;
  /** Attach to the hamburger button so its own clicks are ignored. */
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

  // Dismiss on outside click / Escape — only while open.
  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("click", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  // Collapse the menu once the viewport grows back to desktop width.
  useEffect(() => {
    const onResize = debounce(() => {
      if (window.innerWidth >= DESKTOP_MIN_WIDTH) close();
    }, RESIZE_DEBOUNCE_MS);

    window.addEventListener("resize", onResize);
    return () => {
      onResize.cancel();
      window.removeEventListener("resize", onResize);
    };
  }, [close]);

  return { isOpen, open, close, toggle, containerRef, triggerRef };
}

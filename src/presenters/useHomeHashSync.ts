import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Past `scroll-padding-top` (96px, global.less) — the offset a
// just-clicked section lands at — so a section reads as reached at rest.
const TRIGGER_PX = 200;
const SECTION_IDS = ["work", "about"];
const SUPPRESSION_TIMEOUT_MS = 1500;

/**
 * Keeps the home page's URL hash honest as the reader scrolls: it
 * follows whichever of #work / #about they've reached, and drops the
 * hash once they're back above the first section. Uses a plain
 * `history.replaceState` so the router doesn't re-run its hash-scroll
 * effect and fight the reader.
 *
 * Evaluation is suppressed while a link-triggered scroll is still
 * travelling, so the hash doesn't flicker through intermediate values.
 */
export function useHomeHashSync() {
  const { pathname, key } = useLocation();

  useEffect(() => {
    if (pathname !== "/") return;

    let suppressed = true;
    let ticking = false;

    const evaluate = () => {
      ticking = false;
      if (suppressed) return;

      let current = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= TRIGGER_PX) current = id;
      }
      const next = current ? `#${current}` : "";
      if (next === window.location.hash) return;
      window.history.replaceState(null, "", `${pathname}${window.location.search}${next}`);
    };

    const resume = () => {
      suppressed = false;
      evaluate();
    };
    window.addEventListener("scrollend", resume, { once: true });
    const timeout = window.setTimeout(resume, SUPPRESSION_TIMEOUT_MS);

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(evaluate);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scrollend", resume);
      window.clearTimeout(timeout);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname, key]);
}

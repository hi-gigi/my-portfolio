import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Client-side route changes don't get the browser's native
 * scroll-to-#fragment behaviour a full page load would — reproduce it
 * here so in-page nav (#work, #about) and route changes both land in
 * the right place. Honours the global `scroll-behavior: smooth`
 * (itself gated on `prefers-reduced-motion` in global.less).
 */
export function useScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    const scroll = () => document.getElementById(id)?.scrollIntoView();
    scroll();

    // A custom web font can still be loading on first visit. If it swaps
    // in mid-scroll, everything below it reflows taller, leaving the
    // smooth-scroll's already-computed target short of the heading it was
    // aiming for (most noticeable on a long jump, e.g. to the last
    // section). Re-align once fonts have actually settled.
    if (document.fonts.status !== "loaded") {
      document.fonts.ready.then(scroll);
    }

    // Lazy-loaded images above the target have no reserved height until
    // they load, so each one that finishes pushes the heading further
    // down than where the jump landed — leaving the section tab to read
    // as the previous section. Re-align as they load, until the reader
    // takes over by scrolling themselves (or a short window passes).
    const realign = () => document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    const stop = () => {
      document.removeEventListener("load", realign, true);
      for (const type of ["wheel", "touchstart", "keydown", "pointerdown"]) {
        window.removeEventListener(type, stop);
      }
      window.clearTimeout(timeout);
    };
    const timeout = window.setTimeout(stop, 4000);
    document.addEventListener("load", realign, true);
    for (const type of ["wheel", "touchstart", "keydown", "pointerdown"]) {
      window.addEventListener(type, stop, { passive: true });
    }
    return stop;
  }, [pathname, hash]);
}

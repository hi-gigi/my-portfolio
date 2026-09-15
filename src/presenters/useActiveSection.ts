// ============================================================
//  PRESENTER — case study header scroll-spy
//  Tracks which section heading the reader has scrolled past, so the
//  matching header nav link can render as active — and keeps the URL
//  hash in sync as the reader scrolls, not just when they click a link.
// ============================================================

import { useEffect, useRef, useState } from "react";

// Trigger line = the sticky header's own height (tokens.less'
// @header-height, 64px) plus a section heading's own top margin
// (CaseStudy.less' @case-study-section-gap, 144px) = 208px. A
// heading's `getBoundingClientRect().top` is its border-box edge,
// which sits *below* that margin — so this line falls where the blank
// gap before the heading (not the heading text itself) starts sliding
// under the header, activating the tab as soon as the reader is
// visibly done with the previous section rather than waiting for the
// new heading's text to already be there.
// It's also comfortably past `scroll-padding-top: @space-9` (96px) in
// global.less (the offset scrollIntoView() lands a heading at), so a
// just-clicked link's section already satisfies this same line at
// rest — no separate, narrower allowance needed for that case.
const TRIGGER_PX = 208;

// Upper bound on how long a click-triggered scroll is allowed to
// suppress natural scroll-spy evaluation, for browsers that don't
// support the `scrollend` event (or in case it never fires) — without
// this, a missed `scrollend` would suppress evaluation forever.
const SUPPRESSION_TIMEOUT_MS = 2000;

/**
 * A heading counts as "reached" once its top has crossed the trigger
 * line (see TRIGGER_PX above); the last one to cross wins, so
 * scrolling past the final section keeps it active the rest of the
 * way down the page instead of going blank.
 *
 * `hashId` is the current URL hash (e.g. from clicking a section link,
 * or loading the page with one already in the address bar) — applied
 * as an immediate override, so the just-clicked link shows active
 * right away rather than waiting for the scroll to catch up.
 *
 * Scrolling (not just clicking) also keeps the URL's hash in sync,
 * via a plain `history.replaceState` — deliberately bypassing the
 * router so it doesn't re-trigger the app's own hash-scroll effect
 * and fight the reader's own scrolling.
 *
 * A click-triggered scroll can travel a long distance (e.g. jumping
 * from the last section to the first), and while it's still animating,
 * natural evaluation would read transient mid-flight positions and
 * flicker to whatever section the scroll is currently passing through
 * — so evaluation is suppressed from the moment a link is clicked
 * until the browser reports the scroll has actually settled.
 */
export function useActiveSection(
  sectionIds: string[],
  hashId?: string,
): string | undefined {
  const key = sectionIds.join("|");
  const [activeId, setActiveId] = useState<string | undefined>(hashId ?? sectionIds[0]);

  const activeIdRef = useRef(activeId);
  const suppressRef = useRef(false);
  const evaluateRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!hashId || !sectionIds.includes(hashId)) return;
    activeIdRef.current = hashId;
    setActiveId(hashId);

    suppressRef.current = true;
    const resume = () => {
      suppressRef.current = false;
      evaluateRef.current();
    };
    window.addEventListener("scrollend", resume, { once: true });
    const timeout = window.setTimeout(resume, SUPPRESSION_TIMEOUT_MS);

    return () => {
      window.removeEventListener("scrollend", resume);
      window.clearTimeout(timeout);
    };
  }, [hashId]);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    let ticking = false;

    const evaluate = () => {
      ticking = false;
      if (suppressRef.current) return;

      let current: string | undefined;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= TRIGGER_PX) {
          current = id;
        } else {
          break;
        }
      }

      const next = current ?? sectionIds[0];
      if (next === activeIdRef.current) return;

      activeIdRef.current = next;
      setActiveId(next);

      // Keep the address bar honest about scroll position without
      // going through the router — a router-driven update would
      // re-run the app's hash-scroll effect and yank the page back to
      // this section's scroll-into-view landing spot.
      const url = `${window.location.pathname}${window.location.search}#${next}`;
      window.history.replaceState(null, "", url);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(evaluate);
    };

    evaluateRef.current = evaluate;
    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [key]);

  return activeId;
}

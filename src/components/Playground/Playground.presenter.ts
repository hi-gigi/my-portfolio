// ============================================================
//  PRESENTER — sticky sub-nav active-section tracking
//  Watches the three module sections and reports which one is
//  nearest the top of the viewport, so the Design / Motion & Code /
//  Process tabs can highlight the one currently in view.
// ============================================================

import { useEffect, useState } from "react";

/**
 * `rootMargin`'s top offset clears the sticky site header + the
 * sticky tabs bar sitting just under it, so a section only counts as
 * "active" once it's actually visible below both. The bottom offset
 * stops counting a section once it's past the viewport's midpoint,
 * so the next one can take over before this one has fully scrolled
 * out of view.
 */
const ROOT_MARGIN = "-120px 0px -50% 0px";

export function usePlaygroundNav(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0]);
  const key = sectionIds.join("|");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b,
        );
        setActiveId(topmost.target.id);
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return { activeId };
}

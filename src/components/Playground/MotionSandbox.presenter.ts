// ============================================================
//  PRESENTER — motion sandbox swatch behaviour
//  Two of the four swatches need real state/side-effects (pointer
//  tracking, viewport intersection); the other two (button press,
//  spinning ring) are pure CSS already defined globally and need no
//  presenter at all.
// ============================================================

import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Drifts an element toward the pointer within its own bounds, springs back on leave. */
export function useMagneticHover(strength = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * strength, y: y * strength });
  };

  const onMouseLeave = () => setOffset({ x: 0, y: 0 });

  return { ref, offset, onMouseMove, onMouseLeave };
}

/** True while the element is in (or past) view — re-arms every time it re-enters, so scrolling back replays it. */
export function useScrollReveal(threshold = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

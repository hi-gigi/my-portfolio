// ============================================================
//  PRESENTER — overflow-aware nav collapse
//  Decides whether an inline row of nav links still fits next to a
//  fixed-width sibling, by measuring actual box widths rather than
//  guessing a viewport breakpoint. Case studies carry different
//  numbers of section links with different label lengths, so a
//  single fixed breakpoint either collapses pages that would have
//  fit or lets longer ones overflow into a horizontal scrollbar.
// ============================================================

import { useLayoutEffect, useRef, useState } from "react";

export interface OverflowNavViewModel {
  /** True once the nav's natural width no longer fits beside the sibling. */
  isCollapsed: boolean;
  /** The shared flex row whose available width is being measured. */
  containerRef: React.RefObject<HTMLDivElement>;
  /** The fixed-width sibling the nav shares the row with (e.g. back link + toggle). */
  siblingRef: React.RefObject<HTMLDivElement>;
  /** A hidden, unwrapped clone of the nav content used purely to read its natural width. */
  measureRef: React.RefObject<HTMLDivElement>;
}

/** Flex gap between the sibling and the nav in the shared row (@space-4 in tokens.less). */
const ROW_GAP_PX = 16;

/**
 * `dependency` should change whenever the measured content changes shape
 * (e.g. the set of section labels) so a route change re-evaluates even if
 * the viewport itself hasn't resized.
 */
export function useOverflowNav(dependency: unknown): OverflowNavViewModel {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const siblingRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const sibling = siblingRef.current;
    const measure = measureRef.current;
    if (!container || !sibling || !measure) return;

    const evaluate = () => {
      // clientWidth includes the container's own inline padding, which
      // isn't space available to its flex children — subtract it, or a
      // padded container reads as roomier than it actually lays out.
      const style = window.getComputedStyle(container);
      const paddingX =
        parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const available =
        container.clientWidth - paddingX - sibling.offsetWidth - ROW_GAP_PX;
      setIsCollapsed(measure.scrollWidth > available);
    };

    evaluate();

    const observer = new ResizeObserver(evaluate);
    observer.observe(container);
    observer.observe(sibling);
    observer.observe(measure);

    return () => observer.disconnect();
  }, [dependency]);

  return { isCollapsed, containerRef, siblingRef, measureRef };
}

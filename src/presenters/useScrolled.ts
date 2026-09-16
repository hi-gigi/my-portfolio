// ============================================================
//  PRESENTER — useScrolled
//  Whether the page has been scrolled past `threshold`. Used to keep
//  the sticky header's divider hidden at the very top of the page,
//  only appearing once there's content sliding underneath it.
// ============================================================

import { useEffect, useState } from "react";

export function useScrolled(threshold = 4): boolean {
  const [scrolled, setScrolled] = useState(() => window.scrollY > threshold);

  useEffect(() => {
    let ticking = false;

    const evaluate = () => {
      ticking = false;
      setScrolled(window.scrollY > threshold);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(evaluate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

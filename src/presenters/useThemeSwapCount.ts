// ============================================================
//  PRESENTER — theme swap count
//  Ticks up each time the light/dark mode changes, so a view can
//  replay an entrance effect (e.g. `key={count}`) without owning
//  the theme state. Listens for the `data-theme-changing` flag that
//  `useTheme` raises on <html>, which covers toggle and OS flips
//  alike and is never raised under reduced motion.
// ============================================================

import { useEffect, useState } from "react";

const FLAG = "data-theme-changing";

export function useThemeSwapCount(): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      if (root.hasAttribute(FLAG)) setCount((n) => n + 1);
    });
    observer.observe(root, { attributes: true, attributeFilter: [FLAG] });
    return () => observer.disconnect();
  }, []);

  return count;
}

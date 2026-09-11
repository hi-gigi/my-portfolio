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
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
  }, [pathname, hash]);
}

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as
  | string
  | undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let loaded = false;

function loadGoogleAnalytics(id: string) {
  if (loaded) return;
  loaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // gtag.js expects the `arguments` object, not a rest array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  // The site is a SPA: page views are sent manually on each route change.
  window.gtag("config", id, { send_page_view: false });
}

/**
 * Google Analytics 4 page-view tracking for a client-side routed app.
 * Only active in production builds with VITE_GA_MEASUREMENT_ID set.
 */
export function useAnalytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!import.meta.env.PROD || !MEASUREMENT_ID) return;
    loadGoogleAnalytics(MEASUREMENT_ID);
    window.gtag("event", "page_view", {
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, search]);
}

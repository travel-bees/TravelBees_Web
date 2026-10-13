import { useEffect, useState } from "react";

export interface Route {
  path: string;
  anchor: string | null;
}

/** Parse a hash-router location such as `#/packages/japan-explorer#overview`. */
export function parseHash(hash: string): Route {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  const idx = raw.indexOf("#");
  if (idx === -1) return { path: raw || "/", anchor: null };
  return { path: raw.slice(0, idx) || "/", anchor: raw.slice(idx + 1) || null };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    parseHash(typeof window === "undefined" ? "" : window.location.hash),
  );

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 84; // sticky navbar height
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export function navigate(to: string) {
 const target = parseHash(to.startsWith("#") ? to : `#${to}`);

  const next = `#${target.path}${target.anchor ? `#${target.anchor}` : ""}`;

  if (window.location.hash === next) {
    return;
  }

  window.location.hash = next;
}

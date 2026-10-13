import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description: string;
  image?: string;
  path?: string;
  type?: string;
  jsonLd?: Record<string, unknown>;
}

const SITE = "Travelbees";
const BASE = "https://www.travelbees.in";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Updates document metadata for the current route (SPA-safe SEO). */
export function useSeo({ title, description, image, path, type = "website", jsonLd }: SeoOptions) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", "index,follow");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", SITE);
    const urlPath = path ?? (window.location.hash.replace("#", "") || "/");
    setMeta("property", "og:url", `${BASE}${urlPath}`);
    if (image) setMeta("property", "og:image", image);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    if (image) setMeta("name", "twitter:image", image);
    setLink("canonical", `${BASE}${path ?? "/"}`);

    if (!jsonLd) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, image, path, type]);
}

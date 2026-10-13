/** Home-page section anchors used by in-page navigation. */
export const homeSections = [
  "hero",
  "featured-packages",
  "group-departures",
  "international",
  "domestic",
  "custom-trip",
  "why-us",
  "how-it-works",
  "inspiration",
  "about",
  "services",
  "blog",
  "testimonials",
  "instagram",
  "faqs",
  "newsletter",
  "final-cta",
] as const;

export type HomeSection = (typeof homeSections)[number];

export const isHomeSection = (value: string | undefined): value is HomeSection =>
  Boolean(value && (homeSections as readonly string[]).includes(value));

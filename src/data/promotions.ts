/**
 * Upcoming trips promoted in the homepage hero slider.
 * Update this list with real, currently open departures before launch.
 */
export interface Promotion {
  id: string;
  /** Viewer-facing category label, e.g. "Upcoming group tour" */
  label: string;
  title: string;
  blurb: string;
  date: string;
  duration: string;
  price: string;
  imageId: number;
  href: string;
}

export const promotions: Promotion[] = [
  {
    id: "promo-japan",
    label: "Upcoming group tour",
    title: "Japan Explorer — Cherry Blossom Departure",
    blurb:
      "Tokyo, Hakone, Kyoto and Osaka across 10 days, timed for peak sakura with reserved Shinkansen seats and a ryokan night.",
    date: "22 March 2026",
    duration: "9N / 10D",
    price: "from ₹1,95,000",
    imageId: 29176026,
    href: "/packages/japan-explorer",
  },
  {
    id: "promo-mara",
    label: "Upcoming safari group",
    title: "Masai Mara — Migration Season Departure",
    blurb:
      "Four days of dawn and dusk game drives in the heart of the migration, with a tented camp under the Milky Way.",
    date: "14 September 2026",
    duration: "5N / 4D",
    price: "from ₹2,15,000",
    imageId: 14074141,
    href: "/packages/masai-mara-safari",
  },
  {
    id: "promo-vietnam",
    label: "Upcoming group tour",
    title: "Vietnam Highlights — Post-Monsoon Departure",
    blurb:
      "Hanoi's food streets, an overnight Ha Long Bay cruise and Hoi An's lantern lanes when the skies are clearest.",
    date: "08 November 2026",
    duration: "5N / 6D",
    price: "from ₹76,000",
    imageId: 38100494,
    href: "/packages/vietnam-highlights",
  },
];

/**
 * Upcoming trips promoted in the homepage hero slider.
 * Update this list with real, currently open departures before launch.
 */
export interface Promotion {
  id: string;
  /** Viewer-facing category label, e.g. "Upcoming group tour" */
  imageId: number;
}

export const promotions: Promotion[] = [
  {
    id: "promo-bangkok",
    imageId: 28245013,
  },
  {
    id: "promo-phuket",
    imageId: 1007657,
  },
  {
    id: "promo-malaysia",
    imageId: 31496382,
  },
  {
    id: "promo-mara",
    imageId: 20523197,
  },
  {
    id: "promo-singapore",
    imageId: 29941695,
  },
];

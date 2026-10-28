import hero1 from "../images/Hero/1.jpg";
import hero2 from "../images/Hero/2.jpg";
import hero3 from "../images/Hero/3.jpg";
import hero4 from "../images/Hero/4.jpg";
import hero5 from "../images/Hero/5.jpg";

/**
 * Upcoming trips promoted in the homepage hero slider.
 * Update this list with real, currently open departures before launch.
 */
export interface Promotion {
  id: string;
  imageId: number | string;
  title?: string;
}

export const promotions: Promotion[] = [
  {
    id: "hero-1",
    imageId: hero1,
    title: "Explore the World",
  },
  {
    id: "hero-2",
    imageId: hero2,
    title: "Unforgettable Journeys",
  },
  {
    id: "hero-3",
    imageId: hero3,
    title: "Curated Group Tours",
  },
  {
    id: "hero-4",
    imageId: hero4,
    title: "Tropical Escapes",
  },
  {
    id: "hero-5",
    imageId: hero5,
    title: "Custom Holidays",
  },
];

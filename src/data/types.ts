export interface ItineraryDay {
  day: string;
  title: string;
  description: string;
}

export interface Hotel {
  city: string;
  stay: string;
  nights: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface TravelPackage {
  slug: string;
  name: string;
  destination: string;
  region: "International" | "Domestic";
  category: "International" | "Domestic" | "Safari";
  duration: string;
  nights: number;
  tripType: string;
  styles: string[];
  startingCity: string;
  bestTime: string;
  price: number;
  priceLabel: string;
  imageId: number | string;
  galleryIds: (number | string)[];
  tagline: string;
  description: string;
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  hotels: Hotel[];
  experiences: string[];
  importantInfo: string[];
  cancellation: string[];
  faqs: Faq[];
  featured?: boolean;
}

export interface Destination {
  slug: string;
  name: string;
  descriptor: string;
  imageId: number | string;
  region: "International" | "Domestic";
  bestTime: string;
  idealFor: string;
  startingPrice: number;
  blurb: string;
  highlights: string[];
}

export interface GroupDeparture {
  id: string;
  destination: string;
  country: string;
  departureDate: string;
  month: string;
  duration: string;
  price: number;
  tripType: "International" | "Domestic" | "Safari";
  badge?: "Limited Seats" | "Early Bird" | "Popular" | "Trending";
  imageId: number | string;
  packageSlug?: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  destination: string;
  rating: number;
  review: string;
  placeholder?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  excerpt: string;
  imageId: number;
  body: string[];
}

/**
 * Central brand + business configuration.
 * Replace these values with the real business details before going live.
 * Everything downstream reads from here, so there is a single source of truth.
 */

export const site = {
  name: "Travelbees",
  legalName: "Travelbees Travels",
  tagline: "Travel. Explore. Create Stories.",
  description:
    "Travelbees designs curated holidays, fixed-departure group tours and tailor-made adventures for travellers across India.",
  city: "Bengaluru",
  region: "Karnataka",
  country: "India",
  addressLine: "Bengaluru, Karnataka, India",
  addressNote: "[Street address to be updated]",
  phone: "+91 8073658691",
  phoneHref: "tel:+918073658691",
  whatsapp: "+91 8073658691",
  whatsappHref: "https://wa.me/918073658691",
  email: "travelbees007@gmail.com",
  emailHref: "mailto:travelbees007@gmail.com",
  hours: "Mon – Sat · 9:30 AM – 7:00 PM IST",
  instagramHandle: "@_travel_bees",
  instagramHref: "https://instagram.com/_travel_bees",
  googleReviewsHref: "https://www.google.com/maps/",
  url: "https://www.travelbees.in/",
} as const;

export const nav = [
  { label: "International", href: "/group-departures#International" },
  { label: "Domestic", href: "/group-departures#Domestic" },
  { label: "Custom Trips", href: "/custom-trip" },
  // { label: "About Us", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faqs" },
] as const;

export const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Group Tours", href: "/group-departures" },
      { label: "Custom Trips", href: "/custom-trip" },
      { label: "About Us", href: "/about" },
      // { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Visa Assistance", href: "/custom-trip" },
      { label: "Flights", href: "/custom-trip" },
      { label: "Domestic Packages", href: "/custom-trip" },
      { label: "International Packages", href: "/custom-trip" },
      { label: "Honeymoon Packages", href: "/custom-trip" },
      // { label: "Corporate Travel", href: "/custom-trip" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/final-cta" },
      { label: "Blog", href: "/blog" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms & Conditions", href: "/legal/terms" },
  { label: "Cancellation Policy", href: "/legal/cancellation" },
  { label: "Refund Policy", href: "/legal/refund" },
  { label: "Cookie Policy", href: "/legal/cookies" },
] as const;

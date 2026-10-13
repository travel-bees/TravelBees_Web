import type { Service, Testimonial, BlogPost } from "./types";

export const services: Service[] = [
  {
    title: "International Holidays",
    description: "Complete packages for Japan, Vietnam, Thailand, Bali, Dubai, Europe, Kenya and beyond.",
    icon: "globe",
  },
  {
    title: "Domestic Holidays",
    description: "Andaman, Kerala, Rajasthan, Kashmir, Himachal, Goa, Meghalaya and Uttarakhand.",
    icon: "map",
  },
  {
    title: "Group Tours",
    description: "Fixed departures with a coordinator, so you travel with people and skip the planning.",
    icon: "users",
  },
  {
    title: "Custom Trips",
    description: "Private itineraries built around your dates, pace, interests and budget.",
    icon: "sparkles",
  },
  {
    title: "Honeymoons",
    description: "Romantic stays, private transfers and the little details that make it feel personal.",
    icon: "heart",
  },
  {
    title: "Safari Holidays",
    description: "Masai Mara, Ranthambore and Bandhavgarh with naturalist guides and comfortable camps.",
    icon: "binoculars",
  },
  {
    title: "Visa Assistance",
    description: "Document checklists, form filling, appointment slots and interview preparation.",
    icon: "passport",
  },
  {
    title: "Flights & Hotels",
    description: "Fare options across airlines and hand-picked stays that match your budget.",
    icon: "plane",
  },
  {
    title: "Corporate Travel",
    description: "Offsites, conferences and group bookings with consolidated invoicing.",
    icon: "briefcase",
  },
];

/**
 * Placeholder testimonials — replace with verified customer reviews
 * (e.g. Google Business Profile) before launch.
 */
export const testimonials: Testimonial[] = [
  {
    name: "[Customer name]",
    destination: "Japan · 9N/10D",
    rating: 5,
    review:
      "Placeholder review — replace with a verified customer testimonial. This card is here to show the layout and typography of a real review.",
    placeholder: true,
  },
  {
    name: "[Customer name]",
    destination: "Andaman · 4N/5D",
    rating: 5,
    review:
      "Placeholder review — add a short, specific quote about what the traveller loved most. Two or three lines works best here.",
    placeholder: true,
  },
  {
    name: "[Customer name]",
    destination: "Rajasthan · 6N/7D",
    rating: 5,
    review:
      "Placeholder review — mention the detail that stood out: the hotel, the guide, the pacing or the support during the trip.",
    placeholder: true,
  },
  {
    name: "[Customer name]",
    destination: "Masai Mara · 5N/4D",
    rating: 5,
    review:
      "Placeholder review — keep it honest and in the customer's own words once real reviews are collected.",
    placeholder: true,
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "japan-travel-guide-first-time-visitors",
    title: "Japan Travel Guide for First-Time Visitors",
    category: "Guides",
    date: "12 Feb 2026",
    readingTime: "9 min read",
    excerpt:
      "Everything we wish first-time travellers knew before their first trip — visas, rail passes, cash etiquette and the one mistake almost everyone makes.",
    imageId: 4058530,
    body: [
      "Japan is the rare destination that is effortless to travel in and endlessly rewarding at the same time. The trains run to the minute, convenience stores are genuinely good, and people are unfailingly helpful — even if you only speak English.",
      "Start by deciding on your season. Cherry blossom (late March to early April) is beautiful and crowded. Autumn colours (November) are arguably better: clearer skies, fewer crowds and the same stunning backdrops.",
      "Budget realistically. Japan is not a cheap destination, but it does not have to be ruinous either. Mid-range hotels, lunch sets and a well-planned rail route keep costs sensible without cutting the experiences that matter.",
      "Finally, don't over-plan. Two cities done slowly beat five cities done at a sprint. Build in one unplanned afternoon in every place you stay.",
    ],
  },
  {
    slug: "best-time-to-visit-vietnam",
    title: "Best Time to Visit Vietnam",
    category: "Planning",
    date: "04 Feb 2026",
    readingTime: "6 min read",
    excerpt:
      "Vietnam's weather changes completely from north to south. Here's how to pick your month based on where you actually want to go.",
    imageId: 30634746,
    body: [
      "Vietnam stretches over 1,600 kilometres, so 'the best time to visit' depends almost entirely on your route.",
      "The north — Hanoi, Sapa and Ha Long Bay — is at its best from October to April. Cool, dry and clear. Summer brings heat and heavy rain.",
      "Central Vietnam — Hoi An, Da Nang and Hue — has a long rainy season from September to December, with occasional typhoon risk in October and November.",
      "The south — Ho Chi Minh City and the Mekong Delta — is warm all year, with a wet season from May to November that usually means short, intense afternoon showers rather than all-day rain.",
    ],
  },
  {
    slug: "how-much-does-a-japan-trip-cost-from-india",
    title: "How Much Does a Japan Trip Cost From India?",
    category: "Budget",
    date: "28 Jan 2026",
    readingTime: "7 min read",
    excerpt:
      "A realistic breakdown of flights, hotels, food, transport and visas for a 10-day Japan trip, with a sample budget at three comfort levels.",
    imageId: 30780336,
    body: [
      "Airfare is the single biggest variable. Return fares from Bengaluru swing widely with season — book six to ten weeks ahead where possible and stay flexible on dates.",
      "Hotels in Japan are priced by room, not per person, which makes it great value for couples and families. Business hotels near major stations offer small but spotless rooms at very fair rates.",
      "Food can be as cheap or as expensive as you like. A convenience-store breakfast runs under a thousand yen, while a multi-course kaiseki dinner can easily cost more than a night's hotel.",
      "Transport adds up fast. A well-chosen rail pass usually pays for itself if you're doing at least one long inter-city round trip; for shorter routes, single tickets are cheaper.",
    ],
  },
  {
    slug: "masai-mara-safari-everything-you-need-to-know",
    title: "Masai Mara Safari: Everything You Need to Know",
    category: "Safari",
    date: "19 Jan 2026",
    readingTime: "8 min read",
    excerpt:
      "When to go, what to pack, which parks to combine and how to choose between a lodge and a tented camp in the Mara.",
    imageId: 16448674,
    body: [
      "The great migration is the headline act, and it is genuinely spectacular — but the Mara delivers year-round. Resident predators, vast plains and excellent guiding mean there is no bad month for a first safari.",
      "Choose your camp carefully. Tented camps put you closer to the bush and the sounds; lodges offer more consistent hot water and larger common areas. Both are comfortable in their own way.",
      "Pack neutrals and layers, not bright colours. Mornings are cold, afternoons are hot, and dust is a constant. A good pair of binoculars will improve your experience more than any camera.",
      "Finally, set expectations honestly. Wildlife is wild. Your guide will do everything possible, but no one can guarantee a leopard sighting — and that is part of the magic.",
    ],
  },
  {
    slug: "best-international-destinations-for-indian-families",
    title: "Best International Destinations for Indian Families",
    category: "Family",
    date: "09 Jan 2026",
    readingTime: "6 min read",
    excerpt:
      "Six destinations that work for travelling with kids and grandparents — short flights, familiar food and enough to keep everyone happy.",
    imageId: 15994332,
    body: [
      "Travelling with three generations means balancing everyone's energy. The trick is short flights, comfortable hotels and destinations with plenty of low-effort sightseeing.",
      "Singapore tops the list for a reason: safe, spotless, vegetarian-friendly and full of attractions kids genuinely enjoy.",
      "Thailand and Bali work beautifully too — beach time for the adults, easy day trips for the children, and Indian food available almost everywhere.",
      "Dubai is another strong option, especially in winter, with desert safaris and theme parks that appeal across age groups.",
    ],
  },
  {
    slug: "kerala-in-monsoon-a-different-kind-of-holiday",
    title: "Kerala in Monsoon: A Different Kind of Holiday",
    category: "Guides",
    date: "22 Dec 2025",
    readingTime: "5 min read",
    excerpt:
      "Waterfalls at full volume, empty beaches and Ayurveda season — why the Kerala monsoon might be the state's best-kept secret.",
    imageId: 12950219,
    body: [
      "June to September turns Kerala into a different state entirely. Waterfalls run at full volume, the hills turn an impossible green, and hotel rates drop sharply.",
      "Ayurveda is traditionally prescribed during the monsoon, when the body is said to respond best to treatment. Many resorts run dedicated programmes from June onwards.",
      "Pack for rain: a compact umbrella, quick-dry clothing and a dry bag for your phone. Houseboat cruises still run, and the rain on the backwaters is half the atmosphere.",
    ],
  },
];

export const getBlogPost = (slug: string) => blogPosts.find((b) => b.slug === slug);

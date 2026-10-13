import type { Destination } from "./types";

/** Destination discovery data — international. */
export const internationalDestinations: Destination[] = [
  {
    slug: "japan",
    name: "Japan",
    descriptor: "Cherry blossoms & neon cities",
    imageId: 4058530,
    region: "International",
    bestTime: "Mar – May · Oct – Nov",
    idealFor: "Couples, solo travellers, photographers",
    startingPrice: 185000,
    blurb:
      "A country where a 400-year-old shrine sits around the corner from a robot restaurant. Japan rewards slow travellers — the tea houses, the trains that run to the second, the seasonal food.",
    highlights: ["Kyoto temple trail", "Shinkansen rail journey", "Hakone onsen ryokan"],
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    descriptor: "Limestone bays & lantern streets",
    imageId: 37888225,
    region: "International",
    bestTime: "Oct – Apr",
    idealFor: "Backpackers, couples, food lovers",
    startingPrice: 72000,
    blurb:
      "Ha Long Bay at sunrise, Hoi An's lantern lanes and a bowl of pho for breakfast. Vietnam is the rare place that is both budget-friendly and genuinely spectacular.",
    highlights: ["Ha Long Bay cruise", "Hoi An ancient town", "Hanoi street food"],
  },
  {
    slug: "singapore",
    name: "Singapore",
    descriptor: "Gardens, hawkers & skyline",
    imageId: 18662417,
    region: "International",
    bestTime: "Feb – Apr · Jul – Sep",
    idealFor: "Families with kids, short breaks",
    startingPrice: 68000,
    blurb:
      "Clean, easy and endlessly entertaining — Universal Studios, the SuperTree Grove and hawker centres where a Michelin plate of chicken rice costs less than a cinema ticket.",
    highlights: ["Gardens by the Bay", "Sentosa island day", "Hawker centre food trail"],
  },
  {
    slug: "thailand",
    name: "Thailand",
    descriptor: "Islands, temples & night markets",
    imageId: 7479103,
    region: "International",
    bestTime: "Nov – Mar",
    idealFor: "Friends, honeymooners, families",
    startingPrice: 58000,
    blurb:
      "The classic first-abroad trip: short flights, warm water, longtail boats and a night market around every corner. Easy to do cheap, easy to do luxuriously.",
    highlights: ["Krabi island hopping", "Bangkok temples", "Phuket beach resorts"],
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    descriptor: "Twin towers & tea hills",
    imageId: 433942,
    region: "International",
    bestTime: "Dec – Feb · Jun – Aug",
    idealFor: "Families, couples, short breaks",
    startingPrice: 62000,
    blurb:
      "Kuala Lumpur's skyline, the Cameron Highlands' tea rows and the colonial streets of Penang — three very different holidays in one short flight.",
    highlights: ["Petronas Towers", "Batu Caves", "Penang street art & food"],
  },
  {
    slug: "bali",
    name: "Bali",
    descriptor: "Rice terraces & beach clubs",
    imageId: 15994332,
    region: "International",
    bestTime: "Apr – Oct",
    idealFor: "Couples, honeymooners, groups",
    startingPrice: 78000,
    blurb:
      "Ubud's jungle temples and rice terraces for the mornings, Seminyak's beach clubs for the evenings. Bali is the honeymoon we book most after the Maldives.",
    highlights: ["Ubud rice terraces", "Uluwatu cliff temple", "Nusa Penida day trip"],
  },
  {
    slug: "dubai",
    name: "Dubai",
    descriptor: "Skylines, deserts & shopping",
    imageId: 19664340,
    region: "International",
    bestTime: "Nov – Mar",
    idealFor: "Families, shopping trips, luxury",
    startingPrice: 74000,
    blurb:
      "Desert dunes at golden hour, the world's tallest tower and malls that are attractions in themselves. A short flight and a big-change-of-scene holiday.",
    highlights: ["Desert safari & dune drive", "Burj Khalifa observatory", "Old Dubai souks"],
  },
  {
    slug: "europe",
    name: "Europe",
    descriptor: "Alpine lakes & old towns",
    imageId: 4050794,
    region: "International",
    bestTime: "Apr – Jun · Sep – Oct",
    idealFor: "Honeymooners, families, first-timers",
    startingPrice: 245000,
    blurb:
      "Swiss lakes and alpine rail, Parisian mornings, Italian evenings. Europe is a big-ticket holiday, so we plan it carefully — routing, rail passes and the right hotels.",
    highlights: ["Swiss alpine rail", "Paris city break", "Italian lakes"],
  },
  {
    slug: "kenya",
    name: "Kenya",
    descriptor: "Safaris & the great migration",
    imageId: 20501201,
    region: "International",
    bestTime: "Jul – Oct",
    idealFor: "Wildlife lovers, photographers, families",
    startingPrice: 210000,
    blurb:
      "Dawn game drives in the Masai Mara, hot-air balloons over the plains and tented camps under a sky absolutely full of stars. The trip people talk about for decades.",
    highlights: ["Masai Mara game drives", "Balloon safari option", "Lake Naivasha"],
  },
];

/** Destination discovery data — domestic. */
export const domesticDestinations: Destination[] = [
  {
    slug: "andaman",
    name: "Andaman",
    descriptor: "Turquoise water & white sand",
    imageId: 7898444,
    region: "Domestic",
    bestTime: "Oct – May",
    idealFor: "Couples, families, honeymooners",
    startingPrice: 42000,
    blurb:
      "Radhanagar sunsets, coral gardens and the calmest water you'll find in India. No visa, no currency change, no long-haul flight.",
    highlights: ["Radhanagar Beach sunset", "Elephant Beach snorkelling", "Cellular Jail history"],
  },
  {
    slug: "kerala",
    name: "Kerala",
    descriptor: "Backwaters & tea hills",
    imageId: 12950219,
    region: "Domestic",
    bestTime: "Sep – Mar",
    idealFor: "Families, couples, senior travellers",
    startingPrice: 38000,
    blurb:
      "A houseboat night on the Alleppey backwaters, Munnar's tea rows and Fort Kochi's cafés. God's Own Country is still the easiest family holiday in India.",
    highlights: ["Alleppey houseboat", "Munnar tea estates", "Kathakali & Ayurveda"],
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    descriptor: "Forts, palaces & desert nights",
    imageId: 18881277,
    region: "Domestic",
    bestTime: "Oct – Mar",
    idealFor: "Families, groups, culture lovers",
    startingPrice: 54000,
    blurb:
      "Pink cities, blue lanes and golden dunes. Rajasthan is India at its most cinematic — and the food and heritage hotels are half the reason to go.",
    highlights: ["Amber Fort", "Jaisalmer desert camp", "Udaipur lake palaces"],
  },
  {
    slug: "kashmir",
    name: "Kashmir",
    descriptor: "Dal Lake shikaras & meadows",
    imageId: 16498513,
    region: "Domestic",
    bestTime: "Apr – Oct",
    idealFor: "Couples, families, honeymooners",
    startingPrice: 46000,
    blurb:
      "A shikara at sunset on Dal Lake, Gulmarg's meadow gondola and houseboat mornings with kahwa. Our most requested domestic honeymoon after Kerala.",
    highlights: ["Dal Lake shikara ride", "Gulmarg gondola", "Pahalgam valleys"],
  },
  {
    slug: "himachal-pradesh",
    name: "Himachal Pradesh",
    descriptor: "Snow peaks & pine valleys",
    imageId: 14572763,
    region: "Domestic",
    bestTime: "Mar – Jun · Oct – Feb",
    idealFor: "Friends, families, road-trippers",
    startingPrice: 32000,
    blurb:
      "Manali's snowline, Kasol's riverside cafés and Spiti's moonscape roads. The best-value mountain holiday you can take from Bengaluru.",
    highlights: ["Manali & Solang", "Old Manali cafés", "Spiti valley circuit"],
  },
  {
    slug: "goa",
    name: "Goa",
    descriptor: "Beaches, shacks & sunsets",
    imageId: 39182453,
    region: "Domestic",
    bestTime: "Nov – Feb",
    idealFor: "Friends, families, weekend breaks",
    startingPrice: 24000,
    blurb:
      "North Goa for the noise, south Goa for the quiet. Either way: seafood shacks, Portuguese churches and a sunset that needs no filter.",
    highlights: ["Palolem & Agonda beaches", "Fontainhas Latin quarter", "Anjuna flea market"],
  },
  {
    slug: "meghalaya",
    name: "Meghalaya",
    descriptor: "Waterfalls & living bridges",
    imageId: 12233686,
    region: "Domestic",
    bestTime: "Sep – May",
    idealFor: "Friends, adventure seekers",
    startingPrice: 36000,
    blurb:
      "The wettest place on earth, and the greenest. Nohkalikai Falls, double-decker root bridges and caves that will test your nerves in the best way.",
    highlights: ["Nohkalikai Falls", "Nongriat root bridge trek", "Dawki umngot river"],
  },
  {
    slug: "uttarakhand",
    name: "Uttarakhand",
    descriptor: "Ganges ghats & Himalayan air",
    imageId: 38044214,
    region: "Domestic",
    bestTime: "Mar – Jun · Sep – Nov",
    idealFor: "Families, pilgrims, trekkers",
    startingPrice: 28000,
    blurb:
      "Rishikesh's evening aarti, Nainital's lake and Auli's ski slopes. Close enough for a long weekend, beautiful enough for a full week.",
    highlights: ["Rishikesh Ganga aarti", "Nainital & Bhimtal", "Auli skiing"],
  },
];

export const allDestinations = [...internationalDestinations, ...domesticDestinations];
export const getDestination = (slug: string) => allDestinations.find((d) => d.slug === slug);

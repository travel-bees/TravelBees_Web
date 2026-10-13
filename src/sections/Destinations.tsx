import { domesticDestinations, internationalDestinations } from "../data/destinations";
import { DestinationCard } from "../components/DestinationCard";
import { Button, Reveal, SectionHeading } from "../components/ui";
import { px } from "../lib/media";
import { Link } from "../components/ui";

const inspirationTiles = [
  { slug: "japan", name: "Japan", caption: "Cherry blossoms & ancient temples", imageId: 16226263 },
  { slug: "vietnam", name: "Vietnam", caption: "Limestone bays & lantern lanes", imageId: 35222851 },
  { slug: "kenya", name: "Kenya", caption: "The great migration", imageId: 13697474 },
  { slug: "bali", name: "Bali", caption: "Rice terraces & beach clubs", imageId: 39472103 },
  { slug: "europe", name: "Europe", caption: "Alpine lakes & old towns", imageId: 13927802 },
  { slug: "andaman", name: "Andaman", caption: "Turquoise water & white sand", imageId: 36928174 },
];

export function InternationalSection() {
  return (
    <section id="international" className="bg-cream py-10">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Beyond India"
          title="Go Further"
          subtitle="Long-haul journeys with every detail handled — visas, flights, stays, transfers and the small things in between."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {internationalDestinations.map((destination, index) => (
            <Reveal key={destination.slug} delay={index * 60} className="h-full">
              <DestinationCard destination={destination} eager={index < 4} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex justify-center">
            <Button href="/group-departures" variant="dark" size="lg" icon="arrow-right">
              Explore International Trips
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function DomesticSection() {
  return (
    <section id="domestic" className="bg-sand py-10">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Incredible India"
          title="Discover India"
          subtitle="From island beaches to Himalayan snow — holidays that need no visa and no long-haul flight."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {domesticDestinations.map((destination, index) => (
            <Reveal key={destination.slug} delay={index * 50} className="h-full">
              <DestinationCard destination={destination} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex justify-center">
            <Button href="/group-departures" variant="dark" size="lg" icon="arrow-right">
              Explore Domestic Trips
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function InspirationSection() {
  return (
    <section id="inspiration" className="relative overflow-hidden bg-sand py-10">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Destination inspiration"
          title="Where Will You Go Next?"
          subtitle="Six places our travellers keep coming back to. Tap one to see the full destination guide."
        />
      </div>

      <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:gap-5 sm:px-8">
        {inspirationTiles.map((tile) => (
          <Link
            key={tile.slug}
            to={`/destinations/${tile.slug}`}
            className="group relative w-[76vw] shrink-0 snap-center overflow-hidden rounded-3xl sm:w-[42vw] lg:w-[28vw]"
          >
            <div className="aspect-[3/4]">
              <img
                src={px(tile.imageId, 900, 1200)}
                alt={`${tile.name} — ${tile.caption}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="text-[1.7rem] font-bold tracking-tight text-cream">{tile.name}</h3>
              <p className="mt-1 text-[13.5px] text-cream/70">{tile.caption}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-gold-300">
                View destination
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

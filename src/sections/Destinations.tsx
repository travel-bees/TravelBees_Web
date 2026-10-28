import { useEffect, useRef, useState } from "react";
import { scrollToId, useRoute } from "../lib/router";
import { allDestinations, domesticDestinations, internationalDestinations } from "../data/destinations";
import { DestinationCard } from "../components/DestinationCard";
import { packages } from "../data/packages";
import { useApp } from "../lib/app-context";
import { Badge, Button, Reveal, SectionHeading } from "../components/ui";
import { px } from "../lib/media";
import { Link } from "../components/ui";
import { Icon } from "../components/Icon";
import { cn } from "../utils/cn";

type DestinationFilter = "All" | "International" | "Domestic";
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

function cleanPackageName(packageName: string, destName: string): string {
  const regex = new RegExp(`^${destName}\\s*[—–-]\\s*`, "i");
  return packageName.replace(regex, "");
}

export function InspirationSection() {
  const route = useRoute();

  const getFilterFromRoute = (): DestinationFilter => {
    const candidate = route.anchor || (route.path ? route.path.replace(/^\//, "") : "");
    const lower = candidate.toLowerCase();
    if (lower === "international") return "International";
    if (lower === "domestic") return "Domestic";
    return "All";
  };

  const [filter, setFilter] = useState<DestinationFilter>(getFilterFromRoute);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { openEnquiry } = useApp();

  const togglePackages = (slug: string) => {
    setExpandedCards((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  useEffect(() => {
    const candidate = route.anchor || (route.path ? route.path.replace(/^\//, "") : "");
    const lower = candidate.toLowerCase();
    if (lower === "international") {
      setFilter("International");
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    } else if (lower === "domestic") {
      setFilter("Domestic");
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }
  }, [route.path, route.anchor]);

  // Keep active destinations in defined order, place coming-soon destinations at the end
  const orderedAll = [
    ...allDestinations.filter((d) => !d.isComingSoon),
    ...allDestinations.filter((d) => d.isComingSoon),
  ];

  const visibleDestinations = orderedAll.filter((dest) => {
    if (filter === "All") return true;
    return dest.region === filter;
  });

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const amount = direction === "left" ? -400 : 400;
    scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id="inspiration" className="relative overflow-hidden bg-sand pt-6 pb-12 sm:pt-8 sm:pb-14">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            align="center"
            eyebrow="Destination inspiration"
            title="Where Will You Go Next?"
            subtitle="Browse our curated countries and explore all available destinations"
          />

          {/* Filter pills & navigation arrows inline */}
          <div className="mt-5 flex w-full items-center justify-between gap-3 sm:mt-6">
            <div className="hidden flex-1 sm:block" />

            <div className="flex flex-1 flex-wrap items-center justify-center gap-2 sm:flex-initial sm:gap-3">
              {(["All", "International", "Domestic"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setFilter(item);
                    if (scrollContainerRef.current) {
                      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
                    }
                  }}
                  aria-pressed={filter === item}
                  className={cn(
                    "cursor-pointer rounded-full border px-4 py-1.5 text-[12.5px] font-semibold transition-all duration-300 sm:px-5 sm:py-2 sm:text-[13px]",
                    filter === item
                      ? "border-ink-950 bg-ink-950 text-cream shadow-sm"
                      : "border-ink-950/20 bg-white/60 text-ink-800 hover:border-ink-950/40 hover:bg-white",
                  )}
                >
                  {item === "Domestic" ? "Domestic" : item}
                </button>
              ))}
            </div>

            {/* Carousel controls (desktop) */}
            <div className="hidden flex-1 justify-end gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-ink-900/15 bg-white/70 text-ink-900 shadow-sm backdrop-blur-sm transition-all hover:bg-ink-950 hover:text-cream"
              >
                <Icon name="chevron-left" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-ink-900/15 bg-white/70 text-ink-900 shadow-sm backdrop-blur-sm transition-all hover:bg-ink-950 hover:text-cream"
              >
                <Icon name="chevron-right" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Destinations & Tagged Packages Horizontal Track */}
      <div
        ref={scrollContainerRef}
        className="no-scrollbar mt-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:mt-5 sm:px-8"
      >
        {visibleDestinations.map((destination) => {
          const destName = destination.name.toLowerCase();
          const countryPackages = packages.filter((pkg) => {
            const pkgDest = pkg.destination.toLowerCase();
            return pkgDest === destName || pkgDest.includes(destName) || destName.includes(pkgDest);
          });
          const isExpanded = !!expandedCards[destination.slug];

          return (
            <article
              key={destination.slug}
              className={cn(
                "group relative flex w-[78vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-2xl border border-white/20 bg-ink-950 shadow-xl transition-all duration-500 sm:w-[44vw] lg:w-[320px]",
                destination.isComingSoon ? "cursor-default select-none" : "hover:-translate-y-1 hover:shadow-2xl",
              )}
              style={{ minHeight: "440px" }}
            >
              {/* Background Photo - Highlighted with gentle gradient */}
              <div className="absolute inset-0">
                <img
                  src={px(destination.imageId, 900, 1200)}
                  alt={`${destination.name} — ${destination.descriptor}`}
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    "h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                    !destination.isComingSoon && "group-hover:scale-105",
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 via-45% to-black/10" />
              </div>

              {/* Card Top: Region Badge & Starting Price / Coming Soon */}
              <div className="relative z-10 flex items-center justify-between gap-2 p-4">
                <Badge tone="light">
                  {destination.region === "International" ? "International" : "India"}
                </Badge>
                {destination.isComingSoon ? (
                  <span className="rounded-full border border-gold-400/40 bg-gold-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-gold-300 backdrop-blur-md">
                    Coming Soon
                  </span>
                ) : (
                  <span className="rounded-full border border-white/15 bg-ink-950/70 px-2.5 py-0.5 text-[11px] font-semibold text-gold-300 backdrop-blur-md">
                    From ₹{destination.startingPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {/* Card Bottom: Destination Info & Packages */}
              <div className="relative z-10 flex flex-col p-4 sm:p-5">
                {/* Title & Tagline (Non-clickable for Coming Soon) */}
                {destination.isComingSoon ? (
                  <div className="block">
                    <h3 className="text-[1.5rem] font-extrabold tracking-tight text-cream">
                      {destination.name}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 text-[12px] font-medium text-cream/70">
                      {destination.descriptor}
                    </p>
                  </div>
                ) : (
                  <Link to={`/destinations/${destination.slug}`} className="group/head block">
                    <h3 className="text-[1.5rem] font-extrabold tracking-tight text-cream transition-colors group-hover/head:text-gold-300">
                      {destination.name}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 text-[12px] font-medium text-cream/80">
                      {destination.descriptor}
                    </p>
                  </Link>
                )}

                {/* Coming Soon Card Content or Active Packages Section */}
                {destination.isComingSoon ? (
                  <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.06] p-3 text-center backdrop-blur-md">
                    <span className="inline-block rounded-full border border-gold-400/40 bg-gold-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-300">
                      Coming Soon
                    </span>
                    <p className="mt-2 text-[12px] font-medium text-cream/75">
                      Curated {destination.name} itineraries launching shortly
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 flex flex-col gap-1.5">
                    {countryPackages.length > 0 && (
                      <button
                        type="button"
                        onClick={() => togglePackages(destination.slug)}
                        className="flex cursor-pointer items-center justify-between rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-left backdrop-blur-md transition-colors hover:bg-white/15"
                      >
                        <span className="text-[11.5px] font-bold uppercase tracking-wider text-gold-300">
                          Available Packages ({countryPackages.length})
                        </span>
                        <Icon
                          name="chevron-down"
                          className={cn(
                            "h-3.5 w-3.5 text-gold-300 transition-transform duration-300",
                            isExpanded && "rotate-180",
                          )}
                        />
                      </button>
                    )}

                    {isExpanded && countryPackages.length > 0 && (
                      <div className="flex flex-col gap-1.5 pt-0.5">
                        {countryPackages.map((pkg) => (
                          <Link
                            key={pkg.slug}
                            to={`/packages/${pkg.slug}`}
                            className="group/pkg flex items-center justify-between gap-2 rounded-lg border border-white/15 bg-ink-950/80 px-2.5 py-1.5 backdrop-blur-md transition-all hover:border-gold-400/80 hover:bg-gold-500/15"
                          >
                            <span className="truncate text-[12px] font-medium text-cream transition-colors group-hover/pkg:text-gold-200">
                              {cleanPackageName(pkg.name, destination.name)}
                            </span>
                            <span className="shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-[10.5px] font-semibold text-gold-300">
                              {pkg.duration}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Custom Trip button at bottom - sleek & small default */}
                    <button
                      type="button"
                      onClick={() =>
                        openEnquiry(
                          { destination: destination.name, tripType: "Custom Trip" },
                          `Inspiration · ${destination.name}`,
                        )
                      }
                      className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.06] px-3 py-1.5 text-left backdrop-blur-md transition-all hover:border-gold-400/60 hover:bg-gold-500/15"
                    >
                      <span className="truncate text-[11.5px] font-medium text-cream/90">
                        Custom {destination.name} Trip
                      </span>
                      <span className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-gold-300">
                        Plan <Icon name="arrow-right" className="h-3 w-3" />
                      </span>
                    </button>
                  </div>
                )}

                {/* Destination Hub Link (Only for active destinations) */}
                {!destination.isComingSoon && (
                  <div className="mt-3 border-t border-white/10 pt-2.5">
                    <Link
                      to={`/destinations/${destination.slug}`}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-gold-300 transition-colors hover:text-gold-200"
                    >
                      Explore {destination.name} Packages
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

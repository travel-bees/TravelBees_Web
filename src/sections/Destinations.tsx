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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { openEnquiry } = useApp();

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

  // Prioritize Thailand first so users immediately see both packages
  const orderedAll = [
    ...allDestinations.filter((d) => d.slug === "thailand"),
    ...allDestinations.filter((d) => d.slug !== "thailand"),
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
    <section id="inspiration" className="relative overflow-hidden bg-sand py-12 sm:py-16">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            align="center"
            eyebrow="Destination inspiration"
            title="Where Will You Go Next?"
            subtitle="Browse our curated countries and explore all available itineraries tagged to each destination."
          />

          {/* Filter pills & navigation arrows */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
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
                  "cursor-pointer rounded-full border px-5 py-2 text-[13px] font-semibold transition-all duration-300",
                  filter === item
                    ? "border-ink-950 bg-ink-950 text-cream shadow-sm"
                    : "border-ink-950/20 bg-white/60 text-ink-800 hover:border-ink-950/40 hover:bg-white",
                )}
              >
                {item === "Domestic" ? "India / Domestic" : item}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel controls (desktop) */}
        <div className="mt-6 hidden justify-end gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-ink-900/15 bg-white/70 text-ink-900 shadow-sm backdrop-blur-sm transition-all hover:bg-ink-950 hover:text-cream"
          >
            <Icon name="chevron-left" className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-ink-900/15 bg-white/70 text-ink-900 shadow-sm backdrop-blur-sm transition-all hover:bg-ink-950 hover:text-cream"
          >
            <Icon name="chevron-right" className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Destinations & Tagged Packages Horizontal Track */}
      <div
        ref={scrollContainerRef}
        className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:px-8 lg:mt-8"
      >
        {visibleDestinations.map((destination) => {
          const destName = destination.name.toLowerCase();
          const countryPackages = packages.filter((pkg) => {
            const pkgDest = pkg.destination.toLowerCase();
            return pkgDest === destName || pkgDest.includes(destName) || destName.includes(pkgDest);
          });

          return (
            <article
              key={destination.slug}
              className="group relative flex w-[86vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-3xl border border-white/20 bg-ink-950 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl sm:w-[48vw] lg:w-[380px]"
              style={{ minHeight: "530px" }}
            >
              {/* Background Photo */}
              <div className="absolute inset-0">
                <img
                  src={px(destination.imageId, 900, 1200)}
                  alt={`${destination.name} — ${destination.descriptor}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-ink-950/35" />
              </div>

              {/* Card Top: Region Badge & Starting Price */}
              <div className="relative z-10 flex items-center justify-between gap-3 p-5 sm:p-6">
                <Badge tone="light">
                  {destination.region === "International" ? "International" : "India"}
                </Badge>
                <span className="rounded-full border border-white/15 bg-ink-950/80 px-3 py-1 text-[11px] font-semibold text-gold-300 backdrop-blur-md">
                  From ₹{destination.startingPrice.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Card Bottom: Destination Info & Tagged Packages */}
              <div className="relative z-10 flex flex-col p-5 sm:p-6">
                {/* Title & Tagline */}
                <Link to={`/destinations/${destination.slug}`} className="group/head block">
                  <h3 className="text-[1.85rem] font-extrabold tracking-tight text-cream transition-colors group-hover/head:text-gold-300">
                    {destination.name}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-[13px] font-medium text-cream/75">
                    {destination.descriptor}
                  </p>
                </Link>

                {/* Tagged Packages Section */}
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-gold-400">
                      {countryPackages.length > 0
                        ? `Available Packages (${countryPackages.length})`
                        : "Custom Itineraries"}
                    </p>
                  </div>

                  {countryPackages.length > 0 ? (
                    countryPackages.map((pkg) => (
                      <Link
                        key={pkg.slug}
                        to={`/packages/${pkg.slug}`}
                        className="group/pkg flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/[0.08] px-3.5 py-2.5 backdrop-blur-md transition-all duration-300 hover:border-gold-400/90 hover:bg-gold-500/20"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                            <p className="truncate text-[13px] font-bold text-cream transition-colors group-hover/pkg:text-gold-200">
                              {cleanPackageName(pkg.name, destination.name)}
                            </p>
                          </div>
                          <div className="mt-0.5 flex items-center gap-2 pl-3.5 text-[11.5px] text-cream/65">
                            <span>{pkg.duration}</span>
                            <span>•</span>
                            <span className="font-semibold text-gold-300">{pkg.priceLabel}</span>
                          </div>
                        </div>

                        <span className="shrink-0 rounded-full border border-white/20 bg-white/10 p-1.5 text-cream/80 transition-all duration-300 group-hover/pkg:border-gold-400 group-hover/pkg:bg-gold-500 group-hover/pkg:text-ink-950">
                          <Icon name="arrow-right" className="h-3.5 w-3.5" />
                        </span>
                      </Link>
                    ))
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        openEnquiry(
                          { destination: destination.name },
                          `Inspiration · ${destination.name}`,
                        )
                      }
                      className="group/custom flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-left backdrop-blur-md transition-all duration-300 hover:border-gold-400/80 hover:bg-gold-500/15"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-bold text-cream group-hover/custom:text-gold-200">
                          Tailor-Made {destination.name} Trip
                        </p>
                        <p className="mt-0.5 text-[11.5px] text-cream/65">
                          Custom dates & private itineraries on request
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full border border-white/20 bg-white/10 p-1.5 text-cream/80 transition-all duration-300 group-hover/custom:border-gold-400 group-hover/custom:bg-gold-500 group-hover/custom:text-ink-950">
                        <Icon name="arrow-right" className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  )}
                </div>

                {/* Destination Hub Link */}
                <div className="mt-4 border-t border-white/10 pt-3">
                  <Link
                    to={`/destinations/${destination.slug}`}
                    className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-gold-300 transition-colors hover:text-gold-200"
                  >
                    Explore all {destination.name} details
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

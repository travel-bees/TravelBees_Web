import { useEffect, useState } from "react";
import { scrollToId, useRoute } from "../lib/router";
import { featuredPackages } from "../data/packages";
import { departures, departureFilters } from "../data/departures";
import { GroupTourCard } from "../components/GroupTourCard";
import { PackageCard } from "../components/PackageCard";
import { Button, Reveal, SectionHeading } from "../components/ui";
import { cn } from "../utils/cn";

const monthOrder = [
  "November",
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
];

export function FeaturedPackages() {
  return (
    <section id="featured-packages" className="bg-cream py-10">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Handpicked"
            title="Trips Worth Taking"
            subtitle="Handpicked journeys designed around unforgettable experiences."
          />
          <Reveal delay={160}>
            <Button href="/group-departures" variant="outline" size="md" icon="arrow-right">
              Browse group departures
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPackages.map((pkg, index) => (
            <Reveal key={pkg.slug} delay={index * 70} className="h-full">
              <PackageCard pkg={pkg} eager={index < 3} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-[12.5px] text-ink-700/50">
            * Prices shown are indicative starting prices per person on twin sharing, used here as
            placeholders. Final costing is confirmed once dates, hotels and flights are locked.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

interface GroupDeparturesProps {
  initialFilter?: string;
}
export function GroupDepartures() {
  const route = useRoute();

  const [filter, setFilter] = useState<string>(
    route.anchor || "Upcoming"
  );

  useEffect(() => {
    if (!route.anchor) return;

    setFilter(route.anchor);

    // Wait until the current render/hash navigation has completed
    setTimeout(() => {
      scrollToId("group-departures");
    }, 50);
  }, [route.anchor]);
  const visible = (() => {
    if (filter === "All") return departures;
    if (filter === "Upcoming") {
      return [...departures].sort(
        (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
      );
    }
    return departures.filter((departure) => departure.tripType === filter);
  })();

  return (
    <section id="group-departures" className="relative overflow-hidden bg-ink-900 py-10">
      <div
        className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #E09A34 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          tone="light"
          eyebrow="Explore our tours"
          title="Curated Experiences"
          subtitle="Thoughtfully designed journeys, from iconic destinations to wild adventures."
        />

        <Reveal delay={180}>
          <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1">
            {departureFilters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                className={cn(
                  "shrink-0 rounded-full border px-5 py-2.5 text-[13.5px] font-semibold transition-all duration-300",
                  filter === item
                    ? "border-gold-500 bg-gold-500 text-ink-950"
                    : "border-white/20 text-cream/75 hover:border-white/45 hover:text-cream",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((departure, index) => (
            <Reveal key={departure.id} delay={index * 70} className="h-full">
              <GroupTourCard departure={departure} />
            </Reveal>
          ))}
        </div>

        {/* <Reveal>
          <div className="mt-12 text-center items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-6">
            <p className="flex-1 text-[14.5px] leading-relaxed text-cream/70">
              Looking for a different date, or a private departure just for your group? We'll build one
              around you.
            </p>
            <Button className="mt-4" variant="primary" size="md" href="/custom-trip">
              Request a private departure
            </Button>
          </div>
        </Reveal> */}
      </div>
    </section>
  );
}

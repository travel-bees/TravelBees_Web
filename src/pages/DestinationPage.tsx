import { getDestination } from "../data/destinations";
import { packages } from "../data/packages";
import { site } from "../data/site";
import { useApp } from "../lib/app-context";
import { px, pxSrcSet } from "../lib/media";
import { useSeo } from "../lib/seo";
import { Icon } from "../components/Icon";
import { PackageCard } from "../components/PackageCard";
import { Badge, Button, Reveal, SectionHeading } from "../components/ui";
import { Link } from "../components/ui";

export function DestinationPage({ slug }: { slug: string }) {
  const destination = getDestination(slug);
  const { openEnquiry } = useApp();

  useSeo({
    title: destination
      ? `${destination.name} Holidays · From ₹${destination.startingPrice.toLocaleString("en-IN")} | Travelbees`
      : "Destination not found | Travelbees",
    description: destination
      ? `${destination.blurb} Plan a ${destination.name.toLowerCase()} holiday with Travelbees — itineraries, visas and stays handled.`
      : "This destination could not be found.",
    path: `/destinations/${slug}`,
    image: destination ? px(destination.imageId, 1200, 630) : undefined,
  });

  if (!destination) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center">
        <h1 className="text-4xl font-bold text-ink-900">Destination not found</h1>
        <p className="mt-4 text-ink-700/70">
          We may not have published this destination yet — but we can still plan it for you.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/inspiration" variant="primary" size="lg">
            Browse destinations
          </Button>
        </div>
      </div>
    );
  }

  const related = packages.filter(
    (pkg) =>
      pkg.destination.toLowerCase() === destination.name.toLowerCase() ||
      pkg.destination.toLowerCase().includes(destination.name.toLowerCase()),
  );

  const whatsappMessage = encodeURIComponent(
    `Hi Travelbees! I'd like to plan a trip to ${destination.name}.`,
  );

  return (
    <article className="bg-cream">
      <header className="relative isolate overflow-hidden">
        <img
          src={px(destination.imageId, 1920, 1200)}
          srcSet={pxSrcSet(destination.imageId, 1200)}
          sizes="100vw"
          alt={`${destination.name} — ${destination.descriptor}`}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/40" />

        <div className="relative mx-auto max-w-[1280px] px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
          <Link
            to="/inspiration"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-cream/70 transition-colors hover:text-cream"
          >
            <Icon name="chevron-left" className="h-4 w-4" />
            All destinations
          </Link>

          <div className="mt-6">
            <Badge tone="gold">{destination.region === "International" ? "International" : "India"}</Badge>
          </div>

          <h1 className="mt-5 text-[2.7rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-cream sm:text-6xl">
            {destination.name}
          </h1>
          <p className="mt-3 text-[17px] text-gold-200">{destination.descriptor}</p>

          <p className="mt-6 max-w-2xl text-[16.5px] leading-relaxed text-cream/75">
            {destination.blurb}
          </p>

          <div className="mt-9 flex flex-wrap items-end gap-x-10 gap-y-5">
            <div>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/50">
                Starting from
              </span>
              <span className="text-[2rem] font-extrabold tracking-tight text-gold-300">
                ₹{destination.startingPrice.toLocaleString("en-IN")}
              </span>
              <span className="ml-2 text-[13px] text-cream/55">per person*</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() =>
                  openEnquiry(
                    { destination: destination.name },
                    `Destination · ${destination.name}`,
                  )
                }
              >
                Plan This Trip
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                href={`${site.whatsappHref}?text=${whatsappMessage}`}
              >
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-ink-900/10 bg-white">
        <div className="mx-auto grid max-w-[1280px] gap-px bg-ink-900/10 px-5 sm:px-8 md:grid-cols-3">
          {[
            { label: "Best time to visit", value: destination.bestTime, icon: "calendar" as const },
            { label: "Ideal for", value: destination.idealFor, icon: "users" as const },
            {
              label: "Highlights",
              value: destination.highlights.join(" · "),
              icon: "sparkles" as const,
            },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 bg-white px-1 py-6 md:px-5">
              <Icon name={item.icon} className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold-600" />
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-700/50">
                  {item.label}
                </p>
                <p className="mt-1 text-[15px] font-semibold text-ink-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <SectionHeading
            eyebrow={`${destination.name} packages`}
            title={`Ways to travel to ${destination.name}`}
            subtitle="Ready-made itineraries, or a private version built around your dates."
          />

          {related.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((pkg, index) => (
                <Reveal key={pkg.slug} delay={index * 70} className="h-full">
                  <PackageCard pkg={pkg} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl border border-ink-900/10 bg-white p-8">
              <p className="text-[16px] leading-relaxed text-ink-700/75">
                We don't have a published package for {destination.name} yet, but we plan custom trips
                here regularly. Tell us your dates and we'll build one.
              </p>
              <div className="mt-6">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() =>
                    openEnquiry({ destination: destination.name }, `Destination · ${destination.name}`)
                  }
                >
                  Request an itinerary
                </Button>
              </div>
            </div>
          )}

          <p className="mt-8 text-[12.5px] text-ink-700/50">
            * Indicative starting price per person on twin sharing — placeholder figure shown for
            illustration.
          </p>
        </div>
      </section>
    </article>
  );
}

import { getPackage, packages } from "../data/packages";
import { site } from "../data/site";
import { useApp } from "../lib/app-context";
import { px, pxSrcSet } from "../lib/media";
import { useSeo } from "../lib/seo";
import { Icon } from "../components/Icon";
import { PackageCard } from "../components/PackageCard";
import { Badge, Button, Reveal, SectionHeading } from "../components/ui";
import { Link } from "../components/ui";
import { cn } from "../utils/cn";

export function PackagePage({ slug }: { slug: string }) {
  const pkg = getPackage(slug);
  const { openEnquiry } = useApp();

  useSeo({
    title: pkg ? `${pkg.name} · ${pkg.duration} from ${pkg.priceLabel} | Travelbees` : "Trip not found | Travelbees",
    description: pkg
      ? `${pkg.name} — ${pkg.duration} ${pkg.tripType}. ${pkg.description}`
      : "This trip could not be found.",
    path: `/packages/${slug}`,
    image: pkg ? px(pkg.imageId, 1200, 630) : undefined,
    type: "product",
    jsonLd: pkg
      ? {
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: pkg.name,
          description: pkg.description,
          touristType: pkg.styles.join(", "),
          offers: {
            "@type": "Offer",
            price: pkg.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: `${site.url}#/packages/${pkg.slug}`,
          },
          itinerary: {
            "@type": "ItemList",
            numberOfItems: pkg.itinerary.length,
            itemListElement: pkg.itinerary.map((day, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `${day.day}: ${day.title}`,
            })),
          },
          provider: { "@type": "TravelAgency", name: site.name },
        }
      : undefined,
  });

  if (!pkg) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center">
        <h1 className="text-4xl font-bold text-ink-900">Trip not found</h1>
        <p className="mt-4 text-ink-700/70">
          The trip you're looking for may have moved. Browse our featured journeys instead.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/group-departures" variant="primary" size="lg">
            Explore Trips
          </Button>
        </div>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hi Travelbees! I'm interested in the ${pkg.name} (${pkg.duration}). Could you share more details?`,
  );

  const quickInfo = [
    { label: "Duration", value: pkg.duration, icon: "clock" as const },
    { label: "Starting city", value: pkg.startingCity, icon: "plane" as const },
    { label: "Best time", value: pkg.bestTime, icon: "calendar" as const },
    { label: "Trip type", value: pkg.tripType, icon: "compass" as const },
    { label: "Group / private", value: pkg.styles.join(" · "), icon: "users" as const },
  ];

  const related = packages.filter((item) => item.slug !== pkg.slug).slice(0, 3);

  return (
    <article className="bg-cream pb-24 lg:pb-0">
      {/* Hero */}
      <header className="relative isolate overflow-hidden">
        <img
          src={px(pkg.imageId, 1920, 1200)}
          srcSet={pxSrcSet(pkg.imageId, 1200)}
          sizes="100vw"
          alt={`${pkg.name} — ${pkg.destination}`}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/45" />

        <div className="relative mx-auto max-w-[1280px] px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
          <Link
            to="/group-departures"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-cream/70 transition-colors hover:text-cream"
          >
            <Icon name="chevron-left" className="h-4 w-4" />
            Group departures
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge tone="gold">{pkg.duration}</Badge>
            <Badge tone="light">{pkg.category}</Badge>
            <Badge tone="light">{pkg.tripType}</Badge>
          </div>

          <h1 className="mt-5 max-w-3xl text-[2.6rem] font-extrabold leading-[1.03] tracking-[-0.035em] text-cream sm:text-6xl">
            {pkg.name}
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-cream/75">{pkg.tagline}</p>

          <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-5">
            <div>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/50">
                Starting from
              </span>
              <span className="text-[2.2rem] font-extrabold tracking-tight text-gold-300">
                {pkg.priceLabel}
              </span>
              <span className="ml-2 text-[13px] text-cream/55">per person*</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() =>
                  openEnquiry(
                    {
                      destination: pkg.destination,
                      tripType: pkg.styles[0] === "Safari" ? "Safari" : pkg.tripType.split("·")[0].trim(),
                    },
                    `Package · ${pkg.name}`,
                  )
                }
              >
                Enquire Now
              </Button>
              <Button variant="whatsapp" size="lg" href={`${site.whatsappHref}?text=${whatsappMessage}`}>
                WhatsApp Us
              </Button>
              <Button variant="light" size="lg" href={site.phoneHref}>
                Call Us
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Quick info */}
      <section aria-label="Quick information" className="border-b border-ink-900/10 bg-white">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <dl className="grid grid-cols-2 gap-px bg-ink-900/10 md:grid-cols-3 lg:grid-cols-5">
            {quickInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-3 bg-white px-5 py-6">
                <Icon name={item.icon} className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold-600" />
                <div>
                  <dt className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-700/50">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-[14.5px] font-semibold text-ink-900">{item.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
          <div>
            <Section id="overview" title="Overview">
              <p className="text-[16.5px] leading-relaxed text-ink-700/80">{pkg.overview}</p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {pkg.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 rounded-2xl border border-ink-900/10 bg-white px-4 py-3.5 text-[14.5px] text-ink-800"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500 text-ink-950">
                      <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="itinerary" title="Day-by-day itinerary">
              <ol className="relative space-y-0 border-l border-ink-900/15 pl-7">
                {pkg.itinerary.map((day) => (
                  <li key={day.day} className="relative pb-8 last:pb-0">
                    <span className="absolute -left-[38px] top-1 inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-cream bg-gold-500" />
                    <p className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-gold-600">
                      {day.day}
                    </p>
                    <h3 className="mt-1.5 text-[1.15rem] font-bold tracking-tight text-ink-900">
                      {day.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-700/75">
                      {day.description}
                    </p>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="inclusions" title="Inclusions">
              <List items={pkg.inclusions} tone="positive" />
            </Section>

            <Section id="exclusions" title="Exclusions">
              <List items={pkg.exclusions} tone="neutral" />
            </Section>

            <Section id="hotels" title="Hotels & accommodation">
              <div className="grid gap-4 sm:grid-cols-2">
                {pkg.hotels.map((hotel) => (
                  <div
                    key={hotel.city}
                    className="rounded-2xl border border-ink-900/10 bg-white p-5"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="text-[1.05rem] font-bold tracking-tight text-ink-900">
                        {hotel.city}
                      </h4>
                      <span className="text-[12.5px] font-semibold text-gold-600">
                        {hotel.nights}
                      </span>
                    </div>
                    <p className="mt-2 text-[14.5px] text-ink-700/75">{hotel.stay}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[12.5px] text-ink-700/50">
                Hotel categories are indicative. Equivalent properties may be substituted based on
                availability at the time of booking.
              </p>
            </Section>

            <Section id="experiences" title="Experiences">
              <div className="flex flex-wrap gap-2.5">
                {pkg.experiences.map((experience) => (
                  <span
                    key={experience}
                    className="rounded-full border border-ink-900/15 bg-white px-4 py-2.5 text-[14px] font-medium text-ink-800"
                  >
                    {experience}
                  </span>
                ))}
              </div>
            </Section>

            <Section id="important-info" title="Important information">
              <List items={pkg.importantInfo} tone="neutral" />
            </Section>

            <Section id="cancellation" title="Cancellation policy">
              <List items={pkg.cancellation} tone="neutral" />
              <p className="mt-4 text-[12.5px] text-ink-700/50">
                Summary shown for reference — the full cancellation policy is shared with your booking
                confirmation.
              </p>
            </Section>

            <Section id="faqs" title="FAQs">
              <div className="space-y-3">
                {pkg.faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group rounded-2xl border border-ink-900/10 bg-white px-5 py-4 open:shadow-soft"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-semibold text-ink-900">
                      {faq.q}
                      <Icon
                        name="chevron-down"
                        className="h-4 w-4 shrink-0 text-gold-600 transition-transform duration-300 group-open:rotate-180"
                      />
                    </summary>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-700/75">{faq.a}</p>
                  </details>
                ))}
              </div>
            </Section>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-5">
              <div className="rounded-3xl border border-ink-900/10 bg-white p-6 shadow-soft">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-700/50">
                  Starting from
                </span>
                <p className="mt-1.5 text-[2.1rem] font-extrabold tracking-tight text-ink-900">
                  {pkg.priceLabel}
                </p>
                <p className="text-[13px] text-ink-700/60">per person on twin sharing*</p>

                <div className="mt-6 space-y-2.5">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() =>
                      openEnquiry(
                        {
                          destination: pkg.destination,
                          tripType: pkg.tripType.split("·")[0].trim(),
                        },
                        `Package sidebar · ${pkg.name}`,
                      )
                    }
                  >
                    Enquire Now
                  </Button>
                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="w-full"
                    href={`${site.whatsappHref}?text=${whatsappMessage}`}
                  >
                    Enquire on WhatsApp
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" href={site.phoneHref}>
                    Call {site.phone}
                  </Button>
                </div>
              </div>

              <div className="rounded-3xl bg-ink-900 p-6 text-cream">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300">
                  Talk to a travel expert
                </p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-cream/75">
                  Not sure this is the right fit? Tell us your dates and budget and we'll suggest the
                  trip that actually works.
                </p>
                <div className="mt-5 space-y-2.5 text-[14px]">
                  <a href={site.phoneHref} className="flex items-center gap-2.5 hover:text-gold-300">
                    <Icon name="phone" className="h-4 w-4 text-gold-400" />
                    {site.phone}
                  </a>
                  <a
                    href={site.emailHref}
                    className="flex items-center gap-2.5 hover:text-gold-300"
                  >
                    <Icon name="mail" className="h-4 w-4 text-gold-400" />
                    {site.email}
                  </a>
                  <p className="flex items-center gap-2.5 text-cream/60">
                    <Icon name="clock" className="h-4 w-4 text-gold-400" />
                    {site.hours}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-ink-900/10 bg-white p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-700/50">
                  Included at a glance
                </p>
                <ul className="mt-4 space-y-2.5">
                  {pkg.inclusions.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13.5px] text-ink-700/80">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related */}
      <section className="border-t border-ink-900/10 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <SectionHeading eyebrow="You may also like" title="More trips worth taking" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 70} className="h-full">
                <PackageCard pkg={item} />
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-[12.5px] text-ink-700/50">
            * Indicative starting price per person on twin sharing — placeholder figure shown for
            illustration. Final quote is confirmed once dates and hotels are selected.
          </p>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2.5 border-t border-ink-900/10 bg-cream/95 px-4 py-3 backdrop-blur-lg lg:hidden">
        <Button
          variant="primary"
          size="md"
          className="flex-1"
          onClick={() =>
            openEnquiry(
              { destination: pkg.destination, tripType: pkg.tripType.split("·")[0].trim() },
              `Package mobile CTA · ${pkg.name}`,
            )
          }
        >
          Enquire Now
        </Button>
        <Button
          variant="whatsapp"
          size="md"
          className="flex-1"
          href={`${site.whatsappHref}?text=${whatsappMessage}`}
        >
          Enquire on WhatsApp
        </Button>
      </div>
    </article>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-ink-900/10 py-10 first:border-t-0 first:pt-0">
      <h2 className="mb-6 text-[1.7rem] font-bold tracking-tight text-ink-900 sm:text-[2rem]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function List({
  items,
  tone,
}: {
  items: string[];
  tone: "positive" | "neutral";
}) {
  return (
    <ul className="grid gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-800/85">
          <Icon
            name="check"
            className={cn(
              "mt-1 h-4 w-4 shrink-0",
              tone === "positive" ? "text-gold-600" : "text-ink-500",
            )}
            strokeWidth={2.6}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

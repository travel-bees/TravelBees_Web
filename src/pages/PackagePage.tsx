import { useState } from "react";
import { getPackage, packages } from "../data/packages";
import { site } from "../data/site";
import { useApp } from "../lib/app-context";
import { px, pxSrcSet } from "../lib/media";
import { useSeo } from "../lib/seo";
import { Icon } from "../components/Icon";
import { PackageCard } from "../components/PackageCard";
import { Button } from "../components/ui";
import { Link } from "../components/ui";
import { cn } from "../utils/cn";

export function PackagePage({ slug }: { slug: string }) {
  const pkg = getPackage(slug);
  const { openEnquiry } = useApp();

  // Accordion state for itinerary days
  const [openDays, setOpenDays] = useState<Record<string, boolean>>({
    "Day 01": true,
    "Day 1": true,
  });

  // Policy accordions state
  const [openPolicies, setOpenPolicies] = useState<{ cancellation: boolean; terms: boolean }>({
    cancellation: true,
    terms: false,
  });

  // Quick Enquiry Form state
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

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
    `Hi Travelbees! I'm interested in the ${pkg.name} (${pkg.duration}). Please share details and departure dates.`,
  );

  const toggleDay = (dayKey: string) => {
    setOpenDays((prev) => ({ ...prev, [dayKey]: !prev[dayKey] }));
  };

  const toggleAllDays = (expand: boolean) => {
    const next: Record<string, boolean> = {};
    pkg.itinerary.forEach((d) => {
      next[d.day] = expand;
    });
    setOpenDays(next);
  };

  const allDaysExpanded = pkg.itinerary.every((d) => openDays[d.day]);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) return;
    setFormSubmitted(true);
  };

  // Gallery images (Main + 4 thumbnails)
  const gallery = [pkg.imageId, ...(pkg.galleryIds || [])];
  const mainImage = gallery[0];
  const thumb1 = gallery[1] || gallery[0];
  const thumb2 = gallery[2] || gallery[0];
  const thumb3 = gallery[3] || gallery[1] || gallery[0];
  const thumb4 = gallery[4] || gallery[2] || gallery[0];

  const related = packages.filter((item) => item.slug !== pkg.slug).slice(0, 3);

  // Default Things to Carry
  const thingsToCarry = [
    "Valid passport with at least 6 months validity & required visa",
    "Physical photocopies of passport, visa & round-trip flight tickets",
    "Mobile phone, charger & high-capacity power bank",
    "Universal travel adapter plug",
    "International debit/credit cards & local currency cash",
    "Comfortable walking shoes & light casual sightseeing clothing",
    "Swimwear, beach towels & change of clothes for water sports",
    "Personal medication, basic first-aid & sunscreen lotion",
  ];

  return (
    <div className="bg-ink-950 text-cream min-h-screen pb-24 lg:pb-16">
      {/* Top Bar with Back Button */}
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-3 sm:px-6 sm:pt-32 flex justify-between items-center">
        <Link
          to="/group-departures"
          className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors"
        >
          <Icon name="chevron-left" className="h-4 w-4" />
          Back to Packages
        </Link>
        <span className="text-xs text-cream/50 uppercase tracking-widest hidden sm:inline-block">
          {pkg.destination} · {pkg.tripType}
        </span>
      </div>

      {/* Hero Section with 5-Photo Collage Grid */}
      <section className="mx-auto max-w-7xl px-4 pt-2 pb-6 sm:px-6">
        <div className="relative">
          <div className="grid grid-cols-4 grid-rows-2 gap-2 md:gap-3 aspect-[16/10] sm:aspect-[21/9] rounded-3xl overflow-hidden border border-gold-500/20 shadow-2xl shadow-black/80 bg-ink-900">
            {/* Big Main Left Photo */}
            <div className="relative col-span-2 row-span-2 overflow-hidden group">
              <img
                src={px(mainImage, 1400, 1000)}
                srcSet={pxSrcSet(mainImage, 1000)}
                alt={`${pkg.name} main view`}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
            </div>

            {/* 4 Smaller Thumbnail Photos on Right */}
            <div className="relative col-span-1 row-span-1 overflow-hidden group">
              <img
                src={px(thumb1, 700, 500)}
                alt={`${pkg.name} thumbnail 1`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="relative col-span-1 row-span-1 overflow-hidden group">
              <img
                src={px(thumb2, 700, 500)}
                alt={`${pkg.name} thumbnail 2`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="relative col-span-1 row-span-1 overflow-hidden group">
              <img
                src={px(thumb3, 700, 500)}
                alt={`${pkg.name} thumbnail 3`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="relative col-span-1 row-span-1 overflow-hidden group">
              <img
                src={px(thumb4, 700, 500)}
                alt={`${pkg.name} thumbnail 4`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          </div>

          {/* Title Overlay Banner on Gallery Bottom */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent rounded-b-3xl px-5 sm:px-8 py-5">
            <h1 className="text-xl sm:text-3xl font-extrabold text-cream tracking-tight">
              {pkg.name}{" "}
              <span className="text-gold-300 font-semibold text-sm sm:text-lg block sm:inline-block sm:ml-2">
                · {pkg.duration}
              </span>
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-cream/70 line-clamp-1">{pkg.tagline}</p>
          </div>
        </div>

        {/* Quick Info Badges Bar */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-5">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.06] border border-gold-500/20 rounded-full text-gold-300 text-xs sm:text-sm font-medium">
            <Icon name="clock" className="w-3.5 h-3.5 text-gold-400" />
            {pkg.duration}
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.06] border border-gold-500/20 rounded-full text-gold-300 text-xs sm:text-sm font-medium">
            <Icon name="pin" className="w-3.5 h-3.5 text-gold-400" />
            {pkg.destination} ({pkg.hotels.map((h) => h.city).join(", ")})
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.06] border border-gold-500/20 rounded-full text-gold-300 text-xs sm:text-sm font-medium">
            <Icon name="users" className="w-3.5 h-3.5 text-gold-400" />
            Max 25 People · Group &amp; Private
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.06] border border-gold-500/20 rounded-full text-gold-300 text-xs sm:text-sm font-medium">
            <Icon name="plane" className="w-3.5 h-3.5 text-gold-400" />
            {pkg.startingCity} Departure
          </span>
        </div>
      </section>

      {/* Main Content Layout: Left 2 Cols + Right 1 Col Sidebar */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-9">
            {/* Itinerary Section with Expandable Accordions */}
            <section id="itinerary">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                  <span className="w-1.5 h-6 bg-gold-500 rounded-sm inline-block" />
                  Day-by-Day Itinerary
                </h2>
                <button
                  type="button"
                  onClick={() => toggleAllDays(!allDaysExpanded)}
                  className="text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors cursor-pointer"
                >
                  {allDaysExpanded ? "Collapse All" : "Expand All"}
                </button>
              </div>

              <div className="space-y-3">
                {pkg.itinerary.map((day) => {
                  const isOpen = !!openDays[day.day];
                  return (
                    <div
                      key={day.day}
                      className="rounded-2xl overflow-hidden border border-gold-500/20 bg-white/[0.04] transition-all duration-300 hover:border-gold-500/40"
                    >
                      <button
                        type="button"
                        onClick={() => toggleDay(day.day)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer transition-colors hover:bg-gold-500/[0.05]"
                      >
                        <span className="font-semibold text-cream text-[15px] sm:text-[16px] flex items-center gap-2.5">
                          <span className="text-gold-400 font-bold tracking-wider">{day.day}</span>
                          <span className="text-cream/40">·</span>
                          <span>{day.title}</span>
                        </span>
                        <Icon
                          name="chevron-down"
                          className={cn(
                            "w-4 h-4 text-gold-400 shrink-0 transition-transform duration-300",
                            isOpen && "rotate-180",
                          )}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 border-t border-white/5 space-y-3.5">
                          <p className="text-[14.5px] leading-relaxed text-cream/80">
                            {day.description}
                          </p>

                          {/* Quick details */}
                          <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20">
                              <Icon name="utensils" className="w-3 h-3 text-gold-400" />
                              Breakfast Included
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-cream/75 border border-white/10">
                              <Icon name="hotel" className="w-3 h-3 text-gold-400" />
                              Hotel Stay Included
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Trip Overview Card */}
            <section className="bg-white/[0.04] rounded-2xl p-6 border border-white/10 space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                <Icon name="compass" className="w-5 h-5 text-gold-400" />
                Trip Overview
              </h2>
              <p className="text-cream/80 text-[15px] leading-relaxed whitespace-pre-line">
                {pkg.overview}
              </p>
            </section>

            {/* 3 Key Feature Cards Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="bg-white/[0.04] rounded-2xl p-4 text-center border border-white/10 hover:border-gold-500/40 transition-colors">
                <div className="w-10 h-10 mx-auto mb-2.5 rounded-full bg-gold-500/10 flex items-center justify-center">
                  <Icon name="hotel" className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-cream/50 mb-1">
                  Accommodation
                </h3>
                <p className="text-cream font-medium text-xs sm:text-sm">
                  {pkg.hotels[0]?.stay || "3★ / 4★ Hotels (Twin Sharing)"}
                </p>
              </div>

              <div className="bg-white/[0.04] rounded-2xl p-4 text-center border border-white/10 hover:border-gold-500/40 transition-colors">
                <div className="w-10 h-10 mx-auto mb-2.5 rounded-full bg-gold-500/10 flex items-center justify-center">
                  <Icon name="car" className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-cream/50 mb-1">
                  Transfers
                </h3>
                <p className="text-cream font-medium text-xs sm:text-sm">
                  Private AC vehicles for all airport &amp; sightseeing
                </p>
              </div>

              <div className="bg-white/[0.04] rounded-2xl p-4 text-center border border-white/10 hover:border-gold-500/40 transition-colors">
                <div className="w-10 h-10 mx-auto mb-2.5 rounded-full bg-gold-500/10 flex items-center justify-center">
                  <Icon name="utensils" className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-cream/50 mb-1">
                  Meals
                </h3>
                <p className="text-cream font-medium text-xs sm:text-sm">
                  Daily breakfasts + meals as per itinerary
                </p>
              </div>
            </section>

            {/* Trip Highlights */}
            <section className="bg-white/[0.04] rounded-2xl p-6 border border-white/10">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2.5">
                <Icon name="sparkles" className="w-5 h-5 text-gold-400" />
                Trip Highlights
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {pkg.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5 text-cream/80 text-[14px]">
                    <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Side-by-side Inclusions & Exclusions */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Inclusions */}
              <div className="bg-emerald-950/20 rounded-2xl p-6 border border-emerald-500/25">
                <h3 className="text-base sm:text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                  <Icon name="check" className="w-4 h-4 text-emerald-400" />
                  Inclusions
                </h3>
                <ul className="space-y-2.5">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-cream/80 text-[13.5px]">
                      <Icon name="check" className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-rose-950/20 rounded-2xl p-6 border border-rose-500/25">
                <h3 className="text-base sm:text-lg font-bold text-rose-400 mb-4 flex items-center gap-2">
                  <Icon name="x" className="w-4 h-4 text-rose-400" />
                  Exclusions
                </h3>
                <ul className="space-y-2.5">
                  {pkg.exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-cream/80 text-[13.5px]">
                      <Icon name="x" className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Things to Carry Checklist */}
            <section className="bg-white/[0.04] rounded-2xl p-6 border border-gold-500/20">
              <h3 className="text-lg font-bold text-gold-400 mb-4 flex items-center gap-2.5">
                <Icon name="backpack" className="w-5 h-5 text-gold-400" />
                Things to Carry
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
                {thingsToCarry.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-cream/80 text-[13.5px]">
                    <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Hotels & Stays Breakdown */}
            <section className="bg-white/[0.04] rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
                <Icon name="hotel" className="w-5 h-5 text-gold-400" />
                Hotels &amp; Accommodation
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {pkg.hotels.map((hotel) => (
                  <div
                    key={hotel.city}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-bold text-cream text-[15px]">{hotel.city}</h4>
                      <span className="text-xs font-semibold text-gold-400">{hotel.nights}</span>
                    </div>
                    <p className="mt-1.5 text-xs text-cream/70">{hotel.stay}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Policies Accordions */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5 mb-4">
                <Icon name="shield" className="w-5 h-5 text-gold-400" />
                Policies &amp; Guidelines
              </h2>

              {/* Cancellation Policy */}
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04]">
                <button
                  type="button"
                  onClick={() =>
                    setOpenPolicies((prev) => ({ ...prev, cancellation: !prev.cancellation }))
                  }
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-white/[0.02]"
                >
                  <span className="font-semibold text-cream text-sm sm:text-base">
                    Cancellation &amp; Refund Policy
                  </span>
                  <Icon
                    name="chevron-down"
                    className={cn(
                      "w-4 h-4 text-gold-400 shrink-0 transition-transform",
                      openPolicies.cancellation && "rotate-180",
                    )}
                  />
                </button>
                {openPolicies.cancellation && (
                  <div className="px-5 pb-5 pt-1 border-t border-white/5 space-y-2">
                    <ul className="space-y-1.5">
                      {pkg.cancellation.map((rule) => (
                        <li key={rule} className="text-xs sm:text-sm text-cream/75 flex items-start gap-2">
                          <span className="text-gold-400">•</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Terms & Important Information */}
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04]">
                <button
                  type="button"
                  onClick={() =>
                    setOpenPolicies((prev) => ({ ...prev, terms: !prev.terms }))
                  }
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-white/[0.02]"
                >
                  <span className="font-semibold text-cream text-sm sm:text-base">
                    Terms, Visa &amp; Immigration Rules
                  </span>
                  <Icon
                    name="chevron-down"
                    className={cn(
                      "w-4 h-4 text-gold-400 shrink-0 transition-transform",
                      openPolicies.terms && "rotate-180",
                    )}
                  />
                </button>
                {openPolicies.terms && (
                  <div className="px-5 pb-5 pt-1 border-t border-white/5 space-y-2">
                    <ul className="space-y-1.5">
                      {pkg.importantInfo.map((info) => (
                        <li key={info} className="text-xs sm:text-sm text-cream/75 flex items-start gap-2">
                          <span className="text-gold-400">•</span>
                          <span>{info}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* FAQs Accordion */}
            {pkg.faqs && pkg.faqs.length > 0 && (
              <section className="bg-white/[0.04] rounded-2xl p-6 border border-white/10">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-2.5">
                  {pkg.faqs.map((faq) => (
                    <details
                      key={faq.q}
                      className="group rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 open:bg-white/[0.05]"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-cream">
                        {faq.q}
                        <Icon
                          name="chevron-down"
                          className="h-3.5 w-3.5 shrink-0 text-gold-400 transition-transform duration-300 group-open:rotate-180"
                        />
                      </summary>
                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-cream/75">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Sidebar with Pricing, CTAs & Inline Enquiry Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-gradient-to-b from-ink-950 via-ink-900 to-black border border-gold-500/25 rounded-3xl p-6 shadow-2xl shadow-black/80 space-y-5">
              {/* Pricing Box */}
              <div className="pb-4 border-b border-white/10">
                <span className="text-cream/50 text-[11px] uppercase tracking-wider font-semibold">
                  Starting From
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-gold-300 via-gold-400 to-amber-500 bg-clip-text text-transparent">
                    {pkg.priceLabel}
                  </span>
                </div>
                <p className="text-cream/60 text-xs mt-1">per person on twin sharing</p>
              </div>

              {/* Next Departure Dates */}
              <div className="pb-4 border-b border-white/10">
                <span className="text-cream/50 text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1.5 mb-1.5">
                  <Icon name="calendar" className="w-3.5 h-3.5 text-gold-400" />
                  Departure Dates
                </span>
                <p className="text-cream text-xs sm:text-sm font-medium">
                  Multiple upcoming dates available or custom on request.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() =>
                    openEnquiry(
                      {
                        destination: pkg.destination,
                        tripType: pkg.tripType.split("·")[0].trim(),
                      },
                      `Package · ${pkg.name}`,
                    )
                  }
                  className="w-full bg-gradient-to-r from-gold-500 via-gold-400 to-amber-500 text-ink-950 py-3.5 rounded-xl font-bold text-base hover:from-gold-400 hover:to-amber-400 transition-all shadow-lg shadow-gold-500/20 block text-center cursor-pointer hover:scale-[1.02]"
                >
                  Book Now
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-gold-500/30 text-gold-300 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer"
                >
                  <Icon name="download" className="w-4 h-4" />
                  Download Itinerary
                </button>

                <a
                  href={`${site.whatsappHref}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-md shadow-[#25D366]/20 hover:scale-[1.02]"
                >
                  <Icon name="whatsapp" className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>

              {/* Trust badges */}
              <div className="text-center text-cream/55 text-xs py-1">
                <span className="text-gold-400">✦</span> Free cancellation options
                <span className="text-gold-400 mx-1.5">✦</span> 24/7 Support
              </div>

              {/* Embedded Quick Enquiry Form */}
              <div className="border-t border-white/10 pt-4">
                <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-gold-500 rounded-sm inline-block" />
                  Quick Enquiry
                </h4>
                <p className="text-cream/50 text-[11px] mb-3 truncate">{pkg.name}</p>

                {formSubmitted ? (
                  <div className="rounded-xl bg-gold-500/15 border border-gold-400/40 p-4 text-center">
                    <p className="text-xs font-bold text-gold-300">Enquiry Received!</p>
                    <p className="mt-1 text-[11px] text-cream/80">
                      Our travel specialist will reach out to you within 2 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-2.5">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/[0.06] border border-white/15 rounded-lg px-3 py-2 text-white text-xs placeholder:text-cream/40 focus:outline-none focus:border-gold-500"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/[0.06] border border-white/15 rounded-lg px-3 py-2 text-white text-xs placeholder:text-cream/40 focus:outline-none focus:border-gold-500"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full bg-white/[0.06] border border-white/15 rounded-lg px-3 py-2 text-white text-xs placeholder:text-cream/40 focus:outline-none focus:border-gold-500"
                    />
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-gold-500 to-amber-500 text-ink-950 py-2 rounded-lg font-bold text-xs hover:from-gold-400 hover:to-amber-400 transition-all cursor-pointer shadow-md"
                    >
                      Submit Enquiry
                    </button>
                  </form>
                )}
              </div>

              {/* Need Help Box */}
              <div className="border-t border-white/10 pt-4 text-xs text-cream/70 space-y-1">
                <p className="font-semibold text-cream">Need immediate help?</p>
                <p>
                  Call{" "}
                  <a href={site.phoneHref} className="text-gold-400 hover:underline">
                    {site.phone}
                  </a>{" "}
                  or email{" "}
                  <a href={site.emailHref} className="text-gold-400 hover:underline">
                    {site.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Packages Carousel */}
      <section className="border-t border-white/10 py-16 sm:py-20 bg-ink-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-gold-400 text-xs uppercase tracking-widest font-semibold mb-1">
                Explore More
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-cream">
                Other Trips Worth Taking
              </h2>
            </div>
            <Link
              to="/group-departures"
              className="text-gold-400 hover:text-gold-300 text-sm font-semibold inline-flex items-center gap-1.5"
            >
              View all trips →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <PackageCard key={item.slug} pkg={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bottom CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2.5 border-t border-white/10 bg-ink-950/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex-1">
          <span className="block text-[10px] uppercase tracking-wider text-cream/50 font-semibold">
            Price
          </span>
          <span className="text-base font-extrabold text-gold-400">{pkg.priceLabel}</span>
        </div>
        <button
          type="button"
          onClick={() =>
            openEnquiry(
              { destination: pkg.destination, tripType: pkg.tripType.split("·")[0].trim() },
              `Package mobile CTA · ${pkg.name}`,
            )
          }
          className="flex-1 bg-gradient-to-r from-gold-500 to-amber-500 text-ink-950 py-2.5 px-4 rounded-xl font-bold text-xs text-center shadow-md cursor-pointer"
        >
          Book Now
        </button>
        <a
          href={`${site.whatsappHref}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Enquiry"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-md"
        >
          <Icon name="whatsapp" className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

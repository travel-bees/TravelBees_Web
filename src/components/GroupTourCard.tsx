import type { GroupDeparture } from "../data/types";
import { px, pxSrcSet } from "../lib/media";
import { Badge, Button } from "./ui";
import { site } from "../data/site";
import { Icon } from "./Icon";

const badgeTone: Record<string, "gold" | "danger" | "light"> = {
  "Limited Seats": "danger",
  "Early Bird": "gold",
  Popular: "light",
};

export function GroupTourCard({ departure }: { departure: GroupDeparture }) {
  const href = departure.packageSlug
    ? `/packages/${departure.packageSlug}`
    : "/group-departures";

  const whatsappMessage = `Hi Travelbees! I'm interested in the ${departure.destination} group tour. Please share the itinerary, pricing and available dates.`;

  const whatsappLink = `${site.whatsappHref}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/40 hover:bg-white/[0.07]">
      <div className="relative aspect-[16/11] overflow-hidden">
        <img
          src={px(departure.imageId, 900, 620)}
          srcSet={pxSrcSet(departure.imageId, 620)}
          sizes="(max-width: 768px) 100vw, 33vw"
          alt={`${departure.destination} group departure`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />

        {departure.badge && (
          <div className="absolute left-4 top-4">
            <Badge tone={badgeTone[departure.badge]}>
              {departure.badge}
            </Badge>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div>
            <h3 className="text-[1.35rem] font-bold leading-tight tracking-tight text-cream">
              {departure.destination}
            </h3>
            <p className="text-[12.5px] text-cream/65">
              {departure.country}
            </p>
          </div>

          <span className="rounded-full bg-ink-950/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-300 backdrop-blur-sm">
            {departure.tripType}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-cream/45">
              Departure
            </dt>
            <dd className="mt-1 text-[15px] font-semibold text-cream">
              {departure.departureDate}
            </dd>
          </div>

          <div>
            <dt className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-cream/45">
              Duration
            </dt>
            <dd className="mt-1 text-[15px] font-semibold text-cream">
              {departure.duration}
            </dd>
          </div>

          <div>
            <dt className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-cream/45">
              Trip type
            </dt>
            <dd className="mt-1 text-[15px] font-semibold text-cream">
              {departure.tripType}
            </dd>
          </div>

          <div>
            <dt className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-cream/45">
              Starting from
            </dt>
            <dd className="mt-1 text-[15px] font-semibold text-gold-300">
              ₹{departure.price.toLocaleString("en-IN")}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
          <Button
            href={href}
            size="sm"
            variant="primary"
            className="flex-1"
          >
            View Details
          </Button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${departure.destination} on WhatsApp`}
            className="flex h-10 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition-all hover:scale-[1.04] hover:bg-[#1ebe5b]"
          >
            <Icon name="whatsapp" className="h-5 w-5" />
          </a>
        </div>
      </div>
    </article>
  );
}
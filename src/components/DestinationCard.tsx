import type { Destination } from "../data/types";
import { px, pxSrcSet } from "../lib/media";
import { Button } from "./ui";

export function DestinationCard({
  destination,
  eager = false,
}: {
  destination: Destination;
  eager?: boolean;
}) {
  return (
    <article className="group relative block overflow-hidden rounded-3xl bg-ink-900">
      <div className="aspect-[3/4] sm:aspect-[4/5]">
        <img
          src={px(destination.imageId, 900, 1125)}
          srcSet={pxSrcSet(destination.imageId, 1125)}
          sizes="(max-width: 768px) 88vw, 30vw"
          alt={`${destination.name} — ${destination.descriptor}`}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.12]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300">
          {destination.region === "International" ? "International" : "India"}
        </p>
        <h3 className="mt-2 text-[1.7rem] font-bold leading-tight tracking-tight text-cream">
          {destination.name}
        </h3>
        <p className="mt-1 text-[13.5px] text-cream/70">{destination.descriptor}</p>

        <div className="pt-3 lg:hidden">
          {destination.isComingSoon ? (
            <span className="inline-flex rounded-full border border-gold-400/40 bg-gold-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-gold-300">
              Coming Soon
            </span>
          ) : (
            <span className="inline-flex rounded-full bg-gold-500 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-950">
              Explore
            </span>
          )}
        </div>

        <div className="hidden lg:grid lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-500 lg:ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:max-h-40 lg:group-hover:opacity-100">
          <div className="pt-4">
            <div className="flex flex-wrap gap-1.5">
              {destination.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-white/20 px-2.5 py-1 text-[11px] text-cream/80"
                >
                  {highlight}
                </span>
              ))}
            </div>
            <div className="mt-4">
              {destination.isComingSoon ? (
                <span className="inline-flex items-center rounded-full border border-gold-400/40 bg-gold-500/20 px-4 py-1.5 text-[11.5px] font-bold uppercase tracking-wider text-gold-300">
                  Coming Soon
                </span>
              ) : (
                <Button href={`/destinations/${destination.slug}`} size="sm" variant="primary">
                  Explore {destination.name}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

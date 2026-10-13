import type { TravelPackage } from "../data/types";
import { px, pxSrcSet } from "../lib/media";
import { Badge, Button } from "./ui";

export function PackageCard({ pkg, eager = false }: { pkg: TravelPackage; eager?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/10 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={px(pkg.imageId, 900, 675)}
          srcSet={pxSrcSet(pkg.imageId, 675)}
          sizes="(max-width: 768px) 100vw, 33vw"
          alt={`${pkg.name} — ${pkg.destination}`}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/65 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge tone="gold">{pkg.duration}</Badge>
        </div>
        <div className="absolute right-4 top-4">
          <Badge tone="light">{pkg.category}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.45rem] font-bold leading-tight tracking-tight text-ink-900">
          {pkg.name}
        </h3>
        <p className="mt-1.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-gold-600">
          {pkg.tagline}
        </p>
        <p className="mt-3.5 line-clamp-3 text-[14.5px] leading-relaxed text-ink-700/75">
          {pkg.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12.5px] font-medium text-ink-700/65">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            {pkg.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-ink-500" />
            {pkg.tripType.split("·")[0].trim()}
          </span>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4 border-t border-ink-900/10 pt-5">
          <div>
            <span className="block text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-700/50">
              Starting from
            </span>
            <span className="text-[1.6rem] font-extrabold tracking-tight text-ink-900">
              {pkg.priceLabel}
            </span>
          </div>
          <Button href={`/packages/${pkg.slug}`} size="sm" variant="dark" icon="arrow-right">
            View Trip
          </Button>
        </div>
      </div>
    </article>
  );
}

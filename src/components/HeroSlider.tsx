import { useCallback, useEffect, useRef, useState } from "react";
import { promotions } from "../data/promotions";
import { px, pxSrcSet } from "../lib/media";
import { Icon } from "./Icon";
import { Button } from "./ui";

const AUTOPLAY_MS = 6500;

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = promotions.length;

  const goTo = useCallback(
    (index: number) => setActive(((index % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused || count <= 1) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % count), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  // Pause when the tab is hidden, resume when it returns
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Upcoming trips"
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
        setPaused(true);
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 56) goTo(active + (delta < 0 ? 1 : -1));
        touchStartX.current = null;
        setPaused(false);
      }}
    >
      {/* Slides */}
      {promotions.map((promo, index) => (
        <div
          key={promo.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${count}`}
          aria-hidden={index !== active}
          className={`absolute inset-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={px(promo.imageId, 1920, 1200)}
            srcSet={pxSrcSet(promo.imageId, 1200)}
            sizes="100vw"
            alt={promo.title}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : undefined}
            decoding="async"
            className={`h-full w-full object-cover ${
              index === active ? "ken-burns" : "scale-105"
            }`}
          />
          {/* Promo text card */}
          <div
            className={`absolute bottom-0 right-0 max-w-md p-5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-8 lg:bottom-10 lg:right-10 ${
              index === active
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <div className="rounded-3xl border border-white/15 bg-ink-950/70 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-gold-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                  {promo.label}
                </p>
                <p className="text-[11px] font-semibold text-cream/50">
                  {index + 1} / {count}
                </p>
              </div>

              <h2 className="mt-3 text-[1.35rem] font-bold leading-snug tracking-tight text-cream sm:text-[1.55rem]">
                {promo.title}
              </h2>
              <p className="mt-2.5 line-clamp-3 text-[13.5px] leading-relaxed text-cream/70">
                {promo.blurb}
              </p>

              <dl className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12.5px] font-medium text-cream/75">
                <dd className="inline-flex items-center gap-1.5">
                  <Icon name="calendar" className="h-3.5 w-3.5 text-gold-400" />
                  {promo.date}
                </dd>
                <dd className="inline-flex items-center gap-1.5">
                  <Icon name="clock" className="h-3.5 w-3.5 text-gold-400" />
                  {promo.duration}
                </dd>
                <dd className="inline-flex items-center gap-1.5">
                  <Icon name="wallet" className="h-3.5 w-3.5 text-gold-400" />
                  {promo.price}
                </dd>
              </dl>

              <div className="mt-5">
                <Button href={promo.href} variant="primary" size="md" icon="arrow-right" className="w-full sm:w-auto">
                  View Trip
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls: arrows (desktop) + slide indicators, stacked above the promo card on mobile */}
      <div className="absolute bottom-[22rem] left-5 right-5 z-10 flex items-center gap-4 sm:left-8 lg:bottom-8">
        <div className="hidden gap-2.5 lg:flex">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Previous trip"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-cream backdrop-blur-sm transition-all duration-300 hover:border-gold-400 hover:bg-gold-500 hover:text-ink-950"
          >
            <Icon name="chevron-left" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Next trip"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-cream backdrop-blur-sm transition-all duration-300 hover:border-gold-400 hover:bg-gold-500 hover:text-ink-950"
          >
            <Icon name="chevron-right" className="h-5 w-5" />
          </button>
        </div>

        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Choose promoted trip"
        >
          {promotions.map((promo, index) => (
            <button
              key={promo.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Slide ${index + 1}: ${promo.title}`}
              onClick={() => goTo(index)}
              className="group flex h-6 items-center"
            >
              <span
                className={`relative block h-1.5 overflow-hidden rounded-full transition-all duration-500 ${
                  index === active ? "w-12 bg-white/25" : "w-5 bg-white/30 group-hover:bg-white/60"
                }`}
              >
                {index === active && (
                  <span
                    key={`progress-${active}-${paused}`}
                    className="hero-progress absolute inset-y-0 left-0 rounded-full bg-gold-400"
                    style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

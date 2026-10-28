import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { promotions } from "../data/promotions";
import { px, pxSrcSet } from "../lib/media";
import { Icon } from "./Icon";

const AUTOPLAY_MS = 2000;

interface HeroSliderProps {
  children?: ReactNode;
}

export function HeroSlider({ children }: HeroSliderProps) {
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
      aria-label="Hero slider"
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
            index === active ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={px(promo.imageId, 1920, 1200)}
            srcSet={pxSrcSet(promo.imageId, 1200)}
            sizes="100vw"
            alt={promo.title || `Travelbees Hero Slide ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : undefined}
            decoding="async"
            className={`h-full w-full object-cover object-[center_22%] sm:object-top origin-center sm:origin-top ${
              index === active ? "ken-burns" : "scale-100"
            }`}
          />
        </div>
      ))}

      {/* Subtle overlay to highlight images while keeping navbar and controls legible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent via-40% to-ink-950/80 sm:from-ink-950/35 sm:to-ink-950/75" />

      {/* Navigation arrows (desktop & tablet) */}
      <button
        type="button"
        onClick={() => goTo(active - 1)}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 hidden sm:inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-cream backdrop-blur-md bg-ink-950/30 transition-all duration-300 hover:border-gold-400 hover:bg-gold-500 hover:text-ink-950 cursor-pointer shadow-lg"
      >
        <Icon name="chevron-left" className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => goTo(active + 1)}
        aria-label="Next slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 hidden sm:inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-cream backdrop-blur-md bg-ink-950/30 transition-all duration-300 hover:border-gold-400 hover:bg-gold-500 hover:text-ink-950 cursor-pointer shadow-lg"
      >
        <Icon name="chevron-right" className="h-5 w-5" />
      </button>

      {/* Bottom controls & Action buttons */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center justify-end px-4 pb-6 sm:px-5 sm:pb-12">
        {/* Slide indicators */}
        <div
          className="mb-3.5 sm:mb-5 flex items-center gap-1.5 sm:gap-2"
          role="tablist"
          aria-label="Choose hero slide"
        >
          {promotions.map((promo, index) => (
            <button
              key={promo.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Slide ${index + 1}: ${promo.title}`}
              onClick={() => goTo(index)}
              className="group flex h-6 items-center cursor-pointer"
            >
              <span
                className={`relative block h-1.5 overflow-hidden rounded-full transition-all duration-500 ${
                  index === active ? "w-12 bg-white/30" : "w-5 bg-white/35 group-hover:bg-white/60"
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

        {/* Buttons (Explore Trips & Plan My Trip) */}
        {children}
      </div>
    </div>
  );
}

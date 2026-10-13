import { useApp } from "../lib/app-context";
import { HeroSlider } from "./HeroSlider";
import { Button } from "./ui";

export function Hero() {
  const { openEnquiry } = useApp();

  return (
    <section id="hero" className="relative isolate overflow-hidden bg-ink-950">
      {/* Upcoming trips slider */}
      <HeroSlider />

      {/* Readability overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/45 to-ink-950" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/25 to-transparent" />

      <div className="relative mx-auto max-w-[1280px] px-5 pb-[25rem] pt-32 sm:pb-[24rem] sm:pt-40 lg:pb-44 lg:pt-48">
        <div className="pointer-events-none">
          <p
            className="hero-rise mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/90 backdrop-blur-md"
            style={{ animationDelay: "80ms" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            Curated travel · Bengaluru &amp; across India
          </p>

          <h1
            className="hero-rise max-w-4xl text-[2.9rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-cream sm:text-6xl lg:text-[5.1rem]"
            style={{ animationDelay: "180ms" }}
          >
            Your Next Story
            <br />
            <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200 bg-clip-text text-transparent">
              Starts Here.
            </span>
          </h1>

          <p
            className="hero-rise mt-7 max-w-xl text-[17px] leading-relaxed text-cream/75 sm:text-lg"
            style={{ animationDelay: "300ms" }}
          >
            Curated holidays, unforgettable group journeys and tailor-made adventures for travellers who
            want to experience more.
          </p>
        </div>

        <div
          className="hero-rise mt-9 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "420ms" }}
        >
          <Button href="/group-departures" variant="primary" size="lg" icon="arrow-right">
            Explore Trips
          </Button>
          <Button variant="light" size="lg" onClick={() => openEnquiry({}, "Hero · Plan My Trip")}>
            Plan My Trip
          </Button>
        </div>
      </div>
    </section>
  );
}

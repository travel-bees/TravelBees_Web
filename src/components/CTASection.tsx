import { px } from "../lib/media";
import { useApp } from "../lib/app-context";
import { Button, Reveal } from "./ui";

export function CTASection() {
  const { openEnquiry } = useApp();

  return (
    <section id="final-cta" className="relative isolate overflow-hidden">
      <img
        src={px(4050794, 1920, 1080)}
        alt="Alpine lake and village in Switzerland"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/70 to-ink-950/95" />

      <div className="relative mx-auto max-w-[1280px] px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-300">
            Travel. Explore. Create Stories.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mx-auto mt-6 max-w-4xl text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-cream sm:text-5xl lg:text-[4rem]">
            Ready To Plan Your Next Adventure?
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-cream/75">
            Whether you're dreaming of Japan, planning a family holiday or looking for your next group
            adventure, let's make it happen.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="/group-departures" variant="primary" size="lg" icon="arrow-right">
              Explore Trips
            </Button>
            <Button
              variant="light"
              size="lg"
              onClick={() => openEnquiry({}, "Final CTA · Plan My Trip")}
            >
              Plan My Trip
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

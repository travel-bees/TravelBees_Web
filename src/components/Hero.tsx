import { useApp } from "../lib/app-context";
import { HeroSlider } from "./HeroSlider";
import { Button } from "./ui";

export function Hero() {
  const { openEnquiry } = useApp();

  return (
    <section
      id="hero"
      className="relative isolate flex h-screen h-[100dvh] min-h-[600px] flex-col justify-end overflow-hidden bg-ink-950"
    >
      <HeroSlider>
        <div
          className="hero-rise flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
          style={{ animationDelay: "200ms" }}
        >
          <Button href="/group-departures" variant="primary" size="lg" icon="arrow-right">
            Explore Trips
          </Button>
          <Button variant="light" size="lg" onClick={() => openEnquiry({}, "Hero · Plan My Trip")}>
            Plan My Trip
          </Button>
        </div>
      </HeroSlider>
    </section>
  );
}

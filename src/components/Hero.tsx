import { useApp } from "../lib/app-context";
import { HeroSlider } from "./HeroSlider";
import { Button } from "./ui";

export function Hero() {
  const { openEnquiry } = useApp();

  return (
    <section
      id="hero"
      className="relative isolate flex h-[78dvh] min-h-[500px] max-h-[720px] sm:h-screen sm:h-[100dvh] sm:min-h-[600px] sm:max-h-none flex-col justify-end overflow-hidden bg-ink-950"
    >
      <HeroSlider>
        <div
          className="hero-rise flex flex-wrap items-center justify-center gap-2.5 sm:gap-4"
          style={{ animationDelay: "200ms" }}
        >
          <Button
            href="/group-departures"
            variant="primary"
            size="md"
            className="sm:h-14 sm:px-8 sm:text-[15px]"
            icon="arrow-right"
          >
            Explore Trips
          </Button>
          <Button
            variant="light"
            size="md"
            className="sm:h-14 sm:px-8 sm:text-[15px]"
            onClick={() => openEnquiry({}, "Hero · Plan My Trip")}
          >
            Plan My Trip
          </Button>
        </div>
      </HeroSlider>
    </section>
  );
}

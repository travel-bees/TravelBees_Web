import { site } from "../data/site";
import { useApp } from "../lib/app-context";
import { Icon, type IconName } from "../components/Icon";
import { Button, Reveal, SectionHeading } from "../components/ui";
import { px } from "../lib/media";

const whyCards: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "sparkles",
    title: "Personalized Itineraries",
    description: "Trips designed around your interests, pace and budget.",
  },
  {
    icon: "compass",
    title: "Handpicked Experiences",
    description: "Thoughtfully selected stays, activities and experiences.",
  },
  {
    icon: "wallet",
    title: "Transparent Pricing",
    description: "Clear inclusions and straightforward communication.",
  },
  {
    icon: "map",
    title: "Local Expertise",
    description: "Destination knowledge that helps you travel better.",
  },
  {
    icon: "headset",
    title: "Trip Support",
    description: "Assistance before, during and after your journey.",
  },
  {
    icon: "users",
    title: "Small Groups",
    description: "Meaningful experiences without overcrowded tours.",
  },
];

const steps = [
  { number: "01", title: "Tell Us Your Plans", description: "Share your dates, budget and the kind of trip you have in mind." },
  { number: "02", title: "We Build Your Trip", description: "A travel expert designs a day-by-day itinerary with honest pricing." },
  { number: "03", title: "Confirm & Prepare", description: "Lock your dates, sort visas, flights and payments step by step." },
  { number: "04", title: "Travel & Make Memories", description: "Go — we stay on WhatsApp the whole way through." },
];

export function CustomTripSection() {
  const { openEnquiry } = useApp();

  return (
    <section id="custom-trip" className="relative overflow-hidden bg-ink-950 py-10">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-[32px]">
              <img
                src={px(4762954, 1000, 1200)}
                alt="Travellers with backpacks looking over a mountain valley"
                loading="lazy"
                decoding="async"
                className="h-75 w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden w-56 overflow-hidden rounded-3xl border-4 border-ink-950 shadow-2xl sm:block">
              <img
                src={px(7625042, 500, 500)}
                alt="Friends watching the view from a cliff"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">
              <span className="h-px w-8 bg-gold-300/50" />
              Tailor-made
            </p>
            <Reveal>
              <h2 className="text-[2.3rem] font-bold leading-[1.06] tracking-tight text-cream sm:text-5xl lg:text-[3.4rem]">
                Your Trip. Your Way.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-cream/70">
                Tell us where you want to go, how you want to travel and what you want to experience.
                We'll build the itinerary around you.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Your dates, your pace",
                  "Private or small group",
                  "Any budget, honestly quoted",
                  "Visa & documentation help",
                ].map((point) => (
                  <li key={point} className="flex items-center gap-3 text-[14.5px] text-cream/80">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-300">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() =>
                    openEnquiry({ tripType: "Custom / private trip" }, "Custom trip section")
                  }
                >
                  Plan My Custom Trip
                </Button>
                <Button variant="whatsapp" size="lg" href={site.whatsappHref}>
                  WhatsApp Us
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-cream py-10">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Why Travelbees"
          title="Travel Made Simple"
          subtitle="Six things we do on every single trip, so all you have to do is enjoy it."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 60} className="h-full">
              <article className="group h-full rounded-3xl border border-ink-900/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-card">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-gold-400 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                  <Icon name={card.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-[1.15rem] font-bold tracking-tight text-ink-900">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-700/75">
                  {card.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-sand py-10">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="From idea to itinerary in four steps"
          subtitle="No endless forms. One conversation, then a plan you can actually say yes to."
        />

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-ink-900/15 lg:block" />
          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 100} className="h-full">
                <li className="relative h-full">
                  <span className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-900 text-[1.15rem] font-bold text-gold-400 shadow-soft">
                    {step.number}
                  </span>
                  <h3 className="mt-6 text-[1.25rem] font-bold tracking-tight text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 max-w-xs text-[14.5px] leading-relaxed text-ink-700/75">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

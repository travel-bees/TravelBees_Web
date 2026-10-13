import { site } from "../data/site";
import { useApp } from "../lib/app-context";
import { px } from "../lib/media";
import { useSeo } from "../lib/seo";
import { Icon, type IconName } from "../components/Icon";
import { Button, Reveal, SectionHeading } from "../components/ui";

const values: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "shield",
    title: "Honesty over upselling",
    description:
      "We'll tell you when a cheaper option is the better trip. No padded inclusions, no surprise add-ons on arrival.",
  },
  {
    icon: "compass",
    title: "Research-led itineraries",
    description:
      "Every route is checked against real travel times, opening hours and seasonal conditions before it reaches you.",
  },
  {
    icon: "headset",
    title: "Reachable when it matters",
    description:
      "One point of contact on WhatsApp from your first question to your last transfer home.",
  },
];

const team = [
  { role: "Founder & trip designer", name: "[Name]" },
  { role: "International holidays", name: "[Name]" },
  { role: "Domestic & group tours", name: "[Name]" },
  { role: "Visa & documentation", name: "[Name]" },
];

export function AboutPage() {
  const { openEnquiry } = useApp();

  useSeo({
    title: "About Travelbees — Travel. Explore. Create Stories.",
    description:
      "Travelbees is a Bengaluru-based travel company building thoughtfully planned holidays, group tours and custom trips for travellers across India.",
    path: "/about",
    image: px(4762954, 1200, 630),
  });

  return (
    <div className="bg-cream">
      <header className="relative isolate overflow-hidden">
        <img
          src={px(4762954, 1920, 1100)}
          alt="Travellers looking over a mountain valley"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/65 to-ink-950/45" />
        <div className="relative mx-auto max-w-[1280px] px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-300">
            About us
          </p>
          <h1 className="mt-5 max-w-3xl text-[2.6rem] font-extrabold leading-[1.03] tracking-[-0.035em] text-cream sm:text-6xl">
            We plan travel the way we'd plan it for our own family.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-cream/75">
            {site.name} is a travel company from {site.city}, building curated holidays, group
            departures and tailor-made trips for travellers across India.
          </p>
        </div>
      </header>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Our story" title="More Than A Holiday" />
            <div className="mt-6 space-y-4 text-[16.5px] leading-relaxed text-ink-700/80">
              <p>
                Travelbees started with a simple frustration: most travel packages looked identical.
                Same hotels, same rushed schedules, same long list of things you paid for but never
                saw. We wanted to build the opposite — trips that feel designed rather than assembled.
              </p>
              <p>
                Today we work with travellers from Bengaluru and across India: couples planning their
                first international trip, families with grandparents and toddlers in the same group,
                friends who want a fixed departure they can simply show up for, and companies looking
                for a smooth offsite.
              </p>
              <p>
                We're a small, hands-on team. The person who answers your first message is the person
                who builds your itinerary and checks in on you while you're travelling.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 80}>
                <article className="flex gap-4 rounded-3xl border border-ink-900/10 bg-white p-6">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-900 text-gold-400">
                    <Icon name={value.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-[1.1rem] font-bold tracking-tight text-ink-900">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ink-700/75">
                      {value.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="The team"
            title="Meet Our Team"
            subtitle="Placeholder profiles — real bios and photos will be added here."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Reveal key={member.role} delay={index * 60} className="h-full">
                <div className="h-full rounded-3xl border border-ink-900/10 bg-white p-6 text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink-900 text-[1.1rem] font-bold text-gold-400">
                    {member.name.replace("[Name]", "W")}
                  </span>
                  <h3 className="mt-5 text-[1.05rem] font-bold tracking-tight text-ink-900">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[13.5px] text-ink-700/65">{member.role}</p>
                  <p className="mt-3 text-[12.5px] text-ink-700/45">[Bio to be added]</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[12.5px] text-ink-700/50">
            We're deliberately not listing years in business, customer counts, offices or awards until
            those details are verified and ready to publish.
          </p>
        </div>
      </section>

      <section className="bg-ink-950 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="text-[2.1rem] font-bold leading-tight tracking-tight text-cream sm:text-4xl">
              Let's plan something worth remembering
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mx-auto mt-5 max-w-xl text-[16.5px] leading-relaxed text-cream/70">
              Tell us where you want to go and how you like to travel. We'll take it from there.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => openEnquiry({}, "About page · Plan My Trip")}
              >
                Plan My Trip
              </Button>
              <Button variant="whatsapp" size="lg" href={site.whatsappHref}>
                WhatsApp Us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

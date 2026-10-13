import { services } from "../data/content";
import { Icon, type IconName } from "../components/Icon";
import { Button, Reveal, SectionHeading } from "../components/ui";
import { px } from "../lib/media";

export function AboutSection() {
  // return (
  //   <section id="about" className="bg-cream py-10">
  //     <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
  //       <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
  //         <Reveal className="relative order-2 lg:order-1">
  //           <div className="overflow-hidden rounded-[32px]">
  //             <img
  //               src={px(10756911, 1000, 1150)}
  //               alt="Group of travellers enjoying a lakeside view"
  //               loading="lazy"
  //               decoding="async"
  //               className="h-full w-full object-cover"
  //             />
  //           </div>
  //           <div className="absolute -left-4 -top-6 hidden rounded-2xl bg-ink-900 px-5 py-4 shadow-xl sm:block">
  //             <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300">
  //               Based in
  //             </p>
  //             <p className="mt-1 text-[15px] font-bold text-cream">Bengaluru, India</p>
  //           </div>
  //         </Reveal>

  //         <div className="order-1 lg:order-2">
  //           <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-600">
  //             <span className="h-px w-8 bg-gold-600/50" />
  //             About Travelbees
  //           </p>
  //           <Reveal>
  //             <h2 className="text-[2.3rem] font-bold leading-[1.06] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.4rem]">
  //               More Than A Holiday
  //             </h2>
  //           </Reveal>

  //           <Reveal delay={80}>
  //             <div className="mt-6 space-y-4 text-[16.5px] leading-relaxed text-ink-700/80">
  //               <p>
  //                 Travelbees was started by travellers who got tired of generic, copy-paste tour
  //                 packages. We build holidays the way we'd plan them for our own families — with real
  //                 research, honest pricing and the kind of pacing that makes a trip feel like a holiday
  //                 rather than a checklist.
  //               </p>
  //               <p>
  //                 <span className="font-semibold text-ink-900">Our mission is simple:</span> make
  //                 great travel easy for Indian travellers. Handle the logistics, the paperwork and the
  //                 2 AM airport transfers — and leave you free to actually enjoy where you are.
  //               </p>
  //               <p>
  //                 <span className="font-semibold text-ink-900">What makes us different:</span> every
  //                 itinerary is written by a person who has been there or works closely with people who
  //                 have. No automated tours, no inflated inclusions, no surprises on arrival.
  //               </p>
  //             </div>
  //           </Reveal>

  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
}

export function ServicesSection() {
  return (
    <section id="services" className="bg-sand py-10">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="Travel Services"
          subtitle="Everything you need for a complete trip, under one roof."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 45} className="h-full">
              <article className="group flex h-full gap-4 rounded-3xl border border-ink-900/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-card">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink-900 text-gold-400 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                  <Icon name={service.icon as IconName} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[1.05rem] font-bold tracking-tight text-ink-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-700/75">
                    {service.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-ink-900 px-7 py-7">
            <p className="max-w-xl text-[15.5px] leading-relaxed text-cream/75">
              Need something that isn't listed — a destination wedding, a college batch trip or a
              company offsite? Tell us what you're planning.
            </p>
            <Button href="/custom-trip" variant="primary" size="md" icon="arrow-right">
              Talk to us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

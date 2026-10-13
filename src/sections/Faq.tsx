import { useState } from "react";
import { Icon } from "../components/Icon";
import { Reveal, SectionHeading } from "../components/ui";
import { cn } from "../utils/cn";

const faqs = [
  {
    q: "How do I book a trip with Travelbees?",
    a: "Send an enquiry through any 'Plan My Trip' button, WhatsApp us, or call us directly. A travel expert will share a personalised itinerary and costing, and we only take a booking once you're happy with the plan.",
  },
  {
    q: "What does the starting price include?",
    a: "Starting prices cover stays, listed meals, transfers and the experiences mentioned in the itinerary. Airfare, visas and personal expenses are quoted separately — always clearly itemised before you pay.",
  },
  {
    q: "Do you help with visas?",
    a: "Yes. We provide document checklists, form-filling support, appointment slots and interview preparation for every destination we sell. Visa decisions always rest with the embassy.",
  },
  {
    q: "Can I join a group departure on my own?",
    a: "Absolutely. Many of our travellers join solo. We can also pair you with a same-gender roommate on request to keep costs down.",
  },
  {
    q: "How much do I need to pay up front?",
    a: "A booking deposit locks your dates, with the balance due before the final documentation date. Exact schedules are shared in writing with every quote.",
  },
  {
    q: "What if I need to cancel or change dates?",
    a: "Cancellation charges depend on how close we are to departure and on supplier terms — they're listed on every package page. Where possible we'll help you move dates instead of cancelling.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" className="bg-sand py-10">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Good to know"
              title="Frequently Asked Questions"
              subtitle="Everything travellers usually ask before their first booking with us."
            />
          </div>

          <div>
            {faqs.map((faq, index) => (
              <Reveal key={faq.q} delay={index * 40}>
                <div className="border-b border-ink-900/12">
                  <button
                    type="button"
                    onClick={() => setOpen(open === index ? null : index)}
                    aria-expanded={open === index}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-[16.5px] font-semibold tracking-tight text-ink-900">
                      {faq.q}
                    </span>
                    <span
                      className={cn(
                        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                        open === index
                          ? "rotate-180 border-gold-500 bg-gold-500 text-ink-950"
                          : "border-ink-900/20 text-ink-900",
                      )}
                    >
                      <Icon name="chevron-down" className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      open === index
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <p className="overflow-hidden pb-5 pr-10 text-[15px] leading-relaxed text-ink-700/75">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

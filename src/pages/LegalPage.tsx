import { useSeo } from "../lib/seo";
import { site } from "../data/site";
import { Button, SectionHeading } from "../components/ui";

const content: Record<string, { title: string; intro: string; sections: { h: string; p: string }[] }> = {
  privacy: {
    title: "Privacy Policy",
    intro:
      "How Travelbees collects, uses and protects the information you share with us when you enquire about or book a trip.",
    sections: [
      {
        h: "Information we collect",
        p: "When you submit an enquiry we collect your name, phone number, email address, travel dates, traveller count, budget and any requirements you share. We also collect basic usage data such as pages viewed and device type.",
      },
      {
        h: "How we use it",
        p: "Your details are used to prepare itineraries and quotes, process bookings, share travel documents, provide trip support and — only if you opt in — send travel inspiration emails.",
      },
      {
        h: "Sharing",
        p: "We share only the information necessary with airlines, hotels, transport providers and visa authorities to complete your booking. We never sell your data to third parties.",
      },
      {
        h: "Your choices",
        p: "You can ask us to update or delete your details at any time by emailing us. Newsletter emails include a one-click unsubscribe link.",
      },
      {
        h: "Contact",
        p: `For any privacy-related question, write to ${site.email} or call ${site.phone}.`,
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    intro:
      "The terms that apply when you book a trip with Travelbees. These are placeholder terms and should be reviewed by a legal professional before launch.",
    sections: [
      {
        h: "Bookings & deposits",
        p: "A booking is confirmed only once we receive the agreed deposit and issue a written confirmation. Prices are valid for the dates stated in your quote.",
      },
      {
        h: "Documents",
        p: "Travellers are responsible for carrying a valid passport and any visas, permits or health documents required for their journey.",
      },
      {
        h: "Itinerary changes",
        p: "Occasionally weather, local conditions or supplier availability may require changes. We will always inform you as early as possible and offer a comparable alternative.",
      },
      {
        h: "Liability",
        p: "Travelbees acts as an agent for airlines, hotels, transport operators and activity providers. Their terms and conditions also apply to the services they provide.",
      },
    ],
  },
  cancellation: {
    title: "Cancellation Policy",
    intro:
      "A summary of how cancellation charges are calculated. The exact schedule is always shared with your booking confirmation.",
    sections: [
      {
        h: "Before departure",
        p: "Cancellation charges depend on how close the cancellation is to departure, and on the terms of airlines, hotels and cruise or safari operators.",
      },
      {
        h: "Non-refundable components",
        p: "Airfare, visa fees, ferry tickets, permits and certain seasonal hotel deposits are non-refundable once issued.",
      },
      {
        h: "Date changes",
        p: "Where possible we will help you move your dates instead of cancelling. Any difference in price is payable by the traveller.",
      },
      {
        h: "How to cancel",
        p: `Send a written cancellation request to ${site.email} or message us on WhatsApp. We will confirm the applicable charges in writing.`,
      },
    ],
  },
  refund: {
    title: "Refund Policy",
    intro: "How and when refunds are processed for cancelled or amended bookings.",
    sections: [
      {
        h: "Processing time",
        p: "Approved refunds are processed within 15–30 working days, depending on the payment method and the supplier involved.",
      },
      {
        h: "Method",
        p: "Refunds are issued to the original payment method. Bank charges or currency conversion differences are not refundable.",
      },
      {
        h: "Partial refunds",
        p: "Unused services during a trip — such as missed meals, activities or hotel nights — are not refundable unless agreed in advance in writing.",
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    intro: "How this website uses cookies and similar technologies.",
    sections: [
      {
        h: "Essential cookies",
        p: "Used to remember your form progress and preferences so the site works correctly.",
      },
      {
        h: "Analytics",
        p: "We may use privacy-friendly analytics to understand which pages and destinations are most useful, so we can improve the site.",
      },
      {
        h: "Managing cookies",
        p: "You can block or delete cookies in your browser settings. Some features of the site may not work fully if you do.",
      },
    ],
  },
};

export function LegalPage({ type }: { type: string }) {
  const page = content[type] ?? content.privacy;

  useSeo({
    title: `${page.title} | Travelbees`,
    description: page.intro,
    path: `/legal/${type}`,
  });

  return (
    <div className="bg-cream">
      <header className="border-b border-ink-900/10 bg-white">
        <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-600">
            Legal
          </p>
          <h1 className="mt-4 text-[2.4rem] font-extrabold tracking-[-0.035em] text-ink-900 sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-700/75">{page.intro}</p>
        </div>
      </header>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div className="space-y-8">
              {page.sections.map((section) => (
                <div key={section.h}>
                  <h2 className="text-[1.25rem] font-bold tracking-tight text-ink-900">
                    {section.h}
                  </h2>
                  <p className="mt-3 text-[16px] leading-relaxed text-ink-700/80">{section.p}</p>
                </div>
              ))}
              <p className="rounded-2xl border border-ink-900/10 bg-white px-5 py-4 text-[13px] text-ink-700/60">
                Placeholder policy content — replace with the company's reviewed legal text before
                going live.
              </p>
            </div>

            <aside>
              <div className="sticky top-28 rounded-3xl bg-ink-900 p-7 text-cream">
                <SectionHeading
                  tone="light"
                  eyebrow="Questions?"
                  title="We're happy to explain"
                />
                <p className="mt-4 text-[14.5px] leading-relaxed text-cream/70">
                  Anything unclear about our policies? Message us and we'll walk you through it in
                  plain language.
                </p>
                <div className="mt-6">
                  <Button variant="primary" size="lg" href={site.whatsappHref}>
                    WhatsApp Us
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

export function NotFoundPage() {
  useSeo({
    title: "Page not found | Travelbees",
    description: "The page you're looking for doesn't exist.",
    path: "/404",
  });

  return (
    <div className="mx-auto max-w-2xl px-5 py-32 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-600">404</p>
      <h1 className="mt-4 text-[2.4rem] font-extrabold tracking-[-0.035em] text-ink-900 sm:text-5xl">
        This page took a detour
      </h1>
      <p className="mt-5 text-[16.5px] leading-relaxed text-ink-700/75">
        The link may be broken or the page may have moved. Let's get you back to planning your next
        trip.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Button href="/" variant="primary" size="lg">
          Back to home
        </Button>
        <Button href="/group-departures" variant="outline" size="lg">
          Explore trips
        </Button>
      </div>
    </div>
  );
}

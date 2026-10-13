import { useRef, useState } from "react";
import { blogPosts, testimonials } from "../data/content";
import { BlogCard } from "../components/BlogCard";
import { TestimonialCard } from "../components/TestimonialCard";
import { Button, Reveal, SectionHeading } from "../components/ui";
import { Icon } from "../components/Icon";
import { site } from "../data/site";
import { px } from "../lib/media";
import { Link } from "../components/ui";

const gallery = [
  { imageId: 39472103, alt: "Rice terraces in Bali", className: "row-span-2" },
  { imageId: 16498513, alt: "Shikaras on Dal Lake, Kashmir", className: "" },
  { imageId: 18662417, alt: "Singapore skyline at night", className: "row-span-2" },
  { imageId: 12233686, alt: "Waterfall in Meghalaya", className: "" },
  { imageId: 13697474, alt: "Zebras in Kenya", className: "row-span-2" },
  { imageId: 39182453, alt: "Palm trees on a Goa beach at sunset", className: "" },
];

export function BlogSection() {
  return (
    <section id="blog" className="bg-cream py-10">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Travel inspiration"
            title="Travel Inspiration"
            subtitle="Guides, budgets and honest advice from the people who plan these trips for a living."
          />
          <Reveal delay={140}>
            <Button href="/blog" variant="outline" size="md" icon="arrow-right">
              All articles
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 6).map((post, index) => (
            <Reveal key={post.slug} delay={index * 60} className="h-full">
              <BlogCard post={post} eager={index < 3} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="bg-sand py-10">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Testimonials"
            title="Stories From Our Travelers"
            subtitle="Sample reviews shown as placeholders — these will be replaced with verified customer feedback."
          />
          <Reveal delay={140}>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Previous testimonials"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/20 text-ink-900 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-cream"
              >
                <Icon name="chevron-left" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Next testimonials"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/20 text-ink-900 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-cream"
              >
                <Icon name="chevron-right" className="h-5 w-5" />
              </button>
            </div>
          </Reveal>
        </div>

        <div
          ref={railRef}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="w-[86%] shrink-0 snap-start sm:w-[48%] lg:w-[32%]"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="dark" size="md" href={site.googleReviewsHref}>
              Read our Google Reviews
            </Button>
            <p className="text-[13px] text-ink-700/55">
              Live Google Business Profile reviews will be linked here once the profile is verified.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function InstagramSection() {
  return (
    <section id="instagram" className="bg-cream py-10">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Instagram"
          title="Follow The Journey"
          subtitle="Behind-the-scenes from our group departures, hotel finds and the views we don't get tired of."
        />

        <div className="mt-14 grid auto-rows-[120px] grid-cols-2 gap-3 sm:auto-rows-[150px] md:grid-cols-4">
          {gallery.map((item) => (
            <a
              key={item.imageId}
              href={site.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-2xl ${item.className}`}
            >
              <img
                src={px(item.imageId, 700, 700)}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Icon name="instagram" className="h-7 w-7 text-cream" />
              </div>
            </a>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-col justify-center items-center gap-4">
            
              <a
                href={site.instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Check us on Instagram"
                className="hidden h-10 items-center justify-between rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white transition-transform duration-300 hover:scale-105 sm:inline-flex flex items-center gap-3 px-2"
              >
                <Icon name="instagram" className="h-[18px] w-[18px]" />
                <p className="text-[12px] font-semibold text-ink-700/70 text-white">Follow us on Instagram</p>
              </a>
              
          
           <p className="text-[10px] font-semibold text-ink-700/70">{site.instagramHandle}</p>
           </div>
        </Reveal>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section id="newsletter" className="relative overflow-hidden bg-ink-950 py-20 sm:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #E09A34 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-gold-300">
            <Icon name="mail" className="h-5 w-5" />
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 text-[2.1rem] font-bold leading-tight tracking-tight text-cream sm:text-4xl">
            Get Travel Inspiration In Your Inbox
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-cream/65">
            New destinations, group departures and travel deals — without the spam.
          </p>
        </Reveal>

        <Reveal delay={200}>
          {done ? (
            <p className="mx-auto mt-9 max-w-md rounded-2xl border border-gold-500/40 bg-gold-500/10 px-6 py-5 text-[15px] text-gold-200">
              You're on the list. Watch out for our next group departure announcement.
            </p>
          ) : (
            <form
              className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                if (!/^\S+@\S+\.\S+$/.test(email)) return;
                setDone(true);
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Your email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                className="h-14 flex-1 rounded-full border border-white/20 bg-white/5 px-6 text-[15px] text-cream outline-none transition-colors placeholder:text-cream/40 focus:border-gold-500"
              />
              <Button type="submit" variant="primary" size="lg" className="sm:w-auto">
                Subscribe
              </Button>
            </form>
          )}
        </Reveal>

        <Reveal delay={260}>
          <p className="mt-5 text-[12.5px] text-cream/40">
            One email a fortnight. Unsubscribe any time.{" "}
            <Link to="/legal/privacy" className="underline hover:text-cream/70">
              Privacy Policy
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import { blogPosts } from "../data/content";
import { site } from "../data/site";
import { px } from "../lib/media";
import { useSeo } from "../lib/seo";
import { BlogCard } from "../components/BlogCard";
import { Button, Reveal, SectionHeading } from "../components/ui";
import { useApp } from "../lib/app-context";

export function BlogListPage() {
  useSeo({
    title: "Travel Inspiration, Guides & Budgets | Travelbees Blog",
    description:
      "Destination guides, trip budgets and honest travel advice from the Travelbees team — Japan, Vietnam, Kenya, Kerala and more.",
    path: "/blog",
  });

  return (
    <div className="bg-cream">
      <header className="border-b border-ink-900/10 bg-white">
        <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-600">
            Journal
          </p>
          <h1 className="mt-4 max-w-3xl text-[2.5rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-900 sm:text-5xl">
            Travel Inspiration
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-700/75">
            Guides, budgets and planning advice written by the people who actually build these trips.
          </p>
        </div>
      </header>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 60} className="h-full">
                <BlogCard post={post} eager={index < 3} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function BlogPostPage({ slug }: { slug: string }) {
  const post = blogPosts.find((item) => item.slug === slug);
  const { openEnquiry } = useApp();

  useSeo({
    title: post ? `${post.title} | Travelbees` : "Article not found | Travelbees",
    description: post ? post.excerpt : "This article could not be found.",
    path: `/blog/${slug}`,
    image: post ? px(post.imageId, 1200, 630) : undefined,
    type: "article",
  });

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center">
        <h1 className="text-4xl font-bold text-ink-900">Article not found</h1>
        <p className="mt-4 text-ink-700/70">This article may have been moved or renamed.</p>
        <div className="mt-8 flex justify-center">
          <Button href="/blog" variant="primary" size="lg">
            Back to the journal
          </Button>
        </div>
      </div>
    );
  }

  const others = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <article className="bg-cream">
      <header className="relative isolate overflow-hidden">
        <img
          src={px(post.imageId, 1920, 1100)}
          alt={post.title}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/65 to-ink-950/40" />
        <div className="relative mx-auto max-w-[1280px] px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
          <span className="rounded-full bg-gold-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-950">
            {post.category}
          </span>
          <h1 className="mt-5 max-w-3xl text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-cream sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-[13.5px] text-cream/70">
            <span>{post.date}</span>
            <span className="h-1 w-1 rounded-full bg-cream/40" />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div>
            <p className="text-[18px] font-medium leading-relaxed text-ink-800">{post.excerpt}</p>
            <div className="mt-7 space-y-5">
              {post.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-[16.5px] leading-relaxed text-ink-700/80">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 rounded-3xl border border-ink-900/10 bg-white p-7">
              <h2 className="text-[1.3rem] font-bold tracking-tight text-ink-900">
                Planning a trip? We'll build it for you.
              </h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink-700/75">
                Share your dates and budget and a travel expert will come back with a day-by-day
                itinerary — no obligation, no spam.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => openEnquiry({}, `Blog · ${post.title}`)}
                >
                  Plan My Trip
                </Button>
                <Button variant="whatsapp" size="lg" href={site.whatsappHref}>
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </div>

          <aside>
            <div className="sticky top-28">
              <SectionHeading eyebrow="Keep reading" title="More from the journal" />
              <div className="mt-7 space-y-4">
                {others.map((item) => (
                  <a
                    key={item.slug}
                    href={`#/blog/${item.slug}`}
                    onClick={(event) => {
                      event.preventDefault();
                      window.location.hash = `#/blog/${item.slug}`;
                    }}
                    className="group flex gap-4 rounded-2xl border border-ink-900/10 bg-white p-3 transition-colors hover:border-gold-500/40"
                  >
                    <img
                      src={px(item.imageId, 200, 200)}
                      alt=""
                      loading="lazy"
                      className="h-16 w-16 shrink-0 rounded-xl object-cover"
                    />
                    <span>
                      <span className="block text-[14.5px] font-semibold leading-snug text-ink-900 group-hover:text-gold-600">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-[12.5px] text-ink-700/55">
                        {item.readingTime}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

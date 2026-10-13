import { useMemo, useState } from "react";
import { packages } from "../data/packages";
import { allDestinations } from "../data/destinations";
import { blogPosts } from "../data/content";
import { px } from "../lib/media";
import { useApp } from "../lib/app-context";
import { Icon } from "./Icon";
import { Link } from "./ui";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useApp();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        packages: packages.slice(0, 4),
        destinations: allDestinations.slice(0, 6),
        posts: blogPosts.slice(0, 2),
      };
    }
    return {
      packages: packages.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.destination.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q),
      ),
      destinations: allDestinations.filter(
        (d) => d.name.toLowerCase().includes(q) || d.descriptor.toLowerCase().includes(q),
      ),
      posts: blogPosts.filter((p) => p.title.toLowerCase().includes(q)),
    };
  }, [query]);

  if (!searchOpen) return null;
  const hasResults =
    results.packages.length + results.destinations.length + results.posts.length > 0;

  return (
    <div className="fixed inset-0 z-[65] flex items-start justify-center px-4 pt-20 sm:pt-28">
      <div
        className="absolute inset-0 bg-ink-950/85 backdrop-blur-md"
        onClick={() => setSearchOpen(false)}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-cream shadow-2xl">
        <div className="flex items-center gap-3 border-b border-ink-900/10 px-5 py-4">
          <Icon name="search" className="h-5 w-5 text-gold-600" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search destinations, trips and guides…"
            aria-label="Search the site"
            className="w-full bg-transparent text-[16px] text-ink-900 outline-none placeholder:text-ink-700/40"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 text-ink-900"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60svh] overflow-y-auto px-5 py-5">
          {!hasResults && (
            <p className="py-8 text-center text-[15px] text-ink-700/60">
              No matches. Try “Japan”, “Kerala”, “safari” or “Bali”.
            </p>
          )}

          {results.packages.length > 0 && (
            <Group title="Trips">
              {results.packages.map((pkg) => (
                <Link
                  key={pkg.slug}
                  to={`/packages/${pkg.slug}`}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-4 rounded-2xl px-2 py-2.5 transition-colors hover:bg-white"
                >
                  <img
                    src={px(pkg.imageId, 160, 160)}
                    alt=""
                    loading="lazy"
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold text-ink-900">
                      {pkg.name}
                    </span>
                    <span className="block truncate text-[12.5px] text-ink-700/60">
                      {pkg.duration} · from {pkg.priceLabel}
                    </span>
                  </span>
                  <Icon name="arrow-up-right" className="h-4 w-4 text-ink-700/40" />
                </Link>
              ))}
            </Group>
          )}

          {results.destinations.length > 0 && (
            <Group title="Destinations">
              <div className="flex flex-wrap gap-2 px-2">
                {results.destinations.map((destination) => (
                  <Link
                    key={destination.slug}
                    to={`/destinations/${destination.slug}`}
                    onClick={() => setSearchOpen(false)}
                    className="rounded-full border border-ink-900/15 bg-white px-3.5 py-2 text-[13px] font-medium text-ink-800 transition-colors hover:border-gold-500 hover:text-gold-600"
                  >
                    {destination.name}
                  </Link>
                ))}
              </div>
            </Group>
          )}

          {results.posts.length > 0 && (
            <Group title="Travel guides">
              {results.posts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  onClick={() => setSearchOpen(false)}
                  className="block rounded-2xl px-2 py-2.5 transition-colors hover:bg-white"
                >
                  <span className="block text-[14.5px] font-semibold text-ink-900">{post.title}</span>
                  <span className="block text-[12.5px] text-ink-700/60">
                    {post.category} · {post.readingTime}
                  </span>
                </Link>
              ))}
            </Group>
          )}
        </div>
      </div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-700/50">
        {title}
      </p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

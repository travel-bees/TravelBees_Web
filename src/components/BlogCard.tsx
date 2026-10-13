import type { BlogPost } from "../data/types";
import { px, pxSrcSet } from "../lib/media";
import { Badge, Button } from "./ui";

export function BlogCard({ post, eager = false }: { post: BlogPost; eager?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/10 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={px(post.imageId, 900, 560)}
          srcSet={pxSrcSet(post.imageId, 560)}
          sizes="(max-width: 768px) 100vw, 33vw"
          alt={post.title}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        <div className="absolute left-4 top-4">
          <Badge tone="gold">{post.category}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-[12px] font-medium text-ink-700/55">
          <span>{post.date}</span>
          <span className="h-1 w-1 rounded-full bg-ink-700/30" />
          <span>{post.readingTime}</span>
        </div>

        <h3 className="mt-3 text-[1.2rem] font-bold leading-snug tracking-tight text-ink-900 transition-colors duration-300 group-hover:text-gold-600">
          {post.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 text-[14.5px] leading-relaxed text-ink-700/75">
          {post.excerpt}
        </p>

        <div className="mt-5 pt-1">
          <Button href={`/blog/${post.slug}`} size="sm" variant="ghost" icon="arrow-right" className="px-0">
            Read More
          </Button>
        </div>
      </div>
    </article>
  );
}

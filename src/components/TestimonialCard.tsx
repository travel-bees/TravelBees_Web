import type { Testimonial } from "../data/types";
import { Badge, Stars } from "./ui";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-ink-900/10 bg-white p-7">
      <div className="flex items-center justify-between gap-3">
        <Stars rating={testimonial.rating} />
        {testimonial.placeholder && <Badge tone="neutral">Sample</Badge>}
      </div>

      <blockquote className="mt-5 flex-1 text-[15.5px] leading-relaxed text-ink-800/85">
        <span className="mr-1 text-2xl font-serif leading-none text-gold-500">“</span>
        {testimonial.review}
        <span className="ml-1 text-2xl font-serif leading-none text-gold-500">”</span>
      </blockquote>

      <figcaption className="mt-6 border-t border-ink-900/10 pt-5">
        <p className="text-[15px] font-bold tracking-tight text-ink-900">{testimonial.name}</p>
        <p className="mt-0.5 text-[13px] text-ink-700/65">{testimonial.destination}</p>
      </figcaption>
    </figure>
  );
}

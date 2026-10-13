import type { Service } from "../data/types";
import { Icon, type IconName } from "./Icon";
import { Reveal } from "./ui";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Reveal delay={index * 50}>
      <article className="group h-full rounded-3xl border border-ink-900/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-card">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-gold-400 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
          <Icon name={service.icon as IconName} className="h-5 w-5" />
        </span>
        <h3 className="mt-5 text-[1.15rem] font-bold tracking-tight text-ink-900">
          {service.title}
        </h3>
        <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-700/75">{service.description}</p>
      </article>
    </Reveal>
  );
}

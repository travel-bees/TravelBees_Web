import { Icon, type IconName } from "./Icon";
import { Reveal } from "./ui";

const items: { icon: IconName; label: string; sub: string }[] = [
  { icon: "users", label: "500+ Travelers", sub: "Planned & hosted across our group departures" },
  { icon: "globe", label: "25+ Destinations", sub: "Across India and international routes" },
  { icon: "sparkles", label: "Curated Experiences", sub: "Every itinerary built by hand" },
  { icon: "headset", label: "24/7 Trip Support", sub: "Reachable on WhatsApp while you travel" },
];

export function TrustBar() {
  // return (
  //   <section aria-label="Why travellers trust us" className="bg-cream py-16 sm:py-20">
  //     <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
  //       <Reveal>
  //         <div className="grid gap-px overflow-hidden rounded-3xl border border-ink-900/10 bg-ink-900/10 sm:grid-cols-2 lg:grid-cols-4">
  //           {items.map((item) => (
  //             <div
  //               key={item.label}
  //               className="group flex items-start gap-4 bg-cream px-6 py-7 transition-colors duration-500 hover:bg-white"
  //             >
  //               <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-900 text-gold-400 transition-transform duration-500 group-hover:scale-110">
  //                 <Icon name={item.icon} className="h-5 w-5" />
  //               </span>
  //               <span>
  //                 <span className="block text-[17px] font-bold tracking-tight text-ink-900">
  //                   {item.label}
  //                 </span>
  //                 <span className="mt-1 block text-[13px] leading-snug text-ink-700/65">
  //                   {item.sub}
  //                 </span>
  //               </span>
  //             </div>
  //           ))}
  //         </div>
  //       </Reveal>
  //     </div>
  //   </section>
  // );
}

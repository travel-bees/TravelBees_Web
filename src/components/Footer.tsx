import { footerColumns, legalLinks, site } from "../data/site";
import { Icon, type IconName } from "./Icon";
import { Logo } from "./Logo";
import { Link } from "./ui";

const socials: { name: string; icon: IconName; href: string }[] = [
  { name: "Instagram", icon: "instagram", href: site.instagramHref },
  { name: "Facebook", icon: "facebook", href: site.facebookHref },
  { name: "YouTube", icon: "youtube", href: "https://youtube.com/" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-cream print:hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

      <div className="mx-auto max-w-[1280px] px-5 pb-10 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[14.5px] leading-relaxed text-cream/65">
              {site.description} Based in {site.city}, working with travellers across India.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream/80 transition-all duration-300 hover:border-gold-500 hover:bg-gold-500 hover:text-ink-950"
                >
                  <Icon name={social.icon} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-[14.5px] text-cream/70 transition-colors duration-300 hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300">
              Contact
            </h3>
            <ul className="mt-5 space-y-3.5 text-[14.5px] text-cream/70">
              <li>
                <a href={site.phoneHref} className="flex items-center gap-2.5 hover:text-cream">
                  <Icon name="phone" className="h-4 w-4 text-gold-400" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-cream"
                >
                  <Icon name="whatsapp" className="h-4 w-4 text-gold-400" />
                  {site.whatsapp}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="flex items-center gap-2.5 hover:text-cream">
                  <Icon name="mail" className="h-4 w-4 text-gold-400" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>
                  {site.addressLine}
                  <span className="mt-1 block text-[12.5px] text-cream/40">
                    {site.addressNote}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-7">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-[13px] text-cream/50 transition-colors hover:text-cream"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[13px] text-cream/45">
              © 2026 {site.legalName}. All rights reserved.
            </p>
            <p className="text-[13px] text-cream/45">
              {site.tagline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

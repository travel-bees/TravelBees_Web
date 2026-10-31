import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { nav, site } from "../data/site";
import { useApp } from "../lib/app-context";
import { useRoute } from "../lib/router";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { Button, Link } from "./ui";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openEnquiry, setSearchOpen } = useApp();
  const route = useRoute();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [route.path, route.anchor]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || route.path !== "/";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 print:hidden",
          solid
            ? "border-b border-white/10 bg-ink-950/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8">
          <Link to="/" className="shrink-0" aria-label="Travelbees home">
            <Logo hideTaglineOnMobile />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="relative rounded-full px-3.5 py-2 text-[14px] font-medium text-cream/80 transition-colors duration-300 hover:text-cream"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search trips and destinations"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-cream transition-all duration-300 hover:border-white/50 hover:bg-white/10"
            >
              <Icon name="search" className="h-[18px] w-[18px]" />
            </button>

            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform duration-300 hover:scale-105 sm:inline-flex"
            >
              <Icon name="whatsapp" className="h-[18px] w-[18px]" />
            </a>

            <a
              href={site.facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
              className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white transition-transform duration-300 hover:scale-105 sm:inline-flex"
            >
              <Icon name="facebook" className="h-[18px] w-[18px]" />
            </a>

            <a
              href={site.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Check us on Instagram"
              className="hidden h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white transition-transform duration-300 hover:scale-105 sm:inline-flex"
            >
              <Icon name="instagram" className="h-[18px] w-[18px]" />
            </a>

            <Button
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => openEnquiry({}, "Navbar · Plan My Trip")}
            >
              Plan My Trip
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-cream transition-all duration-300 hover:border-white/50 hover:bg-white/10 lg:hidden"
            >
              <Icon name="menu" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[55] lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!menuOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink-950/70 backdrop-blur-sm transition-opacity duration-400",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-ink-900 px-6 pb-8 pt-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-cream"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-10 flex flex-col gap-1">
            {nav.map((item, i) => (
              <Link
                key={item.label}
                to={item.href}
                className="border-b border-white/10 py-4 text-2xl font-semibold tracking-tight text-cream/90 transition-colors hover:text-gold-400"
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-3 pt-8">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => {
                setMenuOpen(false);
                openEnquiry({}, "Mobile menu · Plan My Trip");
              }}
            >
              Plan My Trip
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="whatsapp" size="md" href={site.whatsappHref}>
                WhatsApp
              </Button>
              <Button variant="light" size="md" href={site.phoneHref}>
                Call Us
              </Button>
            </div>
            <p className="pt-2 text-center text-xs text-cream/50">
              {site.hours}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

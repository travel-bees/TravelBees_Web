# Wanderaya — Travel. Explore. Create Stories.

A premium, conversion-focused travel agency website built with **React + TypeScript + Vite + Tailwind CSS v4**.

Brand, copy, imagery and UI are original. Pricing, contact details, addresses, team bios and
testimonials are clearly marked placeholders and must be replaced with real business data before launch.

---

## Getting started

```bash
npm install
npm run dev      # local development
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Brand

| Token | Value |
| --- | --- |
| Company | Wanderaya |
| Tagline | Travel. Explore. Create Stories. |
| Primary market | Bengaluru / Karnataka, India |
| Accent | Saffron gold `#E09A34` |
| Ink / navy | `#0A1424` → `#060D18` |
| Off-white | `#F8F5EF` / sand `#EDE5D8` |
| Type | Plus Jakarta Sans |

The logo is an original SVG mark (a stylised "W" that also reads as mountain peaks) rendered by
`src/components/Logo.tsx`. Replace the `<path>` geometry there to change the mark.

## Architecture

```
src/
├─ App.tsx                  # hash router + global layout
├─ lib/
│  ├─ router.ts             # hash routing, in-page scrolling
│  ├─ sections.ts           # home-page anchor registry
│  ├─ seo.ts                # per-route title / description / OG / JSON-LD
│  ├─ app-context.tsx       # enquiry modal + search overlay state
│  └─ media.ts              # image URL helpers (swap for your CDN/CMS)
├─ data/                    # ← CMS-ready content layer
│  ├─ site.ts               # brand, contact, nav, footer, legal links
│  ├─ types.ts              # shared TypeScript models
│  ├─ packages.ts           # trips incl. itinerary, inclusions, FAQs, cancellation
│  ├─ destinations.ts       # international + domestic destinations
│  ├─ departures.ts         # fixed-departure group tours
│  └─ content.ts            # services, testimonials, blog posts
├─ components/              # reusable UI (Navbar, Hero, cards, forms, footer…)
├─ sections/                # composable home-page sections
└─ pages/                   # routed pages (package, destination, blog, legal…)
```

### Connecting a CMS / database

Every page reads from `src/data/*`. No content is hardcoded inside components, so each collection can
be swapped for a CMS fetch (Sanity, Contentful, Strapi, Supabase, …) by changing the exported
const arrays to `async` data loaders that match `src/data/types.ts`.

### Routes

| Route | Page |
| --- | --- |
| `/` | Home (all marketing sections) |
| `/packages/:slug` | Detailed trip page with itinerary, inclusions, FAQs, cancellation |
| `/destinations/:slug` | Destination landing page |
| `/about` | Company story, mission, team |
| `/blog`, `/blog/:slug` | Travel journal |
| `/legal/:type` | Privacy, terms, cancellation, refund, cookies |
| `/group-departures`, `/international`, … | Home sections (deep-linkable anchors) |

## Lead generation

- "Plan My Trip" CTAs throughout open a **3-step enquiry modal** (`src/components/EnquiryForm.tsx`).
- Every package exposes **Enquire Now**, **WhatsApp Us** and **Call Us**.
- Floating WhatsApp button on desktop and mobile (lifted above the mobile sticky CTA on trip pages).
- Hero quick-enquiry panel prefills the modal from destination / trip type / month / travellers.
- Newsletter capture with inline validation and success state.
- Submissions show: *"Thanks! Our travel expert will get in touch with you shortly."*

## SEO & performance

- Semantic headings, `lang="en-IN"`, canonical + Open Graph + Twitter metadata.
- `TravelAgency` JSON-LD in `index.html`; per-trip `TouristTrip` JSON-LD injected on package pages.
- Lazy-loaded responsive imagery (`srcSet`/`sizes`), `fetchPriority` on hero images.
- Subtle scroll-reveal animations that respect `prefers-reduced-motion`.
- Accessible labels, focus-visible styles, skip-to-content link, ARIA on dialogs/filters.

## Before launch checklist

- [ ] Replace phone, WhatsApp, email and street address in `src/data/site.ts`
- [ ] Replace placeholder prices with real, verified costing
- [ ] Replace sample testimonials with verified Google reviews
- [ ] Add real team bios/photos, company registration and address
- [ ] Replace legal placeholder text with reviewed policies
- [ ] Swap `src/lib/media.ts` to serve images from your own CDN

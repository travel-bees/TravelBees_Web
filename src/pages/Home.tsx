import { Hero } from "../components/Hero";
import { TrustBar } from "../components/TrustBar";
import { GroupDepartures } from "../sections/Packages";
import {
  CustomTripSection,
  HowItWorks,
  WhyChooseUs,
} from "../sections/CustomTrip";
import { AboutSection } from "../sections/About";
import { InspirationSection } from "../sections/Destinations";
import {
  InstagramSection,
  TestimonialsSection,
} from "../sections/Content";
import { FaqSection } from "../sections/Faq";
import { useSeo } from "../lib/seo";
import { site } from "../data/site";

/*
 * Commented-out sections (removed from the homepage on request).
 * Re-enable by uncommenting the imports + JSX.
 */
// import { FeaturedPackages } from "../sections/Packages";
// import { DomesticSection, InternationalSection } from "../sections/Destinations";
// import { ServicesSection } from "../sections/About";
// import { BlogSection, NewsletterSection } from "../sections/Content";

export function Home() {
  useSeo({
    title: "Travelbees — Tours, Holidays & Experiences | Bengaluru Travel Company",
    description:
      "Travelbees designs curated international and domestic holidays, fixed-departure group tours, honeymoons and safari experiences for travellers across India.",
    path: "/",
  });
  
  return (
    <>
      <Hero />
      <GroupDepartures />
      {/* <FeaturedPackages /> — "Trips Worth Taking" (commented out) */}
      <CustomTripSection />
      <InspirationSection />
      <WhyChooseUs />
      <TrustBar />
      <HowItWorks />
      <AboutSection />
      <TestimonialsSection />
      <InstagramSection />
      <FaqSection />
      {/* <CTASection /> */}
      {/* <InternationalSection /> — "Go Further" (removed) */}
      {/* <DomesticSection /> — "Discover India" (removed) */}
      {/* <ServicesSection /> — "What We Do" (removed) */}
      {/* <BlogSection /> — "Travel Inspiration" (removed) */}
      {/* <NewsletterSection /> — newsletter (removed) */}
      <span className="sr-only">{site.tagline}</span>
    </>
  );
}

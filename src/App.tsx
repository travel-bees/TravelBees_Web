import { useEffect } from "react";
import { AppProvider } from "./lib/app-context";
import { isHomeSection } from "./lib/sections";
import { scrollToId, useRoute } from "./lib/router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { EnquiryForm } from "./components/EnquiryForm";
import { SearchOverlay } from "./components/SearchOverlay";
import { Home } from "./pages/Home";
import { PackagePage } from "./pages/PackagePage";
import { DestinationPage } from "./pages/DestinationPage";
import { AboutPage } from "./pages/AboutPage";
import { BlogListPage, BlogPostPage } from "./pages/BlogPages";
import { LegalPage, NotFoundPage } from "./pages/LegalPage";

function Routes() {
  const route = useRoute();
  const segments = route.path.split("/").filter(Boolean);
  const first = segments[0];

  useEffect(() => {
    const target = route.anchor ?? (isHomeSection(first) ? first : undefined);
    if (target) {
      const timer = window.setTimeout(() => scrollToId(target), 140);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0 });
  }, [route.path, route.anchor, first]);

  if (segments.length === 0 || isHomeSection(first)) return <Home />;
  if (first === "about") return <AboutPage />;
  if (first === "blog") return segments[1] ? <BlogPostPage slug={segments[1]} /> : <BlogListPage />;
  if (first === "packages" && segments[1]) return <PackagePage slug={segments[1]} />;
  if (first === "destinations" && segments[1]) return <DestinationPage slug={segments[1]} />;
  if (first === "legal") return <LegalPage type={segments[1] ?? "privacy"} />;

  return <NotFoundPage />;
}

export default function App() {
  return (
    <AppProvider>
      <div className="flex min-h-screen flex-col bg-cream">
        <Navbar />
        <main id="main" className="flex-1">
          <Routes />
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
      <EnquiryForm />
      <SearchOverlay />
    </AppProvider>
  );
}

import { site } from "../data/site";
import { useApp } from "../lib/app-context";
import { useRoute } from "../lib/router";
import { Icon } from "./Icon";

export function WhatsAppButton() {
  const { enquiryOpen } = useApp();
  const route = useRoute();
  if (enquiryOpen) return null;

  const onPackagePage = route.path.startsWith("/packages/");

  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Travelbees on WhatsApp"
      className={`group fixed right-5 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] py-3.5 pl-4 pr-5 text-white shadow-[0_18px_40px_-12px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-[1.04] hover:bg-[#1ebe5b] ${
        onPackagePage ? "bottom-24 lg:bottom-5" : "bottom-5"
      }`}
    >
      <span className="relative flex">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/40 opacity-0 group-hover:opacity-100" />
        <Icon name="whatsapp" className="relative h-6 w-6" />
      </span>
      <span className="text-sm font-bold tracking-tight">Chat with us</span>
    </a>
  );
}

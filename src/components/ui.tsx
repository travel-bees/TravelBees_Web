import {
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";
import { px, pxSrcSet } from "../lib/media";
import { Icon, type IconName } from "./Icon";
import { navigate } from "../lib/router";

/* ------------------------------------------------------------------ Reveal */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------- SmartImage */

interface SmartImageProps {
  id: number;
  alt: string;
  className?: string;
  ratio?: string;
  width?: number;
  height?: number;
  eager?: boolean;
  sizes?: string;
}

export function SmartImage({
  id,
  alt,
  className,
  ratio = "aspect-[4/3]",
  width = 1200,
  height,
  eager = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: SmartImageProps) {
  return (
    <div className={cn("overflow-hidden bg-ink-800", ratio, className)}>
      <img
        src={px(id, width, height)}
        srcSet={pxSrcSet(id, height)}
        sizes={sizes}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ Button */

type Variant = "primary" | "dark" | "outline" | "light" | "whatsapp" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold-500 text-ink-950 hover:bg-gold-400 shadow-[0_14px_30px_-14px_rgba(224,154,52,0.75)]",
  dark: "bg-ink-900 text-cream hover:bg-ink-800",
  outline:
    "border border-ink-900/25 text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-cream",
  light: "border border-white/35 text-white hover:bg-white hover:text-ink-900",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1ebe5b]",
  ghost: "text-ink-900 hover:text-gold-600",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-[15px]",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: keyof typeof sizes;
  href?: string;
  children: ReactNode;
  icon?: IconName;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  icon,
  className,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );

  const inner = (
    <>
      {children}
      {icon && (
        <Icon
          name={icon}
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      )}
    </>
  );

  if (href) {
    const external = /^https?:\/\//i.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        onClick={(event) => {
          if (
            event.defaultPrevented ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.button !== 0
          ) {
            return;
          }
          event.preventDefault();
          navigate(href);
        }}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {inner}
    </button>
  );
}

/* ---------------------------------------------------------------- Link */

export function Link({
  to,
  children,
  className,
  style,
  onClick,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  return (
    <a
      href={`#${to}`}
      className={className}
      style={style}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();
        navigate(to);
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}

/* --------------------------------------------------------- SectionHeading */

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "dark",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p
            className={cn(
              "mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]",
              align === "center" && "justify-center",
              tone === "dark" ? "text-gold-600" : "text-gold-300",
            )}
          >
            <span
              className={cn(
                "h-px w-8",
                tone === "dark" ? "bg-gold-600/50" : "bg-gold-300/50",
              )}
            />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={60}>
        <h2
          className={cn(
            "text-[2.1rem] font-bold leading-[1.08] sm:text-5xl lg:text-[3.4rem]",
            tone === "dark" ? "text-ink-900" : "text-cream",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={120}>
          <p
            className={cn(
              "mt-5 text-[17px] leading-relaxed",
              tone === "dark" ? "text-ink-700/80" : "text-cream/70",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ Badge */

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "gold" | "light" | "danger" | "emerald" | "amber";
  className?: string;
}) {
  const tones = {
    neutral: "bg-ink-900/10 text-ink-800",
    gold: "bg-gold-500 text-ink-950 font-bold shadow-md",
    light: "bg-white/15 text-cream backdrop-blur-sm",
    danger: "bg-[#c0392b] text-white font-bold shadow-md",
    emerald: "bg-emerald-600 text-white font-semibold shadow-md",
    amber: "bg-amber-500 text-ink-950 font-bold shadow-md",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]",
        tones[tone] || tones.neutral,
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ Stars */

export function Stars({ rating = 5, className }: { rating?: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="star"
          className={cn("h-4 w-4", i < rating ? "text-gold-500" : "text-ink-900/20")}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

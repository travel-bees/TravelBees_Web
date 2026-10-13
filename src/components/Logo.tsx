import { cn } from "../utils/cn";
import logo from "../assets/logo.png";

const NAVY = "#152B4A";
const CREAM = "#F7F4EC";
const GOLD = "#F5B335";

/**
 * Glyph outlines baked from Playfair Display Bold (SIL Open Font License).
 * Baked to static paths so the logo never depends on a webfont loading.
 * Both are drawn on a baseline at y = 0, cap height 177 (font size 250).
 */
const GLYPH_T =
  "M160.50-177Q159.50-164.25 159.13-152.50Q158.75-140.75 158.75-134.50Q158.75-129 159-124Q159.25-119 159.50-115.50L153.75-115.50Q149.75-136.50 143.63-148.75Q137.50-161 129-166.12Q120.50-171.25 109-171.25L103.25-171.25L103.25-28.50Q103.25-18.50 105.38-13.50Q107.50-8.50 113.25-6.87Q119-5.25 130-5L130 0Q122.25-0.25 109.38-0.50Q96.50-0.75 82.50-0.75Q68.75-0.75 56.50-0.50Q44.25-0.25 36.75 0L36.75-5Q48-5.25 53.75-6.87Q59.50-8.50 61.50-13.50Q63.50-18.50 63.50-28.50L63.50-171.25L58-171.25Q46.50-171.25 38-166.12Q29.50-161 23.50-148.87Q17.50-136.75 13-115.50L7.25-115.50Q7.75-119 7.88-124Q8-129 8-134.50Q8-140.75 7.63-152.50Q7.25-164.25 6.25-177Q17.75-176.75 31.38-176.50Q45-176.25 58.75-176.25Q72.50-176.25 83.50-176.25Q94.75-176.25 108.38-176.25Q122-176.25 135.75-176.50Q149.50-176.75 160.50-177";

const GLYPH_B =
  "M8.50-172L8.50-177Q15-176.75 25.50-176.50Q36-176.25 46.50-176.25Q58.50-176.25 69.75-176.50Q81-176.75 85.75-176.75Q116.75-176.75 132.13-165.75Q147.50-154.75 147.50-137.50Q147.50-128.75 142.25-119.75Q137-110.75 126-103.75Q115-96.75 97.50-93.50L97.50-93Q121-91.25 134.75-84.50Q148.50-77.75 154.50-68.25Q160.50-58.75 160.50-48.50Q160.50-32.75 152.25-22Q144-11.25 128.50-5.62Q113 0 91.50 0Q85.50 0 74.25-0.37Q63-0.75 47-0.75Q36-0.75 25.50-0.62Q15-0.50 8.50 0L8.50-5Q16.50-5.50 20.50-7Q24.50-8.50 25.88-13Q27.25-17.50 27.25-26.50L27.25-150.50Q27.25-159.75 25.88-164.12Q24.50-168.50 20.38-170.12Q16.25-171.75 8.50-172M82.50-172Q72.75-172 69.88-167.75Q67-163.50 67-150.50L67-26.50Q67-17.75 68.38-13.25Q69.75-8.75 73.38-7.25Q77-5.75 84.25-5.75Q102.25-5.75 110.63-17.12Q119-28.50 119-49.50Q119-68.75 109.38-79.25Q99.75-89.75 77.50-89.75L56.25-89.75Q56.25-89.75 56.25-91.87Q56.25-94 56.25-94L77.75-94Q89.50-94 95.75-99.62Q102-105.25 104.50-114.62Q107-124 107-134.75Q107-153.25 101.25-162.62Q95.50-172 82.50-172";

/** Monogram placement: the B tucks under the right arm of the T. */
const B_X = 132;
const B_SCALE = 0.94;

/** Globe centre + radius — measured to sit in the lower bowl of the B. */
const GX = 219;
const GY = 175;
const GR = 30;

/**
 * Travelbees monogram — serif "T" with a "B" tucked into it, gold bee wings,
 * a globe set into the lower bowl of the B, and a gold flight arc rising to a plane.
 *
 * tone="light" → cream letterforms (dark backgrounds)
 * tone="dark"  → navy letterforms (light backgrounds)
 */
export function LogoMark({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const letter = tone === "light" ? CREAM : NAVY;

  return (
    <svg
      viewBox="0 0 400 250"
      className={cn("h-10 w-auto", className)}
      role="img"
      aria-label="Travelbees"
    >
      {/* ---------- Bee wings ---------- */}
      <g fill={GOLD}>
        <path d="M102,148 C80,112 34,88 16,106 C-2,124 16,158 56,168 C76,173 92,164 102,148 Z" />
        <path d="M102,158 C82,148 44,150 28,170 C12,190 38,208 68,200 C86,195 96,178 102,158 Z" />
      </g>
      <g stroke={NAVY} strokeWidth="2.6" strokeLinecap="round" opacity="0.28" fill="none">
        <path d="M100,150 C76,138 50,124 26,114" />
        <path d="M99,153 C74,148 48,142 20,140" />
        <path d="M99,162 C78,166 56,178 38,192" />
      </g>

      {/* ---------- Serif monogram: B first so the T reads on top ---------- */}
      <g fill={letter}>
        <path transform={`translate(${B_X} 222) scale(${B_SCALE})`} d={GLYPH_B} />
        <path transform="translate(34 222)" d={GLYPH_T} />
      </g>

      {/* ---------- Globe inside the lower bowl of the B ---------- */}
      <defs>
        <clipPath id="tb-globe">
          <circle cx="0" cy="0" r={GR} />
        </clipPath>
      </defs>
      <g transform={`translate(${GX} ${GY})`}>
        <circle r={GR + 5} fill={CREAM} />
        <circle r={GR} fill={NAVY} />
        <g clipPath="url(#tb-globe)">
          <g fill={CREAM}>
            {/* Africa / Eurasia landmass */}
            <path d="M-6,-20 c9,-4 20,-2 22,6 c2,8 -7,11 -9,18 c-2,8 -12,10 -15,4 c-5,-7 -6,-16 -3,-22 c1,-3 3,-4 5,-6 z" />
            {/* northern cap */}
            <path d="M14,-25 c6,-3 13,0 11,5 c-1,4 -9,6 -14,3 z" />
            {/* Americas sliver */}
            <path d="M-21,11 c7,-3 14,3 12,8 c-2,6 -10,6 -15,2 c-3,-3 -1,-8 3,-10 z" />
            <path d="M-23,-14 c5,-3 9,0 8,4 c-1,4 -7,5 -10,2 z" />
          </g>
          <g stroke={CREAM} strokeWidth="1.5" fill="none" opacity="0.5">
            <ellipse rx="14.5" ry={GR} />
            <path d={`M${-GR},-11 H${GR} M${-GR},11 H${GR}`} />
          </g>
        </g>
        <circle r={GR} fill="none" stroke={CREAM} strokeWidth="2.4" />
      </g>

      {/* ---------- Flight arc + plane ---------- */}
      <path
        d="M104,198 C168,200 244,172 292,112 C312,87 332,62 350,44"
        fill="none"
        stroke={GOLD}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <g transform="translate(366 28) rotate(-42) scale(0.66)" fill={GOLD}>
        <path d="M44,0 L12,-12 L-18,-12 L-2,-2 L-20,-2 L-30,-13 L-39,-13 L-33,0 L-39,13 L-30,13 L-20,2 L-2,2 L-18,12 L12,12 Z" />
      </g>
    </svg>
  );
}

export function Logo({
  tone = "light",
  className,
  showTagline = true,
  hideTaglineOnMobile = false,
}: {
  tone?: "light" | "dark";
  className?: string;
  showTagline?: boolean;
  hideTaglineOnMobile?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* <LogoMark tone={tone} className="h-9 w-auto shrink-0 sm:h-10" /> */}
      <img
        src={logo}
        alt="Travelbees"
        className="h-9 w-auto shrink-0 sm:h-10"
      />
      <span className="flex flex-col leading-none">
        <span className="text-[1.05rem] font-extrabold leading-none tracking-[0.16em] sm:text-[1.15rem]">
          <span className={tone === "light" ? "text-cream" : "text-ink-900"}>TRAVEL</span>
          <span className="text-gold-400"> BEES</span>
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1.5 flex items-center gap-1.5 text-[7.5px] font-semibold uppercase tracking-[0.26em] sm:text-[8px]",
              hideTaglineOnMobile && "hidden sm:flex",
              tone === "light" ? "text-cream/60" : "text-ink-700/65",
            )}
          >
            Tours <span className="text-gold-400">•</span> Holidays{" "}
            <span className="text-gold-400">•</span> Experiences
          </span>
        )}
      </span>
    </span>
  );
}

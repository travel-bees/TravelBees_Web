import { cn } from "../utils/cn";

export type IconName =
  | "search"
  | "menu"
  | "close"
  | "whatsapp"
  | "phone"
  | "mail"
  | "pin"
  | "arrow-right"
  | "arrow-up-right"
  | "star"
  | "check"
  | "globe"
  | "map"
  | "users"
  | "sparkles"
  | "heart"
  | "binoculars"
  | "passport"
  | "plane"
  | "briefcase"
  | "instagram"
  | "facebook"
  | "youtube"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "calendar"
  | "wallet"
  | "clock"
  | "shield"
  | "compass"
  | "headset";

const paths: Record<IconName, string> = {
  search: "M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  whatsapp:
    "M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm4.9 14.1c-.2.6-1.2 1.2-1.9 1.2-.6 0-1.9-.3-4-1.7-2.3-1.5-3.6-4-3.7-4.2-.4-.7-.6-1.5-.6-2.3 0-1 .5-1.6.9-2 .2-.2.5-.3.7-.3h.6c.2 0 .4.1.6.5l.7 1.7c.1.2 0 .4-.1.6l-.4.5c-.1.2-.2.3 0 .6.3.5.8 1.2 1.4 1.7.7.6 1.3.9 1.6 1 .2.1.4.1.6-.1l.7-.8c.2-.2.3-.2.6-.1l1.6.8c.3.1.4.3.4.5s0 .8-.1 1.2z",
  phone:
    "M6.6 3h-.2A3.4 3.4 0 003 6.4c0 7.3 5.9 13.2 13.2 13.2h.2a3.4 3.4 0 003.4-3.4v-1.4c0-.9-.6-1.7-1.5-1.9l-2.2-.5a2 2 0 00-2 .7l-.5.6a10.6 10.6 0 01-4.4-4.4l.6-.5a2 2 0 00.7-2l-.5-2.2A1.9 1.9 0 008 3.2z",
  mail: "M3 7.5A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5v9A2.5 2.5 0 0118.5 19h-13A2.5 2.5 0 013 16.5zM3.5 7l8.5 6 8.5-6",
  pin: "M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11zm0-8.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z",
  "arrow-right": "M5 12h14M13 6l6 6-6 6",
  "arrow-up-right": "M7 17L17 7M9 7h8v8",
  star: "M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.8z",
  check: "M4.5 12.5l5 5 10-11",
  globe:
    "M12 3a9 9 0 100 18 9 9 0 000-18zm0 0c2.5 2.4 3.8 5.6 3.8 9s-1.3 6.6-3.8 9c-2.5-2.4-3.8-5.6-3.8-9S9.5 5.4 12 3zM3.4 9.2h17.2M3.4 14.8h17.2",
  map: "M9 4L3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5zM9 4v13M15 6.5v13",
  users:
    "M16 20v-1.5a4 4 0 00-4-4H7a4 4 0 00-4 4V20M9.5 10.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM21 20v-1.5a4 4 0 00-3-3.9M15.5 3.6a3.5 3.5 0 010 6.8",
  sparkles: "M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z",
  heart: "M12 20s-7-4.4-7-9.3A4.2 4.2 0 0112 8a4.2 4.2 0 017 2.7c0 4.9-7 9.3-7 9.3z",
  binoculars:
    "M7 4l1.5 4M17 4l-1.5 4M6 8h12l-1 4H7zM7 12l-2 7h4l1-7M17 12l2 7h-4l-1-7M10 20h4",
  passport:
    "M5 4h14v16H5zM9 9h6M9 13h6M10 4v3c0 .8-.6 1.4-1.4 1.4H8M14 4v3c0 .8.6 1.4 1.4 1.4H16",
  plane: "M10.5 13.5L3 11V8.5L10.5 10 13 4h2l-1.5 6 5.5 2.5V15L15 13l-2 7h-2l1.5-6.5z",
  briefcase: "M3 9.5A2.5 2.5 0 015.5 7h13A2.5 2.5 0 0121 9.5v8A2.5 2.5 0 0118.5 20h-13A2.5 2.5 0 013 17.5zM9 7V5.5A2.5 2.5 0 0111.5 3h1A2.5 2.5 0 0115 5.5V7M3 13h18",
  instagram:
    "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM17.5 6.2h.01",
  facebook: "M14 8h3V4.5h-3A4.5 4.5 0 009.5 9v2H7v3.5h2.5V21H13v-6.5h3l.5-3.5H13V9.5A1.5 1.5 0 0114 8z",
  youtube:
    "M3 8.5A3.5 3.5 0 016.5 5h11A3.5 3.5 0 0121 8.5v7A3.5 3.5 0 0117.5 19h-11A3.5 3.5 0 013 15.5zM10.5 9.5l4.5 2.5-4.5 2.5z",
  "chevron-down": "M6 9.5l6 6 6-6",
  "chevron-left": "M14.5 6l-6 6 6 6",
  "chevron-right": "M9.5 6l6 6-6 6",
  calendar: "M4 7.5A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v11A2.5 2.5 0 0117.5 21h-11A2.5 2.5 0 014 18.5zM4 10h16M8 3v4M16 3v4",
  wallet: "M4 8.5A2.5 2.5 0 016.5 6h11A2.5 2.5 0 0120 8.5v8A2.5 2.5 0 0117.5 19h-11A2.5 2.5 0 014 16.5zM4 10h16M16.5 14.5h.01",
  clock: "M12 3a9 9 0 100 18 9 9 0 000-18zM12 7.5V12l3 2",
  shield: "M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6zM9 12l2.2 2.2L15.5 10",
  compass:
    "M12 3a9 9 0 100 18 9 9 0 000-18zm3.5 5.5l-2 5-5 2 2-5z",
  headset:
    "M4.5 13a7.5 7.5 0 0115 0M4.5 13v3.5A2.5 2.5 0 007 19h.5v-6H7a2.5 2.5 0 00-2.5 2.5zM19.5 13v3.5A2.5 2.5 0 0117 19h-.5v-6H17a2.5 2.5 0 012.5 2.5z",
};

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}

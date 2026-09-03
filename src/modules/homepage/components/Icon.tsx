import type { ReactNode } from "react";

export type IconName =
  | "video"
  | "play"
  | "notes"
  | "test"
  | "chat"
  | "book"
  | "youtube"
  | "sparkle"
  | "star"
  | "mail"
  | "phone"
  | "whatsapp"
  | "instagram"
  | "download"
  | "check"
  | "x"
  | "minus";

const PATHS: Record<IconName, ReactNode> = {
  video: (
    <>
      <rect x="2" y="5" width="14" height="14" rx="2" />
      <path d="m22 8-6 4 6 4V8z" />
    </>
  ),
  play: <path d="M6 4v16l14-8L6 4z" />,
  notes: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h6" />
    </>
  ),
  test: (
    <>
      <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4" />
      <path d="m9 12 2 2 4-4M14 4l6 6-2 2-6-6 2-2z" />
    </>
  ),
  chat: (
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </>
  ),
  youtube: (
    <>
      <path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.5 12 5.5 12 5.5s-6 0-7.9.6A3 3 0 0 0 2 8.2 31 31 0 0 0 2 12a31 31 0 0 0 .1 3.8 3 3 0 0 0 2.1 2.1c1.9.6 7.8.6 7.8.6s6 0 7.9-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.1-3.8z" />
      <path d="m10 15 5-3-5-3v6z" />
    </>
  ),
  sparkle: (
    <path d="M9.9 15.5A2 2 0 0 0 8.5 14L2.4 12.5a.5.5 0 0 1 0-1L8.5 10A2 2 0 0 0 9.9 8.5L11.5 2.4a.5.5 0 0 1 1 0L14 8.5A2 2 0 0 0 15.5 10l6.1 1.5a.5.5 0 0 1 0 1L15.5 14a2 2 0 0 0-1.5 1.5l-1.5 6.1a.5.5 0 0 1-1 0z" />
  ),
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" />, // prettier-ignore
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9z" />
  ),
  whatsapp: (
    <path
      fill="currentColor"
      stroke="none"
      d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.02zM12.04 20.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.28.86 5.84 2.42a8.2 8.2 0 0 1 2.42 5.83c0 4.54-3.7 8.24-8.25 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47a.9.9 0 0 0-.65.31c-.22.25-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.17 1.72 2.63 4.17 3.69.58.25 1.04.4 1.39.51.58.19 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"
    />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </>
  ),
  download: <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />,
  check: <path d="m5 13 4 4L19 7" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  minus: <path d="M6 12h12" />,
};

/** Generic line icon. `strokeWidth` and `className` control size/weight. */
export function Icon({
  name,
  className = "h-6 w-6",
  strokeWidth = 1.8,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}

/** "Get it on Google Play" store badge — SVG recreation of the official mark. */
export function GooglePlayBadge({
  className = "h-14",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 646 200"
      role="img"
      aria-label="Get it on Google Play"
      className={className}
    >
      <defs>
        <linearGradient
          id="gp-blue"
          x1="46"
          y1="52"
          x2="96"
          y2="102"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#00A0FF" />
          <stop offset=".26" stopColor="#00BEFF" />
          <stop offset=".51" stopColor="#00D2FF" />
          <stop offset="1" stopColor="#00E3FF" />
        </linearGradient>
        <linearGradient
          id="gp-yellow"
          x1="163"
          y1="100"
          x2="46"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFE000" />
          <stop offset=".41" stopColor="#FFBD00" />
          <stop offset="1" stopColor="#FF9C00" />
        </linearGradient>
        <linearGradient
          id="gp-red"
          x1="120"
          y1="112"
          x2="30"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FF3A44" />
          <stop offset="1" stopColor="#C31162" />
        </linearGradient>
        <linearGradient
          id="gp-green"
          x1="35"
          y1="30"
          x2="90"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#32A071" />
          <stop offset=".48" stopColor="#15CF74" />
          <stop offset="1" stopColor="#00F076" />
        </linearGradient>
      </defs>

      <rect
        x="1.5"
        y="1.5"
        width="643"
        height="197"
        rx="26"
        fill="#000"
        stroke="#A6A6A6"
        strokeWidth="3"
      />

      {/* Play mark */}
      <g transform="translate(40 44)">
        <path
          d="M2 4C.6 5.5 0 7.9 0 11v90c0 3.1.6 5.5 2 7l.5.5 50.4-50.4v-4L2.5 3.5 2 4Z"
          fill="url(#gp-blue)"
        />
        <path
          d="m70 74-17-17 4-4 20 11c5.7 3.3 5.7 8.7 0 12l-7 3v-5Z"
          fill="url(#gp-yellow)"
        />
        <path
          d="M53 57 2.5 108.5c1.9 2 5 2.2 8.5.2L69 75 53 57Z"
          fill="url(#gp-red)"
        />
        <path
          d="M53 57 69 39 11 5.7C7.5 3.7 4.4 3.9 2.5 5.9L53 57Z"
          fill="url(#gp-green)"
        />
      </g>

      <text
        x="200"
        y="72"
        fill="#fff"
        fontSize="30"
        letterSpacing="3"
        fontFamily="Roboto, Arial, sans-serif"
      >
        GET IT ON
      </text>
      <text
        x="198"
        y="150"
        fill="#fff"
        fontSize="66"
        fontWeight="500"
        fontFamily="'Product Sans', Roboto, Arial, sans-serif"
      >
        Google Play
      </text>
    </svg>
  );
}

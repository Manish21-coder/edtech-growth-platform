import type { ReactNode } from "react";
import type { WhyChooseIcon } from "../content";

/**
 * Parikshe homepage primitives. Tokens live in `src/app/globals.css`.
 */

export function Section({
  id,
  title,
  eyebrow,
  intro,
  headingLevel = 2,
  children,
  tone = "surface",
}: {
  id: string;
  title: string;
  eyebrow?: string;
  intro?: string;
  headingLevel?: 2 | 3;
  children: ReactNode;
  tone?: "surface" | "muted" | "ink";
}) {
  const Heading = `h${headingLevel}` as "h2" | "h3";
  const toneClass = {
    ink: "bg-brand-ink text-text-inverse",
    muted: "bg-surface-muted text-text-primary",
    surface: "bg-surface text-text-primary",
  }[tone];
  const onDark = tone === "ink";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`${toneClass} scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16`}
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 max-w-2xl sm:mb-7">
          {eyebrow ? (
            <p
              className={`mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.16em] uppercase ${
                onDark ? "text-brand-gold" : "text-brand-gold-ink"
              }`}
            >
              <span aria-hidden="true" className="bg-brand-gold h-px w-6" />
              {eyebrow}
            </p>
          ) : null}
          <Heading
            id={`${id}-heading`}
            className="text-3xl font-extrabold text-balance sm:text-[2.5rem] sm:leading-[1.1]"
          >
            {title}
          </Heading>
          {intro ? (
            <p
              className={`mt-4 text-base sm:text-lg ${
                onDark ? "text-white/70" : "text-text-muted"
              }`}
            >
              {intro}
            </p>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  );
}

/** A card surface with subtle depth and a hover lift. */
export function Card({
  children,
  className = "",
  as: As = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  id?: string;
}) {
  return (
    <As
      id={id}
      className={`border-border bg-surface hover:border-brand-gold rounded-2xl border p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_28px_-8px_rgba(15,23,42,0.16)] ${className}`}
    >
      {children}
    </As>
  );
}

export function UnverifiedTag({ onDark = false }: { onDark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-normal ${
        onDark ? "text-white/55" : "text-text-muted"
      }`}
    >
      <span aria-hidden="true">&#9651;</span>
      <span>Unverified</span>
    </span>
  );
}

export function PendingTag({ what }: { what: string }) {
  return (
    <span className="text-text-muted text-[11px]">
      [{what} — pending verification]
    </span>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  onClick,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "gold" | "ghost-light";
  onClick?: () => void;
  className?: string;
}) {
  const style = {
    primary: "bg-cta-bg text-cta-text hover:bg-cta-bg-hover shadow-sm",
    gold: "bg-cta-bg text-cta-text hover:bg-cta-bg-hover shadow-sm",
    secondary:
      "border border-border-strong text-text-primary hover:bg-surface-muted",
    "ghost-light": "border border-white/30 text-text-inverse hover:bg-white/10",
  }[variant];
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${buttonBase} ${style} ${className}`}
    >
      {children}
    </a>
  );
}

/** Line icons for the "Why choose Parikshe" cards. */
export function FeatureIcon({
  name,
  className = "h-6 w-6",
}: {
  name: WhyChooseIcon;
  className?: string;
}) {
  const paths: Record<WhyChooseIcon, ReactNode> = {
    teacher: (
      <>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </>
    ),
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    chat: (
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 6 3.8 9S14.5 21.3 12 21c-2.5.3-3.8-3-3.8-6S9.5 5.7 12 3z" />
      </>
    ),
    device: (
      <>
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

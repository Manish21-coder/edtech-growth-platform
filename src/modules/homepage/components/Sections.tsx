import Image from "next/image";
import {
  APP_STORE,
  FREE_VS_PAID,
  INTRO_EXAM_LINKS,
  SCALE_METRICS,
  STUDENT_STORIES,
  STUDY_RESOURCES,
  WHY_CHOOSE,
} from "../content";
import { Section, Card, ButtonLink, FeatureIcon } from "./primitives";
import { Icon, GooglePlayBadge, type IconName } from "./Icon";
import { VideoTestimonialButton } from "./VideoTestimonialButton";
import { Marquee } from "./Marquee";
import { SidePromoCarousel } from "./SidePromoCarousel";

/**
 * HP-030 / HP-031 — Introduction. Two-column band: the pitch on the left, the
 * auto-rotating promo carousel (16:10, matched to the copy height) on the right.
 * A single trust line sits under the actions (the standalone "Parikshe at scale"
 * section was removed by the product owner, 2026-09-02).
 */
export function IntroAndChips() {
  return (
    <section
      id="intro"
      aria-labelledby="intro-heading"
      className="bg-surface scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        {/* left: the pitch */}
        <div>
          <p className="text-brand-gold-ink mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.16em] uppercase">
            <span aria-hidden="true" className="bg-brand-gold h-px w-6" />
            Learn · Prepare · Achieve
          </p>
          <h2
            id="intro-heading"
            className="text-3xl font-extrabold text-balance sm:text-[2.5rem] sm:leading-[1.1]"
          >
            Expert-led courses and study material, built for Karnataka students
          </h2>
          <p className="text-text-muted mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
            Live classes, curated notes, previous-year papers and practice tests
            in Kannada and English. Pick your exam:
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {INTRO_EXAM_LINKS.map((e) => (
              <li key={e.id}>
                <a
                  href={e.href}
                  className="border-brand-gold-600/50 text-brand-gold-ink hover:bg-surface-accent inline-flex rounded-full border bg-white px-3.5 py-1.5 text-sm font-bold transition-colors"
                >
                  {e.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="#explore-courses" variant="primary">
              See all courses
            </ButtonLink>
            <ButtonLink href={APP_STORE.playStore} variant="secondary">
              Install the app
            </ButtonLink>
          </div>

          <p className="text-text-muted mt-6 flex flex-wrap items-baseline gap-x-2 text-sm">
            <span className="text-text-primary font-bold">
              {SCALE_METRICS[0]?.value} students
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-text-primary font-bold">
              {SCALE_METRICS[1]?.value} app downloads
            </span>
            <span aria-hidden="true">·</span>
            <span>
              rated{" "}
              <span className="text-text-primary font-bold">
                {APP_STORE.rating}
              </span>{" "}
              on Google Play
            </span>
          </p>
        </div>

        {/* right: auto-rotating promo carousel */}
        <div className="mx-auto w-full max-w-md lg:mx-0 lg:ml-auto lg:max-w-none">
          <SidePromoCarousel />
        </div>
      </div>
    </section>
  );
}

/**
 * HP-040 — "the student's journey": each real problem, and how Parikshe
 * resolves it. Compact icon-left cards (1 col mobile, 2 col desktop).
 */
export function WhyChoose() {
  return (
    <Section
      id="why-choose"
      eyebrow="Why Parikshe"
      title="Every student worry, solved"
      intro="Exam prep throws up the same problems again and again. Here is how Parikshe handles each one."
      tone="muted"
    >
      <ol className="grid gap-4 sm:gap-4 lg:grid-cols-2">
        {WHY_CHOOSE.map((item) => (
          <li
            key={item.id}
            className="border-border bg-surface flex gap-4 rounded-2xl border p-4 sm:gap-5 sm:p-6"
          >
            {/* icon */}
            <span className="bg-cta-bg text-cta-text grid h-11 w-11 shrink-0 place-items-center rounded-xl sm:h-14 sm:w-14">
              <FeatureIcon name={item.icon} className="h-5 w-5 sm:h-7 sm:w-7" />
            </span>

            <div>
              <p className="inline-flex items-start gap-1.5 rounded-md bg-[#fdecec] px-2 py-0.5 text-[11px] font-semibold text-[#b3261e]">
                <span aria-hidden="true">✕</span> {item.problem}
              </p>
              <p className="text-text-primary mt-2 text-base font-extrabold sm:text-lg">
                {item.title}
              </p>
              <p className="text-text-muted mt-1 text-sm leading-relaxed">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

const APP_FEATURES: { icon: IconName; label: string }[] = [
  { icon: "video", label: "Live classes" },
  { icon: "play", label: "Recordings" },
  { icon: "notes", label: "Notes & PYQs" },
  { icon: "test", label: "Practice tests" },
];

/** HP-070 — Parikshe App. Store badge + feature icons, minimal copy. */
export function AppPromo() {
  return (
    <Section id="app" eyebrow="On the go" title="Learn on the Parikshe app">
      <div className="grid items-center gap-10 sm:grid-cols-2 sm:gap-12">
        <div className="mx-auto w-full max-w-64">
          <Image
            src="/parikshe/app-mockup.png"
            alt="The Parikshe app open on a phone."
            width={700}
            height={925}
            className="h-auto w-full drop-shadow-2xl"
          />
        </div>
        <div className="flex flex-col gap-6">
          <ul className="grid grid-cols-2 gap-3">
            {APP_FEATURES.map((f) => (
              <li
                key={f.label}
                className="border-border bg-surface flex items-center gap-2.5 rounded-xl border p-3"
              >
                <span className="bg-surface-accent text-brand-gold-ink grid h-9 w-9 shrink-0 place-items-center rounded-lg">
                  <Icon name={f.icon} className="h-5 w-5" />
                </span>
                <span className="text-text-primary text-sm font-semibold">
                  {f.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Icon name="star" className="text-brand-gold-600 h-5 w-5" />
            <span className="text-text-primary text-lg font-extrabold">
              {APP_STORE.rating}
            </span>
            <span className="text-text-muted text-sm">
              · {APP_STORE.reviews} reviews on Google Play
            </span>
          </div>

          <a
            href={APP_STORE.playStore}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download the Parikshe app on Google Play"
            className="focus-visible:outline-brand-gold w-fit rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <GooglePlayBadge className="h-14" />
          </a>
        </div>
      </div>
    </Section>
  );
}

/** HP-080 — Study Resources. */
export function StudyResources() {
  return (
    <Section
      id="resources"
      eyebrow="Beyond classes"
      title="Study resources"
      tone="muted"
    >
      <ul className="grid gap-6 sm:grid-cols-3">
        {STUDY_RESOURCES.map((r) => (
          <Card as="li" key={r.id} className="flex flex-col gap-3">
            <span className="bg-cta-bg text-cta-text grid h-12 w-12 place-items-center rounded-xl">
              <Icon name={r.icon} className="h-6 w-6" />
            </span>
            <p className="text-text-primary text-lg font-bold">{r.title}</p>
            <p className="text-text-muted flex-1 text-sm leading-relaxed">
              {r.body}
            </p>
            <ButtonLink
              href={r.ctaHref}
              variant="secondary"
              className="mt-2 w-fit"
            >
              {r.ctaLabel}
            </ButtonLink>
          </Card>
        ))}
      </ul>
    </Section>
  );
}

/** HP-090 / HP-091 — Free-vs-Paid, ONE component, rendered as TWO columns. */
export function FreeVsPaid() {
  return (
    <Section
      id="free-vs-paid"
      eyebrow="Free vs paid"
      title="Free YouTube content vs paid Parikshe products"
      intro="Both have their place — here is what a structured paid programme adds."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Free column */}
        <div className="border-border bg-surface rounded-2xl border p-6 sm:p-8">
          <span className="bg-surface-muted text-text-muted grid h-11 w-11 place-items-center rounded-xl">
            <Icon name="youtube" className="h-6 w-6" />
          </span>
          <h3 className="text-text-primary mt-3 text-xl font-bold">
            Free YouTube content
          </h3>
          <p className="text-text-muted mt-1 text-sm">
            Self-paced learning from public videos.
          </p>
          <ul className="divide-border mt-6 divide-y">
            {FREE_VS_PAID.map((row) => (
              <li
                key={row.parameter}
                className="flex items-start gap-3 py-3.5 text-sm"
              >
                <span
                  aria-hidden="true"
                  className="bg-surface-muted text-text-muted mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                >
                  <Icon name="minus" className="h-3 w-3" strokeWidth={2.5} />
                </span>
                <span>
                  <span className="text-text-primary font-semibold">
                    {row.parameter}:{" "}
                  </span>
                  <span className="text-text-muted">{row.free}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Paid column — highlighted */}
        <div className="border-brand-gold bg-surface relative rounded-2xl border-2 p-6 shadow-[0_16px_40px_-12px_rgba(234,179,8,0.35)] sm:p-8">
          <span className="bg-cta-bg text-cta-text absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-bold">
            Recommended
          </span>
          <span className="bg-cta-bg text-cta-text grid h-11 w-11 place-items-center rounded-xl">
            <Icon name="sparkle" className="h-6 w-6" />
          </span>
          <h3 className="text-text-primary mt-3 text-xl font-bold">
            Paid Parikshe products
          </h3>
          <p className="text-text-muted mt-1 text-sm">
            A structured programme aligned to your exam.
          </p>
          <ul className="divide-border mt-6 divide-y">
            {FREE_VS_PAID.map((row) => (
              <li
                key={row.parameter}
                className="flex items-start gap-3 py-3.5 text-sm"
              >
                <span
                  aria-hidden="true"
                  className="bg-cta-bg text-cta-text mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                >
                  <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                </span>
                <span>
                  <span className="text-text-primary font-semibold">
                    {row.parameter}:{" "}
                  </span>
                  <span className="text-text-muted">{row.paid}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-7">
            <ButtonLink href="#explore-courses" variant="primary">
              Explore paid courses
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

/** HP-110 — Student Stories / Testimonials, as an infinite auto-scrolling strip. */
export function StudentStories() {
  return (
    <Section
      id="stories"
      eyebrow="Student stories"
      title="Students love Parikshe"
      tone="muted"
    >
      <Marquee
        ariaLabel="Student testimonials"
        durationSec={55}
        items={STUDENT_STORIES}
        getKey={(s) => s.id}
        renderItem={(s) => (
          <article className="border-border bg-surface flex h-full flex-col gap-4 rounded-2xl border p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="bg-cta-bg text-cta-text grid h-12 w-12 place-items-center rounded-full text-base font-bold">
                {s.name.charAt(0)}
              </span>
              <div>
                <p className="text-text-primary text-sm font-bold">{s.name}</p>
                <p className="text-text-muted text-xs">{s.category}</p>
              </div>
            </div>
            {s.hasVideo ? <VideoTestimonialButton storyId={s.id} /> : null}
            <p className="text-text-muted text-sm leading-relaxed">{s.quote}</p>
            <p className="bg-surface-accent text-brand-gold-ink mt-auto inline-flex w-fit rounded-lg px-3 py-1.5 text-xs font-bold">
              {s.achievement}
            </p>
          </article>
        )}
      />
    </Section>
  );
}

import Image from "next/image";
import {
  CATEGORIES,
  WHY_CHOOSE,
  SCALE_METRICS,
  FREE_VS_PAID,
  STUDY_RESOURCES,
  STUDENT_STORIES,
  APP_STORE,
} from "../content";
import { Section, Card, ButtonLink, FeatureIcon } from "./primitives";
import { TrackedLink } from "./TrackedLink";
import { VideoTestimonialButton } from "./VideoTestimonialButton";
import { Marquee } from "./Marquee";
import { SidePromoCarousel } from "./SidePromoCarousel";

/**
 * HP-030 / HP-031 — Introduction. Two-column band: the pitch on the left, the
 * auto-rotating promo carousel (16:10, matched to the copy height) on the right.
 * The full metrics block lives in its own "Parikshe at scale" section, so here
 * we keep a single trust line under the actions.
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
            in Kannada and English — for SSLC, PUC, KCET, NEET and CA
            Foundation.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="#categories" variant="primary">
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
 * resolves it. Alternating zigzag rows with a large illustrative icon.
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
      <ol className="flex flex-col gap-6 sm:gap-4">
        {WHY_CHOOSE.map((item, i) => (
          <li
            key={item.id}
            className={`border-border bg-surface flex flex-col items-center gap-6 rounded-3xl border p-6 sm:gap-10 sm:p-8 ${
              i % 2 === 1 ? "sm:flex-row-reverse" : "sm:flex-row"
            }`}
          >
            {/* illustrative icon blob */}
            <div className="relative shrink-0">
              <span
                aria-hidden="true"
                className="bg-cta-bg/25 absolute -inset-3 rounded-full blur-xl"
              />
              <span className="bg-cta-bg text-cta-text relative grid h-24 w-24 place-items-center rounded-3xl sm:h-28 sm:w-28">
                <FeatureIcon name={item.icon} className="h-11 w-11" />
              </span>
            </div>

            <div className="text-center sm:text-left">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-[#fdecec] px-3 py-1 text-xs font-semibold text-[#b3261e]">
                <span aria-hidden="true">✕</span> {item.problem}
              </p>
              <p className="text-text-primary mt-3 text-lg font-extrabold sm:text-xl">
                {item.title}
              </p>
              <p className="text-text-muted mt-2 max-w-xl text-sm leading-relaxed sm:text-base">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/** HP-050 — Exam/Category Discovery: full cards (canonical browsing surface). */
export function CategoryDiscovery() {
  return (
    <Section
      id="categories"
      eyebrow="Find your path"
      title="Choose your exam or class"
      intro="Every category links straight through to its courses and study plan."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <Card
            as="li"
            key={c.id}
            id={`category-${c.id}`}
            className="flex flex-col gap-2"
          >
            <p className="text-text-primary text-lg font-bold">{c.label}</p>
            <p className="text-text-muted flex-1 text-sm leading-relaxed">
              {c.description}
            </p>
            <TrackedLink
              href={c.href}
              event={{
                type: "homepage.category_selected.v1",
                categoryId: c.id,
                source: "card",
              }}
              className="text-brand-gold-ink mt-3 inline-flex w-fit items-center gap-1 text-sm font-bold hover:gap-2"
            >
              Explore now <span aria-hidden="true">&rarr;</span>
            </TrackedLink>
          </Card>
        ))}
      </ul>
    </Section>
  );
}

/** HP-060 — Parikshe at Scale. Metrics Unverified (one footnote, not per-number). */
export function ScaleStats() {
  return (
    <Section
      id="scale"
      eyebrow="Trusted by students"
      title="Parikshe at scale"
      tone="muted"
    >
      <ul className="grid gap-6 sm:grid-cols-4">
        {SCALE_METRICS.map((m) => (
          <li
            key={m.id}
            className="border-brand-gold-600/30 bg-surface rounded-2xl border p-6 text-center shadow-sm"
          >
            <p className="text-brand-gold-ink text-4xl font-extrabold sm:text-5xl">
              {m.value}
            </p>
            <p className="text-text-primary mt-2 text-sm font-semibold">
              {m.label}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** HP-070 — Parikshe App. */
export function AppPromo() {
  return (
    <Section id="app" eyebrow="On the go" title="Learn on the Parikshe app">
      <div className="grid items-center gap-12 sm:grid-cols-2">
        <div className="mx-auto w-full max-w-70">
          <Image
            src="/parikshe/app-mockup.png"
            alt="The Parikshe app open on a phone showing the sign-in screen."
            width={700}
            height={925}
            className="h-auto w-full drop-shadow-2xl"
          />
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-text-muted text-lg">
            Attend live classes, watch recordings, read notes and take tests —
            all in one app.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-text-primary text-3xl font-extrabold">
              {APP_STORE.rating}
            </span>
            <span className="text-text-muted text-sm">
              on Google Play
              <br />
              {APP_STORE.reviews} reviews
            </span>
          </div>
          <ButtonLink
            href={APP_STORE.playStore}
            variant="primary"
            className="w-fit"
          >
            Get it on Google Play
          </ButtonLink>
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
          <h3 className="text-text-primary text-xl font-bold">
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
                  &ndash;
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
          <h3 className="text-text-primary text-xl font-bold">
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
                  className="bg-cta-bg text-cta-text mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold"
                >
                  &#10003;
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
            <ButtonLink href="#categories" variant="primary">
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

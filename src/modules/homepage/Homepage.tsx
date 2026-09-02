import { SiteHeader } from "./components/SiteHeader";
import { HeroCarousel } from "./components/HeroCarousel";
import {
  IntroAndChips,
  WhyChoose,
  AppPromo,
  StudyResources,
  FreeVsPaid,
  StudentStories,
} from "./components/Sections";
import { ExploreCourses } from "./components/ExploreCourses";
import { ResultsCarousel } from "./components/ResultsCarousel";
import { HomepageFaq } from "./components/HomepageFaq";
import { SiteFooter } from "./components/SiteFooter";
import { PromoPopup } from "./components/PromoPopup";
import { FloatingActions } from "./components/FloatingActions";
import { LeadCaptureCta } from "./components/LeadCaptureCta";
import { PageViewBeacon } from "./components/PageViewBeacon";

/**
 * Parikshe homepage — colour build.
 *
 * Section order and category anchors trace to
 * docs/requirements/HOMEPAGE_REQUIREMENTS.md. RSC-first: only genuinely
 * interactive pieces (header nav, carousels, lead form/dialog, popup, click
 * beacons) are client components.
 */
export function Homepage() {
  return (
    <>
      <PageViewBeacon />
      <a
        href="#main"
        className="focus:bg-brand-ink focus:text-text-inverse sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main" className="bg-background flex-1 pb-20 sm:pb-0">
        <HeroCarousel />

        <div className="bg-surface-accent border-border-strong border-b px-4 py-4 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
            <LeadCaptureCta
              label="Request a callback / counselling"
              entryPoint="hero-below"
              variant="primary"
            />
            <span className="text-text-muted text-xs">
              Not sure which course? Talk to a counsellor — it&rsquo;s free.
            </span>
          </div>
        </div>

        <ExploreCourses />
        <IntroAndChips />
        <WhyChoose />
        <AppPromo />
        <StudyResources />
        <FreeVsPaid />
        <ResultsCarousel />
        <StudentStories />
        <HomepageFaq />
        <SiteFooter />
      </main>

      {/* HP-500 — mobile sticky primary CTA. One action; page keeps bottom
          padding so nothing is obscured. */}
      <div className="border-border bg-surface fixed inset-x-0 bottom-0 z-30 border-t p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] sm:hidden">
        <div className="mx-auto max-w-6xl">
          <LeadCaptureCta
            label="Request a callback"
            entryPoint="mobile-sticky"
            className="w-full"
          />
        </div>
      </div>

      <FloatingActions />
      <PromoPopup />
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import {
  APP_STORE,
  CLASS_COURSES,
  CONTACT,
  GUIDE_BOOKS,
  type CourseLink,
} from "../content";
import { emitHomepageEvent } from "../analytics";
import { LeadCaptureCta } from "./LeadCaptureCta";

type OpenMenu = null | "courses" | "books";

/** Light-header wordmark. */
function Wordmark() {
  return (
    <span className="font-display text-text-primary text-xl font-extrabold tracking-tight">
      PAR<span className="text-brand-gold-ink">i</span>KSHE
    </span>
  );
}

/** "6366548224" → "+91 63665 48224" for display; href keeps the raw digits. */
function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(-10);
  return d.length === 10 ? `+91 ${d.slice(0, 5)} ${d.slice(5)}` : raw;
}

function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9z" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function BookLinks({
  items,
  groupId,
  onNavigate,
}: {
  items: readonly CourseLink[];
  groupId: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className="mt-2 flex flex-col gap-0.5">
      {items.map((b) => (
        <li key={b.href}>
          <a
            href={b.href}
            onClick={() => {
              emitHomepageEvent({
                type: "cta.clicked.v1",
                ctaId: `nav-${groupId}`,
              });
              onNavigate?.();
            }}
            className="text-text-muted hover:bg-surface-accent hover:text-text-primary block rounded-md px-2 py-1.5 text-sm"
          >
            {b.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Accordion list of classes → products; shared by the desktop mega-menu and
 * the mobile drawer. */
function ClassAccordion({
  activeClass,
  setActiveClass,
  onNavigate,
}: {
  activeClass: string;
  setActiveClass: (updater: (a: string) => string) => void;
  onNavigate?: () => void;
}) {
  return (
    <div>
      {CLASS_COURSES.map((c) => {
        const expanded = activeClass === c.id;
        return (
          <div
            key={c.id}
            className="border-border/60 border-b py-1 last:border-b-0"
          >
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setActiveClass((a) => (a === c.id ? "" : c.id))}
              onMouseEnter={() => setActiveClass(() => c.id)}
              onFocus={() => setActiveClass(() => c.id)}
              className="text-text-primary hover:bg-surface-muted flex w-full items-center justify-between gap-2 rounded-md px-2 py-2 text-sm font-semibold"
            >
              {c.label}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={`text-text-muted h-3.5 w-3.5 shrink-0 transition-transform ${
                  expanded ? "rotate-90" : ""
                }`}
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
            <ul hidden={!expanded} className="mb-2 ml-1 flex flex-col gap-0.5">
              {c.courses.map((p) => (
                <li key={p.href}>
                  <a
                    href={p.href}
                    onClick={() => {
                      emitHomepageEvent({
                        type: "cta.clicked.v1",
                        ctaId: `nav-course-${c.id}`,
                      });
                      onNavigate?.();
                    }}
                    className="text-text-muted hover:bg-surface-accent hover:text-text-primary block rounded-md px-2 py-1.5 text-sm"
                  >
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/**
 * HP-010 / HP-011 / HP-012 — Vedantu-style header.
 *
 * - `lg+`: wordmark + "Courses" mega-menu + "Books" menu + "Talk to our
 *   expert" (phone + lead form) + Login / Register. Menus open on hover +
 *   click, close on Escape / outside-click / mouse-leave.
 * - `<lg`: hamburger + wordmark + call icon + Login. The hamburger opens a
 *   drawer with the same courses/books/expert content.
 */
export function SiteHeader() {
  const [menu, setMenu] = useState<OpenMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeClass, setActiveClass] = useState<string>(
    CLASS_COURSES[0]?.id ?? "",
  );
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menu && !mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenu(null);
        setMobileOpen(false);
      }
    }
    function onPointer(e: PointerEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenu(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menu, mobileOpen]);

  function toggle(name: Exclude<OpenMenu, null>) {
    setMenu((m) => (m === name ? null : name));
  }

  return (
    <header
      ref={headerRef}
      className="border-border bg-surface sticky top-0 z-40 border-b shadow-sm"
    >
      <div
        className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6"
        onMouseLeave={() => setMenu(null)}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => {
              setMobileOpen((o) => !o);
              setMenu(null);
            }}
            className="text-text-primary hover:bg-surface-muted -ml-1 grid h-10 w-10 place-items-center rounded-md lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              className="h-5 w-5"
            >
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>

          <a
            href="#top"
            aria-label="Parikshe home"
            className="flex shrink-0 items-center"
            onClick={() => {
              emitHomepageEvent({
                type: "cta.clicked.v1",
                ctaId: "header-logo",
              });
              setMobileOpen(false);
            }}
          >
            <Wordmark />
          </a>
        </div>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center gap-1 lg:flex"
        >
          <div>
            <button
              type="button"
              aria-expanded={menu === "courses"}
              aria-controls="nav-courses-panel"
              onClick={() => toggle("courses")}
              onMouseEnter={() => setMenu("courses")}
              className="text-text-muted hover:text-text-primary aria-expanded:text-text-primary inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold"
            >
              Courses
              <Chevron open={menu === "courses"} />
            </button>

            <div
              id="nav-courses-panel"
              hidden={menu !== "courses"}
              className="border-border bg-surface absolute top-full left-0 z-50 mt-1 w-96 rounded-2xl border shadow-xl"
            >
              <div className="max-h-[75vh] overflow-y-auto p-6">
                <p className="font-display text-text-muted text-xs font-bold tracking-wide uppercase">
                  Find courses by class
                </p>
                <div className="mt-2">
                  <ClassAccordion
                    activeClass={activeClass}
                    setActiveClass={setActiveClass}
                  />
                </div>
                <div className="border-border mt-4 border-t pt-4">
                  <p className="font-display text-text-muted text-xs font-bold tracking-wide uppercase">
                    Find popular books
                  </p>
                  <BookLinks items={GUIDE_BOOKS} groupId="courses-books" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              aria-expanded={menu === "books"}
              aria-controls="nav-books-panel"
              onClick={() => toggle("books")}
              onMouseEnter={() => setMenu("books")}
              className="text-text-muted hover:text-text-primary aria-expanded:text-text-primary inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold"
            >
              Books
              <Chevron open={menu === "books"} />
            </button>

            <div
              id="nav-books-panel"
              hidden={menu !== "books"}
              className="border-border bg-surface absolute top-full left-0 z-50 mt-1 w-96 rounded-2xl border shadow-xl"
            >
              <div className="p-6">
                <p className="font-display text-text-muted text-xs font-bold tracking-wide uppercase">
                  Find popular books
                </p>
                <BookLinks items={GUIDE_BOOKS} groupId="books" />
              </div>
            </div>
          </div>

          <a
            href={APP_STORE.playStore}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              emitHomepageEvent({
                type: "cta.clicked.v1",
                ctaId: "navbar-download-app",
              })
            }
            className="text-text-muted hover:text-text-primary inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
            </svg>
            Download app
          </a>

          <div className="ml-2 flex items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
              <PhoneIcon />
            </span>
            <span className="flex flex-col">
              <LeadCaptureCta
                label="Talk to our expert"
                entryPoint="navbar"
                variant="bare"
                className="text-text-muted hover:text-text-primary py-1.5 text-[11px] font-semibold"
              />
              {CONTACT.phone ? (
                <a
                  href={`tel:${CONTACT.phone}`}
                  onClick={() =>
                    emitHomepageEvent({
                      type: "cta.clicked.v1",
                      ctaId: "navbar-call",
                    })
                  }
                  className="text-text-primary hover:text-brand-gold-ink py-1 text-sm font-bold tracking-tight"
                >
                  {formatPhone(CONTACT.phone)}
                </a>
              ) : null}
            </span>
          </div>
        </nav>

        <div className="flex items-center gap-1.5">
          {CONTACT.phone ? (
            <a
              href={`tel:${CONTACT.phone}`}
              aria-label="Call Parikshe"
              onClick={() =>
                emitHomepageEvent({
                  type: "cta.clicked.v1",
                  ctaId: "navbar-call",
                })
              }
              className="text-text-primary bg-surface-muted hover:bg-border grid h-9 w-9 place-items-center rounded-full lg:hidden"
            >
              <PhoneIcon />
            </a>
          ) : null}
          <a
            href="#"
            className="bg-cta-bg text-cta-text hover:bg-cta-bg-hover shrink-0 rounded-md px-3 py-2 text-sm font-bold shadow-sm sm:px-4"
            onClick={() =>
              emitHomepageEvent({
                type: "cta.clicked.v1",
                ctaId: "header-login",
              })
            }
          >
            <span className="sm:hidden">Login</span>
            <span className="hidden sm:inline">Login / Register</span>
          </a>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!mobileOpen}
        className="border-border bg-surface absolute inset-x-0 top-full z-50 max-h-[80vh] overflow-y-auto border-b shadow-xl lg:hidden"
      >
        <div className="px-4 py-4">
          <p className="font-display text-text-muted text-xs font-bold tracking-wide uppercase">
            Find courses by class
          </p>
          <div className="mt-2">
            <ClassAccordion
              activeClass={activeClass}
              setActiveClass={setActiveClass}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>

          <div className="border-border mt-4 border-t pt-4">
            <p className="font-display text-text-muted text-xs font-bold tracking-wide uppercase">
              Find popular books
            </p>
            <BookLinks
              items={GUIDE_BOOKS}
              groupId="mobile-books"
              onNavigate={() => setMobileOpen(false)}
            />
          </div>

          <div className="border-border mt-4 flex flex-col gap-3 border-t pt-4">
            <a
              href={APP_STORE.playStore}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                emitHomepageEvent({
                  type: "cta.clicked.v1",
                  ctaId: "navbar-download-app",
                });
                setMobileOpen(false);
              }}
              className="border-border-strong text-text-primary hover:bg-surface-muted inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-bold"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
              </svg>
              Download app
            </a>
            <LeadCaptureCta
              label="Talk to our expert"
              entryPoint="navbar-mobile"
              variant="secondary"
              className="w-full"
            />
            {CONTACT.phone ? (
              <a
                href={`tel:${CONTACT.phone}`}
                onClick={() =>
                  emitHomepageEvent({
                    type: "cta.clicked.v1",
                    ctaId: "navbar-call",
                  })
                }
                className="text-text-primary inline-flex items-center justify-center gap-2 text-sm font-bold"
              >
                <PhoneIcon />
                {formatPhone(CONTACT.phone)}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

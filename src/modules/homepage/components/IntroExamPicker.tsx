"use client";

import { useState } from "react";
import { INTRO_EXAMS } from "../content";
import { emitHomepageEvent } from "../analytics";

/**
 * Intro section — exam pills. Hovering / focusing a pill reveals a panel with
 * that exam's courses; the panel is hidden again once the pointer / focus
 * leaves the group.
 */
export function IntroExamPicker() {
  const [activeId, setActiveId] = useState("");
  const exam = INTRO_EXAMS.find((e) => e.id === activeId);

  return (
    <div
      className="mt-4"
      onMouseLeave={() => setActiveId("")}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setActiveId("");
      }}
    >
      <ul className="flex flex-wrap gap-2">
        {INTRO_EXAMS.map((e) => {
          const on = e.id === activeId;
          return (
            <li key={e.id}>
              <button
                type="button"
                aria-expanded={on}
                onMouseEnter={() => setActiveId(e.id)}
                onFocus={() => setActiveId(e.id)}
                onClick={() => setActiveId((v) => (v === e.id ? "" : e.id))}
                className={`inline-flex rounded-full border px-4 py-2 text-sm font-bold transition-all ${
                  on
                    ? "border-brand-gold bg-cta-bg text-cta-text shadow-sm"
                    : "border-brand-gold-600/40 text-brand-gold-ink hover:border-brand-gold hover:bg-surface-accent bg-white"
                }`}
              >
                {e.label}
              </button>
            </li>
          );
        })}
      </ul>

      {exam ? (
        <div className="border-brand-gold-600/30 bg-surface animate-rise-in mt-3 rounded-2xl border p-4 shadow-[0_16px_40px_-16px_rgba(234,179,8,0.35)] sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-text-primary text-sm font-extrabold">
              {exam.label} courses{" "}
              <span className="text-brand-gold-ink font-bold">
                ({exam.courses.length})
              </span>
            </p>
            <a
              href={exam.href}
              onClick={() =>
                emitHomepageEvent({
                  type: "cta.clicked.v1",
                  ctaId: `intro-exam-all-${exam.id}`,
                })
              }
              className="text-brand-gold-ink hover:bg-surface-accent shrink-0 rounded-full px-2.5 py-1 text-xs font-bold"
            >
              See all &rarr;
            </a>
          </div>

          <ul className="mt-3 grid gap-1 sm:grid-cols-2">
            {exam.courses.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  onClick={() =>
                    emitHomepageEvent({
                      type: "cta.clicked.v1",
                      ctaId: `intro-exam-course-${exam.id}`,
                    })
                  }
                  className="text-text-muted hover:bg-surface-accent hover:text-brand-gold-ink flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium"
                >
                  <span
                    aria-hidden="true"
                    className="bg-brand-gold h-1.5 w-1.5 shrink-0 rounded-full"
                  />
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

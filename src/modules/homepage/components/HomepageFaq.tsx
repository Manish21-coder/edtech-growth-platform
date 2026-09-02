import { FAQ_ITEMS } from "../content";
import { Section } from "./primitives";

/**
 * HP-120 — homepage FAQ. Native <details>/<summary>: keyboard operable, works
 * with JS disabled. FAQ structured data is withheld until the answers are
 * product-owner-approved.
 */
export function HomepageFaq() {
  return (
    <Section id="faq" eyebrow="Questions" title="Frequently asked questions">
      <div className="divide-border border-border bg-surface mx-auto max-w-3xl divide-y rounded-2xl border px-5 sm:px-7">
        {FAQ_ITEMS.map((item) => (
          <details key={item.id} className="group py-5">
            <summary className="text-text-primary flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
              {item.question}
              <span
                aria-hidden="true"
                className="bg-surface-accent text-brand-gold-ink grid h-6 w-6 shrink-0 place-items-center rounded-full"
              >
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">&minus;</span>
              </span>
            </summary>
            <p className="text-text-muted mt-3 text-sm leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}

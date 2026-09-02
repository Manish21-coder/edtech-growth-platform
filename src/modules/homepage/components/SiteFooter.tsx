import Link from "next/link";
import { CONTACT, NAV_LINKS } from "../content";
import { Section, PendingTag } from "./primitives";
import { LeadCaptureCta } from "./LeadCaptureCta";

/**
 * HP-130 / HP-200s — Contact & footer.
 * email + phone approved; WhatsApp = wa.me on the approved number; social =
 * Instagram + YouTube (Facebook / LinkedIn excluded); no physical address.
 */
export function SiteFooter() {
  const { instagram, youtube } = CONTACT.social;
  const year = new Date().getFullYear();

  return (
    <>
      <Section id="contact" eyebrow="Get in touch" title="Contact us">
        <div className="grid gap-8 sm:grid-cols-2">
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <span className="text-text-primary font-semibold">Email </span>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-brand-gold-ink underline underline-offset-2"
              >
                {CONTACT.email}
              </a>
            </li>
            <li>
              <span className="text-text-primary font-semibold">Phone </span>
              {CONTACT.phone ? (
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="text-brand-gold-ink underline underline-offset-2"
                >
                  {CONTACT.phone}
                </a>
              ) : (
                <PendingTag what="phone number" />
              )}
            </li>
            {CONTACT.whatsapp ? (
              <li>
                <span className="text-text-primary font-semibold">
                  WhatsApp{" "}
                </span>
                <a
                  href={CONTACT.whatsapp}
                  rel="noopener noreferrer"
                  className="text-brand-gold-ink underline underline-offset-2"
                >
                  Chat with us
                </a>
              </li>
            ) : null}
            <li className="flex flex-wrap gap-x-4 pt-1">
              <span className="text-text-primary font-semibold">Follow</span>
              {instagram ? (
                <a
                  href={instagram}
                  rel="noopener noreferrer"
                  className="text-brand-gold-ink underline underline-offset-2"
                >
                  Instagram
                </a>
              ) : null}
              {youtube ? (
                <a
                  href={youtube}
                  rel="noopener noreferrer"
                  className="text-brand-gold-ink underline underline-offset-2"
                >
                  YouTube
                </a>
              ) : null}
            </li>
          </ul>

          <div className="border-border bg-surface-muted flex flex-col gap-3 rounded-2xl border p-6">
            <p className="font-display text-text-primary text-lg font-bold">
              Prefer a call back?
            </p>
            <p className="text-text-muted text-sm">
              Tell us your exam and a counsellor will reach out.
            </p>
            <LeadCaptureCta
              label="Request a callback"
              entryPoint="contact-section"
            />
          </div>
        </div>
      </Section>

      <footer className="border-border bg-surface-muted text-text-primary border-t px-4 py-10 text-sm sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="font-display text-text-primary text-xl font-extrabold tracking-tight">
              PAR<span className="text-brand-gold-ink">i</span>KSHE
            </span>
            <p className="text-text-muted mt-2 max-w-xs">
              Karnataka&rsquo;s learning destination for SSLC, PUC, KCET, NEET
              and CA Foundation.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="text-text-muted flex flex-wrap gap-x-5 gap-y-2">
              {NAV_LINKS.map((link) =>
                link.href.startsWith("/") ? (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-text-primary">
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-text-primary">
                      {link.label}
                    </a>
                  </li>
                ),
              )}
              <li>
                <a href="#" className="hover:text-text-primary">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-text-primary">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <p className="text-text-muted mx-auto mt-8 max-w-6xl text-xs">
          &copy; {year} Parikshe. All rights reserved.
        </p>
      </footer>
    </>
  );
}

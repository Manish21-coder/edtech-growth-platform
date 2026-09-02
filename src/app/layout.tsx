import type { Metadata } from "next";
import { Poppins, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

/**
 * Type pairing:
 *  - Bricolage Grotesque — display / headings (characterful, high-contrast).
 *  - Poppins — body / UI (friendly, legible).
 */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Parikshe | Karnataka's learning destination for SSLC, PUC, KCET, NEET & CA Foundation",
  description:
    "Parikshe offers expert-led online courses, study material, practice tests and exam preparation for SSLC, PUC, KCET, NEET and CA Foundation students across Karnataka.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

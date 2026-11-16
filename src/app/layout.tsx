import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sulayhamcarefoundation.org.ng"),
  title: {
    default: "Sulayham Care Foundation — Together for better lives",
    template: "%s · Sulayham Care Foundation",
  },
  description:
    "SCAF is a Nigerian non-governmental organisation based in Jimeta-Yola, Adamawa State, working on health, education, livelihood, climate, governance and gender-based violence.",
  keywords: [
    "Sulayham Care Foundation",
    "SCAF",
    "NGO Adamawa",
    "Nigeria NGO",
    "Jimeta Yola",
    "gender-based violence Nigeria",
    "community health Adamawa",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Sulayham Care Foundation",
    title: "Sulayham Care Foundation — Together for better lives",
    description:
      "Community-led health, education, livelihood and protection programming in Adamawa State, Nigeria.",
    images: ["/scaf-logo.jpeg"],
  },
  // The cut-out mark for the tab icon; the full logo, which has an opaque
  // background, for social cards where transparency renders badly.
  icons: { icon: "/scaf-mark.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

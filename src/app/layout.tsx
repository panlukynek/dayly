import type { Metadata, Viewport } from "next";
import { ViewTransitions } from "next-view-transitions";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "lenis/dist/lenis.css";
import "./globals.css";

import SmoothScrolling from "@/components/providers/SmoothScrolling";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://dayly.app"),
  title: {
    default: "DAYLY — osobní AI agent pro každý den",
    template: "%s — DAYLY",
  },
  description:
    "DAYLY je osobní AI agent s dlouhodobou pamětí. Každé ráno brifink, přes den připomínky a návrhy, večer učení. Postupně přebírá rutinu za tebe.",
  openGraph: {
    title: "DAYLY — osobní AI agent pro každý den",
    description:
      "Agent s dlouhodobou pamětí, který tě zná a postupně přebírá rutinu. Privacy-first, made in EU.",
    locale: "cs_CZ",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#161617",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="cs" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <body>
          <SmoothScrolling>
            <Nav />
            <main>{children}</main>
            <Footer />
          </SmoothScrolling>
        </body>
      </html>
    </ViewTransitions>
  );
}

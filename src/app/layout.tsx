import type { Metadata, Viewport } from "next";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-serif/400-italic.css";
import "lenis/dist/lenis.css";
import "./globals.css";

import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Almanac — a calm, local-first workspace",
    template: "%s · Almanac",
  },
  description:
    "Calendar, tasks, your Obsidian vault, and an assistant that can actually read your notes. Markdown on disk, an .ics file, no database, no accounts.",
};

export const viewport: Viewport = {
  themeColor: "#161617",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <Nav />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}

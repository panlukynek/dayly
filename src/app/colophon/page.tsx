import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import GetStarted from "@/components/GetStarted";
import PaletteGrid from "@/components/colophon/PaletteGrid";
import styles from "./Colophon.module.css";

export const metadata: Metadata = {
  title: "Colophon",
  description:
    "How Almanac and this site are put together: oldworld.nvim colours, IBM Plex type, Carbon-ish structure, and a dependency list audited against 2026's npm supply-chain incidents.",
};

export default function ColophonPage() {
  return (
    <>
      <PageHead
        eyebrow="colophon"
        title={
          <>
            Borrowed structure, borrowed colour,{" "}
            <span className="serif">honest seams</span>.
          </>
        }
        lead="The app and this site share one visual language: layout discipline from IBM Carbon, colour from a Neovim theme, and IBM Plex doing all the talking. This page documents the parts — copy anything."
      />

      {/* ---------- colour ---------- */}
      <section className="section hairline-top">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">c·01 — colour</span>
            <h2 className={styles.h2}>
              oldworld.nvim, <span className="serif">verbatim</span>.
            </h2>
            <div className={styles.body}>
              <p>
                The palette is lifted straight from{" "}
                <strong>dgox16/oldworld.nvim</strong> (default variant) — warm
                sumi-ink darks with muted pastel accents, a terminal
                colourscheme that happens to make a very calm website. Nothing
                was &quot;brand-adjusted&quot;. Click a swatch to copy the hex.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <PaletteGrid />
          </Reveal>
        </div>
      </section>

      {/* ---------- type ---------- */}
      <section className="section hairline-top tinted">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">c·02 — type</span>
            <h2 className={styles.h2}>One family, three voices.</h2>
            <div className={styles.body}>
              <p>
                IBM Plex, self-hosted. Sans carries the interface, Mono carries
                metadata and everything machine-shaped, Serif italic gets the
                few words per page that earn it.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className={styles.specimens}>
              <div className={styles.specimen}>
                <span className={styles.specLabel}>
                  <b>IBM Plex Sans</b> 400 · 500 · 600 <span>interface &amp; headings</span>
                </span>
                <span className={styles.specSans}>A calm, local-first workspace.</span>
              </div>
              <div className={styles.specimen}>
                <span className={styles.specLabel}>
                  <b>IBM Plex Serif</b> 400 italic <span>the accent voice</span>
                </span>
                <span className={styles.specSerif}>everything is a file</span>
              </div>
              <div className={styles.specimen}>
                <span className={styles.specLabel}>
                  <b>IBM Plex Mono</b> 400 · 500 <span>metadata &amp; wire</span>
                </span>
                <span className={styles.specMono}>
                  event: permission · create_todo_list ⏸ promise parked
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- structure ---------- */}
      <section className="section hairline-top">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">c·03 — structure</span>
            <h2 className={styles.h2}>
              Carbon&apos;s discipline, without the corporation.
            </h2>
            <div className={styles.body}>
              <p>
                Square corners everywhere — <strong>border-radius: 0 is a
                design decision</strong>, not an omission. Surfaces stack in
                three layers, separated by 1px hairlines instead of shadows.
                Small caps mono eyebrows label every section, the way Carbon
                labels its data tables.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className={styles.demos}>
              <div className={styles.demo}>
                <span className={styles.demoLabel}>corners</span>
                <div className={styles.demoBox}>radius: 0</div>
              </div>
              <div className={styles.demo}>
                <span className={styles.demoLabel}>layers</span>
                <div className={styles.demoLayers}>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className={styles.demo}>
                <span className={styles.demoLabel}>hairlines</span>
                <div className={styles.demoBox} style={{ borderStyle: "solid none" }}>
                  1px, gray2
                </div>
              </div>
              <div className={styles.demo}>
                <span className={styles.demoLabel}>eyebrow</span>
                <div className={styles.demoBox}>
                  <span className="eyebrow">
                    <b>c·03</b> — structure
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- this site ---------- */}
      <section className="section hairline-top tinted">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">c·04 — this site</span>
            <h2 className={styles.h2}>What this page is running on.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className={styles.stack}>
              <div className={styles.stackRow}>
                <span className={styles.stackKey}>framework</span>
                <span className={styles.stackVal}>
                  <b>Next.js 16.2.10</b> (App Router) on Bun — first-party View
                  Transitions for route changes
                </span>
              </div>
              <div className={styles.stackRow}>
                <span className={styles.stackKey}>scroll</span>
                <span className={styles.stackVal}>
                  <b>Lenis</b> pumped by the GSAP ticker — one rAF loop for
                  smoothing and ScrollTrigger both
                </span>
              </div>
              <div className={styles.stackRow}>
                <span className={styles.stackKey}>choreography</span>
                <span className={styles.stackVal}>
                  <b>GSAP</b> + ScrollTrigger, SplitText, DrawSVG — pins, scrubs
                  and the assistant replay; <b>motion</b> handles the small
                  in-view reveals
                </span>
              </div>
              <div className={styles.stackRow}>
                <span className={styles.stackKey}>3d</span>
                <span className={styles.stackVal}>
                  <b>three.js</b> — ~5k shader points morphing cloud → grid with
                  scroll on the front page
                </span>
              </div>
              <div className={styles.stackRow}>
                <span className={styles.stackKey}>styling</span>
                <span className={styles.stackVal}>
                  CSS Modules over custom properties. <b>No Tailwind.</b>
                </span>
              </div>
              <div className={styles.stackRow}>
                <span className={styles.stackKey}>accessibility</span>
                <span className={styles.stackVal}>
                  every pin, scrub, split and particle respects{" "}
                  <b>prefers-reduced-motion</b> — the content is complete with
                  all animation off
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className={styles.note}>
              <b>supply-chain note (july 2026):</b> dependency versions were
              chosen after checking this year&apos;s npm incidents — the axios
              backdoor (1.14.1), the tanstack compromise, node-ipc, and the
              phantom-gyp worm. none of this site&apos;s dependencies (next,
              gsap, lenis, three, motion, fontsource) appear on the affected
              lists; next 16.2.10 postdates vercel&apos;s may 2026 security
              release. lockfile committed, versions pinned by it.
            </div>
          </Reveal>
        </div>
      </section>

      <GetStarted />
    </>
  );
}

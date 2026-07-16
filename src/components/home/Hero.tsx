"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import HeroField from "./HeroField";
import styles from "./Hero.module.css";

gsap.registerPlugin(SplitText);

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const title = titleRef.current;
    if (!root || !title) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let split: SplitText | undefined;
    let tl: gsap.core.Timeline | undefined;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;

      split = new SplitText(title, { type: "words", wordsClass: styles.word });
      tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(split.words, {
        yPercent: 110,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.055,
        delay: 0.1,
      }).from(
        root.querySelectorAll("[data-hero-fade]"),
        { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.1 },
        "-=0.45",
      );
    });

    return () => {
      cancelled = true;
      tl?.kill();
      split?.revert();
    };
  }, []);

  return (
    <section className={styles.hero} ref={rootRef}>
      <HeroField />
      <div className={styles.fade} aria-hidden="true" />
      <span className={styles.scrollHint} aria-hidden="true">
        scroll
      </span>

      <div className={`shell ${styles.inner}`}>
        <div className={styles.eyebrowRow} data-hero-fade>
          <span className="eyebrow">
            <b>almanac</b> — a calm, local-first workspace
          </span>
        </div>

        <h1 className={styles.title} ref={titleRef}>
          Your day is a folder of <span className="serif">plain text</span>.
        </h1>

        <p className={styles.sub} data-hero-fade>
          A calendar, a task list, your Obsidian vault, and an assistant that can
          actually read your notes. Tasks are <code className="chip">- [ ]</code>{" "}
          lines. The calendar is an <code className="chip">.ics</code> file.
          There is no database.
        </p>

        <div className={styles.row} data-hero-fade>
          <div className={styles.btns}>
            <Link href="/how-it-works" className="btn btn-primary">
              How it works
            </Link>
            <Link href="/manual" className="btn btn-ghost">
              Run it locally
            </Link>
          </div>
          <span className={styles.stack}>
            sveltekit<i>·</i>node<i>·</i>markdown<i>·</i>ics<i>·</i>sse
          </span>
        </div>
      </div>
    </section>
  );
}

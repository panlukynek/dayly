"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import styles from "./Statement.module.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Big manifesto paragraph that brightens word-by-word as you scroll through it. */
export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let split: SplitText | undefined;
    let tween: gsap.core.Tween | undefined;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;

      split = new SplitText(el, { type: "words", wordsClass: styles.word });
      tween = gsap.fromTo(
        split.words,
        { color: "var(--ow-gray5)" },
        {
          color: "var(--ow-fg)",
          stagger: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            end: "bottom 42%",
            scrub: 0.4,
          },
        },
      );
    });

    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className="shell">
        <span className="eyebrow">01 — the refusal</span>
        <p className={styles.text} ref={ref} style={{ marginTop: "1.5rem" }}>
          Every productivity app wants to become your system of record. Almanac
          refuses. The calendar is an .ics file. Tasks are checklists inside
          your own notes. Uninstall it tomorrow and you lose nothing — not one
          event, not one line.
        </p>
        <div className={styles.foot}>
          <span>
            <b>Calendar.ics</b> — importable anywhere
          </span>
          <span>
            <b>- [ ] in *.md</b> — editable in Obsidian
          </span>
          <span>
            <b>localStorage</b> — only per-device prefs
          </span>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import styles from "./Principles.module.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PRINCIPLES = [
  {
    num: "p·01",
    statement: "Plain text will outlive every app that reads it.",
    note: "including this one",
  },
  {
    num: "p·02",
    statement: "Read tools run free. Write tools ask first.",
    note: "allow / deny, every time",
  },
  {
    num: "p·03",
    statement: "Your key stays server-side. Your notes stay home.",
    note: "the browser never sees either",
  },
  {
    num: "p·04",
    statement: "Offline is not a feature flag — there is no server to lose.",
    note: "localhost:5173",
  },
];

export default function Principles() {
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = rowsRef.current;
    if (!rows) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let splits: SplitText[] = [];
    const triggers: ScrollTrigger[] = [];
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;

      rows.querySelectorAll<HTMLElement>(`.${styles.statement}`).forEach((el) => {
        const split = new SplitText(el, { type: "lines", mask: "lines" });
        splits.push(split);
        const tween = gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
          },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });
    });

    return () => {
      cancelled = true;
      triggers.forEach((t) => t.kill());
      splits.forEach((s) => s.revert());
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className="shell">
        <span className="eyebrow">05 — house rules</span>
        <div className={styles.rows} ref={rowsRef}>
          {PRINCIPLES.map((p) => (
            <div className={styles.row} key={p.num}>
              <span className={styles.num}>{p.num}</span>
              <h3 className={styles.statement}>{p.statement}</h3>
              <span className={styles.note}>{p.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

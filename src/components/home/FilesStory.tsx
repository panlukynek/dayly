"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Terminal from "@/components/Terminal";
import styles from "./FilesStory.module.css";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Tasks are markdown",
    text: "Almanac collects every `- [ ]` line across your vault and groups them by file. Tick one anywhere — the app, the Today screen, the assistant — and it rewrites that exact line on disk.",
  },
  {
    num: "02",
    title: "The calendar is an .ics file",
    text: "Events serialize to plain iCalendar in your vault. Subscribe to it from Google or Apple Calendar, sync it with the vault, or read it with grep when you feel like it.",
  },
  {
    num: "03",
    title: "The vault stays a folder",
    text: "Your Obsidian vault is read in place — recursive listing, live content search, rendered markdown. Every path is resolved inside the vault root, so nothing can reach outside it.",
  },
];

export default function FilesStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stepEls = stepsRef.current
      ? Array.from(stepsRef.current.children).filter(
          (el): el is HTMLElement => el instanceof HTMLElement,
        )
      : [];
    const panelEls = panelsRef.current
      ? Array.from(panelsRef.current.children).filter(
          (el): el is HTMLElement => el instanceof HTMLElement,
        )
      : [];
    if (!section || stepEls.length === 0 || panelEls.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 861px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(panelEls.slice(1), { autoAlpha: 0 });
      stepEls[0].classList.add(styles.stepActive);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: pinRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 0.4,
          onUpdate: (self) => {
            const idx = Math.min(2, Math.floor(self.progress * 3));
            stepEls.forEach((el, i) =>
              el.classList.toggle(styles.stepActive, i === idx),
            );
          },
        },
      });

      // step 1: the checkbox ticks itself
      if (tickRef.current) {
        tl.to(tickRef.current, { opacity: 1, duration: 0.12 }, 0.1);
      }
      // step 1 → 2
      tl.to(panelEls[0], { autoAlpha: 0, duration: 0.12 }, 0.3);
      tl.to(panelEls[1], { autoAlpha: 1, duration: 0.12 }, 0.34);
      // step 2 → 3
      tl.to(panelEls[1], { autoAlpha: 0, duration: 0.12 }, 0.63);
      tl.to(panelEls[2], { autoAlpha: 1, duration: 0.12 }, 0.67);
      // breathing room at the end of the pin
      tl.to({}, { duration: 0.25 });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(panelEls, { clearProps: "all" });
      };
    });

    mm.add("(max-width: 860px), (prefers-reduced-motion: reduce)", () => {
      stepEls.forEach((el) => el.classList.add(styles.stepActive));
      if (tickRef.current) tickRef.current.style.opacity = "1";
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef} id="files">
      <div className={styles.pin} ref={pinRef}>
        <div className={`shell ${styles.grid}`}>
          <div>
            <span className="eyebrow">03 — everything is a file</span>
            <h2 className={styles.title}>
              Data formats you could <span className="serif">leave with</span>.
            </h2>
            <div className={styles.steps} ref={stepsRef}>
              {STEPS.map((s) => (
                <div className={styles.step} key={s.num}>
                  <span className={styles.stepNum}>{s.num}</span>
                  <div>
                    <h3 className={styles.stepTitle}>{s.title}</h3>
                    <p className={styles.stepText}>{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.panels} ref={panelsRef}>
            <div className={styles.panel}>
              <Terminal title="~/vault/Tasks.md" meta="markdown">
                <pre>
                  <code>
                    <span className="tl-kw"># Tasks</span>{"\n\n"}
                    - [
                    <span className={styles.tickWrap}>
                      {" "}
                      <span className={`${styles.tickOn}`} ref={tickRef}>
                        x
                      </span>
                    </span>
                    ] call the framer about the print{"\n"}
                    - [ ] renew the domain <span className="tl-com">‹ drag to reorder</span>{"\n"}
                    - [x] <span className="tl-dim">back up the vault</span>{"\n\n"}
                    <span className="tl-kw"># Garden</span>{"\n\n"}
                    - [ ] order seed potatoes{"\n"}
                    - [ ] sharpen the scythe
                  </code>
                </pre>
              </Terminal>
            </div>

            <div className={styles.panel}>
              <Terminal title="~/vault/Calendar.ics" meta="iCalendar">
                <pre>
                  <code>
                    <span className="tl-kw">BEGIN:VCALENDAR</span>{"\n"}
                    <span className="tl-key">VERSION</span>:2.0{"\n"}
                    <span className="tl-key">PRODID</span>:-//almanac//EN{"\n"}
                    <span className="tl-kw">BEGIN:VEVENT</span>{"\n"}
                    <span className="tl-key">UID</span>:af52…@almanac{"\n"}
                    <span className="tl-key">DTSTART</span>:<span className="tl-num">20260421T100000</span>{"\n"}
                    <span className="tl-key">SUMMARY</span>:<span className="tl-str">repair café, Karlín</span>{"\n"}
                    <span className="tl-kw">END:VEVENT</span>{"\n"}
                    <span className="tl-kw">END:VCALENDAR</span>
                  </code>
                </pre>
              </Terminal>
            </div>

            <div className={styles.panel}>
              <Terminal title="~/vault" meta="read in place">
                <pre>
                  <code>
                    <span className="tl-prompt">$</span> <span className="tl-cmd">tree -L 2 --dirsfirst</span>{"\n"}
                    .{"\n"}
                    ├── daily/ <span className="tl-com">· 89 notes</span>{"\n"}
                    ├── projects/{"\n"}
                    │   ├── harvest.md{"\n"}
                    │   └── stove.md{"\n"}
                    ├── Calendar.ics{"\n"}
                    └── Tasks.md{"\n\n"}
                    <span className="tl-prompt">$</span> <span className="tl-cmd">rg &quot;woodshed&quot; -l</span>{"\n"}
                    <span className="tl-str">projects/stove.md</span> <span className="tl-com">· same result in the app</span>
                  </code>
                </pre>
              </Terminal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

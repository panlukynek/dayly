"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScreensRail.module.css";

gsap.registerPlugin(ScrollTrigger);

function TodayMock() {
  return (
    <div className={styles.mock}>
      <div className={styles.mBar}>
        <span>tue · apr 21</span>
        <span>07:12</span>
      </div>
      <span className="soft">Good morning.</span>
      <div className={styles.mCheck}>
        <i className={styles.mBox} /> finish the harvest post
      </div>
      <div className={styles.mCheck}>
        <i className={`${styles.mBox} ${styles.mBoxOn}`}>✓</i> water the sourdough starter
      </div>
      <div className={styles.mEvent}>10:00 — repair café, Karlín</div>
      <div className={styles.mLine} style={{ "--w": "52%" } as React.CSSProperties} />
    </div>
  );
}

function CalendarMock() {
  const cells = Array.from({ length: 21 });
  return (
    <div className={styles.mock}>
      <div className={styles.mBar}>
        <span>april 2026</span>
        <span>Calendar.ics</span>
      </div>
      <div className={styles.mGrid7}>
        {cells.map((_, i) => (
          <i key={i} className={`${styles.mCell} ${i === 9 ? styles.mCellOn : ""}`} />
        ))}
      </div>
      <div className={styles.mEvent}>BEGIN:VEVENT · repair café</div>
    </div>
  );
}

function TasksMock() {
  return (
    <div className={styles.mock}>
      <div className={styles.mBar}>
        <span>tasks</span>
        <span>3 files</span>
      </div>
      <span className="dim"># Tasks.md</span>
      <div className={styles.mCheck}>
        <i className={styles.mBox} /> call the framer about the print
      </div>
      <div className={`${styles.mCheck} ${styles.mDrag}`}>
        <i className={styles.mBox} /> renew the domain
      </div>
      <div className={styles.mCheck}>
        <i className={`${styles.mBox} ${styles.mBoxOn}`}>✓</i> back up the vault
      </div>
      <span className="dim"># Garden.md</span>
      <div className={styles.mCheck}>
        <i className={styles.mBox} /> order seed potatoes
      </div>
    </div>
  );
}

function VaultMock() {
  return (
    <div className={styles.mock}>
      <div className={styles.mBar}>
        <span>~/vault</span>
        <span>142 notes</span>
      </div>
      <div className={styles.mSplit}>
        <div style={{ display: "grid", gap: "0.45rem" }}>
          <span>▸ daily/</span>
          <span>▾ projects/</span>
          <span style={{ paddingLeft: "0.8rem" }} className="soft">
            harvest.md
          </span>
          <span style={{ paddingLeft: "0.8rem" }}>stove.md</span>
        </div>
        <div style={{ display: "grid", gap: "0.5rem" }}>
          <div className={`${styles.mLine} ${styles.mLineBright}`} style={{ "--w": "60%" } as React.CSSProperties} />
          <div className={styles.mLine} style={{ "--w": "95%" } as React.CSSProperties} />
          <div className={styles.mLine} style={{ "--w": "88%" } as React.CSSProperties} />
          <div className={styles.mCheck}>
            <i className={`${styles.mBox} ${styles.mBoxOn}`}>✓</i> writes back to the file
          </div>
          <div className={styles.mLine} style={{ "--w": "72%" } as React.CSSProperties} />
        </div>
      </div>
    </div>
  );
}

function ChatMock() {
  return (
    <div className={styles.mock}>
      <div className={styles.mBar}>
        <span>assistant</span>
        <span>sse</span>
      </div>
      <div className={styles.mBubbleUser}>what’s still open this week?</div>
      <div className={styles.mToolChip}>⚙ search_notes(&quot;week&quot;)</div>
      <div className={styles.mLine} style={{ "--w": "82%" } as React.CSSProperties} />
      <div className={styles.mLine} style={{ "--w": "64%" } as React.CSSProperties} />
      <div className={styles.mPerm}>
        <span>create_note → Friday.md</span>
        <span>
          <b>allow</b> / deny
        </span>
      </div>
    </div>
  );
}

function SettingsMock() {
  return (
    <div className={styles.mock}>
      <div className={styles.mBar}>
        <span>settings</span>
        <span>local</span>
      </div>
      <div className={styles.mField}>
        <span>theme</span>
        <b>sumi ink</b>
      </div>
      <div className={styles.mField}>
        <span>vault</span>
        <b>~/vault</b>
      </div>
      <div className={styles.mField}>
        <span>provider</span>
        <b>gemini · key ✓</b>
      </div>
      <div className={styles.mField}>
        <span>tasks file</span>
        <b>Tasks.md</b>
      </div>
    </div>
  );
}

const SCREENS = [
  {
    route: "/",
    name: "Today",
    text: "One screen for the morning: focus tasks with quick-add, today’s agenda, the notes you touched last.",
    mock: <TodayMock />,
  },
  {
    route: "/calendar",
    name: "Calendar",
    text: "A month grid over a plain .ics file in your vault. Subscribe to it from Google or Apple Calendar if you like.",
    mock: <CalendarMock />,
  },
  {
    route: "/todos",
    name: "Tasks",
    text: "Every `- [ ]` across your notes, grouped by file. Drag to reorder — it rewrites the lines in the markdown.",
    mock: <TasksMock />,
  },
  {
    route: "/vault",
    name: "Vault",
    text: "Browse the folder, search the contents, read rendered notes. Tick a checkbox and it writes back to disk.",
    mock: <VaultMock />,
  },
  {
    route: "/chat",
    name: "Assistant",
    text: "Streaming chat that searches and quotes your notes with tools. Writes require an Allow / Deny card.",
    mock: <ChatMock />,
  },
  {
    route: "/settings",
    name: "Settings",
    text: "Theme, vault path, tasks file, provider and model. The whole config — there isn’t more to configure.",
    mock: <SettingsMock />,
  },
];

export default function ScreensRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 861px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => track.scrollWidth - track.parentElement!.clientWidth;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: pinRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (counterRef.current) {
              const n = Math.min(
                SCREENS.length,
                Math.floor(self.progress * SCREENS.length) + 1,
              );
              counterRef.current.innerHTML = `<b>0${n}</b> / 0${SCREENS.length}`;
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.pin} ref={pinRef}>
        <div className="shell">
          <div className={styles.head}>
            <div>
              <span className="eyebrow">02 — six screens</span>
              <h2 className={styles.title}>
                The whole app, <span className="serif">left to right</span>.
              </h2>
            </div>
            <span className={styles.counter} ref={counterRef}>
              <b>01</b> / 06
            </span>
          </div>
        </div>

        <div className={`shell ${styles.viewport}`}>
          <div className={styles.track} ref={trackRef}>
            {SCREENS.map((s) => (
              <article className={styles.panel} key={s.route}>
                <div className={styles.panelHead}>
                  <span className={styles.panelName}>{s.name}</span>
                  <span className={styles.route}>{s.route}</span>
                </div>
                <p className={styles.panelText}>{s.text}</p>
                {s.mock}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

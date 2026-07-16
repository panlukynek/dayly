"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Terminal from "@/components/Terminal";
import styles from "./AssistantStory.module.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * The centrepiece: a pinned replay of one assistant exchange.
 * Left — the chat as the user sees it. Right — the same moment on the
 * wire, as SSE events. One scrubbed timeline drives both, so scrolling
 * back literally rewinds the stream.
 */
export default function AssistantStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const chat = chatRef.current;
    const log = logRef.current;
    if (!section || !chat || !log) return;

    const items = Array.from(chat.querySelectorAll<HTMLElement>("[data-beat]"));
    const logLines = Array.from(log.querySelectorAll<HTMLElement>("[data-log]"));
    const textEls = Array.from(chat.querySelectorAll<HTMLElement>("[data-stream]"));

    const mm = gsap.matchMedia();

    mm.add("(min-width: 861px) and (prefers-reduced-motion: no-preference)", () => {
      let splits: SplitText[] = [];
      let tl: gsap.core.Timeline | undefined;
      let cancelled = false;

      document.fonts.ready.then(() => {
        if (cancelled) return;

        gsap.set(items, { autoAlpha: 0, y: 14 });
        gsap.set(logLines, { autoAlpha: 0, x: -10 });

        splits = textEls.map(
          (el) => new SplitText(el, { type: "chars", charsClass: styles.char }),
        );
        splits.forEach((s) => gsap.set(s.chars, { autoAlpha: 0 }));

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: pinRef.current,
            start: "top top",
            end: "+=280%",
            scrub: 0.4,
          },
        });

        const beat = (name: string) =>
          items.find((el) => el.dataset.beat === name)!;
        const line = (name: string) =>
          logLines.find((el) => el.dataset.log === name)!;

        const show = (el: HTMLElement, at: number) =>
          tl!.to(el, { autoAlpha: 1, y: 0, x: 0, duration: 0.05 }, at);

        // 0.00 — the question
        show(beat("user"), 0.0);

        // 0.06 — first streamed sentence + wire says event: text
        show(beat("text-a"), 0.06);
        show(line("text-a"), 0.06);
        tl.to(splits[0].chars, { autoAlpha: 1, stagger: 0.002, duration: 0.01 }, 0.07);

        // 0.2 — tools run
        show(beat("tool-search"), 0.2);
        show(line("tool-search"), 0.2);
        show(beat("tool-read"), 0.28);
        show(line("tool-read"), 0.28);

        // 0.36 — the answer streams
        show(beat("text-b"), 0.36);
        show(line("text-b"), 0.36);
        tl.to(splits[1].chars, { autoAlpha: 1, stagger: 0.0016, duration: 0.01 }, 0.37);

        // 0.55 — write tool wants permission; stream parks on a promise
        show(beat("perm"), 0.55);
        show(line("perm"), 0.55);

        // 0.68 — you click allow
        tl.to(
          beat("perm").querySelector(`.${styles.permAllow}`),
          { backgroundColor: "rgba(144,185,159,0.18)", duration: 0.03 },
          0.68,
        );
        show(line("perm-ok"), 0.7);
        tl.to(beat("perm"), { autoAlpha: 0.45, duration: 0.05 }, 0.72);
        show(beat("perm-done"), 0.72);

        // 0.78 — the todo widget lands, wired to the real file
        show(beat("todo"), 0.78);
        show(line("todo"), 0.78);

        // 0.88 — done
        show(beat("status"), 0.88);
        show(line("done"), 0.88);
        tl.to({}, { duration: 0.1 });
      });

      return () => {
        cancelled = true;
        tl?.scrollTrigger?.kill();
        tl?.kill();
        splits.forEach((s) => s.revert());
        gsap.set(items, { clearProps: "all" });
        gsap.set(logLines, { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.pin} ref={pinRef}>
        <div className="shell">
          <div className={styles.head}>
            <span className="eyebrow">04 — the assistant</span>
            <h2 className={styles.title}>
              Reads your notes. <span className="serif">Asks before it writes.</span>
            </h2>
            <p className={styles.lead}>
              One exchange, shown twice: the chat you see, and the SSE stream
              underneath it. Scroll back up — the stream rewinds.
            </p>
          </div>

          <div className={styles.grid}>
            {/* ---- the chat ---- */}
            <div className={styles.chat} ref={chatRef}>
              <div className={styles.chatBar}>
                <span>/chat</span>
                <span>gemini · vault: ~/vault</span>
              </div>

              <div className={styles.user} data-beat="user">
                what’s still open from this week? make me a friday list
              </div>

              <p className={styles.aText} data-beat="text-a" data-stream>
                Looking through this week’s notes…
              </p>

              <span className={styles.tool} data-beat="tool-search">
                ⚙ search_notes(&quot;this week&quot;) <em>→ 6 matches</em>
              </span>
              <span className={styles.tool} data-beat="tool-read">
                ⚙ read_note(&quot;daily/2026-04-20.md&quot;) <em>→ 1.2 kB</em>
              </span>

              <p className={styles.aText} data-beat="text-b" data-stream>
                Three things never got closed: the framer call, the domain
                renewal, and the seed potato order. Want them as a Friday
                checklist?
              </p>

              <div className={styles.perm} data-beat="perm">
                <span className={styles.permLabel}>
                  <b>write</b> create_todo_list → Friday.md
                </span>
                <span className={styles.permBtns}>
                  <span className={`${styles.permBtn} ${styles.permAllow}`}>allow</span>
                  <span className={styles.permBtn}>deny</span>
                </span>
              </div>

              <span className={styles.permDone} data-beat="perm-done">
                ✓ allowed — writing Friday.md
              </span>

              <div className={styles.todo} data-beat="todo">
                <div className={styles.todoHead}>
                  <span>Friday.md</span>
                  <span>live file</span>
                </div>
                <span className={styles.todoItem}>
                  <i className={styles.todoBox} /> call the framer about the print
                </span>
                <span className={styles.todoItem}>
                  <i className={styles.todoBox} /> renew the domain
                </span>
                <span className={styles.todoItem}>
                  <i className={styles.todoBox} /> order seed potatoes
                </span>
              </div>

              <div className={styles.status} data-beat="status">
                <b>done</b> · 2 tools · 1 permission · 1 file written
              </div>
            </div>

            {/* ---- the wire ---- */}
            <Terminal title="POST /api/chat" meta="text/event-stream" className={styles.log}>
              <div ref={logRef}>
                <div className={styles.logLine} data-log="text-a">
                  <span className={styles.logEvent}>event: text</span>
                  <span className={styles.logMeta}>&quot;Looking through this…&quot;</span>
                </div>
                <div className={styles.logLine} data-log="tool-search">
                  <span className={styles.logEvent}>event: tool</span>
                  <span className={styles.logMeta}>search_notes · read-only</span>
                </div>
                <div className={styles.logLine} data-log="tool-read">
                  <span className={styles.logEvent}>event: tool</span>
                  <span className={styles.logMeta}>read_note · read-only</span>
                </div>
                <div className={styles.logLine} data-log="text-b">
                  <span className={styles.logEvent}>event: text</span>
                  <span className={styles.logMeta}>&quot;Three things never…&quot;</span>
                </div>
                <div className={styles.logLine} data-log="perm">
                  <span className={styles.logEvent}>event: permission</span>
                  <span className={`${styles.logMeta} ${styles.logWait}`}>
                    create_todo_list ⏸ promise parked
                  </span>
                </div>
                <div className={styles.logLine} data-log="perm-ok">
                  <span className={styles.logEvent}>event: permission_resolved</span>
                  <span className={`${styles.logMeta} ${styles.logOk}`}>allow → resumed</span>
                </div>
                <div className={styles.logLine} data-log="todo">
                  <span className={styles.logEvent}>event: todo</span>
                  <span className={styles.logMeta}>Friday.md · 3 items</span>
                </div>
                <div className={styles.logLine} data-log="done">
                  <span className={styles.logEvent}>event: done</span>
                  <span className={`${styles.logMeta} ${styles.logOk}`}>stream closed</span>
                </div>
              </div>
            </Terminal>
          </div>
        </div>
      </div>
    </section>
  );
}

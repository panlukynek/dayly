import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import Terminal from "@/components/Terminal";
import GetStarted from "@/components/GetStarted";
import styles from "./Manual.module.css";

export const metadata: Metadata = {
  title: "Manual",
  description:
    "Clone, install, run. Point Almanac at an Obsidian vault, optionally add a free Gemini key for the assistant, and everything else is a file you already own.",
};

export default function ManualPage() {
  return (
    <>
      <PageHead
        eyebrow="manual"
        title={
          <>
            From clone to calm in <span className="serif">about five minutes</span>.
          </>
        }
        lead="No installer, no account, no onboarding wizard. You run it the way you run any Node project — and the interesting part is deciding which folder of markdown it should live with."
      />

      <div className="shell">
        {/* ---------- 01 ---------- */}
        <Reveal className={styles.step}>
          <div>
            <span className={styles.stepNum}>step 01 — requirements</span>
            <h2 className={styles.stepTitle}>Node 20+, and ideally a vault.</h2>
            <div className={styles.stepBody}>
              <p>
                Any OS, any terminal. The vault is optional — without one,
                tasks and calendar fall back to local stores so you can poke
                around — but Almanac only gets interesting next to{" "}
                <strong>a real folder of markdown</strong>. An Obsidian vault is
                perfect; any directory of <code className="chip">.md</code>{" "}
                files qualifies.
              </p>
            </div>
          </div>
          <Terminal title="sh" meta="check">
            <pre>
              <code>
                <span className="tl-prompt">$</span> <span className="tl-cmd">node -v</span>{"\n"}
                v22.11.0 <span className="tl-ok">✓</span>{"\n"}
                <span className="tl-prompt">$</span> <span className="tl-cmd">ls ~/vault | head -3</span>{"\n"}
                daily/{"\n"}
                projects/{"\n"}
                Tasks.md <span className="tl-ok">✓ that&apos;ll do</span>
              </code>
            </pre>
          </Terminal>
        </Reveal>

        {/* ---------- 02 ---------- */}
        <Reveal className={styles.step}>
          <div>
            <span className={styles.stepNum}>step 02 — clone &amp; install</span>
            <h2 className={styles.stepTitle}>The whole acquisition flow.</h2>
            <div className={styles.stepBody}>
              <p>
                This is also the update mechanism (<code className="chip">git pull</code>),
                the backup story (it&apos;s a git repo), and the uninstaller
                (<code className="chip">rm -rf</code>). Your data isn&apos;t in
                here anyway — it lives in your vault.
              </p>
            </div>
          </div>
          <Terminal title="sh" meta="~2 min">
            <pre>
              <code>
                <span className="tl-prompt">$</span> <span className="tl-cmd">git clone https://github.com/panlukynek/tomasi-kafe</span>{"\n"}
                <span className="tl-prompt">$</span> <span className="tl-cmd">cd tomasi-kafe</span>{"\n"}
                <span className="tl-prompt">$</span> <span className="tl-cmd">npm install</span>{"\n"}
                <span className="tl-dim">added 214 packages in 9s</span>
              </code>
            </pre>
          </Terminal>
        </Reveal>

        {/* ---------- 03 ---------- */}
        <Reveal className={styles.step}>
          <div>
            <span className={styles.stepNum}>step 03 — the key (optional)</span>
            <h2 className={styles.stepTitle}>Only the assistant needs one.</h2>
            <div className={styles.stepBody}>
              <p>
                Calendar, tasks and the vault browser run with no key at all.
                For the chat, grab a <strong>free Gemini API key</strong>, put
                it in <code className="chip">.env</code>, restart. The key
                stays on the server — requests to the model are made from
                Node, never from your browser.
              </p>
              <p>
                An Anthropic key works too; switch the provider in Settings.
              </p>
            </div>
          </div>
          <Terminal title=".env" meta="optional">
            <pre>
              <code>
                <span className="tl-com"># free tier: aistudio.google.com</span>{"\n"}
                <span className="tl-key">GEMINI_API_KEY</span>=<span className="tl-str">AIza…</span>{"\n\n"}
                <span className="tl-com"># or, if you prefer claude:</span>{"\n"}
                <span className="tl-key">ANTHROPIC_API_KEY</span>=<span className="tl-str">sk-ant-…</span>
              </code>
            </pre>
          </Terminal>
        </Reveal>

        {/* ---------- 04 ---------- */}
        <Reveal className={styles.step}>
          <div>
            <span className={styles.stepNum}>step 04 — run</span>
            <h2 className={styles.stepTitle}>Dev for hacking, build for daily use.</h2>
            <div className={styles.stepBody}>
              <p>
                <code className="chip">npm run dev</code> gives you hot reload
                for poking at the source. For the copy you actually live in,
                build once and keep the Node server running —{" "}
                <strong>it&apos;s a localhost app, not a deployment</strong>.
              </p>
            </div>
          </div>
          <Terminal title="sh" meta="daily driver">
            <pre>
              <code>
                <span className="tl-prompt">$</span> <span className="tl-cmd">npm run build && npm start</span>{"\n"}
                <span className="tl-dim">listening on</span> <span className="tl-key">http://localhost:3000</span>{"\n\n"}
                <span className="tl-com"># or hack on it:</span>{"\n"}
                <span className="tl-prompt">$</span> <span className="tl-cmd">npm run dev</span>{"\n"}
                <span className="tl-dim">➜ local:</span> <span className="tl-key">http://localhost:5173</span>
              </code>
            </pre>
          </Terminal>
        </Reveal>
      </div>

      {/* ---------- vault ---------- */}
      <section className="section hairline-top tinted" style={{ marginTop: "var(--gap)" }}>
        <div className="shell">
          <Reveal>
            <span className="eyebrow">step 05 — point it at a vault</span>
            <h2 className={styles.stepTitle} style={{ maxWidth: "24ch" }}>
              Settings → vault folder. <span className="serif">Everything lights up.</span>
            </h2>
            <div className={styles.stepBody}>
              <p>
                Set the path to your vault in Settings, pick a tasks file
                (default <code className="chip">Tasks.md</code>) and a calendar
                file (default <code className="chip">Calendar.ics</code>).
                From that moment:
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className={styles.lights}>
              <div className={styles.light}>
                <div className={styles.lightTitle}>tasks → markdown</div>
                <p className={styles.lightText}>
                  The Tasks page and the Today widget now read every checklist
                  across your notes. Quick-adds append to your tasks file;
                  drag-reorder rewrites the lines.
                </p>
              </div>
              <div className={styles.light}>
                <div className={styles.lightTitle}>calendar → .ics</div>
                <p className={styles.lightText}>
                  Events serialize to iCalendar in the vault. Subscribe to the
                  file from Google or Apple Calendar and your events exist in
                  both worlds.
                </p>
              </div>
              <div className={styles.light}>
                <div className={styles.lightTitle}>assistant → eyes</div>
                <p className={styles.lightText}>
                  The chat can now list, search and quote your actual notes —
                  and ask permission before it writes anything back.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Q&A ---------- */}
      <section className="section hairline-top">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">appendix — questions you&apos;d actually ask</span>
          </Reveal>
          <Reveal delay={0.05}>
            <div className={styles.qa}>
              <details>
                <summary>Does anything ever leave my machine?</summary>
                <div className={styles.answer}>
                  <p>
                    Only the messages you send the assistant (plus whatever
                    note excerpts its tools read into context) go to the model
                    provider you chose. No key, no chat: nothing makes a single
                    network request. There is no telemetry and no analytics.
                  </p>
                </div>
              </details>
              <details>
                <summary>Can it write over my notes?</summary>
                <div className={styles.answer}>
                  <p>
                    Not silently. Read tools run freely; every write tool —
                    create, delete, event changes — pauses the stream and shows
                    an Allow / Deny card. Ticking checkboxes in the UI writes
                    exactly the line you clicked. And since your vault should
                    be a git repo anyway, <code className="chip">git diff</code>{" "}
                    is your audit log.
                  </p>
                </div>
              </details>
              <details>
                <summary>What happens without a vault?</summary>
                <div className={styles.answer}>
                  <p>
                    Tasks and calendar fall back to localStorage so the app
                    stays usable. It&apos;s a decent demo mode — but the point
                    of Almanac is the vault, so give it one.
                  </p>
                </div>
              </details>
              <details>
                <summary>Obsidian is open. Will they fight?</summary>
                <div className={styles.answer}>
                  <p>
                    No. Almanac reads and writes the same files Obsidian does —
                    plain markdown, standard checklists. Edit in either, the
                    other sees it. Almanac holds no state that could go stale
                    beyond a page refresh.
                  </p>
                </div>
              </details>
              <details>
                <summary>Why isn&apos;t this a hosted app?</summary>
                <div className={styles.answer}>
                  <p>
                    Because then your notes would be on someone else&apos;s
                    disk, and the whole design collapses. The backend exists to
                    touch <em>your</em> filesystem; hosting it elsewhere makes
                    that a data upload, not a feature.
                  </p>
                </div>
              </details>
              <details>
                <summary>Backups?</summary>
                <div className={styles.answer}>
                  <p>
                    Your vault is a folder. Whatever already backs it up —
                    git, Syncthing, Time Machine, a cron job with rsync — now
                    also backs up your tasks and calendar, because they&apos;re
                    just files in it.
                  </p>
                </div>
              </details>
            </div>
          </Reveal>
        </div>
      </section>

      <GetStarted />
    </>
  );
}

import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import Terminal from "@/components/Terminal";
import GetStarted from "@/components/GetStarted";
import PermissionFlow from "@/components/how/PermissionFlow";
import styles from "./How.module.css";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "A tour of Almanac's architecture: a SvelteKit app with a small Node backend, markdown and .ics as the data layer, an SSE tool loop, and a permission broker for writes.",
};

const DATA_ROWS = [
  {
    data: "Calendar events",
    home: "Calendar.ics in the vault",
    why: "Portable iCalendar — import it, subscribe to it, grep it.",
  },
  {
    data: "Tasks",
    home: "- [ ] lines across *.md",
    why: "Editable in Obsidian; drag-reorder rewrites the actual lines.",
  },
  {
    data: "Notes",
    home: "your vault, read in place",
    why: "It was never Almanac's data to begin with.",
  },
  {
    data: "Chat history",
    home: "localStorage",
    why: "Survives reloads; never leaves the device.",
  },
  {
    data: "Theme, name, paths, model",
    home: "localStorage",
    why: "Per-device preferences — nothing worth a database.",
  },
  {
    data: "Your API key",
    home: ".env on the server",
    why: "The browser never sees it; requests to the model go server-side.",
  },
];

const TOOLS = [
  { name: "list_notes", desc: "Recursive vault listing.", write: false },
  { name: "search_notes", desc: "Content search across every note.", write: false },
  { name: "read_note", desc: "One note, verbatim.", write: false },
  { name: "list_events", desc: "Parse Calendar.ics and report.", write: false },
  { name: "create_note", desc: "New markdown file in the vault.", write: true },
  { name: "create_todo_list", desc: "Checklist file + interactive widget in chat.", write: true },
  { name: "create_event", desc: "Append a VEVENT to the calendar.", write: true },
  { name: "delete_note", desc: "Remove a note from disk.", write: true },
  { name: "delete_event", desc: "Remove an event by UID.", write: true },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHead
        eyebrow="how it works"
        title={
          <>
            One SvelteKit app, one small Node backend,{" "}
            <span className="serif">zero databases</span>.
          </>
        }
        lead="The frontend is a calm dashboard. The backend exists for exactly two things a browser can't do: touch your files, and talk to a model without leaking your key. Here's the whole machine, part by part."
      />

      {/* ---------- 01 · the idea ---------- */}
      <section className="section hairline-top">
        <div className={`shell ${styles.two}`}>
          <div className={styles.sticky}>
            <Reveal>
              <span className="eyebrow">01 — the shape</span>
              <h2 className={styles.h2}>
                A dashboard in front, a file clerk behind.
              </h2>
              <div className={styles.body}>
                <p>
                  Svelte 5 runes hold the client state — no store library, no
                  cache layer, no sync engine. <code className="chip">adapter-node</code>{" "}
                  ships a real server, so <code className="chip">+server.js</code>{" "}
                  endpoints can read the vault directly from disk.
                </p>
                <p>
                  The server side is deliberately boring:{" "}
                  <strong>thin endpoints over one file module</strong>{" "}
                  (<code className="chip">vault.js</code>) plus one chat route.
                  If you can read a directory listing, you can read this codebase
                  in an evening.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Terminal title="src/" meta="the whole map">
              <pre>
                <code>
                  routes/{"\n"}
                  ├── + <span className="tl-dim">Today · Calendar · Tasks · Vault · Chat · Settings</span>{"\n"}
                  └── api/{"\n"}
                  {"    "}├── vault/ <span className="tl-com"># list · read · search · tasks · calendar</span>{"\n"}
                  {"    "}├── chat/ <span className="tl-com"># SSE tool loop</span>{"\n"}
                  {"    "}└── chat/permission/ <span className="tl-com"># resolves allow / deny</span>{"\n"}
                  lib/{"\n"}
                  ├── stores.svelte.js <span className="tl-com"># runes singletons</span>{"\n"}
                  └── server/{"\n"}
                  {"    "}├── vault.js <span className="tl-com"># all file work + safeResolve</span>{"\n"}
                  {"    "}├── permissions.js <span className="tl-com"># the promise broker</span>{"\n"}
                  {"    "}└── providers/ <span className="tl-com"># gemini.js · claude.js · tools.js</span>
                </code>
              </pre>
            </Terminal>
          </Reveal>
        </div>
      </section>

      {/* ---------- 02 · permission flow ---------- */}
      <section className="section hairline-top tinted">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">02 — the interesting part</span>
            <h2 className={styles.h2} style={{ maxWidth: "26ch" }}>
              A write tool parks a promise. <span className="serif">You are the resolver.</span>
            </h2>
            <div className={styles.body} style={{ marginBottom: "2.5rem" }}>
              <p>
                Read tools run freely. When the model calls a write tool, the
                SSE stream doesn&apos;t close — the executor emits a{" "}
                <code className="chip">permission</code> event and parks a
                promise in an in-memory broker. Your click is what resolves it.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <PermissionFlow />
          </Reveal>
        </div>
      </section>

      {/* ---------- 03 · where data lives ---------- */}
      <section className="section hairline-top">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">03 — where data lives</span>
            <h2 className={styles.h2}>Nothing to migrate, ever.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className={styles.table} style={{ marginTop: "2.5rem" }}>
              <div className={`${styles.tr} ${styles.trHead}`}>
                <span>data</span>
                <span>home</span>
                <span>why</span>
              </div>
              {DATA_ROWS.map((r) => (
                <div className={styles.tr} key={r.data}>
                  <span className={styles.tdData}>{r.data}</span>
                  <span className={styles.tdHome}>{r.home}</span>
                  <span className={styles.tdWhy}>{r.why}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- 04 · vault safety ---------- */}
      <section className="section hairline-top tinted">
        <div className={`shell ${styles.two}`}>
          <div className={styles.sticky}>
            <Reveal>
              <span className="eyebrow">04 — the vault boundary</span>
              <h2 className={styles.h2}>
                Every path resolves inside the vault. Or not at all.
              </h2>
              <div className={styles.body}>
                <p>
                  An app that lets an LLM name file paths needs exactly one
                  invariant: <strong>no request escapes the vault root</strong>.
                  Every endpoint and every tool goes through{" "}
                  <code className="chip">safeResolve</code> before touching
                  disk — resolve, prefix-check, then act.
                </p>
                <p>
                  That includes the assistant. A prompt-injected{" "}
                  <code className="chip">../../.ssh/id_ed25519</code> in a note
                  gets a refusal, not a file.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Terminal title="src/lib/server/vault.js" meta="the invariant">
              <pre>
                <code>
                  <span className="tl-kw">function</span> <span className="tl-cmd">safeResolve</span>(root, requested) {"{"}{"\n"}
                  {"  "}<span className="tl-kw">const</span> path = resolve(root, requested);{"\n"}
                  {"  "}<span className="tl-kw">if</span> (!path.startsWith(root + sep)) {"{"}{"\n"}
                  {"    "}<span className="tl-kw">throw new</span> <span className="tl-cmd">Error</span>(<span className="tl-str">&quot;outside vault&quot;</span>); <span className="tl-com">// no exceptions</span>{"\n"}
                  {"  "}{"}"}{"\n"}
                  {"  "}<span className="tl-kw">return</span> path;{"\n"}
                  {"}"}{"\n\n"}
                  <span className="tl-com">// used by: list · read · search · tasks · calendar · every tool</span>
                </code>
              </pre>
            </Terminal>
          </Reveal>
        </div>
      </section>

      {/* ---------- 05 · tools ---------- */}
      <section className="section hairline-top">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">05 — the toolbox</span>
            <h2 className={styles.h2} style={{ marginBottom: "1.5rem" }}>
              Nine tools. Four of them ask first.
            </h2>
            <div className={styles.legend}>
              <span>
                <b className="accent-green">read</b> — runs freely
              </span>
              <span>
                <b className="accent-yellow">write</b> — gated by allow / deny
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className={styles.tools}>
              {TOOLS.map((t) => (
                <div className={styles.tool} key={t.name}>
                  <span className={`${styles.toolBadge} ${t.write ? styles.write : styles.read}`}>
                    {t.write ? "write" : "read"}
                  </span>
                  <span className={styles.toolName}>{t.name}()</span>
                  <span className={styles.toolDesc}>{t.desc}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- 06 · providers ---------- */}
      <section className="section hairline-top tinted">
        <div className={`shell ${styles.two}`}>
          <div className={styles.sticky}>
            <Reveal>
              <span className="eyebrow">06 — providers</span>
              <h2 className={styles.h2}>
                A provider is one file with one function.
              </h2>
              <div className={styles.body}>
                <p>
                  Gemini is the default (the API key is free). Claude sits
                  archived next to it, switchable in Settings. Both implement
                  the same signature and map the neutral tool definitions to
                  their own function-calling format.
                </p>
                <p>
                  Want Ollama? <strong>Drop one file in{" "}
                  <code className="chip">providers/</code></strong>, register it
                  in <code className="chip">index.js</code>, list its models.
                  The tool loop, the permission broker and the UI don&apos;t
                  change.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Terminal title="src/lib/server/providers/yours.js" meta="the contract">
              <pre>
                <code>
                  <span className="tl-kw">export async function</span> <span className="tl-cmd">run</span>({"{"} messages, model, send, execTool {"}"}) {"{"}{"\n"}
                  {"  "}<span className="tl-com">// 1. map TOOLS to your provider&apos;s format</span>{"\n"}
                  {"  "}<span className="tl-com">// 2. stream — send({"{"} type: &quot;text&quot;, ... {"}"})</span>{"\n"}
                  {"  "}<span className="tl-com">// 3. on a tool call — await execTool(name, args)</span>{"\n"}
                  {"  "}<span className="tl-com">//    (write tools pause here until allow/deny)</span>{"\n"}
                  {"}"}
                </code>
              </pre>
            </Terminal>
          </Reveal>
        </div>
      </section>

      <GetStarted />
    </>
  );
}

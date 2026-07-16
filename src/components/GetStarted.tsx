import Link from "next/link";
import Reveal from "./Reveal";
import Terminal from "./Terminal";
import styles from "./GetStarted.module.css";

/**
 * End-of-page band. There is no waitlist and no signup —
 * the call to action is a git clone.
 */
export default function GetStarted() {
  return (
    <section className={styles.band}>
      <div className={`shell ${styles.inner}`}>
        <Reveal>
          <span className="eyebrow">get started</span>
          <h2 className={styles.title}>
            No waitlist. <span className="serif">It’s a git clone.</span>
          </h2>
          <p className={styles.text}>
            Calendar, tasks and the vault browser run with zero configuration.
            Add a free Gemini key when you want the assistant; point it at a
            vault when you want it to matter.
          </p>
          <div className={styles.btns}>
            <Link href="/manual" className="btn btn-primary">
              Read the manual
            </Link>
            <a
              href="https://github.com/panlukynek/tomasi-kafe"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              Browse the source
            </a>
          </div>
          <p className={styles.note}>runs entirely on your machine · MIT-spirited · bring your own vault</p>
        </Reveal>
        <Reveal delay={0.12}>
          <Terminal title="sh" meta="~5 min">
            <pre style={{ margin: 0 }}>
              <code>
                <span className="tl-prompt">$</span> <span className="tl-cmd">git clone https://github.com/panlukynek/tomasi-kafe</span>{"\n"}
                <span className="tl-prompt">$</span> <span className="tl-cmd">cd tomasi-kafe && npm install</span>{"\n"}
                <span className="tl-prompt">$</span> <span className="tl-cmd">cp .env.example .env</span> <span className="tl-com"># optional — assistant key</span>{"\n"}
                <span className="tl-prompt">$</span> <span className="tl-cmd">npm run dev</span>{"\n"}
                {"\n"}
                <span className="tl-dim">  ➜ local:</span> <span className="tl-key">http://localhost:5173</span>{"\n"}
                <span className="tl-dim">  vault: not set → Settings</span> <span className="tl-ok">✓ tasks + calendar fall back to local</span>
              </code>
            </pre>
          </Terminal>
        </Reveal>
      </div>
    </section>
  );
}

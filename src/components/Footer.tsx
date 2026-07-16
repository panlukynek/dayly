import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="shell">
        <div className={styles.top}>
          <span className={styles.creed}>
            plain text<i>·</i>no accounts<i>·</i>no telemetry
          </span>
          <nav className={styles.links} aria-label="Footer">
            <Link href="/how-it-works">how it works</Link>
            <Link href="/manual">manual</Link>
            <Link href="/colophon">colophon</Link>
            <a href="https://github.com/panlukynek/tomasi-kafe" target="_blank" rel="noreferrer">
              source ↗
            </a>
          </nav>
        </div>
        <div className={styles.bottom}>
          <span>almanac · a calm, local-first workspace</span>
          <span>
            colours:{" "}
            <a href="https://github.com/dgox16/oldworld.nvim" target="_blank" rel="noreferrer">
              oldworld.nvim
            </a>{" "}
            · type: IBM Plex
          </span>
        </div>
      </div>
    </footer>
  );
}

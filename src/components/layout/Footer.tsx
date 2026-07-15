import { Link } from "next-view-transitions";
import Logo from "./Logo";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <Link href="/" className={styles.brand}>
              <Logo />
              DAYLY
            </Link>
            <p className={styles.tagline}>
              Osobní AI agent s dlouhodobou pamětí. Navrženo a vyvíjeno v EU.
            </p>
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>Produkt</div>
            <Link href="/produkt">Funkce</Link>
            <Link href="/technologie">Technologie</Link>
            <Link href="/cena">Cena</Link>
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>Společnost</div>
            <Link href="/vize">Vize a roadmapa</Link>
            <a href="#waitlist">Early access</a>
            <a href="mailto:hello@dayly.app">hello@dayly.app</a>
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>Právní</div>
            <a href="mailto:privacy@dayly.app">Ochrana soukromí</a>
            <a href="mailto:hello@dayly.app">Podmínky užití</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 DAYLY · preview verze webu</span>
          <span>
            barevné schéma:{" "}
            <a
              href="https://github.com/dgox16/oldworld.nvim"
              target="_blank"
              rel="noreferrer"
            >
              oldworld.nvim
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

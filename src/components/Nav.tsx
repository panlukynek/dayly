"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "/how-it-works", label: "how it works" },
  { href: "/manual", label: "manual" },
  { href: "/colophon", label: "colophon" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`shell ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Almanac — home">
          almanac
          <span className={styles.cursor} aria-hidden="true" />
        </Link>

        <nav className={styles.links} aria-label="Site">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.link} ${pathname.startsWith(l.href) ? styles.active : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          className={styles.source}
          href="https://github.com/panlukynek/tomasi-kafe"
          target="_blank"
          rel="noreferrer"
        >
          source&nbsp;↗
        </a>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";
import styles from "./Nav.module.css";

const NAV_ITEMS = [
  { href: "/produkt", label: "Produkt" },
  { href: "/technologie", label: "Technologie" },
  { href: "/cena", label: "Cena" },
  { href: "/vize", label: "Vize" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // zavřít mobilní menu při přechodu na jinou stránku
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`site-nav ${styles.nav} ${scrolled || open ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="DAYLY — úvodní stránka">
          <Logo />
          DAYLY
        </Link>

        <nav className={styles.links} aria-label="Hlavní navigace">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.link} ${active ? styles.linkActive : ""}`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className={styles.activePill}
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <a href="#waitlist" className={`btn btn-solid ${styles.cta}`}>
          Získat přístup
        </a>

        <button
          type="button"
          className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
          aria-expanded={open}
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.mobilePanel}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`container ${styles.mobileInner}`}>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.mobileLink} ${
                    pathname.startsWith(item.href) ? styles.mobileLinkActive : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="#waitlist"
                className={`btn btn-solid btn-block ${styles.mobileCta}`}
                onClick={() => setOpen(false)}
              >
                Získat přístup
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

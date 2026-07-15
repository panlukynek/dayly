"use client";

import { Link } from "next-view-transitions";
import { motion, useReducedMotion } from "motion/react";
import HeroCanvas from "@/components/three/HeroCanvas";
import styles from "./Hero.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

function Fade({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className={styles.hero}>
      <HeroCanvas />
      <div className={styles.fade} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div>
          <Fade delay={0.05}>
            <span className={styles.eyebrow}>
              <i className={styles.pulse} aria-hidden="true" />
              Early access — jaro 2026
            </span>
          </Fade>

          <Fade delay={0.15}>
            <h1 className={styles.title}>
              Osobní AI agent,
              <br />
              který si <span className="serif tinted">pamatuje</span>.
            </h1>
          </Fade>

          <Fade delay={0.3}>
            <p className={styles.sub}>
              Většina asistentů zapomene všechno, co jim řekneš. DAYLY si pamatuje
              tvoje projekty, návyky i lidi kolem tebe — a každé ráno z toho poskládá
              brifink. <strong>Nejdřív ti radí. Časem to zařídí za tebe.</strong>
            </p>
          </Fade>

          <Fade delay={0.45} className={styles.ctaRow}>
            <a href="#waitlist" className="btn btn-solid">
              Chci být u toho
            </a>
            <Link href="/produkt" className="btn btn-ghost">
              Co DAYLY umí
            </Link>
          </Fade>

          <Fade delay={0.6} className={styles.meta}>
            <div className={styles.metaItem}>
              <strong>iOS</strong>
              <span>první platforma</span>
            </div>
            <div className={styles.metaItem}>
              <strong>macOS</strong>
              <span>fáze 2</span>
            </div>
            <div className={styles.metaItem}>
              <strong>Šifrování</strong>
              <span>end-to-end</span>
            </div>
            <div className={styles.metaItem}>
              <strong>EU</strong>
              <span>hosting i vývoj</span>
            </div>
          </Fade>
        </div>

        <Fade delay={0.5} className={styles.mockWrap}>
          <div className={styles.mock}>
            <div className={styles.mockHead}>
              <div>
                <div className={styles.mockDate}>Středa · 22. dubna</div>
                <div className={styles.mockGreet}>Dobré ráno, Marku</div>
              </div>
              <div className={styles.mockTime}>07:00</div>
            </div>

            <div className={styles.mockSection}>
              <div className={styles.mockLabel}>Tvůj den</div>
              <div className={styles.mockRow}>
                <i className={styles.dotBlue} />3 schůzky · 5 úkolů · 1 deadline
              </div>
              <div className={styles.mockRow}>
                <i className={styles.dotPurple} />
                Hluboká práce: 14:00 – 16:30
              </div>
            </div>

            <div className={styles.mockSection}>
              <div className={styles.mockLabel}>Upozornění</div>
              <p className={styles.mockNote}>
                <em>Nabitý den.</em> Tři schůzky a k tomu deadline projektu Aurora —
                navrhuju posunout „fakturu Novák“ na čtvrtek. Mám ji přeplánovat?
              </p>
            </div>

            <div className={styles.mockSection}>
              <div className={styles.mockLabel}>Z paměti</div>
              <p className={styles.mockNote}>
                Před rokem jsi podepsal smlouvu s Vortexem. Dobrá příležitost na
                follow-up — draft e-mailu mám připravený.
              </p>
              <div className={styles.typing} aria-hidden="true">
                <i />
                <i />
                <i />
                <em>DAYLY píše…</em>
              </div>
            </div>
          </div>

          <div className={`${styles.chip} ${styles.chipTop}`} aria-hidden="true">
            <i className={styles.chipDot} style={{ background: "var(--ow-green)" }} />
            <div>
              <strong>Paměť aktualizována</strong>
              <small>+12 nových kontextů</small>
            </div>
          </div>
          <div className={`${styles.chip} ${styles.chipBottom}`} aria-hidden="true">
            <i className={styles.chipDot} style={{ background: "var(--ow-yellow)" }} />
            <div>
              <strong>Čeká na potvrzení</strong>
              <small>přeplánovat fakturu → čt</small>
            </div>
          </div>
        </Fade>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        scroll
      </div>
    </section>
  );
}

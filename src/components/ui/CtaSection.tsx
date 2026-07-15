import Reveal from "./Reveal";
import WaitlistForm from "./WaitlistForm";
import styles from "./CtaSection.module.css";

/**
 * Závěrečná waitlist sekce — je na konci každé stránky pod id="waitlist",
 * takže CTA v navigaci funguje odkudkoliv bez přesměrování.
 */
export default function CtaSection() {
  return (
    <section className={styles.cta} id="waitlist">
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <Reveal>
          <span className="tag">Early access</span>
          <h2 className={styles.title}>
            Otevíráme <span className="serif tinted">postupně</span>.<br />
            Zapiš se, ať víš, kdy jsi na řadě.
          </h2>
          <p className={styles.text}>
            Nechceme spustit další polovičatou beta verzi pro tisíce lidí najednou.
            Přístup dáváme po malých skupinách, sbíráme zpětnou vazbu a teprve pak
            pouštíme dál. Na e-mail ti přijde jediná zpráva — pozvánka.
          </p>
          <div className={styles.facts}>
            <div className={styles.fact}>
              <strong>iOS</strong>
              <span>první platforma</span>
            </div>
            <div className={styles.fact}>
              <strong>0&nbsp;€</strong>
              <span>start zdarma</span>
            </div>
            <div className={styles.fact}>
              <strong>EU</strong>
              <span>data i vývoj</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <WaitlistForm />
        </Reveal>
      </div>
    </section>
  );
}

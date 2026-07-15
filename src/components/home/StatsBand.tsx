import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import styles from "./StatsBand.module.css";

/**
 * Žádná vymyšlená čísla o „tisících spokojených uživatelů" —
 * produkt ještě není venku. Tohle jsou parametry, ke kterým se hlásíme.
 */
export default function StatsBand() {
  return (
    <section className={styles.band}>
      <div className="container" style={{ paddingInline: 0 }}>
        <div className={styles.grid}>
          <Reveal className={styles.stat}>
            <div className={styles.value}>
              &lt;&nbsp;<Counter to={5} />
              <sub>&nbsp;s</sub>
            </div>
            <div className={styles.label}>vygenerování brifinku</div>
          </Reveal>
          <Reveal className={styles.stat} delay={0.08}>
            <div className={styles.value}>
              <Counter to={3} />
            </div>
            <div className={styles.label}>vrstvy paměti</div>
          </Reveal>
          <Reveal className={styles.stat} delay={0.16}>
            <div className={styles.value}>
              ~<Counter to={15} />
            </div>
            <div className={styles.label}>vzpomínek na jeden dotaz</div>
          </Reveal>
          <Reveal className={styles.stat} delay={0.24}>
            <div className={styles.value}>
              <Counter to={100} />
              <sub>&nbsp;%</sub>
            </div>
            <div className={styles.label}>paměti pod tvou kontrolou</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

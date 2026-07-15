import { Link } from "next-view-transitions";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import styles from "./ProductTeaser.module.css";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const FEATURES = [
  {
    href: "/produkt#brifink",
    title: "Ranní brifink",
    text: "Každé ráno přehled dne poskládaný z kalendáře, úkolů a dlouhodobé paměti. Ne výpis událostí — úsudek: co je dnes důležité, co počká a na co si dát pozor.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
      </svg>
    ),
  },
  {
    href: "/produkt#pamet",
    title: "Dlouhodobá paměť",
    text: "Tři vrstvy paměti — pracovní, epizodická a trvalá. DAYLY ví, kdo je Novák, proč se mu má ozvat a že v pátek nemáš plánovat schůzky. A všechno mu můžeš kdykoliv zobrazit i smazat.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
        <path d="M4 7l8-4 8 4-8 4-8-4z" />
        <path d="M4 12l8 4 8-4" />
        <path d="M4 17l8 4 8-4" />
      </svg>
    ),
  },
  {
    href: "/produkt#zachytavani",
    title: "Večerní zachytávání",
    text: "Řekneš, co se dnes stalo — hlasem nebo textem. Agent si z toho vytáhne úkoly, kontakty a kontext.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
      </svg>
    ),
  },
  {
    href: "/produkt#akce",
    title: "Agentní akce",
    text: "Drafty e-mailů, přesuny úkolů, rezervace. Nejdřív s potvrzením, později autonomně — pokud to dovolíš.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
        <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" />
      </svg>
    ),
  },
  {
    href: "/produkt#konektory",
    title: "Konektory",
    text: "Kalendáře, mail, poznámky, finance i domácnost. Postavené na MCP, takže integrace přibývají rychle.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <path d="M8.5 6H15M18 8.5V15M8 8l7.5 8" />
      </svg>
    ),
  },
];

export default function ProductTeaser() {
  return (
    <section className="section section-tint">
      <div className="container">
        <SectionHead
          tag="02 · Produkt"
          title={
            <>
              Pět vrstev, které dohromady dávají{" "}
              <span className="serif tinted">jednoho agenta</span>.
            </>
          }
          lead="Žádná z nich není sci-fi. Všechny existují v nějaké podobě už dnes — jen roztroušené v deseti aplikacích. DAYLY je skládá do jednoho celku, který se každý den učí."
        />

        <div className={styles.grid}>
          {FEATURES.map((f, i) => (
            <Reveal key={f.href} delay={(i % 3) * 0.08} className={styles.cell}>
              <Link href={f.href} className={`card ${styles.item}`}>
                <div className={styles.icon}>{f.icon}</div>
                <h3 className={styles.itemTitle}>{f.title}</h3>
                <p className={styles.itemText}>{f.text}</p>
                <span className={styles.itemLink}>Více v produktu →</span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.footRow}>
          <Link href="/produkt" className="btn btn-ghost">
            Projít celý produkt
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

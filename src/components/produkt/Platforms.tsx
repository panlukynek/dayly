import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import styles from "./Platforms.module.css";

const PLATFORMS = [
  {
    badge: "první release",
    now: true,
    title: "iOS",
    text: "Nativní SwiftUI aplikace. Brifink jako ranní notifikace, widget na ploše s dalším krokem dne, zachytávání přes akční tlačítko nebo Siri. Telefon máš u sebe celý den — agent taky.",
    foot: "SwiftUI · push · widgety · App Intents",
  },
  {
    badge: "fáze 2",
    now: false,
    title: "macOS",
    text: "Aplikace v menu baru. Brifink po ránu na velké obrazovce, rychlé zachytání myšlenky globální zkratkou, fronta akcí na jeden pohled vedle práce, kterou právě děláš.",
    foot: "menu bar · globální zkratka · Catalyst",
  },
  {
    badge: "průběžně",
    now: false,
    title: "Hlas",
    text: "Brifink si necháš přečíst, poznámku nadiktuješ. Hlas není zvláštní platforma, ale způsob, jak s DAYLY mluvit odkudkoliv — ze sluchátek, z auta, od plotny.",
    foot: "TTS + streaming přepis",
  },
];

export default function Platforms() {
  return (
    <section className="section section-tint">
      <div className="container">
        <SectionHead
          tag="Platformy"
          title={
            <>
              Nejdřív telefon. Pak <span className="serif tinted">všechno ostatní</span>.
            </>
          }
          lead="Osobní agent musí být tam, kde jsi ty. Začínáme na iOS, kde dává každodenní rytmus největší smysl, a rozšiřujeme se podle toho, jak lidi DAYLY skutečně používají."
        />
        <div className={styles.grid}>
          {PLATFORMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <article className={`card ${styles.card}`}>
                <span className={`${styles.badge} ${p.now ? styles.badgeNow : ""}`}>{p.badge}</span>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.text}>{p.text}</p>
                <div className={styles.foot}>{p.foot}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

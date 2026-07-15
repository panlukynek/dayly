import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import CtaSection from "@/components/ui/CtaSection";
import Pipeline from "@/components/technologie/Pipeline";
import styles from "./Technologie.module.css";

export const metadata: Metadata = {
  title: "Technologie",
  description:
    "Jak DAYLY funguje pod kapotou: třívrstvá paměť, RAG pipeline, routing modelů podle složitosti a privacy-first architektura.",
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const PRIVACY_POINTS = [
  {
    title: "Šifrování end-to-end",
    text: "Obsah paměti je šifrovaný klíčem odvozeným z tvého zařízení. My provozujeme infrastrukturu — do tvých vzpomínek nevidíme.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    ),
  },
  {
    title: "Data v EU",
    text: "Databáze i inference běží v evropských regionech. Plná GDPR compliance není marketingová nálepka, ale výchozí stav.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3.5 9h17M3.5 15h17M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </svg>
    ),
  },
  {
    title: "Paměť pod kontrolou",
    text: "Každý záznam si můžeš zobrazit, opravit nebo smazat. Export všech dat na jedno klepnutí, smazání účtu bez ping-pongu s podporou.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
        <path d="M4 6h16M4 12h16M4 18h10" />
        <circle cx="19" cy="18" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Minimální oprávnění",
    text: "Konektory dostávají nejužší možný scope a tokeny drží zařízení. Odpojení konektoru okamžitě zneplatní přístup.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
        <path d="M12 3l7 3v5c0 4.5-3 8.2-7 9.5C8 19.2 5 15.5 5 11V6l7-3z" />
        <path d="M9.5 12l2 2 3.5-3.5" />
      </svg>
    ),
  },
];

const STACK = [
  {
    area: "Aplikace",
    what: "SwiftUI (iOS), Catalyst (macOS)",
    why: "Nativní výkon, push notifikace a widgety bez kompromisů webview.",
  },
  {
    area: "Backend",
    what: "Supabase — Postgres + Auth + Edge Functions",
    why: "Jedna databáze pro data i vektory, řádkové zabezpečení, EU region.",
  },
  {
    area: "Vektorová paměť",
    what: "pgvector",
    why: "Embeddings bydlí vedle ostatních dat — žádná synchronizace dvou databází.",
  },
  {
    area: "Modely",
    what: "Claude Haiku / Sonnet přes routing",
    why: "Rutina levně a rychle, plánování silným modelem. Vrstva je vyměnitelná.",
  },
  {
    area: "Konektory",
    what: "Model Context Protocol (MCP)",
    why: "Otevřený standard — integrace přibývají bez psaní vlastního API pro každou službu.",
  },
  {
    area: "Hlas",
    what: "on-device přepis + streamovaná syntéza",
    why: "Diktování zpracovává telefon; na server jde text, ne nahrávka.",
  },
];

export default function TechnologiePage() {
  return (
    <>
      <PageHero
        tag="Technologie"
        title={
          <>
            Žádná magie. <span className="serif tinted">Architektura.</span>
          </>
        }
        lead="Osobní agent stojí a padá s pamětí. Tady je popsané, jak ji stavíme: jak si DAYLY pamatuje, jak vybírá, co je relevantní, a proč do tvých dat nevidí ani ten, kdo ho provozuje."
      />

      {/* ---------- 01 · paměť ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            tag="01 · Paměť"
            title={
              <>
                Tři vrstvy, jeden princip:{" "}
                <span className="serif tinted">stárnutí kontextu</span>
              </>
            }
          />
          <div className={styles.memGrid}>
            <Reveal>
              <div className={styles.memBody}>
                <p>
                  Všechno, co DAYLY zachytí, začíná v <strong>pracovní paměti</strong> —
                  ta drží dnešek. Co má hodnotu i po pár dnech, přechází do{" "}
                  <strong>epizodické vrstvy</strong>: schůzky, rozhodnutí, rozdělané
                  věci posledních týdnů. A vzorce, které se opakují, se noční
                  konsolidací povyšují na <strong>trvalé fakty</strong> — kdo jsou lidé
                  kolem tebe, jak pracuješ, co je pro tebe důležité.
                </p>
                <p>
                  Každý záznam nese embedding, váhu důležitosti a čas posledního
                  použití. Co se dlouho nepoužije a nemá váhu, vyhasne. Díky tomu
                  paměť roste do hloubky, ne do šířky — a vyhledávání v ní zůstává
                  rychlé i po letech.
                </p>
                <p>
                  Konsolidace běží na pozadí každou noc. Ráno ji vidíš shrnutou
                  v brifinku jednou větou — a můžeš cokoliv vrátit.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className={styles.codeCard}>
                <div className={styles.codeHead}>
                  <span>memory record</span>
                  <span>trvalá vrstva</span>
                </div>
                <pre>
                  <code>
                    {"{\n"}
                    {"  "}
                    <span className={styles.cKey}>&quot;fact&quot;</span>:{" "}
                    <span className={styles.cStr}>
                      &quot;Novák = klíčový klient, preferuje&quot;
                    </span>
                    {"\n"}
                    {"          "}
                    <span className={styles.cStr}>&quot;telefon před e-mailem&quot;</span>,{"\n"}
                    {"  "}
                    <span className={styles.cKey}>&quot;source&quot;</span>:{" "}
                    <span className={styles.cStr}>&quot;check-in 2026-03-14&quot;</span>,{"\n"}
                    {"  "}
                    <span className={styles.cKey}>&quot;weight&quot;</span>:{" "}
                    <span className={styles.cNum}>0.92</span>,{"\n"}
                    {"  "}
                    <span className={styles.cKey}>&quot;last_used&quot;</span>:{" "}
                    <span className={styles.cStr}>&quot;2026-04-21&quot;</span>,{"\n"}
                    {"  "}
                    <span className={styles.cKey}>&quot;embedding&quot;</span>:{" "}
                    <span className={styles.cCom}>vec(1536)</span>,{"\n"}
                    {"  "}
                    <span className={styles.cKey}>&quot;editable_by_user&quot;</span>:{" "}
                    <span className={styles.cNum}>true</span>
                    {"\n}"}
                  </code>
                </pre>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 02 · RAG pipeline (pinned) ---------- */}
      <Pipeline />

      {/* ---------- 03 · modely ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            tag="03 · Modely"
            title={
              <>
                Správný model na správnou práci — <span className="serif tinted">ne
                největší na všechno</span>
              </>
            }
            lead="Většinu dne tvoří drobné úlohy: vytáhnout úkol z věty, zformátovat brifink, najít termín. Platit za ně nejsilnějším modelem je plýtvání — a čekat na něj je otrava."
          />
          <div className={styles.modelGrid}>
            <Reveal>
              <article className={`card ${styles.modelCard}`}>
                <span className={styles.modelTag}>rutina</span>
                <h3 className={styles.modelTitle}>Rychlý model</h3>
                <p className={styles.modelText}>
                  Extrakce z check-inů, formátování brifinku, klasifikace poznámek.
                  Odpověď pod sekundu, náklady v haléřích — proto může DAYLY běžet
                  celý den, ne jen když se zeptáš.
                </p>
                <div className={styles.modelList}>
                  <span>~80 % všech volání</span>
                  <span>latence &lt; 1 s</span>
                </div>
              </article>
            </Reveal>
            <Reveal delay={0.1}>
              <article className={`card ${styles.modelCard}`}>
                <span className={styles.modelTag}>úsudek</span>
                <h3 className={styles.modelTitle}>Silný model</h3>
                <p className={styles.modelText}>
                  Plánování dne, řešení konfliktů v kalendáři, drafty důležitých
                  e-mailů. Volá se jen tam, kde je potřeba skutečné uvažování —
                  routing rozhoduje podle typu a složitosti úlohy.
                </p>
                <div className={styles.modelList}>
                  <span>~20 % volání</span>
                  <span>plánování · konflikty · drafty</span>
                </div>
              </article>
            </Reveal>
            <Reveal delay={0.2}>
              <article className={`card ${styles.modelCard}`}>
                <span className={styles.modelTag}>výhled</span>
                <h3 className={styles.modelTitle}>On-device</h3>
                <p className={styles.modelText}>
                  Malé modely na telefonu už dnes zvládají přepis a jednoduchou
                  extrakci. Jak porostou, přesune se za nimi i rutina — méně dat
                  opustí zařízení a agent zrychlí.
                </p>
                <div className={styles.modelList}>
                  <span>přepis už dnes on-device</span>
                  <span>extrakce ve fázi 3</span>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 04 · soukromí ---------- */}
      <section className="section section-tint">
        <div className="container">
          <SectionHead
            tag="04 · Soukromí"
            title={
              <>
                Agent, který tě zná, musí být{" "}
                <span className="serif tinted">stavěný na důvěru</span>
              </>
            }
            lead="DAYLY o tobě časem ví víc než kterákoliv jiná aplikace. To není detail — je to hlavní konstrukční požadavek celé architektury."
          />
          <div className={styles.privacyGrid}>
            {PRIVACY_POINTS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.1}>
                <article className={`card ${styles.privacyCard}`}>
                  <div className={styles.privacyIcon}>{p.icon}</div>
                  <h3 className={styles.privacyTitle}>{p.title}</h3>
                  <p className={styles.privacyText}>{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className={styles.notList}>
              <div className={styles.notListTitle}>Co neděláme — a dělat nebudeme</div>
              <ul>
                <li>Netrénujeme modely na tvých datech.</li>
                <li>Neprodáváme data třetím stranám, ani „anonymizovaná“.</li>
                <li>Nečteme obsah tvé paměti pro reklamu, analytiku ani „zlepšování služby“.</li>
                <li>Nedržíme data rukojmím — export a smazání jsou vždy zdarma a okamžité.</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- 05 · stack ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            tag="05 · Stack"
            title={
              <>
                Nudná infrastruktura. <span className="serif tinted">Schválně.</span>
              </>
            }
            lead="Inovujeme v paměti a chování agenta — ne v databázích. Každá vrstva stacku je vybraná tak, aby šla za dva roky vyměnit bez přepisování zbytku."
          />
          <Reveal>
            <div className={styles.stackTable}>
              {STACK.map((row) => (
                <div className={styles.stackRow} key={row.area}>
                  <span className={styles.stackArea}>{row.area}</span>
                  <span className={styles.stackWhat}>{row.what}</span>
                  <span className={styles.stackWhy}>{row.why}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

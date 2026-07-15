import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import CtaSection from "@/components/ui/CtaSection";
import styles from "./Vize.module.css";

export const metadata: Metadata = {
  title: "Vize a roadmapa",
  description:
    "Proč stavíme DAYLY, jaké principy nás drží na uzdě a co přesně přijde v jednotlivých fázích — od základu po autonomního agenta.",
};

const PRINCIPLES = [
  {
    num: "01",
    title: "Klid, ne dopamin",
    text: "DAYLY neměří úspěch časem stráveným v aplikaci — přesně naopak. Ideální interakce trvá dvě minuty ráno a dvě večer. Žádné streaks, žádné odznaky, žádné notifikace navržené tak, aby tě vtáhly zpátky. Agent má tvůj den zklidnit, ne kolonizovat.",
  },
  {
    num: "02",
    title: "Důvěra se buduje postupně",
    text: "Žádná akce se neděje bez tvého vědomí. Agent začíná návrhy, a teprve když stejnou věc opakovaně schvaluješ, nabídne, že ji převezme. Autonomie je vždy per-akce, vždy odvolatelná a vždy zapsaná v logu. Zkratky tady neexistují záměrně.",
  },
  {
    num: "03",
    title: "Soukromí jako konstrukce",
    text: "Ne stránka v nastavení, ale způsob, jakým je systém postavený: end-to-end šifrování, data v EU, žádné trénování na tvém obsahu. Kdyby náš byznys závisel na čtení tvé paměti, postavili jsme špatný produkt.",
  },
  {
    num: "04",
    title: "Malý tým, dlouhý horizont",
    text: "Nestavíme feature factory. Raději pět funkcí, které spolu tvoří smyčku a fungují spolehlivě, než padesát polovičatých. Roadmapa je veřejná a mění se podle toho, co early access uživatelé skutečně používají.",
  },
];

const PHASES = [
  {
    num: "Fáze 1",
    when: "měsíce 1–3",
    title: "Základ",
    goal: "Ověřit, že ranní brifink je návyk, ke kterému se lidé vracejí.",
    active: false,
    items: [
      { state: "done", text: "Web + waitlist" },
      { state: "done", text: "iOS aplikace: brifink a check-in" },
      { state: "doing", text: "Konektory: Google + Apple Calendar" },
      { state: "doing", text: "Paměť 30 dní, první konsolidace" },
      { state: "plan", text: "Uzavřený early access (první stovky)" },
    ],
  },
  {
    num: "Fáze 2",
    when: "měsíce 4–8",
    title: "Agent",
    goal: "Od čtení k jednání: první akce, které DAYLY vyřídí za tebe.",
    active: true,
    items: [
      { state: "plan", text: "Agentní akce: drafty, přesuny, návrhy termínů" },
      { state: "plan", text: "Konektory: Gmail, Notion, Stripe" },
      { state: "plan", text: "Plná třívrstvá paměť bez limitu" },
      { state: "plan", text: "Hlasový brifink a diktování" },
      { state: "plan", text: "macOS aplikace v menu baru" },
    ],
  },
  {
    num: "Fáze 3",
    when: "měsíce 9–18",
    title: "Autonomie",
    goal: "Rutina běží sama; ty jen schvaluješ výjimky.",
    active: false,
    items: [
      { state: "plan", text: "Autonomní akce s per-službou povolením" },
      { state: "plan", text: "Rezervace a platby s potvrzením" },
      { state: "plan", text: "On-device zpracování rutiny" },
      { state: "plan", text: "Teams: sdílený kontext pro malé týmy" },
      { state: "plan", text: "API a SDK pro vlastní konektory" },
    ],
  },
];

const COMPETITORS = [
  {
    name: "ChatGPT / Claude",
    what: "Obecní asistenti se špičkovým uvažováním",
    gap: "Reaktivní — čekají na prompt. Paměť je plochá a proaktivita chybí.",
  },
  {
    name: "Notion AI",
    what: "AI nad tvými dokumenty a poznámkami",
    gap: "Zná tvoje poznámky, ne tvůj den. Neozve se, nejedná.",
  },
  {
    name: "Reclaim / Motion",
    what: "Chytré plánování kalendáře",
    gap: "Optimalizují bloky času. Nevědí proč, nepamatují si kontext.",
  },
  {
    name: "Apple Intelligence",
    what: "Systémová AI přímo v telefonu",
    gap: "Generická vrstva OS — bez hluboké paměti a bez vlastní iniciativy.",
  },
  {
    name: "Todoist / Things",
    what: "Skvělá evidence úkolů",
    gap: "Pasivní seznamy. Všechnu práci s nimi pořád děláš ty.",
  },
];

export default function VizePage() {
  return (
    <>
      <PageHero
        tag="Vize"
        title={
          <>
            Software má pracovat <span className="serif tinted">pro tebe</span> — ne
            obráceně.
          </>
        }
        lead="Proč stavíme dalšího AI agenta, když jich jsou plné titulky? Protože všechny míří na firmy a pracovní procesy — a den obyčejného člověka zůstává roztříštěný mezi deseti aplikacemi, které si navzájem nerozumí."
      />

      {/* ---------- manifest ---------- */}
      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <Reveal>
            <div className={styles.manifest}>
              <p>
                Posledních patnáct let jsme si navykli, že „produktivita“ znamená
                víc aplikací. Kalendář, úkoly, poznámky, maily, připomínky — každá
                věc má svůj nástroj a <strong>všechny je obsluhuješ ty</strong>. Nástroje
                si nepamatují, nedomluví se spolu a nikdy neudělají první krok.
              </p>
              <p>
                Jazykové modely tohle mění od základu. Poprvé je technicky možné,
                aby software rozuměl kontextu tvého dne: kdo je Novák, proč je
                pátek špatný den na schůzky, co jsi komu slíbil. A když rozumí,
                může <strong>jednat</strong> — nejdřív navrhovat, později vyřizovat.
              </p>
              <p>
                DAYLY stavíme jako tuhle chybějící vrstvu: tichého agenta nad
                tvými nástroji, který se každý den učí a postupně přebírá rutinu.
                Ne dalšího chatbota. <strong>Kolegu pro tvůj den.</strong>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- principy ---------- */}
      <section className="section section-tint">
        <div className="container">
          <SectionHead
            tag="01 · Principy"
            title={
              <>
                Pravidla, která nás <span className="serif tinted">drží na uzdě</span>
              </>
            }
            lead="Agent s pamětí a rukama je mocná věc. Tyhle čtyři principy jsou v produktu dřív než jakákoliv funkce — a nová funkce, která je porušuje, se nedostane dovnitř."
          />
          <div className={styles.principles}>
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.num} delay={(i % 2) * 0.1}>
                <article className={`card ${styles.principle}`}>
                  <div className={styles.principleNum}>{p.num}</div>
                  <h3 className={styles.principleTitle}>{p.title}</h3>
                  <p className={styles.principleText}>{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- roadmapa ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            tag="02 · Roadmapa"
            title={
              <>
                Od základu k <span className="serif tinted">autonomii</span> — po
                ověřených krocích
            </>
            }
            lead="Každá fáze má jeden cíl a měřitelné kritérium, kdy je hotová. Do další se jde, až když ta předchozí opravdu funguje — ne podle data v prezentaci."
          />
          <div className={styles.phases}>
            {PHASES.map((phase, i) => (
              <Reveal key={phase.num} delay={i * 0.1}>
                <article className={`card ${styles.phase} ${phase.active ? styles.phaseActive : ""}`}>
                  <div className={styles.phaseHead}>
                    <span className={styles.phaseNum}>{phase.num}</span>
                    <span className={styles.phaseWhen}>{phase.when}</span>
                  </div>
                  <h3 className={styles.phaseTitle}>{phase.title}</h3>
                  <p className={styles.phaseGoal}>{phase.goal}</p>
                  <ul className={styles.phaseList}>
                    {phase.items.map((item) => (
                      <li key={item.text}>
                        <i className={`${styles.stateDot} ${styles[item.state]}`} aria-hidden="true" />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className={styles.legend}>
              <span>
                <i className={`${styles.stateDot} ${styles.done}`} /> hotovo
              </span>
              <span>
                <i className={`${styles.stateDot} ${styles.doing}`} /> právě děláme
              </span>
              <span>
                <i className={`${styles.stateDot} ${styles.plan}`} /> plán
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- konkurence ---------- */}
      <section className="section section-tint">
        <div className="container">
          <SectionHead
            tag="03 · Kontext trhu"
            title={
              <>
                Skvělé nástroje existují. <span className="serif tinted">Celek chybí.</span>
              </>
            }
            lead="Tohle není tabulka „my dobří, oni špatní“ — každý z těch produktů používáme a máme je rádi. Jen řeší jiný problém."
          />
          <Reveal>
            <div className={styles.compWrap}>
              <table className={styles.comp}>
                <thead>
                  <tr>
                    <th scope="col">Produkt</th>
                    <th scope="col">V čem je skvělý</th>
                    <th scope="col">Co mu chybí pro roli osobního agenta</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPETITORS.map((c) => (
                    <tr key={c.name}>
                      <td className={styles.compName}>{c.name}</td>
                      <td className={styles.compWhat}>{c.what}</td>
                      <td className={styles.compGap}>{c.gap}</td>
                    </tr>
                  ))}
                  <tr className={styles.compUs}>
                    <td className={styles.compName}>DAYLY</td>
                    <td className={styles.compWhat}>Paměť + proaktivita + akce v jedné smyčce</td>
                    <td className={styles.compGap}>Přesně tahle kombinace je celý produkt.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- pro koho ne ---------- */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className={styles.notFor}>
              <h3 className={styles.notForTitle}>Upřímně: DAYLY (zatím) není pro tebe, když…</h3>
              <ul>
                <li>chceš detailní projektové řízení — na to je Linear nebo Jira, my je nenahrazujeme;</li>
                <li>nechceš, aby jakákoliv AI viděla tvůj kalendář — to je legitimní postoj a DAYLY bez toho nedává smysl;</li>
                <li>žiješ na Androidu a nechceš čekat — jsme nejdřív na iOS a nebudeme předstírat opak.</li>
              </ul>
              <p className={styles.notForFoot}>
                Radši ti to řekneme na rovinu tady, než abys to zjistil po instalaci.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

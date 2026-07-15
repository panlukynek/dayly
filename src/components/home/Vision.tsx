import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import styles from "./Vision.module.css";

const PILLARS = [
  {
    num: "01",
    title: "Hluboká paměť",
    text: "Návyky, cíle, vztahy, rozdělaná práce. DAYLY si nepamatuje přepisy konverzací, ale strukturovaný kontext — a před každou odpovědí si z něj vytáhne jen to, co je právě teď relevantní.",
    foot: "vektorová paměť + RAG",
  },
  {
    num: "02",
    title: "Proaktivita",
    text: "Nečeká, až se zeptáš. Ráno přijde brifink, přes den připomínky a návrhy v momentě, kdy dávají smysl, večer krátký check-in. Agent, který se ozve dřív, než si problém stihneš uvědomit.",
    foot: "brifink · nudges · check-in",
  },
  {
    num: "03",
    title: "Agentní akce",
    text: "Od návrhů k činům. Draft e-mailu, přesun úkolu, rezervace termínu. Každou akci schvaluješ, dokud sám neřekneš, že ji agent smí dělat automaticky — a kdykoliv to můžeš vzít zpět.",
    foot: "vždy pod tvou kontrolou",
  },
];

export default function Vision() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          tag="01 · Vize"
          title={
            <>
              Nástroje na produktivitu ti říkají, <em className="serif">co</em> máš
              dělat. DAYLY je první, který to <em className="serif tinted">udělá</em>.
            </>
          }
          lead="Todo listy, kalendáře a poznámky jsou pasivní — všechnu práci s nimi děláš ty. DAYLY je vrstva inteligence nad nimi: agent, který tě každým dnem zná líp a postupně přebírá rutinu, aby ti zbyl čas na práci, na které záleží."
        />

        <div className={styles.pillars}>
          {PILLARS.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.1}>
              <article className={`card ${styles.pillar}`}>
                <div className={styles.num}>{p.num}</div>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarText}>{p.text}</p>
                <div className={styles.pillarFoot}>{p.foot}</div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className={styles.quote}>
            „Kalendář ví, <strong>kdy</strong> něco máš. Todo list ví, <strong>co</strong> máš
            udělat. Ale nikdo z nich neví <strong>proč</strong> — a nikdo z nich to
            neudělá za tebe.“
          </p>
        </Reveal>
      </div>
    </section>
  );
}

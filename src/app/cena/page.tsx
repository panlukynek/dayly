import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import CtaSection from "@/components/ui/CtaSection";
import PricingPlans from "@/components/cena/PricingPlans";
import Faq from "@/components/cena/Faq";
import styles from "./Cena.module.css";

export const metadata: Metadata = {
  title: "Cena",
  description:
    "Free na vyzkoušení, Pro za 9 € měsíčně, Teams pro malé týmy. Bez reklam, bez prodeje dat — platíš za produkt a tím to končí.",
};

type Cell = { yes: true } | { no: true } | { val: string };

const ROWS: { label: string; cells: [Cell, Cell, Cell] }[] = [
  { label: "Ranní brifink", cells: [{ val: "3× týdně" }, { val: "denně" }, { val: "denně" }] },
  { label: "Večerní check-in", cells: [{ yes: true }, { yes: true }, { yes: true }] },
  { label: "Hloubka paměti", cells: [{ val: "30 dní" }, { val: "neomezená" }, { val: "neomezená" }] },
  { label: "Konektory", cells: [{ val: "1" }, { val: "všechny" }, { val: "všechny" }] },
  { label: "Agentní akce", cells: [{ no: true }, { yes: true }, { yes: true }] },
  { label: "Hlasový vstup a výstup", cells: [{ no: true }, { yes: true }, { yes: true }] },
  { label: "Sdílené projekty", cells: [{ no: true }, { no: true }, { yes: true }] },
  { label: "Týmová paměť s oprávněními", cells: [{ no: true }, { no: true }, { yes: true }] },
  { label: "Admin přehled a fakturace", cells: [{ no: true }, { no: true }, { yes: true }] },
  {
    label: "Podpora",
    cells: [{ val: "komunita" }, { val: "e-mail < 24 h" }, { val: "prioritní" }],
  },
];

function CellValue({ cell }: { cell: Cell }) {
  if ("yes" in cell) return <span className={styles.yes}>✓</span>;
  if ("no" in cell) return <span className={styles.no}>—</span>;
  return <span className={styles.val}>{cell.val}</span>;
}

export default function CenaPage() {
  return (
    <>
      <PageHero
        tag="Cena"
        title={
          <>
            Jednoduše a <span className="serif tinted">bez hvězdiček</span>.
          </>
        }
        lead="Tři plány, žádné skryté limity, zrušení jedním klepnutím. Ceny platí pro early access a pro první uživatele se už nezvednou."
      />

      <section style={{ paddingBottom: "var(--section-gap)" }}>
        <div className="container">
          <PricingPlans />
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <SectionHead
            tag="Srovnání"
            title={
              <>
                Co přesně dostaneš <span className="serif tinted">kde</span>
              </>
            }
          />
          <Reveal>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Funkce</th>
                    <th scope="col">Free</th>
                    <th scope="col" className={styles.thPro}>
                      Pro
                    </th>
                    <th scope="col">Teams</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.label}>
                      <td>{row.label}</td>
                      {row.cells.map((cell, i) => (
                        <td key={i}>
                          <CellValue cell={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            tag="Byznys model"
            title={
              <>
                Platíš za produkt. <span className="serif tinted">Tím to končí.</span>
              </>
            }
            lead="U osobního agenta je byznys model bezpečnostní vlastnost. Tady je náš, celý, ve třech větách."
          />
          <div className={styles.whyGrid}>
            <Reveal>
              <article className={`card ${styles.whyCard}`}>
                <div className={styles.whyNum}>01</div>
                <h3 className={styles.whyTitle}>AI má reálné náklady</h3>
                <p className={styles.whyText}>
                  Každý brifink a každá extrakce volá jazykový model. Předplatné
                  tyhle náklady pokrývá napřímo — nemusíme je dohánět reklamou ani
                  „datovými partnerstvími“.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.1}>
              <article className={`card ${styles.whyCard}`}>
                <div className={styles.whyNum}>02</div>
                <h3 className={styles.whyTitle}>Zákazník jsi ty</h3>
                <p className={styles.whyText}>
                  Když je produkt zdarma, zákazníkem je někdo jiný. Agent, který zná
                  tvůj kalendář, finance a vztahy, si tuhle dvojznačnost nemůže
                  dovolit. Náš jediný příjem je tvoje předplatné.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.2}>
              <article className={`card ${styles.whyCard}`}>
                <div className={styles.whyNum}>03</div>
                <h3 className={styles.whyTitle}>Ceny bez přepadovek</h3>
                <p className={styles.whyText}>
                  Cena, se kterou přijdeš, ti zůstává. Když budeme muset ceník
                  změnit, dozvíš se to měsíce dopředu a stávajících předplatných se
                  to nedotkne.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <SectionHead
            tag="FAQ"
            title={
              <>
                Na co se lidé <span className="serif tinted">ptají</span>
              </>
            }
            centered
          />
          <Faq />
        </div>
      </section>

      <CtaSection />
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHead from "@/components/ui/SectionHead";
import styles from "./Pipeline.module.css";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "krok 01",
    title: "Vstup",
    text: "Dnešní datum, kalendář, otevřené úkoly a poslední check-iny. Malý, přesně ohraničený snapshot toho, co se právě děje.",
    meta: "kalendář · úkoly · check-iny",
  },
  {
    num: "krok 02",
    title: "Vektorové vyhledávání",
    text: "Dotaz se převede na embedding a proti paměti se najde ~15 nejrelevantnějších záznamů. Ne celá historie — jen to, co se váže k dnešku.",
    meta: "pgvector · cosine · top-k ≈ 15",
  },
  {
    num: "krok 03",
    title: "Sestavení kontextu",
    text: "Nalezené vzpomínky se deduplikují, seřadí podle důležitosti a zkomprimují. Výsledek je kontext o pár stovkách tokenů, ne román.",
    meta: "rerank · dedup · komprese",
  },
  {
    num: "krok 04",
    title: "Generování",
    text: "Model dostane snapshot dne + vybraný kontext a napíše brifink. Rutinu zvládne malý rychlý model, složité plánování eskaluje na silnější.",
    meta: "routing podle složitosti",
  },
];

export default function Pipeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const steps = stepsRef.current
      ? Array.from(stepsRef.current.children).filter(
          (el): el is HTMLElement => el instanceof HTMLElement,
        )
      : [];
    if (!section || steps.length === 0) return;

    const mm = gsap.matchMedia();

    // desktop: sekce se připne a kroky se rozsvěcí postupně se scrollem
    mm.add("(min-width: 861px) and (prefers-reduced-motion: no-preference)", () => {
      const st = ScrollTrigger.create({
        trigger: section,
        pin: pinRef.current,
        start: "top top",
        end: "+=220%",
        scrub: true,
        onUpdate: (self) => {
          if (fillRef.current) {
            fillRef.current.style.transform = `scaleX(${self.progress})`;
          }
          const active = Math.min(
            STEPS.length - 1,
            Math.floor(self.progress * STEPS.length),
          );
          steps.forEach((el, i) => {
            el.classList.toggle(styles.stepActive, i <= active);
          });
        },
      });
      return () => st.kill();
    });

    // mobil / reduced motion: všechno viditelné, žádný pin
    mm.add("(max-width: 860px), (prefers-reduced-motion: reduce)", () => {
      steps.forEach((el) => el.classList.add(styles.stepActive));
      if (fillRef.current) fillRef.current.style.transform = "scaleX(1)";
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.pinWrap} ref={pinRef}>
        <div className="container">
          <SectionHead
            tag="02 · RAG pipeline"
            title={
              <>
                Co se stane mezi <span className="serif tinted">probuzením</span> a
                brifinkem
              </>
            }
            lead="Každý brifink projde čtyřmi kroky. Cíl je pokaždé stejný: dát modelu co nejmenší a co nejpřesnější kontext."
          />

          <div className={styles.rail} aria-hidden="true">
            <div className={styles.railFill} ref={fillRef} />
          </div>

          <div className={styles.steps} ref={stepsRef}>
            {STEPS.map((s) => (
              <article className={styles.step} key={s.title}>
                <div className={styles.stepNum}>{s.num}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepText}>{s.text}</p>
                <div className={styles.stepMeta}>{s.meta}</div>
              </article>
            ))}
          </div>

          <p className={styles.note}>
            <b>proč to celé:</b> posílat modelu celou historii by bylo pomalé, drahé
            a paradoxně méně přesné — relevantní signál by se utopil v šumu. Výběr
            ~15 vzpomínek drží odpověď rychlou a soustředěnou.
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHead from "@/components/ui/SectionHead";
import styles from "./DayTimeline.module.css";

gsap.registerPlugin(ScrollTrigger);

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const icons = {
  sun: (
    <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
    </svg>
  ),
  headphones: (
    <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" />
    </svg>
  ),
  bell: (
    <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}>
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  ),
  mic: (
    <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  ),
  zap: (
    <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}>
      <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" />
    </svg>
  ),
  moon: (
    <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}>
      <path d="M21 13A8.5 8.5 0 0 1 11 3a8.5 8.5 0 1 0 10 10z" />
    </svg>
  ),
  layers: (
    <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}>
      <path d="M4 7l8-4 8 4-8 4-8-4z" />
      <path d="M4 12l8 4 8-4" />
      <path d="M4 17l8 4 8-4" />
    </svg>
  ),
};

const ITEMS: { time: string; icon: keyof typeof icons; title: string; text: React.ReactNode }[] = [
  {
    time: "07:00",
    icon: "sun",
    title: "Ranní brifink",
    text: "Přehled dne z kalendáře, úkolů a paměti. Ne seznam — úsudek: co je důležité, co počká, kde je riziko.",
  },
  {
    time: "07:05",
    icon: "headphones",
    title: "Poslech u kávy",
    text: "Brifink si necháš přečíst nahlas. Dvě minuty, ruce volné, den srovnaný dřív, než otevřeš notebook.",
  },
  {
    time: "09:30",
    icon: "bell",
    title: "Kontext před schůzkou",
    text: (
      <>
        <q>Za 30 minut voláš s Jakubem. Minule jste skončili u rozpočtu — tady jsou poznámky a dva otevřené body.</q>
      </>
    ),
  },
  {
    time: "12:40",
    icon: "mic",
    title: "Poznámka za chůze",
    text: (
      <>
        <q>Musím se ozvat Novákovi kvůli smlouvě.</q> Řekneš to do telefonu. DAYLY vytvoří úkol, přidá kontext
        z paměti a navrhne termín.
      </>
    ),
  },
  {
    time: "15:00",
    icon: "zap",
    title: "Návrh akce",
    text: (
      <>
        <q>Máš volných 20 minut a Novák je pořád otevřený — připravil jsem draft e-mailu. Odeslat?</q> Jedno
        klepnutí a je to vyřízené.
      </>
    ),
  },
  {
    time: "20:00",
    icon: "moon",
    title: "Večerní check-in",
    text: "Dvě minuty: co se povedlo, co se posunulo, co tě čeká zítra. Hlasem nebo pár větami textu.",
  },
  {
    time: "20:05",
    icon: "layers",
    title: "Agent se učí",
    text: "Z check-inu se extrahuje kontext do paměti. Zítřejší brifink bude zase o kousek přesnější.",
  },
];

export default function DayTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(fillRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          end: "bottom 55%",
          scrub: 0.5,
        },
      });

      const items = gsap.utils.toArray<HTMLElement>(`.${styles.item}`, root);
      items.forEach((item) => {
        gsap.from(item, {
          autoAlpha: 0,
          y: 34,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="section" id="den">
      <div className="container">
        <SectionHead
          tag="03 · Jak vypadá den"
          title={
            <>
              Od prvního <span className="serif tinted">dobrého rána</span> po klidný
              večer.
            </>
          }
          lead="DAYLY není další aplikace, kterou musíš otevírat. Ozve se sám — v pár momentech dne, kdy to dává smysl. Zbytek času mlčí a pracuje na pozadí."
        />

        <div className={styles.wrap} ref={rootRef}>
          <div className={styles.line} aria-hidden="true">
            <div className={styles.lineFill} ref={fillRef} />
          </div>

          {ITEMS.map((item) => (
            <div className={styles.item} key={item.time}>
              <div className={styles.time}>{item.time}</div>
              <article className={`card ${styles.card}`}>
                <div className={styles.cardHead}>
                  <span className={styles.badge}>{icons[item.icon]}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
                <p className={styles.cardText}>{item.text}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

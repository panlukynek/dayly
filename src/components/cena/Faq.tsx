"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./Faq.module.css";

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "Kdy bude DAYLY dostupný?",
    a: (
      <p>
        Early access na iOS otevíráme na jaře 2026, po malých skupinách z waitlistu.
        Nechceme pustit dovnitř tisíce lidí najednou a rozbít jim první dojem —
        raději pomalejší rozjezd a agent, který funguje.
      </p>
    ),
  },
  {
    q: "Proč není plná verze zdarma?",
    a: (
      <>
        <p>
          Protože každý brifink stojí skutečné peníze — DAYLY volá jazykové modely
          za tebe každý den. Služby „zdarma“ tyhle náklady někde dohánějí: reklamou,
          prodejem dat nebo tím, že po roce zavřou.
        </p>
        <p>
          Předplatné znamená jednoduchý vztah: platíš za produkt, my pracujeme pro
          tebe. Žádná reklama, žádný prodej dat, žádný druhý byznys model za oponou.
        </p>
      </>
    ),
  },
  {
    q: "Můžu předplatné kdykoliv zrušit?",
    a: (
      <p>
        Ano, jedním klepnutím v aplikaci, bez výpovědní lhůty. Doběhne zaplacené
        období a tím to končí. Roční plán jde do 14 dnů stornovat s vrácením peněz.
      </p>
    ),
  },
  {
    q: "Co se stane s mojí pamětí, když zruším Pro?",
    a: (
      <p>
        Nic se nemaže. Paměť se jen zmrazí na režim Free (agent čte posledních
        30 dní) a kompletní export ti zůstává dostupný napořád. Když se vrátíš,
        agent naváže tam, kde skončil. Smazat všechno můžeš samozřejmě taky —
        okamžitě a nevratně.
      </p>
    ),
  },
  {
    q: "Umí DAYLY česky?",
    a: (
      <p>
        Ano — čeština je první jazyk, ve kterém DAYLY vzniká, včetně hlasového
        vstupu. Angličtina funguje od začátku taky; další jazyky přidáme podle
        zájmu.
      </p>
    ),
  },
  {
    q: "Bude verze pro Android?",
    a: (
      <p>
        Plánujeme ji, ale až po iOS a macOS. Jsme malý tým a radši doručíme jednu
        platformu pořádně než tři napůl. Zapiš se na waitlist a poznač do e-mailu
        „Android“ — podle toho reálně plánujeme pořadí.
      </p>
    ),
  },
  {
    q: "Jak je to s mými daty?",
    a: (
      <p>
        Paměť je šifrovaná end-to-end, data neopouštějí EU, na tvých datech se
        netrénuje a export i smazání máš kdykoliv na jedno klepnutí. Detailně to
        popisujeme na stránce Technologie v sekci Soukromí.
      </p>
    ),
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={styles.list}>
      {FAQ.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={styles.item} key={item.q}>
            <button
              type="button"
              className={styles.question}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {item.q}
              <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`} aria-hidden="true">
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className={styles.answer}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={styles.answerInner}>{item.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

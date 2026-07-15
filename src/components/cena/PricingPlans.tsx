"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import styles from "./PricingPlans.module.css";

type Billing = "monthly" | "yearly";

const PLANS = [
  {
    name: "Free",
    monthly: "0 €",
    yearly: "0 €",
    yearlyNote: null,
    desc: "Na vyzkoušení, jestli ti rytmus brifink → den → check-in sedne.",
    features: [
      "Ranní brifink 3× týdně",
      "Večerní check-in",
      "Paměť 30 dní zpětně",
      "1 konektor (kalendář)",
      "Komunitní podpora",
    ],
    cta: "Začít zdarma",
    featured: false,
    soon: false,
  },
  {
    name: "Pro",
    monthly: "9 €",
    yearly: "7,50 €",
    yearlyNote: "90 € ročně — 2 měsíce zdarma",
    desc: "Plný agent pro každý den. Tohle je DAYLY, jak ho stavíme.",
    features: [
      "Brifink každý den + na vyžádání",
      "Neomezená třívrstvá paměť",
      "Všechny konektory",
      "Agentní akce se schvalováním",
      "Hlasový vstup i výstup",
      "Podpora e-mailem do 24 h",
    ],
    cta: "Připojit se na waitlist",
    featured: true,
    soon: false,
  },
  {
    name: "Teams",
    monthly: "15 €",
    yearly: "12,50 €",
    yearlyNote: "150 € ročně / osoba",
    desc: "Sdílený kontext pro malé týmy. Otevřeme po stabilizaci Pro.",
    features: [
      "Vše z plánu Pro",
      "Sdílené projekty a vlákna",
      "Týmová paměť s oprávněními",
      "Admin přehled a fakturace",
      "Prioritní podpora",
    ],
    cta: "Mít zájem o Teams",
    featured: false,
    soon: true,
  },
];

export default function PricingPlans() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <div>
      <Reveal className={styles.toggleRow}>
        <div className={styles.toggle} role="tablist" aria-label="Fakturační období">
          {(
            [
              { id: "monthly", label: "Měsíčně" },
              { id: "yearly", label: "Ročně" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.id}
              role="tab"
              aria-selected={billing === opt.id}
              className={`${styles.toggleBtn} ${billing === opt.id ? styles.toggleBtnActive : ""}`}
              onClick={() => setBilling(opt.id)}
            >
              {billing === opt.id && (
                <motion.span
                  layoutId="billing-pill"
                  className={styles.togglePill}
                  transition={{ type: "spring", stiffness: 480, damping: 40 }}
                />
              )}
              {opt.label}
              {opt.id === "yearly" && <span className={styles.toggleBadge}>−17 %</span>}
            </button>
          ))}
        </div>
      </Reveal>

      <div className={styles.grid}>
        {PLANS.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.1}>
            <article className={`card ${styles.plan} ${plan.featured ? styles.planFeatured : ""}`}>
              {plan.featured && <span className={styles.planBadge}>Doporučujeme</span>}
              <div className={styles.planName}>
                {plan.name}
                {plan.soon && <span className={styles.soon}>otevřeme později</span>}
              </div>
              <div className={styles.priceRow}>
                <motion.span
                  key={billing}
                  className={styles.price}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {billing === "monthly" ? plan.monthly : plan.yearly}
                </motion.span>
                <span className={styles.per}>
                  {plan.name === "Teams" ? "/ osoba / měsíc" : "/ měsíc"}
                </span>
              </div>
              <div className={styles.priceNote}>
                {billing === "yearly" && plan.yearlyNote ? plan.yearlyNote : " "}
              </div>
              <p className={styles.desc}>{plan.desc}</p>
              <ul className={styles.list}>
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className={`btn ${plan.featured ? "btn-solid" : "btn-ghost"} btn-block ${styles.planCta}`}
              >
                {plan.cta}
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

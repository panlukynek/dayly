"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** zpoždění v sekundách — pro stagger v gridu */
  delay?: number;
  /** posun v ose Y, ze kterého element najíždí */
  y?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Fade-up při vjezdu do viewportu. Jediný reveal pattern na celém webu,
 * ať animace působí konzistentně a ne jako náhodná přehlídka efektů.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  style,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -70px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

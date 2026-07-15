"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion, animate } from "motion/react";

type CounterProps = {
  to: number;
  /** desetinná místa */
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
};

/** Číslo, které se napočítá při vjezdu do viewportu. */
export default function Counter({
  to,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1.6,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;

    const format = (v: number) =>
      `${prefix}${v.toLocaleString("cs-CZ", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;

    if (reduce) {
      el.textContent = format(to);
      return;
    }

    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });

    return () => controls.stop();
  }, [inView, to, decimals, suffix, prefix, duration, reduce]);

  return <span ref={ref}>{`${prefix}0${suffix}`}</span>;
}

"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PaletteGrid.module.css";

const GROUPS: { label: string; colors: [string, string][] }[] = [
  {
    label: "ink & paper",
    colors: [
      ["bg", "#161617"],
      ["bg_dark", "#131314"],
      ["fg", "#c9c7cd"],
      ["subtext1", "#b4b1ba"],
      ["subtext2", "#9f9ca6"],
      ["subtext3", "#8b8693"],
      ["subtext4", "#6c6874"],
      ["black", "#27272a"],
    ],
  },
  {
    label: "grays",
    colors: [
      ["gray0", "#18181a"],
      ["gray1", "#1b1b1c"],
      ["gray2", "#2a2a2c"],
      ["gray3", "#313134"],
      ["gray4", "#3b3b3e"],
      ["gray5", "#444448"],
    ],
  },
  {
    label: "accents",
    colors: [
      ["red", "#ea83a5"],
      ["orange", "#f5a191"],
      ["yellow", "#e6b99d"],
      ["green", "#90b99f"],
      ["cyan", "#85b5ba"],
      ["blue", "#92a2d5"],
      ["purple", "#aca1cf"],
      ["magenta", "#e29eca"],
    ],
  },
];

export default function PaletteGrid() {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy(hex: string) {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), 1400);
    } catch {
      // clipboard blocked — nothing to do, the hex is printed right there
    }
  }

  return (
    <div>
      {GROUPS.map((g) => (
        <div className={styles.group} key={g.label}>
          <div className={styles.groupLabel}>{g.label}</div>
          <div className={styles.grid}>
            {g.colors.map(([name, hex]) => (
              <button
                key={name}
                type="button"
                className={styles.swatch}
                onClick={() => copy(hex)}
                title={`copy ${hex}`}
              >
                <span className={styles.color} style={{ background: hex }} />
                <span className={styles.meta}>
                  <span>{name}</span>
                  <span className={copied === hex ? styles.copied : styles.hex}>
                    {copied === hex ? "copied" : hex}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

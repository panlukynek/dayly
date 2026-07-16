"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import styles from "./PermissionFlow.module.css";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const NODES: { x: number; y: number; title: string; sub: string }[] = [
  { x: 40, y: 16, title: "chat UI", sub: "you hit send" },
  { x: 540, y: 104, title: "POST /api/chat", sub: "SSE stream opens" },
  { x: 40, y: 192, title: "tool loop", sub: "model calls create_note (write)" },
  { x: 540, y: 280, title: "permissions.js", sub: "promise parked · stream stays open" },
  { x: 40, y: 368, title: "allow / deny card", sub: "POST /api/chat/permission" },
  { x: 540, y: 456, title: "resolved", sub: "loop continues → done" },
];

const PATH =
  "M150 80 V92 H650 V136 V180 H150 V224 V268 H650 V312 V356 H150 V400 V444 H650 V456";

/**
 * The permission broker, drawn as you scroll: DrawSVG scrubs the wire,
 * nodes light up when the line reaches them. Without JS (or with reduced
 * motion) the diagram is simply fully drawn.
 */
export default function PermissionFlow() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const path = pathRef.current;
    if (!root || !path) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = Array.from(root.querySelectorAll<SVGGElement>("[data-node]"));
    root.classList.add(styles.dim);
    nodes[0]?.classList.add(styles.nodeActive);

    const tween = gsap.fromTo(
      path,
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          end: "bottom 40%",
          scrub: 0.4,
          onUpdate: (self) => {
            const idx = Math.min(
              NODES.length - 1,
              Math.floor(self.progress * NODES.length),
            );
            nodes.forEach((n, i) =>
              n.classList.toggle(styles.nodeActive, i <= idx),
            );
          },
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      root.classList.remove(styles.dim);
      nodes.forEach((n) => n.classList.add(styles.nodeActive));
    };
  }, []);

  return (
    <div className={styles.wrap} ref={rootRef}>
      <svg
        className={styles.svg}
        viewBox="0 0 800 540"
        role="img"
        aria-label="Permission flow: the chat posts to /api/chat, the tool loop hits a write tool, a promise parks in the permission broker while the SSE stream stays open, the UI shows an allow/deny card, and resolving it lets the loop continue."
      >
        <path className={styles.path} d={PATH} ref={pathRef} />
        {NODES.map((n) => (
          <g key={n.title} data-node className={`${styles.node} ${styles.nodeActive}`}>
            <rect x={n.x} y={n.y} width="220" height="64" />
            <text x={n.x + 16} y={n.y + 27}>{n.title}</text>
            <text x={n.x + 16} y={n.y + 47} className={styles.sub}>
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

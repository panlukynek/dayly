import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import styles from "./FeatureBlock.module.css";

type FeatureBlockProps = {
  id: string;
  tag: string;
  title: ReactNode;
  /** odstavce popisu */
  children: ReactNode;
  bullets?: string[];
  visual: ReactNode;
  /** vizuál vlevo, text vpravo */
  flip?: boolean;
};

export default function FeatureBlock({
  id,
  tag,
  title,
  children,
  bullets,
  visual,
  flip,
}: FeatureBlockProps) {
  return (
    <article id={id} className={`${styles.block} ${flip ? styles.flip : ""}`}>
      <Reveal className={styles.text}>
        <span className="tag">{tag}</span>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.body}>{children}</div>
        {bullets && (
          <ul className={styles.list}>
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
      </Reveal>
      <Reveal className={styles.visual} delay={0.12}>
        {visual}
      </Reveal>
    </article>
  );
}

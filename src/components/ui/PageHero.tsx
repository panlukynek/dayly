import type { ReactNode } from "react";
import Reveal from "./Reveal";
import styles from "./PageHero.module.css";

type PageHeroProps = {
  tag: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
};

export default function PageHero({ tag, title, lead, children }: PageHeroProps) {
  return (
    <header className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <Reveal y={20}>
          <span className="tag">{tag}</span>
          <h1 className={styles.title}>{title}</h1>
          {lead && <p className={styles.lead}>{lead}</p>}
          {children}
        </Reveal>
      </div>
    </header>
  );
}

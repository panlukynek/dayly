import type { ReactNode } from "react";
import Reveal from "./Reveal";
import styles from "./PageHead.module.css";

type PageHeadProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
};

export default function PageHead({ eyebrow, title, lead }: PageHeadProps) {
  return (
    <header className={styles.head}>
      <div className="shell">
        <Reveal y={18}>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className={styles.title}>{title}</h1>
          {lead && <p className={styles.lead}>{lead}</p>}
        </Reveal>
      </div>
    </header>
  );
}

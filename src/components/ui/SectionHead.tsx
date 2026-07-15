import type { ReactNode } from "react";
import Reveal from "./Reveal";
import styles from "./SectionHead.module.css";

type SectionHeadProps = {
  tag: string;
  title: ReactNode;
  lead?: ReactNode;
  centered?: boolean;
};

export default function SectionHead({ tag, title, lead, centered }: SectionHeadProps) {
  return (
    <Reveal className={`${styles.head} ${centered ? styles.centered : ""}`}>
      <span className={`tag ${styles.tag}`}>{tag}</span>
      <h2 className={styles.title}>{title}</h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </Reveal>
  );
}

import type { ReactNode } from "react";
import styles from "./Terminal.module.css";

type TerminalProps = {
  title: string;
  meta?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Shared mono frame for terminals, files and logs. Colour classes for
 * content: tl-prompt, tl-cmd, tl-dim, tl-key, tl-str, tl-num, tl-kw,
 * tl-com, tl-warn, tl-ok (global within the frame).
 */
export default function Terminal({ title, meta, children, className }: TerminalProps) {
  return (
    <div className={`${styles.frame} ${className ?? ""}`}>
      <div className={styles.head}>
        <span>{title}</span>
        {meta && <span>{meta}</span>}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

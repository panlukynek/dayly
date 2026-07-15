import { Fragment } from "react";
import styles from "./Marquee.module.css";

const INTEGRATIONS = [
  "Google Calendar",
  "Apple Calendar",
  "Gmail",
  "Outlook",
  "Notion",
  "Obsidian",
  "Stripe",
  "Fio API",
  "Spotify",
  "WhatsApp",
  "Telegram",
  "HomeKit",
];

function Track() {
  return (
    <div className={styles.track} aria-hidden="true">
      {INTEGRATIONS.map((name) => (
        <Fragment key={name}>
          <span className={styles.item}>{name}</span>
          <i className={styles.sep} />
        </Fragment>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className={styles.marquee} role="img" aria-label={`Integrace: ${INTEGRATIONS.join(", ")}`}>
      <Track />
      <Track />
    </div>
  );
}

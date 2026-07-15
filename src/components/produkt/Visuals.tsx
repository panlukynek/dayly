import styles from "./Visuals.module.css";

/** Vizuální mocky pro /produkt — čisté CSS, žádný runtime JS. */

export function BriefVisual() {
  return (
    <div className={styles.frame}>
      <div className={styles.frameHead}>
        <span>Ranní brifink</span>
        <b>07:00</b>
      </div>
      <div className={styles.briefRow}>
        <span className={styles.briefKey}>Den</span>3 schůzky · 5 úkolů · deadline Aurora v 18:00
      </div>
      <div className={styles.briefRow}>
        <span className={styles.briefKey}>Fokus</span>Dokončit pitch deck — blok 14:00–16:30 je volný
      </div>
      <div className={`${styles.briefRow} ${styles.briefRowHot}`}>
        <span className={styles.briefKey}>Pozor</span>Nabitý den. Navrhuju posunout „fakturu Novák“ na
        čtvrtek — mám to udělat?
      </div>
      <div className={styles.briefRow}>
        <span className={styles.briefKey}>Paměť</span>Rok od podpisu smlouvy s Vortexem. Vhodný moment na
        follow-up.
      </div>
      <div className={styles.briefRow}>
        <span className={styles.briefKey}>Venku</span>14 °C, slunečno. Do 11:00 bez deště.
      </div>
    </div>
  );
}

export function CaptureVisual() {
  return (
    <div className={styles.frame}>
      <div className={styles.frameHead}>
        <span>Večerní check-in</span>
        <b>20:00</b>
      </div>
      <div className={styles.wave} aria-hidden="true">
        {Array.from({ length: 26 }, (_, i) => (
          <i key={i} style={{ "--i": i % 9 } as React.CSSProperties} />
        ))}
      </div>
      <p className={styles.captureQuote}>
        „Schůzka s Jakubem dopadla dobře, chce nabídku do pátku. A příští týden nemám
        plánovat nic na dopoledne, budu vozit auto do servisu.“
      </p>
      <div className={styles.captureOut}>
        <span className={`${styles.entity} ${styles.entityTask}`}>
          <b>úkol</b> nabídka pro Jakuba · pá
        </span>
        <span className={`${styles.entity} ${styles.entityPerson}`}>
          <b>osoba</b> Jakub → vlákno
        </span>
        <span className={`${styles.entity} ${styles.entityDate}`}>
          <b>blok</b> příští týden dopoledne
        </span>
        <span className={`${styles.entity} ${styles.entityCtx}`}>
          <b>kontext</b> servis auta
        </span>
      </div>
    </div>
  );
}

export function MemoryVisual() {
  return (
    <div className={styles.frame}>
      <div className={styles.frameHead}>
        <span>Vrstvy paměti</span>
        <b>živý stav</b>
      </div>
      <div className={styles.layers}>
        <div className={`${styles.layer} ${styles.layerA}`}>
          <div>
            <strong>Pracovní</strong>
            <small>co se děje teď — dnešní den, otevřené smyčky</small>
          </div>
          <span className={styles.layerMeta}>~24 h</span>
        </div>
        <div className={`${styles.layer} ${styles.layerB}`}>
          <div>
            <strong>Epizodická</strong>
            <small>události, schůzky, rozhodnutí posledních týdnů</small>
          </div>
          <span className={styles.layerMeta}>~90 dní</span>
        </div>
        <div className={`${styles.layer} ${styles.layerC}`}>
          <div>
            <strong>Trvalá</strong>
            <small>lidé, návyky, preference, dlouhodobé cíle</small>
          </div>
          <span className={styles.layerMeta}>dokud ji nesmažeš</span>
        </div>
      </div>
      <div className={styles.memNote}>
        <b>konsolidace 03:00</b> — 47 záznamů z týdne → 6 trvalých faktů
      </div>
    </div>
  );
}

export function ActionsVisual() {
  return (
    <div className={styles.frame}>
      <div className={styles.frameHead}>
        <span>Fronta akcí</span>
        <b>dnes</b>
      </div>
      <div className={styles.action}>
        <span className={`${styles.actionState} ${styles.actionDone}`}>✓</span>
        <div className={styles.actionBody}>
          <strong>Úkol „faktura Novák“ přesunut na čtvrtek</strong>
          <small>schválil jsi v 07:02 z brifinku</small>
        </div>
        <span className={styles.actionPhase}>hotovo</span>
      </div>
      <div className={styles.action}>
        <span className={`${styles.actionState} ${styles.actionWait}`}>?</span>
        <div className={styles.actionBody}>
          <strong>Draft: follow-up e-mail pro Vortex</strong>
          <small>připraven ke kontrole · 3 odstavce</small>
        </div>
        <div className={styles.actionBtns}>
          <span className={`${styles.miniBtn} ${styles.miniBtnPrimary}`}>Odeslat</span>
          <span className={styles.miniBtn}>Upravit</span>
        </div>
      </div>
      <div className={styles.action}>
        <span className={`${styles.actionState} ${styles.actionWait}`}>?</span>
        <div className={styles.actionBody}>
          <strong>Rezervace: servis auta, út 9:00</strong>
          <small>našel jsem volný termín podle tvého kalendáře</small>
        </div>
        <div className={styles.actionBtns}>
          <span className={`${styles.miniBtn} ${styles.miniBtnPrimary}`}>Potvrdit</span>
        </div>
      </div>
      <div className={styles.action}>
        <span className={styles.actionState}>○</span>
        <div className={styles.actionBody}>
          <strong>Autonomní platby</strong>
          <small>vyžaduje explicitní zapnutí per-služba</small>
        </div>
        <span className={styles.actionPhase}>fáze 3</span>
      </div>
    </div>
  );
}

const CONNECTORS: { name: string; scope: string; on?: boolean }[] = [
  { name: "Google Calendar", scope: "čtení + zápis", on: true },
  { name: "Apple Calendar", scope: "čtení + zápis", on: true },
  { name: "Gmail", scope: "drafty", on: true },
  { name: "Notion", scope: "poznámky", on: true },
  { name: "Stripe", scope: "fáze 2" },
  { name: "Spotify", scope: "kontext dne", on: true },
  { name: "WhatsApp", scope: "fáze 2" },
  { name: "HomeKit", scope: "fáze 3" },
  { name: "Obsidian", scope: "fáze 2" },
];

export function ConnectorsVisual() {
  return (
    <div className={styles.frame}>
      <div className={styles.frameHead}>
        <span>Konektory</span>
        <b>MCP</b>
      </div>
      <div className={styles.connGrid}>
        {CONNECTORS.map((c) => (
          <div
            key={c.name}
            className={`${styles.conn} ${c.on ? styles.connOn : styles.connSoon}`}
          >
            <strong>{c.name}</strong>
            <small>{c.on ? "aktivní" : c.scope}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: "72svh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "8rem var(--pad) 4rem",
      }}
    >
      <div>
        <span className="eyebrow">404</span>
        <h1 style={{ fontSize: "var(--t-2xl)", marginTop: "1rem" }}>
          Not in the <span className="serif">vault</span>.
        </h1>
        <p className="mono dim" style={{ marginTop: "1.25rem", fontSize: "var(--t-sm)" }}>
          rg &quot;{"{this page}"}&quot; → 0 matches
        </p>
        <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "center" }}>
          <Link href="/" className="btn btn-ghost">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}

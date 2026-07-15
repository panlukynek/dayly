import { Link } from "next-view-transitions";

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: "70svh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "8rem var(--container-pad) 4rem",
      }}
    >
      <div>
        <span className="tag" style={{ justifyContent: "center" }}>
          404
        </span>
        <h1 style={{ fontSize: "var(--text-2xl)", marginTop: "1rem" }}>
          Tahle stránka v paměti <span className="serif tinted">není</span>.
        </h1>
        <p style={{ color: "var(--text-soft)", marginTop: "1.25rem" }}>
          Buď nikdy neexistovala, nebo jsme ji přesunuli.
        </p>
        <div style={{ marginTop: "2.25rem" }}>
          <Link href="/" className="btn btn-solid">
            Zpět na úvod
          </Link>
        </div>
      </div>
    </section>
  );
}

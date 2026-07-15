import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Zápis na waitlist. Validace běží tady, samotné uložení je za
 * `saveToWaitlist` — v produkci sem patří napojení na Resend audience,
 * Supabase tabulku nebo cokoliv, co drží seznam. Záměrně jediné místo,
 * které bude potřeba změnit.
 */
async function saveToWaitlist(email: string): Promise<void> {
  // TODO(prod): napojit na skutečné úložiště (Resend / Supabase / Postgres).
  console.info(`[waitlist] new signup: ${email}`);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný požadavek." }, { status: 400 });
  }

  const email =
    typeof body === "object" && body !== null && "email" in body
      ? String((body as { email: unknown }).email).trim().toLowerCase()
      : "";

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { ok: false, error: "Zadej prosím platnou e-mailovou adresu." },
      { status: 422 },
    );
  }

  try {
    await saveToWaitlist(email);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Zápis se nepovedl, zkus to prosím za chvíli." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

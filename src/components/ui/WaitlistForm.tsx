"use client";

import { useState } from "react";
import styles from "./WaitlistForm.module.css";

type FormState = "idle" | "loading" | "ok" | "error";

export default function WaitlistForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;

    const form = e.currentTarget;
    const email = new FormData(form).get("email")?.toString().trim() ?? "";

    setState("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data: { ok: boolean; error?: string } = await res.json();

      if (!res.ok || !data.ok) {
        setState("error");
        setMessage(data.error ?? "Něco se pokazilo. Zkus to prosím znovu.");
        return;
      }

      setState("ok");
      setMessage("Díky, jsi na seznamu. Ozveme se, až otevřeme další kolo early accessu.");
      form.reset();
    } catch {
      setState("error");
      setMessage("Nepodařilo se odeslat. Zkontroluj připojení a zkus to znovu.");
    }
  }

  return (
    <div>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <input
          className={styles.input}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="tvuj@email.cz"
          aria-label="E-mailová adresa"
          disabled={state === "loading"}
        />
        <button type="submit" className="btn btn-solid" disabled={state === "loading"}>
          {state === "loading" ? "Odesílám…" : "Chci pozvánku"}
        </button>
      </form>
      <p
        className={`${styles.note} ${
          state === "ok" ? styles.noteOk : state === "error" ? styles.noteError : styles.noteHint
        }`}
        role="status"
        aria-live="polite"
      >
        {message ?? "Žádný spam — jen jeden e-mail, až na tebe přijde řada."}
      </p>
    </div>
  );
}

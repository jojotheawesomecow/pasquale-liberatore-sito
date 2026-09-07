"use client";

import { useState } from "react";

type Props = {
  endpoint: string;
  chiave?: string | null;
  etichette: { nome: string; email: string; messaggio: string; invia: string; invio: string; grazie: string; errore: string; privacy: string };
};

/** Modulo contatti che invia i dati a un servizio esterno (Formspree, Web3Forms o simili). */
export function ModuloContatti({ endpoint, chiave, etichette }: Props) {
  const [stato, setStato] = useState<"pronto" | "invio" | "ok" | "errore">("pronto");

  async function invia(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const dati = new FormData(form);
    if (dati.get("sito_web")) return; // campo esca anti-spam
    setStato("invio");
    const corpo: Record<string, string> = {
      name: String(dati.get("nome") ?? ""),
      email: String(dati.get("email") ?? ""),
      message: String(dati.get("messaggio") ?? ""),
      subject: "Messaggio dal sito pasqualeliberatore.com",
    };
    if (chiave) corpo.access_key = chiave;
    try {
      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(corpo),
      });
      if (!r.ok) throw new Error(String(r.status));
      setStato("ok");
      form.reset();
    } catch {
      setStato("errore");
    }
  }

  const campo = "w-full border-b border-pietra bg-transparent py-3 font-serif text-lg text-inchiostro placeholder:text-pietra-2 focus:border-inchiostro focus:outline-none";

  if (stato === "ok") return <p className="font-serif text-xl text-muschio">{etichette.grazie}</p>;

  return (
    <form onSubmit={invia} className="grid gap-6" noValidate={false}>
      <label className="block">
        <span className="etichetta">{etichette.nome}</span>
        <input name="nome" type="text" required autoComplete="name" className={campo} />
      </label>
      <label className="block">
        <span className="etichetta">{etichette.email}</span>
        <input name="email" type="email" required autoComplete="email" className={campo} />
      </label>
      <label className="block">
        <span className="etichetta">{etichette.messaggio}</span>
        <textarea name="messaggio" required rows={5} className={`${campo} resize-y`} />
      </label>
      <input type="text" name="sito_web" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={stato === "invio"}
          className="inline-flex h-12 items-center justify-center rounded-full bg-inchiostro px-7 font-sans text-sm tracking-[0.02em] text-carta transition-colors hover:bg-muschio disabled:opacity-60"
        >
          {stato === "invio" ? etichette.invio : etichette.invia}
        </button>
        <p className="font-sans text-xs text-pietra-2 sm:max-w-xs">{etichette.privacy}</p>
      </div>
      {stato === "errore" ? <p className="font-sans text-sm text-terra">{etichette.errore}</p> : null}
    </form>
  );
}

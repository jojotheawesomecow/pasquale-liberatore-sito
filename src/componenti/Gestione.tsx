"use client";

import { useMemo, useRef, useState } from "react";

export type OperaGestione = {
  slug: string;
  codice: string;
  titolo: string;
  titolo_en: string;
  anno: string;
  tecnica: string;
  materiale: string;
  dimensioni: string;
  luogo: string;
  categoria: string;
  selezionata: boolean;
  bozza: boolean;
  anteprima: string;
  w: number;
  h: number;
  origine: string;
};

const CATEGORIE = [
  { value: "scultura", label: "Scultura" },
  { value: "opera-pubblica", label: "Monumenti pubblici" },
  { value: "pittura", label: "Pittura" },
  { value: "disegno", label: "Disegno" },
  { value: "installazione", label: "Installazione" },
  { value: "performance", label: "Performance" },
];
const SENZA_TITOLO = "Senza titolo";

async function invia(corpo: Record<string, unknown>) {
  const r = await fetch("/api/gestione", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(corpo) });
  return (await r.json()) as { ok?: boolean; errore?: string; w?: number; h?: number; v?: number };
}

/** Banco di lavoro: una riga per opera, si scrive e si salva da solo. */
export function Gestione({ opere }: { opere: OperaGestione[] }) {
  const [dati, setDati] = useState(opere);
  const [filtro, setFiltro] = useState<"tutte" | "senza-titolo" | "pittura" | "selezionate">("tutte");
  const [cerca, setCerca] = useState("");
  const [statoSalvataggio, setStato] = useState<Record<string, "salvo" | "fatto" | "errore">>({});
  const timer = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const [versione, setVersione] = useState<Record<string, number>>({});

  const visibili = useMemo(() => {
    const q = cerca.trim().toLowerCase();
    return dati.filter((o) => {
      if (filtro === "senza-titolo" && o.titolo !== SENZA_TITOLO) return false;
      if (filtro === "pittura" && o.categoria !== "pittura") return false;
      if (filtro === "selezionate" && !o.selezionata) return false;
      if (q && !(`${o.codice} ${o.titolo} ${o.anno} ${o.tecnica} ${o.materiale} ${o.origine}`.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [dati, filtro, cerca]);

  const conTitolo = dati.filter((o) => o.titolo && o.titolo !== SENZA_TITOLO).length;
  const selezionate = dati.filter((o) => o.selezionata).length;

  const salva = (slug: string, campi: Record<string, string | boolean>, subito = false) => {
    clearTimeout(timer.current[slug]);
    const esegui = async () => {
      setStato((s) => ({ ...s, [slug]: "salvo" }));
      const r = await invia({ azione: "salva", slug, campi });
      setStato((s) => ({ ...s, [slug]: r.ok ? "fatto" : "errore" }));
    };
    if (subito) void esegui();
    else timer.current[slug] = setTimeout(esegui, 700);
  };

  const cambia = (slug: string, chiave: keyof OperaGestione, valore: string | boolean, subito = false) => {
    setDati((d) => d.map((o) => (o.slug === slug ? { ...o, [chiave]: valore } : o)));
    const campo = chiave === "bozza" ? "stato" : chiave;
    const v = chiave === "bozza" ? (valore ? "bozza" : "pubblicata") : valore;
    salva(slug, { [campo]: v }, subito);
  };

  const ruota = async (slug: string, gradi: number) => {
    setStato((s) => ({ ...s, [slug]: "salvo" }));
    const r = await invia({ azione: "ruota", slug, gradi });
    if (r.ok && r.w && r.h) {
      setDati((d) => d.map((o) => (o.slug === slug ? { ...o, w: r.w!, h: r.h! } : o)));
      setVersione((v) => ({ ...v, [slug]: r.v ?? Date.now() }));
      setStato((s) => ({ ...s, [slug]: "fatto" }));
    } else {
      setStato((s) => ({ ...s, [slug]: "errore" }));
    }
  };

  return (
    <main className="gest">
      <header className="gest-testata">
        <div>
          <h1>Gestione delle opere</h1>
          <p className="gest-nota">
            Le modifiche si salvano da sole. Il sito si aggiorna subito: tienilo aperto in un&apos;altra scheda.
          </p>
        </div>
        <dl className="gest-conti">
          <div><dt>opere</dt><dd>{dati.length}</dd></div>
          <div><dt>con titolo</dt><dd>{conTitolo}</dd></div>
          <div><dt>in Opere</dt><dd>{selezionate}</dd></div>
        </dl>
      </header>

      <div className="gest-barra">
        {([["tutte", "Tutte"], ["senza-titolo", "Senza titolo"], ["pittura", "Solo pittura"], ["selezionate", "In Opere"]] as const).map(([v, l]) => (
          <button key={v} type="button" className={filtro === v ? "attivo" : ""} onClick={() => setFiltro(v)}>{l}</button>
        ))}
        <input type="search" value={cerca} onChange={(e) => setCerca(e.target.value)} placeholder="Cerca numero, titolo, file…" />
        <span className="gest-quante">{visibili.length} mostrate</span>
      </div>

      <ul className="gest-elenco">
        {visibili.map((o) => (
          <li key={o.slug} className={o.bozza ? "bozza" : ""}>
            <div className="gest-foto" style={{ aspectRatio: `${o.w} / ${o.h}` }}>
              {o.anteprima ? (
                <img src={versione[o.slug] ? `${o.anteprima}?v=${versione[o.slug]}` : o.anteprima} alt={o.codice} loading="lazy" />
              ) : null}
              <div className="gest-ruota">
                <button type="button" onClick={() => ruota(o.slug, -90)} title="Ruota a sinistra">⟲</button>
                <button type="button" onClick={() => ruota(o.slug, 90)} title="Ruota a destra">⟳</button>
              </div>
            </div>

            <div className="gest-campi">
              <div className="gest-riga-alta">
                <span className="gest-codice">{o.codice || o.slug}</span>
                <span className={`gest-stato ${statoSalvataggio[o.slug] ?? ""}`}>
                  {statoSalvataggio[o.slug] === "salvo" ? "salvo…" : statoSalvataggio[o.slug] === "fatto" ? "salvato" : statoSalvataggio[o.slug] === "errore" ? "errore" : ""}
                </span>
              </div>

              <label className="gest-titolo">
                <span>Titolo</span>
                <input
                  value={o.titolo === SENZA_TITOLO ? "" : o.titolo}
                  placeholder={SENZA_TITOLO}
                  onChange={(e) => cambia(o.slug, "titolo", e.target.value || SENZA_TITOLO)}
                />
              </label>

              <div className="gest-quattro">
                <label><span>Anno</span><input value={o.anno} onChange={(e) => cambia(o.slug, "anno", e.target.value)} /></label>
                <label><span>Tecnica</span><input value={o.tecnica} onChange={(e) => cambia(o.slug, "tecnica", e.target.value)} /></label>
                <label><span>Misure</span><input value={o.dimensioni} onChange={(e) => cambia(o.slug, "dimensioni", e.target.value)} /></label>
                <label><span>Luogo</span><input value={o.luogo} onChange={(e) => cambia(o.slug, "luogo", e.target.value)} /></label>
              </div>

              <div className="gest-interruttori">
                <label className="gest-scelta">
                  <span>Categoria</span>
                  <select value={o.categoria} onChange={(e) => cambia(o.slug, "categoria", e.target.value, true)}>
                    {CATEGORIE.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </label>
                <label className="gest-spunta">
                  <input type="checkbox" checked={o.selezionata} onChange={(e) => cambia(o.slug, "selezionata", e.target.checked, true)} />
                  <span>Mostra in Opere</span>
                </label>
                <label className="gest-spunta">
                  <input type="checkbox" checked={o.bozza} onChange={(e) => cambia(o.slug, "bozza", e.target.checked, true)} />
                  <span>Nascondi dal sito</span>
                </label>
                <a className="gest-apri" href={`/opere/${o.slug}`} target="_blank" rel="noreferrer">apri ↗</a>
              </div>
              {o.origine ? <p className="gest-origine">{o.origine}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

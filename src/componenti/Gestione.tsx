"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

type Filtro = "tutte" | "da-nominare" | "pittura" | "in-opere";
const FILTRI: { value: Filtro; label: string }[] = [
  { value: "tutte", label: "Tutte" },
  { value: "da-nominare", label: "Da nominare" },
  { value: "pittura", label: "Solo dipinti" },
  { value: "in-opere", label: "In vetrina" },
];

async function invia(corpo: Record<string, unknown>) {
  const r = await fetch("/api/gestione", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corpo),
  });
  return (await r.json()) as { ok?: boolean; errore?: string; w?: number; h?: number; v?: number };
}

export function Gestione({ opere }: { opere: OperaGestione[] }) {
  const [dati, setDati] = useState(opere);
  const [modo, setModo] = useState<"scheda" | "griglia">("scheda");
  const [filtro, setFiltro] = useState<Filtro>("tutte");
  const [posizione, setPosizione] = useState(0);
  const [spuntate, setSpuntate] = useState<Set<string>>(new Set());
  const [stato, setStato] = useState<"" | "salvo" | "salvato" | "errore">("");
  const [versione, setVersione] = useState<Record<string, number>>({});
  const [conferma, setConferma] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const elenco = useMemo(
    () =>
      dati.filter((o) => {
        if (filtro === "da-nominare") return o.titolo === SENZA_TITOLO || !o.titolo;
        if (filtro === "pittura") return o.categoria === "pittura";
        if (filtro === "in-opere") return o.selezionata;
        return true;
      }),
    [dati, filtro]
  );

  const indice = Math.min(posizione, Math.max(0, elenco.length - 1));
  const corrente = elenco[indice];
  const conTitolo = dati.filter((o) => o.titolo && o.titolo !== SENZA_TITOLO).length;

  const mostraEsito = (ok: boolean) => {
    setStato(ok ? "salvato" : "errore");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStato(""), 1600);
  };

  const scrivi = useCallback(
    async (slug: string, campi: Record<string, string | boolean>) => {
      setStato("salvo");
      const r = await invia({ azione: "salva", slug, campi });
      mostraEsito(Boolean(r.ok));
    },
    []
  );

  /** Aggiorna subito quello che si vede e salva sul file. */
  const cambia = (slug: string, chiave: keyof OperaGestione, valore: string | boolean) => {
    setDati((d) => d.map((o) => (o.slug === slug ? { ...o, [chiave]: valore } : o)));
  };
  const salvaCampo = (slug: string, chiave: keyof OperaGestione, valore: string | boolean) => {
    const campo = chiave === "bozza" ? "stato" : chiave;
    const v = chiave === "bozza" ? (valore ? "bozza" : "pubblicata") : valore;
    void scrivi(slug, { [campo]: v });
  };

  const salvaTutto = useCallback(
    async (o: OperaGestione) => {
      setStato("salvo");
      const r = await invia({
        azione: "salva",
        slug: o.slug,
        campi: {
          titolo: o.titolo || SENZA_TITOLO,
          anno: o.anno,
          tecnica: o.tecnica,
          materiale: o.materiale,
          dimensioni: o.dimensioni,
          luogo: o.luogo,
          categoria: o.categoria,
          selezionata: o.selezionata,
          stato: o.bozza ? "bozza" : "pubblicata",
        },
      });
      mostraEsito(Boolean(r.ok));
    },
    []
  );

  const ruota = async (o: OperaGestione, gradi: number) => {
    setStato("salvo");
    const r = await invia({ azione: "ruota", slug: o.slug, gradi });
    if (r.ok && r.w && r.h) {
      setDati((d) => d.map((x) => (x.slug === o.slug ? { ...x, w: r.w!, h: r.h! } : x)));
      setVersione((v) => ({ ...v, [o.slug]: r.v ?? Date.now() }));
      mostraEsito(true);
    } else mostraEsito(false);
  };

  const vai = useCallback(
    (delta: number) => {
      setPosizione((p) => Math.max(0, Math.min(elenco.length - 1, p + delta)));
    },
    [elenco.length]
  );

  // frecce della tastiera per scorrere le opere
  useEffect(() => {
    if (modo !== "scheda") return;
    const onKey = (e: KeyboardEvent) => {
      const dentroUnCampo = ["INPUT", "SELECT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName);
      if (dentroUnCampo) return;
      if (e.key === "ArrowRight") vai(1);
      if (e.key === "ArrowLeft") vai(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modo, vai]);

  const spunta = (slug: string) =>
    setSpuntate((s) => {
      const n = new Set(s);
      if (n.has(slug)) n.delete(slug);
      else n.add(slug);
      return n;
    });

  const inBlocco = async (campi: Record<string, string | boolean>) => {
    const slugs = [...spuntate];
    if (!slugs.length) return;
    setStato("salvo");
    const r = await invia({ azione: "blocco", slugs, campi });
    if (r.ok) {
      setDati((d) =>
        d.map((o) => {
          if (!spuntate.has(o.slug)) return o;
          const agg = { ...o };
          if ("selezionata" in campi) agg.selezionata = Boolean(campi.selezionata);
          if ("stato" in campi) agg.bozza = campi.stato === "bozza";
          if ("categoria" in campi) agg.categoria = String(campi.categoria);
          return agg;
        })
      );
      setSpuntate(new Set());
    }
    mostraEsito(Boolean(r.ok));
  };

  const elimina = async () => {
    const slugs = [...spuntate];
    if (!slugs.length) return;
    setStato("salvo");
    const r = await invia({ azione: "elimina", slugs });
    if (r.ok) {
      setDati((d) => d.filter((o) => !spuntate.has(o.slug)));
      setSpuntate(new Set());
      setConferma(false);
    }
    mostraEsito(Boolean(r.ok));
  };

  const srcCon = (o: OperaGestione) => (versione[o.slug] ? `${o.anteprima}?v=${versione[o.slug]}` : o.anteprima);

  return (
    <main className="pan">
      <header className="pan-testa">
        <div className="pan-titolo">
          <h1>Le opere di Pasquale</h1>
          <p>
            {conTitolo} opere hanno già un nome, su {dati.length}.
          </p>
        </div>
        <div className="pan-modi">
          <button type="button" className={modo === "scheda" ? "on" : ""} onClick={() => setModo("scheda")}>Una per volta</button>
          <button type="button" className={modo === "griglia" ? "on" : ""} onClick={() => setModo("griglia")}>Tutte insieme</button>
        </div>
      </header>

      <div className="pan-filtri">
        {FILTRI.map((f) => (
          <button
            key={f.value}
            type="button"
            className={filtro === f.value ? "on" : ""}
            onClick={() => {
              setFiltro(f.value);
              setPosizione(0);
              setSpuntate(new Set());
            }}
          >
            {f.label}
          </button>
        ))}
        <span className="pan-quante">{elenco.length} opere</span>
        <span className={`pan-stato ${stato}`}>{stato === "salvo" ? "sto salvando…" : stato === "salvato" ? "salvato" : stato === "errore" ? "non salvato" : ""}</span>
      </div>

      {elenco.length === 0 ? (
        <p className="pan-vuoto">Non c&apos;è nessuna opera in questo gruppo.</p>
      ) : modo === "scheda" && corrente ? (
        <section className="pan-scheda">
          <div className="pan-foto">
            {corrente.anteprima ? <img src={srcCon(corrente)} alt={corrente.codice} /> : <div className="pan-nessuna">nessuna foto</div>}
            <div className="pan-ruota">
              <button type="button" onClick={() => ruota(corrente, -90)}>⟲ Ruota a sinistra</button>
              <button type="button" onClick={() => ruota(corrente, 90)}>Ruota a destra ⟳</button>
            </div>
          </div>

          <form
            className="pan-campi"
            onSubmit={(e) => {
              e.preventDefault();
              void salvaTutto(corrente);
            }}
          >
            <p className="pan-posizione">
              Opera {indice + 1} di {elenco.length} · <span>{corrente.codice}</span>
            </p>

            <label className="grande">
              <span>Nome dell&apos;opera</span>
              <input
                value={corrente.titolo === SENZA_TITOLO ? "" : corrente.titolo}
                placeholder="Senza titolo"
                onChange={(e) => cambia(corrente.slug, "titolo", e.target.value)}
                autoComplete="off"
              />
            </label>

            <div className="pan-due">
              <label>
                <span>Anno</span>
                <input value={corrente.anno} placeholder="es. 1998" onChange={(e) => cambia(corrente.slug, "anno", e.target.value)} autoComplete="off" />
              </label>
              <label>
                <span>Misure</span>
                <input value={corrente.dimensioni} placeholder="es. 70×50 cm" onChange={(e) => cambia(corrente.slug, "dimensioni", e.target.value)} autoComplete="off" />
              </label>
            </div>

            <div className="pan-due">
              <label>
                <span>Tecnica</span>
                <input value={corrente.tecnica} placeholder="es. olio su tela" onChange={(e) => cambia(corrente.slug, "tecnica", e.target.value)} autoComplete="off" />
              </label>
              <label>
                <span>Luogo</span>
                <input value={corrente.luogo} placeholder="dove si trova" onChange={(e) => cambia(corrente.slug, "luogo", e.target.value)} autoComplete="off" />
              </label>
            </div>

            <label>
              <span>Tipo di opera</span>
              <select
                value={corrente.categoria}
                onChange={(e) => {
                  cambia(corrente.slug, "categoria", e.target.value);
                  salvaCampo(corrente.slug, "categoria", e.target.value);
                }}
              >
                {CATEGORIE.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </label>

            <div className="pan-spunte">
              <label>
                <input
                  type="checkbox"
                  checked={corrente.selezionata}
                  onChange={(e) => {
                    cambia(corrente.slug, "selezionata", e.target.checked);
                    salvaCampo(corrente.slug, "selezionata", e.target.checked);
                  }}
                />
                <span>Metti in vetrina, nella pagina Opere</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={corrente.bozza}
                  onChange={(e) => {
                    cambia(corrente.slug, "bozza", e.target.checked);
                    salvaCampo(corrente.slug, "bozza", e.target.checked);
                  }}
                />
                <span>Nascondi dal sito</span>
              </label>
            </div>

            <div className="pan-azioni">
              <button type="button" className="chiaro" onClick={() => { void salvaTutto(corrente); vai(-1); }} disabled={indice === 0}>
                ← Indietro
              </button>
              <button type="submit" className="chiaro">Salva</button>
              <button
                type="button"
                className="pieno"
                onClick={() => { void salvaTutto(corrente); vai(1); }}
                disabled={indice >= elenco.length - 1}
              >
                Salva e vai avanti →
              </button>
            </div>
            <p className="pan-aiuto">Puoi usare anche le frecce ← → della tastiera per cambiare opera.</p>
          </form>
        </section>
      ) : (
        <section className="pan-griglia-sezione">
          <div className="pan-selezione">
            <button type="button" onClick={() => setSpuntate(new Set(elenco.map((o) => o.slug)))}>Scegli tutte</button>
            <button type="button" onClick={() => setSpuntate(new Set())}>Togli la scelta</button>
            <strong>{spuntate.size} scelte</strong>
            {spuntate.size > 0 ? (
              <div className="pan-blocco">
                <button type="button" onClick={() => inBlocco({ selezionata: true })}>Metti in vetrina</button>
                <button type="button" onClick={() => inBlocco({ selezionata: false })}>Togli dalla vetrina</button>
                <button type="button" onClick={() => inBlocco({ stato: "bozza" })}>Nascondi dal sito</button>
                <button type="button" onClick={() => inBlocco({ stato: "pubblicata" })}>Mostra sul sito</button>
                <select
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) void inBlocco({ categoria: e.target.value });
                    e.target.value = "";
                  }}
                >
                  <option value="">Cambia tipo…</option>
                  {CATEGORIE.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
                <button type="button" className="rosso" onClick={() => setConferma(true)}>Elimina</button>
              </div>
            ) : null}
          </div>

          <ul className="pan-griglia">
            {elenco.map((o) => (
              <li key={o.slug} className={spuntate.has(o.slug) ? "scelta" : ""}>
                <label>
                  <input type="checkbox" checked={spuntate.has(o.slug)} onChange={() => spunta(o.slug)} />
                  {o.anteprima ? <img src={srcCon(o)} alt={o.codice} loading="lazy" /> : <span className="pan-nessuna">—</span>}
                  <span className="pan-eti">
                    <span className="pan-cod">{o.codice}</span>
                    {o.titolo !== SENZA_TITOLO ? <span className="pan-nome">{o.titolo}</span> : null}
                  </span>
                </label>
                <button
                  type="button"
                  className="pan-apri"
                  onClick={() => {
                    setModo("scheda");
                    setPosizione(elenco.findIndex((x) => x.slug === o.slug));
                  }}
                >
                  apri
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {conferma ? (
        <div className="pan-velo" role="dialog" aria-modal="true">
          <div className="pan-finestra">
            <h2>Eliminare {spuntate.size} {spuntate.size === 1 ? "opera" : "opere"}?</h2>
            <p>
              Non vengono cancellate per sempre: finiscono nella cartella <code>cestino</code> del progetto e si possono recuperare.
            </p>
            <div className="pan-azioni">
              <button type="button" className="chiaro" onClick={() => setConferma(false)}>Annulla</button>
              <button type="button" className="rosso pieno" onClick={elimina}>Sì, elimina</button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

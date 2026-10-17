"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Accesso } from "./Accesso";
import { Persone } from "./Persone";
import {
  dimenticaSessione,
  leggiSessione,
  nessunaSessione,
  salvaSessione,
  sottoscriviSessione,
  type Sessione,
} from "@/lib/sessione";

export type OperaGestione = {
  slug: string;
  codice: string;
  titolo: string;
  anno: string;
  tecnica: string;
  materiale: string;
  dimensioni: string;
  luogo: string;
  categoria: string;
  selezionata: boolean;
  bozza: boolean;
  anteprima: string;
  grande: string;
  percorsoFoto: string;
  w: number;
  h: number;
  origine: string;
  /** la scheda completa, così si può risalvare senza perdere nulla */
  scheda: Record<string, unknown>;
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

type Filtro = "tutte" | "da-nominare" | "pittura" | "in-vetrina";
const FILTRI: { value: Filtro; label: string }[] = [
  { value: "tutte", label: "Tutte" },
  { value: "da-nominare", label: "Da nominare" },
  { value: "pittura", label: "Solo dipinti" },
  { value: "in-vetrina", label: "In vetrina" },
];

/** Ruota la foto nel browser e restituisce la nuova immagine, pronta da salvare. */
async function ruotaImmagine(url: string, gradi: number): Promise<{ base64: string; w: number; h: number; anteprima: string }> {
  const risposta = await fetch(url, { cache: "no-store" });
  const blob = await risposta.blob();
  const bitmap = await createImageBitmap(blob);
  const orizzontale = Math.abs(gradi) === 90;
  const tela = document.createElement("canvas");
  tela.width = orizzontale ? bitmap.height : bitmap.width;
  tela.height = orizzontale ? bitmap.width : bitmap.height;
  const ctx = tela.getContext("2d")!;
  ctx.translate(tela.width / 2, tela.height / 2);
  ctx.rotate((gradi * Math.PI) / 180);
  ctx.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2);
  const nuovo: Blob = await new Promise((ok) => tela.toBlob((b) => ok(b!), "image/webp", 0.82));
  const buffer = await nuovo.arrayBuffer();
  let binario = "";
  const byte = new Uint8Array(buffer);
  for (let i = 0; i < byte.length; i += 8192) binario += String.fromCharCode(...byte.subarray(i, i + 8192));
  return { base64: btoa(binario), w: tela.width, h: tela.height, anteprima: URL.createObjectURL(nuovo) };
}

/** Prima si entra, poi si lavora. Senza sessione valida non arriva nessun dato. */
export function Gestione() {
  const sessione = useSyncExternalStore(sottoscriviSessione, leggiSessione, nessunaSessione);
  if (!sessione) return <Accesso entrato={salvaSessione} />;
  // la chiave ricarica tutto quando entra una persona diversa
  return <Caricatore key={sessione.gettone} sessione={sessione} />;
}

/** Chiede le opere al sito mostrando il gettone: se non vale più, si torna all'ingresso. */
function Caricatore({ sessione }: { sessione: Sessione }) {
  const [opere, setOpere] = useState<OperaGestione[] | null>(null);
  const [errore, setErrore] = useState("");

  useEffect(() => {
    let vivo = true;
    fetch("/api/opere", { headers: { "x-pannello-sessione": sessione.gettone } })
      .then((r) => r.json() as Promise<{ ok?: boolean; opere?: OperaGestione[]; errore?: string }>)
      .then((r) => {
        if (!vivo) return;
        if (r.ok && r.opere) setOpere(r.opere);
        else dimenticaSessione();
      })
      .catch(() => {
        if (vivo) setErrore("Non riesco a caricare le opere. Controlla la connessione.");
      });
    return () => {
      vivo = false;
    };
  }, [sessione.gettone]);

  if (!opere) return <div className="acc-attesa">{errore || "Carico le opere…"}</div>;
  return <Pannello opere={opere} sessione={sessione} esci={dimenticaSessione} />;
}

function Pannello({ opere, sessione, esci }: { opere: OperaGestione[]; sessione: Sessione; esci: () => void }) {
  const [dati, setDati] = useState(opere);
  const [modo, setModo] = useState<"scheda" | "griglia">("scheda");
  const [filtro, setFiltro] = useState<Filtro>("tutte");
  const [posizione, setPosizione] = useState(0);
  const [spuntate, setSpuntate] = useState<Set<string>>(new Set());
  const [conferma, setConferma] = useState(false);
  // la parola d'accesso resta solo in questa scheda del browser
  const [esito, setEsito] = useState("");
  const [inCorso, setInCorso] = useState(false);
  const [persone, setPersone] = useState(false);

  // modifiche in attesa di essere pubblicate
  const [toccate, setToccate] = useState<Set<string>>(new Set());
  const [fotoNuove, setFotoNuove] = useState<Record<string, { base64: string }>>({});
  const [daEliminare, setDaEliminare] = useState<Set<string>>(new Set());

  const elenco = useMemo(
    () =>
      dati.filter((o) => {
        if (daEliminare.has(o.slug)) return false;
        if (filtro === "da-nominare") return !o.titolo || o.titolo === SENZA_TITOLO;
        if (filtro === "pittura") return o.categoria === "pittura";
        if (filtro === "in-vetrina") return o.selezionata;
        return true;
      }),
    [dati, filtro, daEliminare]
  );

  const indice = Math.min(posizione, Math.max(0, elenco.length - 1));
  const corrente = elenco[indice];
  const conTitolo = dati.filter((o) => o.titolo && o.titolo !== SENZA_TITOLO).length;
  const inSospeso = toccate.size + Object.keys(fotoNuove).length + daEliminare.size;

  const cambia = (slug: string, chiave: keyof OperaGestione, valore: string | boolean) => {
    setDati((d) => d.map((o) => (o.slug === slug ? { ...o, [chiave]: valore } : o)));
    setToccate((t) => new Set(t).add(slug));
  };

  const ruota = async (o: OperaGestione, gradi: number) => {
    setInCorso(true);
    setEsito("");
    try {
      const r = await ruotaImmagine(fotoNuove[o.percorsoFoto] ? o.anteprima : o.grande || o.anteprima, gradi);
      setDati((d) => d.map((x) => (x.slug === o.slug ? { ...x, w: r.w, h: r.h, anteprima: r.anteprima, grande: r.anteprima } : x)));
      setFotoNuove((f) => ({ ...f, [o.percorsoFoto]: { base64: r.base64 } }));
    } catch {
      setEsito("Non sono riuscito a ruotare la foto.");
    }
    setInCorso(false);
  };

  const vai = useCallback((delta: number) => setPosizione((p) => Math.max(0, Math.min(elenco.length - 1, p + delta))), [elenco.length]);

  useEffect(() => {
    if (modo !== "scheda") return;
    const onKey = (e: KeyboardEvent) => {
      if (["INPUT", "SELECT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;
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

  const inBlocco = (campi: Partial<OperaGestione>) => {
    setDati((d) => d.map((o) => (spuntate.has(o.slug) ? { ...o, ...campi } : o)));
    setToccate((t) => {
      const n = new Set(t);
      spuntate.forEach((s) => n.add(s));
      return n;
    });
    setSpuntate(new Set());
  };

  const segnaDaEliminare = () => {
    setDaEliminare((d) => {
      const n = new Set(d);
      spuntate.forEach((s) => n.add(s));
      return n;
    });
    setSpuntate(new Set());
    setConferma(false);
  };

  /** Manda tutte le modifiche in attesa e fa ripartire il sito. */
  const pubblica = async () => {
    if (!inSospeso || inCorso) return;
    setInCorso(true);
    setEsito("");
    const corpo = {
      opere: [...toccate]
        .filter((s) => !daEliminare.has(s))
        .map((slug) => {
          const o = dati.find((x) => x.slug === slug)!;
          return {
            slug,
            dati: {
              ...o.scheda,
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
          };
        }),
      foto: Object.entries(fotoNuove).map(([percorso, v]) => ({ percorso, base64: v.base64 })),
      eliminate: [...daEliminare],
    };
    try {
      const r = await fetch("/api/gestione", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-pannello-sessione": sessione.gettone },
        body: JSON.stringify(corpo),
      });
      const risposta = (await r.json()) as { ok?: boolean; errore?: string; locale?: boolean };
      if (risposta.ok) {
        setToccate(new Set());
        setFotoNuove({});
        setDaEliminare(new Set());
        setEsito(risposta.locale ? "Salvato sul computer." : "Inviato. Il sito si aggiorna fra due o tre minuti.");
      } else {
        setEsito(risposta.errore ?? "Qualcosa non ha funzionato.");
      }
    } catch {
      setEsito("Non sono riuscito a contattare il sito. Controlla la connessione.");
    }
    setInCorso(false);
  };

  // avvisa se si chiude la pagina con modifiche non pubblicate
  useEffect(() => {
    if (!inSospeso) return;
    const avviso = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", avviso);
    return () => window.removeEventListener("beforeunload", avviso);
  }, [inSospeso]);

  return (
    <main className="pan">
      {persone ? <Persone sessione={sessione} chiudi={() => setPersone(false)} /> : null}
      <header className="pan-testa">
        <div className="pan-titolo">
          <h1>Le opere di Pasquale</h1>
          <p>{conTitolo} opere hanno già un nome, su {dati.length}.</p>
        </div>
        <div className="pan-destra">
          <div className="pan-modi">
            <button type="button" className={modo === "scheda" ? "on" : ""} onClick={() => setModo("scheda")}>Una per volta</button>
            <button type="button" className={modo === "griglia" ? "on" : ""} onClick={() => setModo("griglia")}>Tutte insieme</button>
          </div>
          <p className="pan-chi">
            Ciao, <strong>{sessione.nome}</strong> · <button type="button" onClick={() => setPersone(true)}>persone</button> ·{" "}
            <button type="button" onClick={esci}>esci</button>
          </p>
        </div>
      </header>

      <div className="pan-filtri">
        {FILTRI.map((f) => (
          <button key={f.value} type="button" className={filtro === f.value ? "on" : ""} onClick={() => { setFiltro(f.value); setPosizione(0); setSpuntate(new Set()); }}>
            {f.label}
          </button>
        ))}
        <span className="pan-quante">{elenco.length} opere</span>
      </div>

      {elenco.length === 0 ? (
        <p className="pan-vuoto">Non c&apos;è nessuna opera in questo gruppo.</p>
      ) : modo === "scheda" && corrente ? (
        <section className="pan-scheda">
          <div className="pan-foto">
            {corrente.anteprima ? <img src={corrente.anteprima} alt={corrente.codice} /> : <div className="pan-nessuna">nessuna foto</div>}
            <div className="pan-ruota">
              <button type="button" disabled={inCorso} onClick={() => ruota(corrente, -90)}>⟲ Ruota a sinistra</button>
              <button type="button" disabled={inCorso} onClick={() => ruota(corrente, 90)}>Ruota a destra ⟳</button>
            </div>
          </div>

          <form className="pan-campi" onSubmit={(e) => { e.preventDefault(); vai(1); }}>
            <p className="pan-posizione">Opera {indice + 1} di {elenco.length} · <span>{corrente.codice}</span></p>

            <label className="grande">
              <span>Nome dell&apos;opera</span>
              <input value={corrente.titolo === SENZA_TITOLO ? "" : corrente.titolo} placeholder="Senza titolo" autoComplete="off"
                onChange={(e) => cambia(corrente.slug, "titolo", e.target.value)} />
            </label>

            <div className="pan-due">
              <label><span>Anno</span><input value={corrente.anno} placeholder="es. 1998" autoComplete="off" onChange={(e) => cambia(corrente.slug, "anno", e.target.value)} /></label>
              <label><span>Misure</span><input value={corrente.dimensioni} placeholder="es. 70×50 cm" autoComplete="off" onChange={(e) => cambia(corrente.slug, "dimensioni", e.target.value)} /></label>
            </div>
            <div className="pan-due">
              <label><span>Tecnica</span><input value={corrente.tecnica} placeholder="es. olio su tela" autoComplete="off" onChange={(e) => cambia(corrente.slug, "tecnica", e.target.value)} /></label>
              <label><span>Luogo</span><input value={corrente.luogo} placeholder="dove si trova" autoComplete="off" onChange={(e) => cambia(corrente.slug, "luogo", e.target.value)} /></label>
            </div>

            <label>
              <span>Tipo di opera</span>
              <select value={corrente.categoria} onChange={(e) => cambia(corrente.slug, "categoria", e.target.value)}>
                {CATEGORIE.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </label>

            <div className="pan-spunte">
              <label>
                <input type="checkbox" checked={corrente.selezionata} onChange={(e) => cambia(corrente.slug, "selezionata", e.target.checked)} />
                <span>Metti in vetrina, nella pagina Opere</span>
              </label>
              <label>
                <input type="checkbox" checked={corrente.bozza} onChange={(e) => cambia(corrente.slug, "bozza", e.target.checked)} />
                <span>Nascondi dal sito</span>
              </label>
            </div>

            <div className="pan-azioni">
              <button type="button" className="chiaro" onClick={() => vai(-1)} disabled={indice === 0}>← Indietro</button>
              <button type="submit" className="pieno" disabled={indice >= elenco.length - 1}>Vai avanti →</button>
            </div>
            <p className="pan-aiuto">Puoi usare anche le frecce ← → della tastiera.</p>
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
                <button type="button" onClick={() => inBlocco({ bozza: true })}>Nascondi dal sito</button>
                <button type="button" onClick={() => inBlocco({ bozza: false })}>Mostra sul sito</button>
                <select defaultValue="" onChange={(e) => { if (e.target.value) inBlocco({ categoria: e.target.value }); e.target.value = ""; }}>
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
                  {o.anteprima ? <img src={o.anteprima} alt={o.codice} loading="lazy" /> : <span className="pan-nessuna">—</span>}
                  <span className="pan-eti">
                    <span className="pan-cod">{o.codice}</span>
                    {o.titolo && o.titolo !== SENZA_TITOLO ? <span className="pan-nome">{o.titolo}</span> : null}
                  </span>
                </label>
                <button type="button" className="pan-apri" onClick={() => { setModo("scheda"); setPosizione(elenco.findIndex((x) => x.slug === o.slug)); }}>apri</button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* barra di pubblicazione, sempre in fondo allo schermo */}
      <div className={`pan-barra ${inSospeso ? "viva" : ""}`}>
        <span className="pan-sospeso">
          {inSospeso === 0 ? "Nessuna modifica da pubblicare" : `${inSospeso} ${inSospeso === 1 ? "modifica" : "modifiche"} da pubblicare`}
        </span>
        <button type="button" className="pieno" onClick={pubblica} disabled={!inSospeso || inCorso}>
          {inCorso ? "Invio in corso…" : "Pubblica le modifiche"}
        </button>
        {esito ? <span className="pan-esito">{esito}</span> : null}
      </div>

      {conferma ? (
        <div className="pan-velo" role="dialog" aria-modal="true">
          <div className="pan-finestra">
            <h2>Eliminare {spuntate.size} {spuntate.size === 1 ? "opera" : "opere"}?</h2>
            <p>Spariranno dal sito alla prossima pubblicazione. Nulla va perso davvero: restano nella storia del progetto e si possono recuperare.</p>
            <div className="pan-azioni">
              <button type="button" className="chiaro" onClick={() => setConferma(false)}>Annulla</button>
              <button type="button" className="rosso pieno" onClick={segnaDaEliminare}>Sì, elimina</button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

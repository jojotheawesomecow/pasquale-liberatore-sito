"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { daFile, ritagliaImmagine, ruotaImmagine, type Riquadro } from "@/lib/foto";
import { Accesso } from "./Accesso";
import { Persone } from "./Persone";
import { Ritaglio } from "./Ritaglio";
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
  /** quando la foto è stata caricata dal pannello, se è arrivata da lì */
  aggiunta: string;
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

type Filtro = "tutte" | "da-nominare" | "da-completare" | "in-vetrina";
const FILTRI: { value: Filtro; label: string }[] = [
  { value: "tutte", label: "Tutte" },
  { value: "da-nominare", label: "Senza nome" },
  { value: "da-completare", label: "Senza dati" },
  { value: "in-vetrina", label: "In vetrina" },
];

type Ordine = "sito" | "recenti" | "titolo";
const ORDINI: { value: Ordine; label: string }[] = [
  { value: "sito", label: "Ordine del sito" },
  { value: "recenti", label: "Arrivate per ultime" },
  { value: "titolo", label: "Per nome" },
];

/** Quante voci per invio: Cloudflare conta le chiamate che il servizio fa a GitHub. */
const PER_VOLTA = 12;

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
  const [ordine, setOrdine] = useState<Ordine>("sito");
  const [categoria, setCategoria] = useState("");
  const [ritaglio, setRitaglio] = useState(false);

  // modifiche in attesa di essere pubblicate
  const [toccate, setToccate] = useState<Set<string>>(new Set());
  const [fotoNuove, setFotoNuove] = useState<Record<string, { base64: string }>>({});
  const [daEliminare, setDaEliminare] = useState<Set<string>>(new Set());
  const [fotoTolte, setFotoTolte] = useState<Set<string>>(new Set());

  const elenco = useMemo(() => {
    const senzaNome = (o: OperaGestione) => !o.titolo || o.titolo === SENZA_TITOLO;
    const scelte = dati.filter((o) => {
      if (daEliminare.has(o.slug)) return false;
      if (categoria && o.categoria !== categoria) return false;
      if (filtro === "da-nominare") return senzaNome(o);
      // «senza dati»: manca il nome, oppure l'anno, oppure sia tecnica sia materiale
      if (filtro === "da-completare") return senzaNome(o) || !o.anno || (!o.tecnica && !o.materiale);
      if (filtro === "in-vetrina") return o.selezionata;
      return true;
    });
    if (ordine === "recenti") {
      // le arrivate dal pannello hanno una data; le altre vengono dopo, nell'ordine del sito
      return [...scelte].sort((a, b) => (b.aggiunta || "").localeCompare(a.aggiunta || ""));
    }
    if (ordine === "titolo") {
      return [...scelte].sort((a, b) => {
        if (senzaNome(a) !== senzaNome(b)) return senzaNome(a) ? 1 : -1;
        return a.titolo.localeCompare(b.titolo, "it");
      });
    }
    return scelte;
  }, [dati, filtro, categoria, ordine, daEliminare]);

  const indice = Math.min(posizione, Math.max(0, elenco.length - 1));
  const corrente = elenco[indice];
  const conTitolo = dati.filter((o) => o.titolo && o.titolo !== SENZA_TITOLO).length;
  const inSospeso = toccate.size + Object.keys(fotoNuove).length + fotoTolte.size + daEliminare.size;

  const cambia = (slug: string, chiave: keyof OperaGestione, valore: string | boolean) => {
    setDati((d) => d.map((o) => (o.slug === slug ? { ...o, [chiave]: valore } : o)));
    setToccate((t) => new Set(t).add(slug));
  };

  const ruota = async (o: OperaGestione, gradi: number) => {
    setInCorso(true);
    setEsito("");
    try {
      const sorgente = fotoNuove[o.percorsoFoto] ? o.anteprima : o.grande || o.anteprima;
      const r = await ruotaImmagine(sorgente, gradi);
      setDati((d) => d.map((x) => (x.slug === o.slug ? { ...x, w: r.w, h: r.h, anteprima: r.anteprima, grande: r.anteprima } : x)));
      setFotoNuove((f) => ({ ...f, [o.percorsoFoto]: { base64: r.base64 } }));
      setToccate((p) => new Set(p).add(o.slug));
    } catch {
      setEsito("Non sono riuscito a ruotare la foto.");
    }
    setInCorso(false);
  };

  /** Registra la foto lavorata: la mostra subito e la mette in coda per la pubblicazione. */
  const tieniFoto = (o: OperaGestione, r: { base64: string; w: number; h: number; anteprima: string }) => {
    // se la foto di prima era già un .webp si tiene il suo posto, così il progetto non si riempie di doppioni
    const percorso = o.percorsoFoto.endsWith(".webp") ? o.percorsoFoto : `content/media/opere/${o.slug}/${o.slug}.webp`;
    setDati((d) =>
      d.map((x) =>
        x.slug === o.slug
          ? { ...x, w: r.w, h: r.h, anteprima: r.anteprima, grande: r.anteprima, percorsoFoto: percorso, scheda: { ...x.scheda, foto: percorso.replace(/^content\/media\//, "/media/") } }
          : x
      )
    );
    setFotoNuove((f) => ({ ...f, [percorso]: { base64: r.base64 } }));
    // la vecchia esce dal progetto, se si chiamava diversamente
    if (o.percorsoFoto && o.percorsoFoto !== percorso) setFotoTolte((p) => new Set(p).add(o.percorsoFoto));
    setToccate((p) => new Set(p).add(o.slug));
  };

  /** Tiene solo la parte di foto scelta nel riquadro. */
  const ritaglia = async (o: OperaGestione, r: Riquadro) => {
    setInCorso(true);
    setEsito("");
    try {
      tieniFoto(o, await ritagliaImmagine(o.grande || o.anteprima, r));
      setRitaglio(false);
    } catch {
      setEsito("Non sono riuscito a ritagliare questa foto.");
    }
    setInCorso(false);
  };

  /** Mette una foto nuova al posto di quella che c'è, lasciando i dati dov'erano. */
  const sostituisci = async (o: OperaGestione, file: File) => {
    setInCorso(true);
    setEsito("");
    try {
      tieniFoto(o, await daFile(file));
    } catch {
      setEsito("Non sono riuscito a leggere questa foto.");
    }
    setInCorso(false);
  };

  /** Il numero d'archivio libero più basso, per le foto che arrivano adesso. */
  const prossimoNumero = () => {
    let massimo = 0;
    for (const o of dati) {
      const n = /^p-(\d+)$/.exec(o.slug);
      if (n) massimo = Math.max(massimo, Number(n[1]));
    }
    return massimo + 1;
  };

  /** Carica foto nuove, anche molte insieme: ognuna diventa un'opera da completare. */
  const aggiungi = async (files: FileList) => {
    setInCorso(true);
    setEsito("");
    const quando = new Date().toISOString().slice(0, 10);
    const nuove: OperaGestione[] = [];
    const foto: Record<string, { base64: string }> = {};
    let numero = prossimoNumero();
    let scartate = 0;

    for (const file of Array.from(files)) {
      setEsito(`Preparo le foto… ${nuove.length + 1} di ${files.length}`);
      try {
        const r = await daFile(file);
        const slug = `p-${String(numero).padStart(3, "0")}`;
        const percorso = `content/media/opere/${slug}/${slug}.webp`;
        const scheda: Record<string, unknown> = {
          titolo: SENZA_TITOLO,
          titolo_en: "",
          codice: `P-${String(numero).padStart(3, "0")}`,
          categoria: "pittura",
          anno: "",
          luogo: "",
          materiale: "",
          tecnica: "",
          dimensioni: "",
          collezione: "",
          foto: `/media/opere/${slug}/${slug}.webp`,
          galleria: [],
          descrizione: "",
          descrizione_en: "",
          in_evidenza: false,
          ordine: 2000 + numero,
          stato: "pubblicata",
          aggiunta: quando,
          origine: file.name,
          selezionata: false,
        };
        nuove.push({
          slug,
          codice: scheda.codice as string,
          titolo: "",
          anno: "",
          tecnica: "",
          materiale: "",
          dimensioni: "",
          luogo: "",
          categoria: "pittura",
          selezionata: false,
          bozza: false,
          anteprima: r.anteprima,
          grande: r.anteprima,
          percorsoFoto: percorso,
          w: r.w,
          h: r.h,
          origine: file.name,
          aggiunta: quando,
          scheda,
        });
        foto[percorso] = { base64: r.base64 };
        numero += 1;
      } catch {
        scartate += 1;
      }
    }

    if (nuove.length) {
      setDati((d) => [...d, ...nuove]);
      setFotoNuove((f) => ({ ...f, ...foto }));
      setToccate((p) => {
        const n = new Set(p);
        nuove.forEach((o) => n.add(o.slug));
        return n;
      });
      setOrdine("recenti");
      setFiltro("da-nominare");
      setPosizione(0);
    }
    setEsito(
      nuove.length
        ? `${nuove.length} foto pronte${scartate ? `, ${scartate} saltate` : ""}. Ora pubblicale.`
        : "Non sono riuscito a leggere queste foto."
    );
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

  /** Manda le modifiche in attesa, a piccoli gruppi, e fa ripartire il sito. */
  const pubblica = async () => {
    if (!inSospeso || inCorso) return;
    setInCorso(true);
    setEsito("");

    type Voce =
      | { tipo: "opera"; slug: string; dati: Record<string, unknown> }
      | { tipo: "foto"; percorso: string; base64: string }
      | { tipo: "fotoTolta"; percorso: string }
      | { tipo: "eliminata"; slug: string };

    const voci: Voce[] = [
      ...[...toccate]
        .filter((s) => !daEliminare.has(s))
        .map((slug): Voce => {
          const o = dati.find((x) => x.slug === slug)!;
          return {
            tipo: "opera",
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
      ...Object.entries(fotoNuove).map(([percorso, v]): Voce => ({ tipo: "foto", percorso, base64: v.base64 })),
      ...[...fotoTolte].map((percorso): Voce => ({ tipo: "fotoTolta", percorso })),
      ...[...daEliminare].map((slug): Voce => ({ tipo: "eliminata", slug })),
    ];

    const fatte = new Set<Voce>();
    let errore = "";

    for (let i = 0; i < voci.length; i += PER_VOLTA) {
      const lotto = voci.slice(i, i + PER_VOLTA);
      const corpo = {
        opere: lotto.filter((v) => v.tipo === "opera").map((v) => ({ slug: v.slug, dati: v.dati })),
        foto: lotto.filter((v) => v.tipo === "foto").map((v) => ({ percorso: v.percorso, base64: v.base64 })),
        fotoTolte: lotto.filter((v) => v.tipo === "fotoTolta").map((v) => v.percorso),
        eliminate: lotto.filter((v) => v.tipo === "eliminata").map((v) => v.slug),
      };
      if (voci.length > PER_VOLTA) setEsito(`Pubblico… ${Math.min(i + PER_VOLTA, voci.length)} di ${voci.length}`);
      try {
        const r = await fetch("/api/gestione", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-pannello-sessione": sessione.gettone },
          body: JSON.stringify(corpo),
        });
        const risposta = (await r.json()) as { ok?: boolean; errore?: string; locale?: boolean };
        if (!risposta.ok) {
          errore = risposta.errore ?? "Qualcosa non ha funzionato.";
          break;
        }
        lotto.forEach((v) => fatte.add(v));
      } catch {
        errore = "Non sono riuscito a contattare il sito. Controlla la connessione.";
        break;
      }
    }

    // resta in attesa soltanto ciò che non è passato
    const slugFatti = new Set([...fatte].filter((v) => v.tipo === "opera").map((v) => v.slug));
    const fotoFatte = new Set([...fatte].filter((v) => v.tipo === "foto").map((v) => v.percorso));
    const tolteFatte = new Set([...fatte].filter((v) => v.tipo === "fotoTolta").map((v) => v.percorso));
    const eliminateFatte = new Set([...fatte].filter((v) => v.tipo === "eliminata").map((v) => v.slug));
    setToccate((p) => new Set([...p].filter((s) => !slugFatti.has(s))));
    setFotoNuove((p) => Object.fromEntries(Object.entries(p).filter(([percorso]) => !fotoFatte.has(percorso))));
    setFotoTolte((p) => new Set([...p].filter((percorso) => !tolteFatte.has(percorso))));
    setDaEliminare((p) => new Set([...p].filter((s) => !eliminateFatte.has(s))));

    setEsito(
      errore
        ? fatte.size
          ? `${errore} (${fatte.size} di ${voci.length} erano già passate: riprova a pubblicare il resto.)`
          : errore
        : "Inviato. Il sito si aggiorna fra due o tre minuti."
    );
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
      {ritaglio && corrente ? (
        <Ritaglio
          url={corrente.grande || corrente.anteprima}
          inCorso={inCorso}
          annulla={() => setRitaglio(false)}
          conferma={(r) => void ritaglia(corrente, r)}
        />
      ) : null}
      <header className="pan-testa">
        <div className="pan-titolo">
          <h1>Le opere di Pasquale</h1>
          <p>{conTitolo} opere hanno già un nome, su {dati.length}.</p>
        </div>
        <div className="pan-destra">
          <div className="pan-modi">
            <button type="button" className={modo === "scheda" ? "on" : ""} onClick={() => setModo("scheda")}>Una per volta</button>
            <button type="button" className={modo === "griglia" ? "on" : ""} onClick={() => setModo("griglia")}>Tutte insieme</button>
            <label className="pan-carica">
              Aggiungi foto
              <input
                type="file"
                accept="image/*"
                multiple
                disabled={inCorso}
                onChange={(e) => {
                  if (e.target.files?.length) void aggiungi(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>
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
        <div className="pan-scelte">
          <select value={categoria} onChange={(e) => { setCategoria(e.target.value); setPosizione(0); }} aria-label="Tipo di opera">
            <option value="">Tutti i tipi</option>
            {CATEGORIE.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <select value={ordine} onChange={(e) => { setOrdine(e.target.value as Ordine); setPosizione(0); }} aria-label="Ordine">
            {ORDINI.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
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
            <button type="button" className="pan-ritaglia" disabled={inCorso} onClick={() => setRitaglio(true)}>
              Ritaglia la foto
            </button>
            <label className="pan-carica larga">
              Sostituisci questa foto
              <input
                type="file"
                accept="image/*"
                disabled={inCorso}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void sostituisci(corrente, file);
                  e.target.value = "";
                }}
              />
            </label>
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

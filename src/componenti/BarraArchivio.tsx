"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  categorie: { value: string; label: string }[];
  decadi: string[];
  totale: number;
  etichette: {
    tutte: string; azzera: string; cerca: string; cercaSuggerimento: string;
    risultatiUno: string; risultatiMolti: string; nessunRisultato: string;
    galleria: string; elenco: string; conDati: string; senzaDati: string;
  };
};

function Chip({ attivo, onClick, children }: { attivo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={attivo} className={`archivio-chip ${attivo ? "attivo" : ""}`}>
      {children}
    </button>
  );
}

/**
 * Barra di controllo dell'archivio. Non riceve l'elenco delle opere: sono già scritte nella pagina.
 * Qui si limitano a nascondersi e a ricomparire, così il browser non scarica due volte gli stessi dati.
 */
export function BarraArchivio({ categorie, decadi, totale, etichette }: Props) {
  const [categoria, setCategoria] = useState("");
  const [decade, setDecade] = useState("");
  const [cerca, setCerca] = useState("");
  const [vista, setVista] = useState<"galleria" | "elenco">("galleria");
  const [dati, setDati] = useState(true);
  const conteggio = useRef<HTMLSpanElement>(null);
  const primaVolta = useRef(true);

  // stato iniziale letto dall'indirizzo: un filtro si può salvare fra i preferiti o mandare a qualcuno
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const tipo = q.get("tipo");
    const dec = q.get("decennio");
    const testo = q.get("cerca");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- si legge la barra dell'indirizzo una volta sola all'apertura
    if (tipo) setCategoria(tipo);
    if (dec) setDecade(dec);
    if (testo) setCerca(testo);
    if (q.get("vista") === "elenco") setVista("elenco");
    if (q.get("dati") === "0") setDati(false);
  }, []);

  const applica = useCallback(() => {
    const radice = document.querySelector<HTMLElement>("[data-archivio]");
    if (!radice) return;
    const q = cerca.trim().normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    let visibili = 0;
    for (const el of radice.querySelectorAll<HTMLElement>("li[data-cerca]")) {
      const ok =
        (!categoria || el.dataset.cat === categoria) &&
        (!decade || el.dataset.dec === decade) &&
        (!q || (el.dataset.cerca ?? "").includes(q));
      el.hidden = !ok;
      if (ok) visibili++;
    }
    // le intestazioni dei gruppi rimasti vuoti spariscono
    for (const sez of radice.querySelectorAll<HTMLElement>("section[data-gruppo]")) {
      const n = sez.querySelectorAll("li[data-cerca]:not([hidden])").length;
      sez.hidden = n === 0;
      const cont = sez.querySelector<HTMLElement>("[data-quanti]");
      if (cont) cont.textContent = String(n);
    }
    // ogni opera compare sia nella galleria sia nell'elenco
    const quante = Math.round(visibili / 2);
    if (conteggio.current) {
      conteggio.current.textContent =
        quante === 0 ? etichette.nessunRisultato : quante === 1 ? etichette.risultatiUno : etichette.risultatiMolti.replace("{n}", String(quante));
    }
  }, [categoria, decade, cerca, etichette]);

  useEffect(() => {
    applica();
    const radice = document.querySelector<HTMLElement>("[data-archivio]");
    if (radice) {
      radice.dataset.vista = vista;
      radice.dataset.dati = dati ? "1" : "0";
    }
    if (primaVolta.current) {
      primaVolta.current = false;
      return;
    }
    const q = new URLSearchParams();
    if (categoria) q.set("tipo", categoria);
    if (decade) q.set("decennio", decade);
    if (cerca.trim()) q.set("cerca", cerca.trim());
    if (vista !== "galleria") q.set("vista", vista);
    if (!dati) q.set("dati", "0");
    const s = q.toString();
    window.history.replaceState(null, "", s ? `?${s}` : window.location.pathname);
  }, [applica, vista, dati, categoria, decade, cerca]);

  const attivi = Boolean(categoria || decade || cerca.trim());

  return (
    <div className="archivio-barra">
      <div className="archivio-barra-riga">
        <div className="archivio-chips">
          <Chip attivo={!categoria} onClick={() => setCategoria("")}>{etichette.tutte}</Chip>
          {categorie.map((c) => (
            <Chip key={c.value} attivo={categoria === c.value} onClick={() => setCategoria(categoria === c.value ? "" : c.value)}>{c.label}</Chip>
          ))}
          {decadi.length > 1 ? <span className="archivio-separatore" aria-hidden="true" /> : null}
          {decadi.map((d) => (
            <Chip key={d} attivo={decade === d} onClick={() => setDecade(decade === d ? "" : d)}>{d}</Chip>
          ))}
        </div>
        <div className="archivio-strumenti">
          <label className="archivio-cerca">
            <span className="sr-only">{etichette.cerca}</span>
            <input type="search" value={cerca} onChange={(e) => setCerca(e.target.value)} placeholder={etichette.cercaSuggerimento} />
          </label>
          <div className="archivio-interruttore" role="group">
            <button type="button" onClick={() => setVista("galleria")} aria-pressed={vista === "galleria"} className={vista === "galleria" ? "attivo" : ""}>{etichette.galleria}</button>
            <button type="button" onClick={() => setVista("elenco")} aria-pressed={vista === "elenco"} className={vista === "elenco" ? "attivo" : ""}>{etichette.elenco}</button>
          </div>
          <button type="button" onClick={() => setDati((v) => !v)} aria-pressed={dati} className="archivio-chip">
            {dati ? etichette.conDati : etichette.senzaDati}
          </button>
        </div>
      </div>
      <div className="archivio-barra-riga secondaria">
        <span className="mono" ref={conteggio}>
          {etichette.risultatiMolti.replace("{n}", String(totale))}
        </span>
        {attivi ? <button type="button" onClick={() => { setCategoria(""); setDecade(""); setCerca(""); }} className="archivio-azzera">{etichette.azzera}</button> : null}
      </div>
    </div>
  );
}

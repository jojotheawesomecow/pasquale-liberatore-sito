"use client";

import Link from "next/link";
import { useState } from "react";
import { IndiceOpere } from "@/componenti/AnteprimaCursore";
import { useFiltriOpere, type Vista } from "@/componenti/filtri";
import { Foto } from "@/componenti/Foto";
import type { SchedaOpera } from "@/lib/tipi";

type Props = {
  opere: SchedaOpera[];
  categorie: { value: string; label: string }[];
  etichette: {
    tutte: string; categoria: string; periodo: string; azzera: string;
    risultatiUno: string; risultatiMolti: string;
    griglia: string; indice: string; provino: string;
    cerca: string; cercaSuggerimento: string; mostraAltri: string; mostraTutte: string; nessunRisultato: string;
    colonne: [string, string, string, string];
  };
};

function Chip({ attivo, onClick, children }: { attivo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={attivo} className={`rounded-full border px-3.5 py-1.5 font-sans text-[0.8rem] transition-colors ${attivo ? "border-testo bg-testo text-sfondo" : "border-linea text-testo-2 hover:border-testo hover:text-testo"}`}>
      {children}
    </button>
  );
}

/** Opere del tema C: barra dei filtri fissa, griglia con didascalie, indice o provino. */
export function GrigliaOpere({ opere, categorie, etichette }: Props) {
  const [vista, setVista] = useState<Vista>("griglia");
  const f = useFiltriOpere(opere, vista === "provino" ? 96 : 48);
  const conteggio = f.filtrate.length === 1 ? etichette.risultatiUno : etichette.risultatiMolti.replace("{n}", String(f.filtrate.length));

  return (
    <section>
      <div className="filtri-c border-y border-linea">
        <div className="contenitore flex flex-col gap-3 py-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <Chip attivo={!f.categoria} onClick={() => f.setCategoria("")}>{etichette.tutte}</Chip>
              {categorie.map((c) => <Chip key={c.value} attivo={f.categoria === c.value} onClick={() => f.setCategoria(f.categoria === c.value ? "" : c.value)}>{c.label}</Chip>)}
              {f.decadi.length > 1 ? <span className="mx-2 hidden h-4 w-px bg-linea sm:inline-block" aria-hidden="true" /> : null}
              {f.decadi.length > 1 ? f.decadi.map((dec) => <Chip key={dec} attivo={f.decade === dec} onClick={() => f.setDecade(f.decade === dec ? "" : dec)}>{dec}</Chip>) : null}
            </div>
            <div className="flex items-center gap-3">
              <label className="relative flex items-center">
                <span className="sr-only">{etichette.cerca}</span>
                <input type="search" value={f.cerca} onChange={(e) => f.setCerca(e.target.value)} placeholder={etichette.cercaSuggerimento}
                  className="w-44 rounded-full border border-linea bg-transparent px-4 py-1.5 font-sans text-[0.8rem] text-testo placeholder:text-testo-3 focus:border-testo focus:outline-none sm:w-64" />
              </label>
              <div className="flex rounded-full border border-linea p-0.5" role="group" aria-label={`${etichette.griglia} / ${etichette.indice} / ${etichette.provino}`}>
                {([["griglia", etichette.griglia], ["indice", etichette.indice], ["provino", etichette.provino]] as const).map(([v, l]) => (
                  <button key={v} type="button" onClick={() => setVista(v)} aria-pressed={vista === v} className={`rounded-full px-3 py-1 font-sans text-[0.78rem] transition-colors ${vista === v ? "bg-testo text-sfondo" : "text-testo-2 hover:text-testo"}`}>{l}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="mono">{conteggio}</span>
            {f.attivi ? <button type="button" onClick={f.azzera} className="font-sans text-sm text-testo underline decoration-accento underline-offset-4">{etichette.azzera}</button> : null}
          </div>
        </div>
      </div>

      {f.filtrate.length === 0 ? (
        <p className="contenitore voce py-24 text-center text-2xl text-testo-2">{etichette.nessunRisultato}</p>
      ) : vista === "indice" ? (
        <IndiceOpere opere={f.visibili} colonne={etichette.colonne} className="contenitore" />
      ) : vista === "provino" ? (
        <ul className="provino border-b border-linea">
          {f.visibili.map((o, i) => (
            <li key={o.slug}>
              <Link href={o.href} className="scheda-b" title={o.titolo}>
                {o.foto ? <Foto foto={o.foto} alt={o.titolo} riempi sizes="(min-width: 1024px) 12vw, 33vw" className="h-full w-full bg-sfondo-2" /> : <div className="h-full w-full bg-sfondo-2" />}
                <span className="provino-codice">{o.codice || o.anno || String(i + 1).padStart(3, "0")}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="griglia-c border-b border-linea">
          {f.visibili.map((o, i) => (
            <li key={o.slug} data-rivela data-ritardo={String(i % 3)}>
              <Link href={o.href} className="scheda-c">
                <div className="scheda-immagine">
                  {o.foto ? <Foto foto={o.foto} alt={o.titolo} riempi sizes="(min-width: 1536px) 25vw, (min-width: 768px) 33vw, 50vw" className="h-full w-full" /> : null}
                </div>
                <div className="scheda-riga">
                  <span className="scheda-titolo">{o.titolo}</span>
                  {o.anno ? <span className="mono shrink-0">{o.anno}</span> : o.codice ? <span className="mono shrink-0">{o.codice}</span> : null}
                </div>
                <p className="mt-1 font-sans text-[0.8rem] text-testo-3">{[o.categoriaLabel, o.dettaglio].filter(Boolean).join(" · ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {f.restanti > 0 ? (
        <div className="contenitore flex flex-wrap items-center justify-center gap-4 py-12">
          <button type="button" onClick={f.ancora} className="bottone bottone-pieno">{etichette.mostraAltri} {Math.min(f.restanti, 96)}</button>
          <button type="button" onClick={f.tutte} className="bottone">{etichette.mostraTutte} ({f.filtrate.length})</button>
        </div>
      ) : null}
    </section>
  );
}

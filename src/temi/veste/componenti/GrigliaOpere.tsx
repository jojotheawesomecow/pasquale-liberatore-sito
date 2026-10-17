"use client";

import Link from "next/link";
import { IndiceOpere } from "@/componenti/AnteprimaCursore";
import { useFiltriOpere, type Vista } from "@/componenti/filtri";
import { Foto } from "@/componenti/Foto";
import type { SchedaOpera } from "@/lib/tipi";
import { useState } from "react";

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
    <button type="button" onClick={onClick} aria-pressed={attivo} className={`mono rounded-full border px-3.5 py-2 transition-colors ${attivo ? "border-testo bg-testo text-sfondo" : "border-linea text-testo-2 hover:border-testo hover:text-testo"}`}>
      {children}
    </button>
  );
}

/** Opere del tema B: griglia, indice a elenco o provino, con filtri, ricerca e caricamento progressivo. */
export function GrigliaOpere({ opere, categorie, etichette }: Props) {
  const [vista, setVista] = useState<Vista>("griglia");
  const f = useFiltriOpere(opere, vista === "provino" ? 96 : 48);
  const conteggio = f.filtrate.length === 1 ? etichette.risultatiUno : etichette.risultatiMolti.replace("{n}", String(f.filtrate.length));

  return (
    <section>
      <div className="contenitore riga flex flex-col gap-5 py-5" data-rivela>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Chip attivo={!f.categoria} onClick={() => f.setCategoria("")}>{etichette.tutte}</Chip>
            {categorie.map((c) => (
              <Chip key={c.value} attivo={f.categoria === c.value} onClick={() => f.setCategoria(f.categoria === c.value ? "" : c.value)}>{c.label}</Chip>
            ))}
            {f.decadi.length > 1 ? <span className="mx-2 hidden h-4 w-px bg-linea sm:inline-block" aria-hidden="true" /> : null}
            {f.decadi.length > 1 ? f.decadi.map((dec) => (
              <Chip key={dec} attivo={f.decade === dec} onClick={() => f.setDecade(f.decade === dec ? "" : dec)}>{dec}</Chip>
            )) : null}
          </div>
          <div className="flex items-center gap-4">
            <label className="relative flex items-center">
              <span className="sr-only">{etichette.cerca}</span>
              <input
                type="search"
                value={f.cerca}
                onChange={(e) => f.setCerca(e.target.value)}
                placeholder={etichette.cercaSuggerimento}
                className="mono w-44 rounded-full border border-linea bg-transparent py-2 pl-4 pr-3 normal-case tracking-normal text-testo placeholder:text-testo-3 focus:border-testo focus:outline-none sm:w-64"
              />
            </label>
            <div className="flex rounded-full border border-linea p-0.5" role="group" aria-label={`${etichette.griglia} / ${etichette.indice} / ${etichette.provino}`}>
              {([["griglia", etichette.griglia], ["indice", etichette.indice], ["provino", etichette.provino]] as const).map(([v, l]) => (
                <button key={v} type="button" onClick={() => setVista(v)} aria-pressed={vista === v} className={`mono rounded-full px-3 py-1.5 transition-colors ${vista === v ? "bg-testo text-sfondo" : "text-testo-2 hover:text-testo"}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <span className="mono">{conteggio}</span>
          {f.attivi ? <button type="button" onClick={f.azzera} className="mono text-testo underline decoration-accento underline-offset-4">{etichette.azzera}</button> : null}
        </div>
      </div>

      {f.filtrate.length === 0 ? (
        <p className="contenitore voce py-24 text-center text-2xl text-testo-2">{etichette.nessunRisultato}</p>
      ) : vista === "indice" ? (
        <IndiceOpere opere={f.visibili} colonne={etichette.colonne} className="contenitore" />
      ) : (
        <ul className={vista === "provino" ? "provino border-y border-linea" : "griglia-b border-y border-linea"}>
          {f.visibili.map((o, i) => (
            <li key={o.slug}>
              <Link href={o.href} className="scheda-b" data-cursore="zoom" title={o.titolo}>
                {o.foto ? (
                  <Foto
                    foto={o.foto}
                    alt={o.titolo}
                    riempi
                    sizes={vista === "provino" ? "(min-width: 1024px) 12vw, 33vw" : "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"}
                    className="h-full w-full bg-sfondo-2"
                  />
                ) : (
                  <div className="h-full w-full bg-sfondo-2" />
                )}
                {vista === "provino" ? (
                  <span className="provino-codice">{o.codice || o.anno || String(i + 1).padStart(3, "0")}</span>
                ) : (
                  <>
                    <span className="scheda-numero">{o.codice || String(i + 1).padStart(2, "0")}</span>
                    <span className="scheda-info">
                      <span>
                        <span className="block font-sans text-lg font-medium leading-tight tracking-[-0.02em]">{o.titolo}</span>
                        <span className="mono mt-1 block text-testo-2">{[o.categoriaLabel, o.dettaglio].filter(Boolean).join(" · ")}</span>
                      </span>
                      {o.anno ? <span className="mono shrink-0 text-testo">{o.anno}</span> : null}
                    </span>
                  </>
                )}
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

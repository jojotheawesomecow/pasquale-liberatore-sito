"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IndiceOpere } from "@/componenti/AnteprimaCursore";
import { Foto } from "@/componenti/Foto";
import type { SchedaOpera } from "@/lib/tipi";

type Props = {
  opere: SchedaOpera[];
  categorie: { value: string; label: string }[];
  etichette: { tutte: string; categoria: string; periodo: string; azzera: string; risultatiUno: string; risultatiMolti: string; griglia: string; indice: string; colonne: [string, string, string, string] };
};

function Chip({ attivo, onClick, children }: { attivo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={attivo} className={`rounded-full border px-3.5 py-1.5 font-sans text-[0.8rem] transition-colors ${attivo ? "border-testo bg-testo text-sfondo" : "border-linea text-testo-2 hover:border-testo hover:text-testo"}`}>
      {children}
    </button>
  );
}

/** Opere del tema C: barra filtri appiccicosa, griglia con didascalie oppure indice. */
export function GrigliaOpere({ opere, categorie, etichette }: Props) {
  const [vista, setVista] = useState<"griglia" | "indice">("griglia");
  const [categoria, setCategoria] = useState("");
  const [decade, setDecade] = useState("");
  const decadi = useMemo(() => [...new Set(opere.map((o) => o.decade).filter(Boolean) as string[])].sort((a, b) => Number(b) - Number(a)), [opere]);
  const filtrate = opere.filter((o) => (!categoria || o.categoria === categoria) && (!decade || o.decade === decade));
  const conteggio = filtrate.length === 1 ? etichette.risultatiUno : etichette.risultatiMolti.replace("{n}", String(filtrate.length));

  return (
    <section>
      <div className="filtri-c border-y border-linea">
        <div className="contenitore flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Chip attivo={!categoria} onClick={() => setCategoria("")}>{etichette.tutte}</Chip>
            {categorie.map((c) => <Chip key={c.value} attivo={categoria === c.value} onClick={() => setCategoria(categoria === c.value ? "" : c.value)}>{c.label}</Chip>)}
            {decadi.length > 1 ? <span className="mx-2 hidden h-4 w-px bg-linea sm:inline-block" aria-hidden="true" /> : null}
            {decadi.length > 1 ? decadi.map((dec) => <Chip key={dec} attivo={decade === dec} onClick={() => setDecade(decade === dec ? "" : dec)}>{dec}</Chip>) : null}
          </div>
          <div className="flex items-center gap-4">
            <span className="mono">{conteggio}</span>
            {categoria || decade ? <button type="button" onClick={() => { setCategoria(""); setDecade(""); }} className="font-sans text-sm text-testo underline decoration-accento underline-offset-4">{etichette.azzera}</button> : null}
            <div className="flex rounded-full border border-linea p-0.5" role="group" aria-label={`${etichette.griglia} / ${etichette.indice}`}>
              {(["griglia", "indice"] as const).map((v) => (
                <button key={v} type="button" onClick={() => setVista(v)} aria-pressed={vista === v} className={`rounded-full px-3 py-1 font-sans text-[0.78rem] transition-colors ${vista === v ? "bg-testo text-sfondo" : "text-testo-2 hover:text-testo"}`}>
                  {v === "griglia" ? etichette.griglia : etichette.indice}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {vista === "griglia" ? (
        <ul className="griglia-c border-b border-linea">
          {filtrate.map((o, i) => (
            <li key={o.slug} data-rivela data-ritardo={String(i % 3)}>
              <Link href={o.href} className="scheda-c">
                <div className="scheda-immagine">
                  {o.foto ? <Foto foto={o.foto} alt={o.titolo} riempi sizes="(min-width: 1536px) 25vw, (min-width: 768px) 33vw, 50vw" className="h-full w-full" /> : null}
                </div>
                <div className="scheda-riga">
                  <span className="scheda-titolo">{o.titolo}</span>
                  {o.anno ? <span className="mono shrink-0">{o.anno}</span> : null}
                </div>
                <p className="mt-1 font-sans text-[0.8rem] text-testo-3">{[o.categoriaLabel, o.dettaglio].filter(Boolean).join(" · ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <IndiceOpere opere={filtrate} colonne={etichette.colonne} className="contenitore" />
      )}
    </section>
  );
}

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
    <button
      type="button"
      onClick={onClick}
      aria-pressed={attivo}
      className={`mono rounded-full border px-3.5 py-2 transition-colors ${attivo ? "border-testo bg-testo text-sfondo" : "border-linea text-testo-2 hover:border-testo hover:text-testo"}`}
    >
      {children}
    </button>
  );
}

/** Opere del tema B: griglia a tutta larghezza oppure indice a elenco, con filtri. */
export function GrigliaOpere({ opere, categorie, etichette }: Props) {
  const [vista, setVista] = useState<"griglia" | "indice">("griglia");
  const [categoria, setCategoria] = useState("");
  const [decade, setDecade] = useState("");
  const decadi = useMemo(() => [...new Set(opere.map((o) => o.decade).filter(Boolean) as string[])].sort((a, b) => Number(b) - Number(a)), [opere]);
  const filtrate = opere.filter((o) => (!categoria || o.categoria === categoria) && (!decade || o.decade === decade));
  const conteggio = filtrate.length === 1 ? etichette.risultatiUno : etichette.risultatiMolti.replace("{n}", String(filtrate.length));

  return (
    <section>
      <div className="contenitore riga flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between" data-rivela>
        <div className="flex flex-wrap items-center gap-2">
          <Chip attivo={!categoria} onClick={() => setCategoria("")}>{etichette.tutte}</Chip>
          {categorie.map((c) => (
            <Chip key={c.value} attivo={categoria === c.value} onClick={() => setCategoria(categoria === c.value ? "" : c.value)}>{c.label}</Chip>
          ))}
          {decadi.length > 1 ? <span className="mx-2 hidden h-4 w-px bg-linea sm:inline-block" aria-hidden="true" /> : null}
          {decadi.length > 1
            ? decadi.map((dec) => (
                <Chip key={dec} attivo={decade === dec} onClick={() => setDecade(decade === dec ? "" : dec)}>{dec}</Chip>
              ))
            : null}
        </div>
        <div className="flex items-center gap-5">
          <span className="mono">{conteggio}</span>
          {categoria || decade ? (
            <button type="button" onClick={() => { setCategoria(""); setDecade(""); }} className="mono text-testo underline decoration-accento underline-offset-4">{etichette.azzera}</button>
          ) : null}
          <div className="flex rounded-full border border-linea p-0.5" role="group" aria-label={`${etichette.griglia} / ${etichette.indice}`}>
            {(["griglia", "indice"] as const).map((v) => (
              <button key={v} type="button" onClick={() => setVista(v)} aria-pressed={vista === v} className={`mono rounded-full px-3 py-1.5 transition-colors ${vista === v ? "bg-testo text-sfondo" : "text-testo-2 hover:text-testo"}`}>
                {v === "griglia" ? etichette.griglia : etichette.indice}
              </button>
            ))}
          </div>
        </div>
      </div>

      {vista === "griglia" ? (
        <ul className="griglia-b border-y border-linea">
          {filtrate.map((o, i) => (
            <li key={o.slug}>
              <Link href={o.href} className="scheda-b" data-cursore="zoom">
                {o.foto ? <Foto foto={o.foto} alt={o.titolo} riempi sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw" className="h-full w-full bg-sfondo-2" /> : <div className="h-full w-full bg-sfondo-2" />}
                <span className="scheda-numero">{String(i + 1).padStart(2, "0")}</span>
                <span className="scheda-info">
                  <span>
                    <span className="block font-sans text-lg font-medium leading-tight tracking-[-0.02em]">{o.titolo}</span>
                    <span className="mono mt-1 block text-testo-2">{[o.categoriaLabel, o.dettaglio].filter(Boolean).join(" · ")}</span>
                  </span>
                  {o.anno ? <span className="mono shrink-0 text-testo">{o.anno}</span> : null}
                </span>
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

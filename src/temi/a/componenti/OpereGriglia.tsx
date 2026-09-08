"use client";

import Link from "next/link";
import { useFiltriOpere } from "@/componenti/filtri";
import type { SchedaOpera } from "@/lib/tipi";
import { Foto } from "@/componenti/Foto";


type Props = {
  opere: SchedaOpera[];
  categorie: { value: string; label: string }[];
  etichette: {
    tutte: string; categoria: string; periodo: string; azzera: string;
    risultatiUno: string; risultatiMolti: string; senzaTitolo: string;
    cerca: string; cercaSuggerimento: string; mostraAltri: string; mostraTutte: string; nessunRisultato: string;
  };
};

function Chip({ attivo, onClick, children }: { attivo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={attivo}
      className={`rounded-full border px-3.5 py-1.5 font-sans text-[0.8rem] tracking-[0.01em] transition-colors ${
        attivo ? "border-inchiostro bg-inchiostro text-carta" : "border-pietra text-inchiostro-2 hover:border-inchiostro hover:text-inchiostro"
      }`}
    >
      {children}
    </button>
  );
}

/** Griglia delle opere con filtri per categoria e decennio (tutto lato client, nessuna richiesta). */
export function OpereGriglia({ opere, categorie, etichette }: Props) {
  const f = useFiltriOpere(opere, 48);
  const { categoria, setCategoria, decade, setDecade, decadi } = f;

  return (
    <div className="contenitore">
      <div className="riga flex flex-col gap-4 py-6 lg:flex-row lg:items-start lg:justify-between" data-rivela>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="etichetta mr-2 hidden sm:inline">{etichette.categoria}</span>
            <Chip attivo={!categoria} onClick={() => setCategoria("")}>{etichette.tutte}</Chip>
            {categorie.map((c) => (
              <Chip key={c.value} attivo={categoria === c.value} onClick={() => setCategoria(categoria === c.value ? "" : c.value)}>
                {c.label}
              </Chip>
            ))}
          </div>
          {decadi.length > 1 ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="etichetta mr-2 hidden sm:inline">{etichette.periodo}</span>
              <Chip attivo={!decade} onClick={() => setDecade("")}>{etichette.tutte}</Chip>
              {decadi.map((dec) => (
                <Chip key={dec} attivo={decade === dec} onClick={() => setDecade(decade === dec ? "" : dec)}>
                  {dec}
                </Chip>
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-4 font-sans text-sm text-pietra-2">
          <label className="relative flex items-center">
            <span className="sr-only">{etichette.cerca}</span>
            <input
              type="search"
              value={f.cerca}
              onChange={(e) => f.setCerca(e.target.value)}
              placeholder={etichette.cercaSuggerimento}
              className="w-48 rounded-full border border-pietra bg-transparent px-4 py-1.5 font-sans text-[0.8rem] text-inchiostro placeholder:text-pietra-2 focus:border-inchiostro focus:outline-none sm:w-60"
            />
          </label>
          <span>{f.filtrate.length === 1 ? etichette.risultatiUno : etichette.risultatiMolti.replace("{n}", String(f.filtrate.length))}</span>
          {f.attivi ? (
            <button type="button" onClick={f.azzera} className="link-sottile text-inchiostro-2">
              {etichette.azzera}
            </button>
          ) : null}
        </div>
      </div>

      {f.filtrate.length === 0 ? <p className="py-24 text-center font-serif text-2xl text-pietra-2">{etichette.nessunRisultato}</p> : null}
      <ul className="columns-1 gap-8 pt-4 sm:columns-2 xl:columns-3 [column-fill:_balance]">
        {f.visibili.map((o, i) => (
          <li key={o.slug} className="mb-10 break-inside-avoid" data-rivela data-ritardo={String(i % 3)}>
            <Link href={o.href} className="group block">
              {o.foto ? (
                <div className="overflow-hidden rounded-[2px] bg-carta-2">
                  <Foto
                    foto={o.foto}
                    alt={o.titolo}
                    sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
                    imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.025]"
                  />
                </div>
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center rounded-[2px] bg-carta-2 font-serif text-pietra-2">{etichette.senzaTitolo}</div>
              )}
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h2 className="font-serif text-[1.35rem] leading-tight tracking-tight text-inchiostro group-hover:text-muschio transition-colors">{o.titolo}</h2>
                {o.anno ? <span className="shrink-0 font-sans text-sm text-pietra-2">{o.anno}</span> : o.codice ? <span className="shrink-0 font-sans text-sm text-pietra-2">{o.codice}</span> : null}
              </div>
              <p className="mt-1 font-sans text-[0.82rem] text-pietra-2">
                {[o.categoriaLabel, o.dettaglio].filter(Boolean).join(" · ")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      {f.restanti > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-4 py-12">
          <button type="button" onClick={f.ancora} className="inline-flex h-12 items-center rounded-full bg-inchiostro px-7 font-sans text-sm text-carta transition-colors hover:bg-muschio">{etichette.mostraAltri} {Math.min(f.restanti, 96)}</button>
          <button type="button" onClick={f.tutte} className="inline-flex h-12 items-center rounded-full border border-inchiostro px-7 font-sans text-sm text-inchiostro transition-colors hover:bg-inchiostro hover:text-carta">{etichette.mostraTutte} ({f.filtrate.length})</button>
        </div>
      ) : null}
    </div>
  );
}

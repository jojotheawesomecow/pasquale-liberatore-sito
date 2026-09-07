"use client";

import { useMemo, useState } from "react";

export type VoceCronologia = { anno: string; titolo: string; luogo: string; tipo: string; nota: string };

type Props = {
  voci: VoceCronologia[];
  tipi: { value: string; label: string }[];
  etichette: { tutte: string; filtra: string; senzaData: string };
};

const decadeDi = (anno: string) => {
  const m = anno.match(/\d{4}/);
  return m ? `${Math.floor(parseInt(m[0], 10) / 10) * 10}` : null;
};

/** Elenco cronologico raggruppato per decennio, con filtro per tipo di evento. */
export function Cronologia({ voci, tipi, etichette }: Props) {
  const [tipo, setTipo] = useState("");
  const filtrate = useMemo(() => voci.filter((v) => !tipo || v.tipo === tipo), [voci, tipo]);

  const gruppi = useMemo(() => {
    const mappa = new Map<string, VoceCronologia[]>();
    for (const v of filtrate) {
      const k = decadeDi(v.anno) ?? "sd";
      if (!mappa.has(k)) mappa.set(k, []);
      mappa.get(k)!.push(v);
    }
    const chiavi = [...mappa.keys()].sort((a, b) => (a === "sd" ? 1 : b === "sd" ? -1 : Number(a) - Number(b)));
    return chiavi.map((k) => ({ chiave: k, etichetta: k === "sd" ? etichette.senzaData : `${k}`, voci: mappa.get(k)! }));
  }, [filtrate, etichette.senzaData]);

  const tipiPresenti = tipi.filter((t) => voci.some((v) => v.tipo === t.value));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" data-rivela>
        <span className="etichetta mr-2">{etichette.filtra}</span>
        {[{ value: "", label: etichette.tutte }, ...tipiPresenti].map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTipo(t.value)}
            aria-pressed={tipo === t.value}
            className={`rounded-full border px-3.5 py-1.5 font-sans text-[0.8rem] transition-colors ${
              tipo === t.value ? "border-inchiostro bg-inchiostro text-carta" : "border-pietra text-inchiostro-2 hover:border-inchiostro hover:text-inchiostro"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-10 space-y-12">
        {gruppi.map((g) => (
          <section key={g.chiave} className="grid gap-4 lg:grid-cols-12" data-rivela>
            <h3 className="font-serif text-4xl font-light text-pietra-2 lg:col-span-2 lg:text-5xl">{g.chiave === "sd" ? <span className="text-2xl lg:text-3xl">{g.etichetta}</span> : g.etichetta}</h3>
            <ol className="riga lg:col-span-10">
              {g.voci.map((v, i) => (
                <li key={`${v.anno}-${i}`} className="grid gap-1 border-b border-pietra/70 py-4 sm:grid-cols-12 sm:gap-6">
                  <span className="font-sans text-sm tabular-nums text-pietra-2 sm:col-span-2 sm:pt-1">{v.anno}</span>
                  <div className="sm:col-span-10">
                    <p className="font-serif text-lg leading-snug text-inchiostro">{v.titolo}</p>
                    <p className="mt-1 font-sans text-sm text-pietra-2">
                      {[v.luogo, v.nota].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}

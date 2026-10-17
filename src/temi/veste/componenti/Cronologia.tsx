"use client";

import { useMemo, useState } from "react";

export type VoceCronologia = { anno: string; titolo: string; luogo: string; tipo: string; nota: string };
type Props = { voci: VoceCronologia[]; tipi: { value: string; label: string }[]; etichette: { tutte: string; filtra: string; senzaData: string } };

const decadeDi = (anno: string) => {
  const m = anno.match(/\d{4}/);
  return m ? `${Math.floor(parseInt(m[0], 10) / 10) * 10}` : null;
};

/** Cronologia del tema B: tabella con anni in mono e filtro per tipo. */
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
    return [...mappa.keys()]
      .sort((a, b) => (a === "sd" ? 1 : b === "sd" ? -1 : Number(a) - Number(b)))
      .map((k) => ({ chiave: k, etichetta: k === "sd" ? etichette.senzaData : k, voci: mappa.get(k)! }));
  }, [filtrate, etichette.senzaData]);
  const tipiPresenti = tipi.filter((tp) => voci.some((v) => v.tipo === tp.value));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" data-rivela>
        <span className="mono mr-2">{etichette.filtra}</span>
        {[{ value: "", label: etichette.tutte }, ...tipiPresenti].map((tp) => (
          <button key={tp.value} type="button" onClick={() => setTipo(tp.value)} aria-pressed={tipo === tp.value} className={`mono rounded-full border px-3.5 py-2 transition-colors ${tipo === tp.value ? "border-testo bg-testo text-sfondo" : "border-linea text-testo-2 hover:border-testo hover:text-testo"}`}>
            {tp.label}
          </button>
        ))}
      </div>
      <div className="mt-12 space-y-16">
        {gruppi.map((g) => (
          <section key={g.chiave} className="grid gap-6 lg:grid-cols-12" data-rivela>
            <h3 className="titolo-xl text-testo-3 lg:col-span-3">{g.chiave === "sd" ? <span className="text-3xl">{g.etichetta}</span> : g.etichetta}</h3>
            <ol className="riga lg:col-span-9">
              {g.voci.map((v, i) => (
                <li key={`${v.anno}-${i}`} className="grid gap-1 border-b border-linea py-4 sm:grid-cols-12 sm:gap-6">
                  <span className="mono sm:col-span-2 sm:pt-1">{v.anno}</span>
                  <div className="sm:col-span-10">
                    <p className="font-sans text-lg leading-snug text-testo">{v.titolo}</p>
                    <p className="mono mt-1 normal-case tracking-normal">{[v.luogo, v.nota].filter(Boolean).join(" · ")}</p>
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

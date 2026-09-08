"use client";

import { useMemo, useState } from "react";
import type { SchedaOpera } from "@/lib/tipi";

const senzaAccenti = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export type Vista = "griglia" | "indice" | "provino";

/**
 * Filtri e caricamento progressivo dell'elenco opere.
 * Con oltre duecento opere non ha senso mandare tutte le schede allo schermo insieme:
 * se ne mostrano `passo` e si aggiungono su richiesta.
 */
export function useFiltriOpere(opere: SchedaOpera[], passo = 48) {
  const [categoria, impostaCategoria] = useState("");
  const [decade, impostaDecade] = useState("");
  const [cerca, impostaCerca] = useState("");
  const [quante, setQuante] = useState(passo);

  const decadi = useMemo(
    () => [...new Set(opere.map((o) => o.decade).filter(Boolean) as string[])].sort((a, b) => Number(b) - Number(a)),
    [opere]
  );

  const indice = useMemo(
    () => opere.map((o) => senzaAccenti([o.titolo, o.codice, o.anno, o.dettaglio, o.luogo, o.categoriaLabel].filter(Boolean).join(" "))),
    [opere]
  );

  const filtrate = useMemo(() => {
    const q = senzaAccenti(cerca.trim());
    return opere.filter((o, i) => {
      if (categoria && o.categoria !== categoria) return false;
      if (decade && o.decade !== decade) return false;
      if (q && !indice[i].includes(q)) return false;
      return true;
    });
  }, [opere, indice, categoria, decade, cerca]);

  // ogni cambio di filtro riparte dalla prima pagina
  const setCategoria = (v: string) => { impostaCategoria(v); setQuante(passo); };
  const setDecade = (v: string) => { impostaDecade(v); setQuante(passo); };
  const setCerca = (v: string) => { impostaCerca(v); setQuante(passo); };

  const visibili = filtrate.slice(0, quante);
  return {
    categoria, setCategoria,
    decade, setDecade,
    cerca, setCerca,
    decadi,
    filtrate,
    visibili,
    restanti: Math.max(0, filtrate.length - visibili.length),
    ancora: () => setQuante((n) => n + passo * 2),
    tutte: () => setQuante(filtrate.length),
    attivi: Boolean(categoria || decade || cerca.trim()),
    azzera: () => { impostaCategoria(""); impostaDecade(""); impostaCerca(""); setQuante(passo); },
  };
}

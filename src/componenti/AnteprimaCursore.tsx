"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { SchedaOpera } from "@/lib/tipi";
import { Foto } from "./Foto";

type Props = {
  opere: SchedaOpera[];
  /** intestazioni delle colonne, es. ["Titolo","Anno","Materiale","Categoria"] */
  colonne: [string, string, string, string];
  className?: string;
};

/**
 * Indice delle opere in forma di elenco: al passaggio del mouse compare l'immagine che segue il cursore.
 * Su schermi touch l'immagine compare accanto alla riga attiva.
 */
export function IndiceOpere({ opere, colonne, className = "" }: Props) {
  const [attiva, setAttiva] = useState<number | null>(null);
  const anteprima = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(aggiorna);
    };
    const aggiorna = () => {
      raf = 0;
      const p = pos.current;
      p.x += (p.tx - p.x) * 0.18;
      p.y += (p.ty - p.y) * 0.18;
      if (anteprima.current) anteprima.current.style.transform = `translate3d(${p.x + 24}px, ${p.y - 140}px, 0)`;
      if (Math.abs(p.tx - p.x) > 0.5 || Math.abs(p.ty - p.y) > 0.5) raf = requestAnimationFrame(aggiorna);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`indice-opere ${className}`}>
      <div className="indice-testata" aria-hidden="true">
        {colonne.map((c) => <span key={c}>{c}</span>)}
      </div>
      <ul onMouseLeave={() => setAttiva(null)}>
        {opere.map((o, i) => (
          <li key={o.slug} className={attiva === i ? "attiva" : ""} onMouseEnter={() => setAttiva(i)} onFocus={() => setAttiva(i)}>
            <Link href={o.href} className="indice-riga">
              <span className="indice-titolo">{o.titolo}</span>
              <span className="indice-anno">{o.anno || "—"}</span>
              <span className="indice-dettaglio">{o.dettaglio || o.luogo}</span>
              <span className="indice-categoria">{o.categoriaLabel}</span>
            </Link>
            {o.foto ? (
              <div className="indice-anteprima-touch" aria-hidden="true">
                <Foto foto={o.foto} alt="" sizes="60vw" riempi className="h-full w-full" />
              </div>
            ) : null}
          </li>
        ))}
      </ul>
      <div ref={anteprima} className={`indice-anteprima ${attiva !== null && opere[attiva]?.foto ? "visibile" : ""}`} aria-hidden="true">
        {attiva !== null && opere[attiva]?.foto ? (
          <div key={opere[attiva].slug} className="indice-anteprima-foto attiva">
            <Foto foto={opere[attiva].foto!} alt="" sizes="360px" riempi className="h-full w-full" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

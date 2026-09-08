"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Foto } from "@/componenti/Foto";
import type { Foto as FotoDati } from "@/lib/tipi";

export type Immagine = { foto: FotoDati; alt: string; didascalia?: string };
type Props = { immagini: Immagine[]; etichette: { apri: string; chiudi: string; precedente: string; successiva: string; immagine: string; di: string } };

/** Immagini di un'opera una sotto l'altra, con ingrandimento a schermo intero (frecce, Esc, tocco). */
export function GalleriaC({ immagini, etichette }: Props) {
  const [indice, setIndice] = useState<number | null>(null);
  const dialogo = useRef<HTMLDialogElement>(null);
  const n = immagini.length;
  const chiudi = useCallback(() => setIndice(null), []);
  const vai = useCallback((delta: number) => setIndice((i) => (i === null ? i : (i + delta + n) % n)), [n]);
  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (indice !== null && !d.open) d.showModal();
    if (indice === null && d.open) d.close();
    document.body.style.overflow = indice !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [indice]);
  useEffect(() => {
    if (indice === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") vai(1);
      if (e.key === "ArrowLeft") vai(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [indice, vai]);
  const tocco = useRef<number | null>(null);

  return (
    <>
      <div className="space-y-2">
        {immagini.map((im, i) => (
          <figure key={im.foto.src} className="rivela-immagine bg-sfondo-2" data-rivela>
            <button type="button" onClick={() => setIndice(i)} aria-label={`${etichette.apri}: ${im.alt}`} className="block w-full cursor-zoom-in">
              <Foto foto={im.foto} alt={im.alt} sizes="(min-width: 1024px) 80vw, 100vw" priorita={i === 0} />
            </button>
            <figcaption className="mono flex justify-between gap-4 px-1 py-3 normal-case tracking-normal">
              <span>{im.didascalia || im.alt}</span>
              <span className="uppercase tracking-[0.12em]">{String(i + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <dialog ref={dialogo} className="lightbox" onClose={chiudi} onClick={(e) => { if (e.target === e.currentTarget) chiudi(); }} aria-label={etichette.immagine}>
        {indice !== null ? (
          <div className="flex h-full w-full flex-col" onTouchStart={(e) => (tocco.current = e.touches[0].clientX)} onTouchEnd={(e) => { if (tocco.current === null) return; const dx = e.changedTouches[0].clientX - tocco.current; if (Math.abs(dx) > 50) vai(dx < 0 ? 1 : -1); tocco.current = null; }}>
            <div className="mono flex items-center justify-between px-4 py-4 sm:px-6">
              <span>{etichette.immagine} {indice + 1} {etichette.di} {n}</span>
              <button type="button" onClick={chiudi} className="bottone h-9 px-4 text-[0.75rem]">{etichette.chiudi}</button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16">
              <img key={immagini[indice].foto.src} src={immagini[indice].foto.url} srcSet={immagini[indice].foto.srcSet} sizes="100vw" alt={immagini[indice].alt} className="max-h-full select-none" draggable={false} />
              {n > 1 ? (
                <>
                  <button type="button" onClick={() => vai(-1)} aria-label={etichette.precedente} className="bottone absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 justify-center px-0 sm:flex">←</button>
                  <button type="button" onClick={() => vai(1)} aria-label={etichette.successiva} className="bottone absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 justify-center px-0 sm:flex">→</button>
                </>
              ) : null}
            </div>
            <p className="voce px-4 pb-6 text-center text-xl sm:px-16">{immagini[indice].didascalia || immagini[indice].alt}</p>
          </div>
        ) : null}
      </dialog>
    </>
  );
}

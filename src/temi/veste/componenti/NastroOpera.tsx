"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Foto as FotoDati } from "@/lib/tipi";

export type Immagine = { foto: FotoDati; alt: string; didascalia?: string };

type Props = {
  immagini: Immagine[];
  etichette: { apri: string; chiudi: string; precedente: string; successiva: string; immagine: string; di: string };
};

/** Le immagini di un'opera in un nastro orizzontale (trascinabile) e ingrandimento a schermo intero. */
export function NastroOpera({ immagini, etichette }: Props) {
  const [indice, setIndice] = useState<number | null>(null);
  const dialogo = useRef<HTMLDialogElement>(null);
  const nastro = useRef<HTMLDivElement>(null);
  const n = immagini.length;
  const vai = useCallback((delta: number) => setIndice((i) => (i === null ? i : (i + delta + n) % n)), [n]);
  const chiudi = useCallback(() => setIndice(null), []);

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

  // trascinamento con il mouse
  const drag = useRef<{ x: number; scroll: number; mosso: boolean } | null>(null);
  const onDown = (e: React.MouseEvent) => {
    if (!nastro.current) return;
    drag.current = { x: e.clientX, scroll: nastro.current.scrollLeft, mosso: false };
  };
  const onMove = (e: React.MouseEvent) => {
    if (!drag.current || !nastro.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.mosso = true;
    nastro.current.scrollLeft = drag.current.scroll - dx;
  };
  const onUp = () => {
    setTimeout(() => (drag.current = null), 0);
  };
  const tocco = useRef<number | null>(null);

  return (
    <>
      <div ref={nastro} className="nastro select-none" onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp} style={{ cursor: "grab" }}>
        {immagini.map((im, i) => (
          <figure key={im.foto.src} className="relative">
            <button
              type="button"
              className="block h-full"
              data-cursore="zoom"
              aria-label={`${etichette.apri}: ${im.alt}`}
              onClick={() => {
                if (drag.current?.mosso) return;
                setIndice(i);
              }}
            >
              <img src={im.foto.url} srcSet={im.foto.srcSet} sizes="(min-width: 1024px) 70vw, 100vw" width={im.foto.w} height={im.foto.h} alt={im.alt} loading={i === 0 ? "eager" : "lazy"} decoding="async" draggable={false} />
            </button>
            <figcaption className="mono absolute bottom-3 left-3 flex gap-3 text-su-media mix-blend-difference">
              <span>{String(i + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}</span>
              {im.didascalia ? <span className="normal-case tracking-normal">{im.didascalia}</span> : null}
            </figcaption>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogo}
        className="lightbox"
        onClose={chiudi}
        onClick={(e) => {
          if (e.target === e.currentTarget) chiudi();
        }}
        aria-label={etichette.immagine}
      >
        {indice !== null ? (
          <div
            className="flex h-full w-full flex-col"
            onTouchStart={(e) => (tocco.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (tocco.current === null) return;
              const dx = e.changedTouches[0].clientX - tocco.current;
              if (Math.abs(dx) > 50) vai(dx < 0 ? 1 : -1);
              tocco.current = null;
            }}
          >
            <div className="mono flex items-center justify-between px-4 py-4 sm:px-6">
              <span>{etichette.immagine} {String(indice + 1).padStart(2, "0")} {etichette.di} {String(n).padStart(2, "0")}</span>
              <button type="button" onClick={chiudi} className="bottone h-9">{etichette.chiudi}</button>
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
            <p className="voce px-4 pb-6 text-center text-xl text-testo-2 sm:px-16">{immagini[indice].didascalia || immagini[indice].alt}</p>
          </div>
        ) : null}
      </dialog>
    </>
  );
}

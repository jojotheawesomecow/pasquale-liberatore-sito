"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Foto as FotoDati } from "@/lib/tipi";
import { Foto } from "@/componenti/Foto";

export type Immagine = { foto: FotoDati; alt: string; didascalia?: string };

type Props = {
  immagini: Immagine[];
  etichette: { apri: string; chiudi: string; precedente: string; successiva: string; immagine: string; di: string };
  /** classe per il contenitore delle immagini in pagina */
  className?: string;
};

/** Sequenza di immagini di un'opera con finestra di ingrandimento (frecce, Esc, tocco). */
export function GalleriaOpera({ immagini, etichette, className = "" }: Props) {
  const [indice, setIndice] = useState<number | null>(null);
  const dialogo = useRef<HTMLDialogElement>(null);
  const n = immagini.length;

  const apri = (i: number) => setIndice(i);
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

  // gesto di scorrimento su schermi touch
  const tocco = useRef<number | null>(null);

  return (
    <>
      <div className={className}>
        {immagini.map((im, i) => (
          <figure key={im.foto.src} data-rivela>
            <button
              type="button"
              onClick={() => apri(i)}
              aria-label={`${etichette.apri}: ${im.alt}`}
              className="group block w-full cursor-zoom-in text-left"
            >
              <Foto foto={im.foto} alt={im.alt} sizes="(min-width: 1024px) 58vw, 100vw" priorita={i === 0} className="rounded-[2px] bg-carta-2" />
            </button>
            {im.didascalia ? <figcaption className="mt-3 font-sans text-sm text-pietra-2">{im.didascalia}</figcaption> : null}
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
            <div className="flex items-center justify-between px-4 py-3 font-sans text-xs uppercase tracking-[0.14em] text-carta/70 sm:px-6">
              <span>
                {etichette.immagine} {indice + 1} {etichette.di} {n}
              </span>
              <button type="button" onClick={chiudi} className="rounded-full border border-carta/30 px-3 py-1.5 hover:border-carta hover:text-carta">
                {etichette.chiudi}
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16">
              <img
                key={immagini[indice].foto.src}
                src={immagini[indice].foto.url}
                srcSet={immagini[indice].foto.srcSet}
                sizes="100vw"
                alt={immagini[indice].alt}
                className="max-h-full select-none"
                draggable={false}
              />
              {n > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => vai(-1)}
                    aria-label={etichette.precedente}
                    className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-carta/30 text-carta/80 hover:border-carta hover:text-carta sm:flex"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => vai(1)}
                    aria-label={etichette.successiva}
                    className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-carta/30 text-carta/80 hover:border-carta hover:text-carta sm:flex"
                  >
                    →
                  </button>
                </>
              ) : null}
            </div>
            {immagini[indice].didascalia || immagini[indice].alt ? (
              <p className="px-4 pb-5 text-center font-serif text-base text-carta/85 sm:px-16">{immagini[indice].didascalia || immagini[indice].alt}</p>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </>
  );
}

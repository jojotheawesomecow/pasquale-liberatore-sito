"use client";

import { useState } from "react";

type Props = { id: string; titolo: string; riproduci: string };

/** Video YouTube caricato solo dopo il clic (modalità senza cookie). */
export function VideoEmbed({ id, titolo, riproduci }: Props) {
  const [attivo, setAttivo] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-[2px] bg-media">
      {attivo ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={titolo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button type="button" onClick={() => setAttivo(true)} className="group absolute inset-0 h-full w-full text-left" aria-label={`${riproduci}: ${titolo}`} data-cursore="zoom">
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-90 transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-media/70 via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-su-media/70 bg-media/40 text-su-media backdrop-blur-sm transition-colors group-hover:bg-su-media group-hover:text-media">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </button>
      )}
    </div>
  );
}

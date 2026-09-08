import type { ElementType, ReactNode } from "react";

type Props = {
  testo: string;
  /** elemento HTML da usare (h1, h2, p…) */
  come?: ElementType;
  className?: string;
  /** ritardo iniziale in ms */
  ritardo?: number;
  /** ms tra una parola e la successiva */
  passo?: number;
  /** "parole" (default) oppure "righe" (spezza sui \n) */
  modo?: "parole" | "righe";
  children?: ReactNode;
};

/**
 * Testo che appare parola per parola (o riga per riga) quando entra nello schermo.
 * Funziona con `RivelaOsservatore`: il contenitore ha data-rivela e ogni pezzo ha un ritardo crescente.
 * Senza JavaScript, o con "riduci movimento", il testo è semplicemente visibile.
 */
export function TestoRivela({ testo, come: Tag = "p", className = "", ritardo = 0, passo = 40, modo = "parole" }: Props) {
  const pezzi = modo === "righe" ? testo.split("\n") : testo.split(/(\s+)/);
  return (
    <Tag className={`testo-rivela ${className}`} data-rivela data-rivela-testo aria-label={testo}>
      {pezzi.map((p, i) =>
        /^\s+$/.test(p) ? (
          <span key={i}> </span>
        ) : (
          <span key={i} className="pezzo" aria-hidden="true">
            <span className="pezzo-interno" style={{ transitionDelay: `${ritardo + i * passo}ms`, animationDelay: `${ritardo + i * passo}ms` }}>
              {p}
            </span>
            {modo === "righe" && i < pezzi.length - 1 ? <br /> : null}
          </span>
        )
      )}
    </Tag>
  );
}

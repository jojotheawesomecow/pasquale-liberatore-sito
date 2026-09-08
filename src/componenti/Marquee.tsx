import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string; /** secondi per un giro completo */ durata?: number; inverti?: boolean };

/** Nastro che scorre all'infinito (solo CSS; si ferma con "riduci movimento"). */
export function Marquee({ children, className = "", durata = 40, inverti = false }: Props) {
  return (
    <div className={`marquee ${className}`} style={{ ["--marquee-durata" as string]: `${durata}s`, ["--marquee-direzione" as string]: inverti ? "reverse" : "normal" }}>
      <div className="marquee-pista">
        <div className="marquee-gruppo">{children}</div>
        <div className="marquee-gruppo" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}

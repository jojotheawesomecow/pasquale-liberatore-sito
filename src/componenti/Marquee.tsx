import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** secondi per un giro completo */
  durata?: number;
  inverti?: boolean;
  /** distanza fra un elemento e il successivo, es. "2.6rem" */
  distanza?: string;
  /** etichetta fissa a sinistra, che non scorre */
  etichetta?: string;
};

/**
 * Nastro che scorre all'infinito (solo CSS; si ferma al passaggio del mouse e con "riduci movimento").
 * I bordi sono sfumati, così le parole entrano ed escono invece di essere tagliate di netto.
 */
export function Marquee({ children, className = "", durata = 40, inverti = false, distanza, etichetta }: Props) {
  const stile = {
    "--marquee-durata": `${durata}s`,
    "--marquee-direzione": inverti ? "reverse" : "normal",
    ...(distanza ? { "--marquee-gap": distanza } : {}),
  } as React.CSSProperties;
  return (
    <div className={`marquee ${className}`} style={stile}>
      {etichetta ? <span className="marquee-etichetta">{etichetta}</span> : null}
      <div className="marquee-finestra">
        <div className="marquee-pista">
          <div className="marquee-gruppo">{children}</div>
          <div className="marquee-gruppo" aria-hidden="true">{children}</div>
        </div>
      </div>
    </div>
  );
}

import { Marquee } from "@/componenti/Marquee";

/**
 * Aspetto del nastro:
 * - "corsivo": nomi in corsivo serif separati da un piccolo rombo (più elegante);
 * - "mono": maiuscoletto monospazio con pallino colorato (la prima versione).
 */
export type VarianteNastro = "corsivo" | "mono";

type Props = {
  /** parole che scorrono (materiali, luoghi…) */
  voci: readonly string[];
  /** etichetta fissa a sinistra, es. "Materie". Lasciare vuoto per non mostrarla */
  etichetta?: string;
  variante?: VarianteNastro;
  className?: string;
  durata?: number;
  inverti?: boolean;
};

/** Nastro scorrevole dei materiali o dei luoghi. */
export function Nastro({ voci, etichetta, variante = "corsivo", className = "", durata = 72, inverti = false }: Props) {
  return (
    <Marquee className={className} etichetta={etichetta} durata={durata} inverti={inverti} distanza={variante === "mono" ? "3rem" : "2.6rem"}>
      {voci.map((v) => (
        <span key={v} className={`nastro-voce ${variante === "mono" ? "nastro-voce--mono" : ""}`}>
          {v}
        </span>
      ))}
    </Marquee>
  );
}

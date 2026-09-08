import type { Foto as FotoDati } from "@/lib/tipi";

type Props = {
  foto: FotoDati;
  alt: string;
  /** attributo sizes per il browser, es. "(min-width: 1024px) 50vw, 100vw" */
  sizes?: string;
  priorita?: boolean;
  /** se true l'immagine riempie il contenitore (object-fit: cover); altrimenti mantiene le proporzioni */
  riempi?: boolean;
  /** con `riempi`, mostra l'immagine per intero invece di ritagliarla (per i quadri scontornati) */
  intera?: boolean;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
};

/** Immagine responsive generata da `npm run immagini`, con anteprima sfocata mentre carica. */
export function Foto({ foto, alt, sizes = "100vw", priorita = false, riempi = false, intera = false, className = "", imgClassName = "", style }: Props) {
  const contieni = intera || foto.alpha;
  return (
    <div
      className={`${riempi ? "foto-cornice" : "foto-naturale foto-cornice"} ${className}`}
      style={{ ...(contieni && riempi ? {} : { backgroundImage: `url(${foto.blur})` }), ...(riempi ? {} : { aspectRatio: `${foto.w} / ${foto.h}` }), ...style }}
    >
      <img
        src={foto.url}
        srcSet={foto.srcSet}
        sizes={sizes}
        width={foto.w}
        height={foto.h}
        alt={alt}
        loading={priorita ? "eager" : "lazy"}
        decoding={priorita ? "sync" : "async"}
        fetchPriority={priorita ? "high" : "auto"}
        className={`${contieni && riempi ? "object-contain" : ""} ${imgClassName}`}
      />
    </div>
  );
}

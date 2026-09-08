/** Dati di un'immagine ottimizzata, pronti per il componente <Foto>. Nessuna dipendenza da Node. */
export type Foto = {
  src: string;
  w: number;
  h: number;
  sizes: number[];
  url: string;
  srcSet: string;
  blur: string;
  /** l'immagine ha sfondo trasparente (quadro scontornato): va mostrata intera, non ritagliata */
  alpha?: boolean;
};

/** Dati minimi di un'opera per griglie ed elenchi (serializzabili, passano ai componenti client). */
export type SchedaOpera = {
  slug: string;
  href: string;
  titolo: string;
  /** numero d'archivio, es. P-001: identifica l'opera finché non ha un titolo */
  codice: string;
  anno: string;
  categoria: string;
  categoriaLabel: string;
  /** materiale o tecnica */
  dettaglio: string;
  luogo: string;
  decade: string | null;
  foto: Foto | null;
};

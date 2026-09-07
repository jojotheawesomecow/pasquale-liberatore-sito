/** Dati di un'immagine ottimizzata, pronti per il componente <Foto>. Nessuna dipendenza da Node. */
export type Foto = {
  src: string;
  w: number;
  h: number;
  sizes: number[];
  url: string;
  srcSet: string;
  blur: string;
};

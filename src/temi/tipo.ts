import type { ComponentType, ReactNode } from "react";
import type { Lang } from "@/lib/rotte";

type PaginaSemplice = ComponentType<{ lang: Lang }>;
type PaginaDettaglio = ComponentType<{ lang: Lang; slug: string }>;

/** Ciò che ogni tema (veste grafica) deve fornire. I contenuti e le rotte sono condivisi. */
export type Tema = {
  nome: string;
  Documento: ComponentType<{ lang: Lang; children: ReactNode }>;
  NonTrovata: ComponentType;
  Home: PaginaSemplice;
  Opere: PaginaSemplice;
  Archivio: PaginaSemplice;
  Opera: PaginaDettaglio;
  ChiSono: PaginaSemplice;
  Riflessioni: PaginaSemplice;
  Riflessione: PaginaDettaglio;
  Giardino: PaginaSemplice;
  Video: PaginaSemplice;
  Contatti: PaginaSemplice;
  Privacy: PaginaSemplice;
};

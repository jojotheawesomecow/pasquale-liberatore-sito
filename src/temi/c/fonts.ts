import { Newsreader, Geist, Geist_Mono } from "next/font/google";

/** Tema C: serif editoriale per titoli e testi lunghi, sans per l'interfaccia, mono per i dati. */
export const serif = Newsreader({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

export const sans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
  display: "swap",
});

export const mono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
  display: "swap",
});

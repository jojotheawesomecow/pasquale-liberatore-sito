import { Instrument_Sans, Instrument_Serif, Geist_Mono } from "next/font/google";

/** Tema B: grotesk contemporaneo per titoli e interfaccia, serif corsivo per le parole dell'artista, mono per i dati. */
export const sans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const serif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const mono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
  display: "swap",
});

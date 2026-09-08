export type Lang = "it" | "en";
export const LINGUE: Lang[] = ["it", "en"];

/** Percorsi delle sezioni nelle due lingue (senza barre iniziali/finali). */
export const SEZIONI = {
  home: { it: "", en: "" },
  opere: { it: "opere", en: "works" },
  archivio: { it: "archivio", en: "archive" },
  chiSono: { it: "chi-sono", en: "about" },
  riflessioni: { it: "riflessioni", en: "reflections" },
  giardino: { it: "il-mio-giardino", en: "the-garden" },
  video: { it: "video", en: "videos" },
  contatti: { it: "contatti", en: "contact" },
  privacy: { it: "privacy", en: "privacy" },
} as const;

export type Sezione = keyof typeof SEZIONI;
export const SEZIONI_CON_DETTAGLIO: Sezione[] = ["opere", "riflessioni"];

/** URL interno di una sezione (con barra finale, coerente con `trailingSlash: true`). */
export function url(lang: Lang, sezione: Sezione, slug?: string): string {
  const parti = [lang === "en" ? "en" : "", SEZIONI[sezione][lang], slug ?? ""].filter(Boolean);
  return parti.length ? `/${parti.join("/")}/` : "/";
}

export type Rotta = { sezione: Sezione; slug?: string };

/** Riconosce un percorso (già privo del prefisso lingua) e restituisce sezione e slug. */
export function risolvi(lang: Lang, path: string[]): Rotta | null {
  if (path.length === 0) return { sezione: "home" };
  if (path.length > 2) return null;
  const [primo, secondo] = path;
  for (const s of Object.keys(SEZIONI) as Sezione[]) {
    if (s !== "home" && SEZIONI[s][lang] === primo) {
      if (secondo) return SEZIONI_CON_DETTAGLIO.includes(s) ? { sezione: s, slug: secondo } : null;
      return { sezione: s };
    }
  }
  return null;
}

export const altraLingua = (lang: Lang): Lang => (lang === "it" ? "en" : "it");

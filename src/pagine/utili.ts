import { CATEGORIE_OPERE } from "../../keystatic.config";
import type { SchedaOpera } from "@/lib/tipi";
import { decadeDi, type Opera } from "@/lib/contenuti";
import { campo, t } from "@/lib/i18n";
import { foto } from "@/lib/immagini";
import { url, type Lang } from "@/lib/rotte";

export function schedaOpera(o: Opera, lang: Lang): SchedaOpera {
  const d = t(lang);
  return {
    slug: o.slug,
    href: url(lang, "opere", o.slug),
    titolo: campo(o, "titolo", lang) || d.senzaTitolo,
    codice: o.codice ?? "",
    anno: o.anno ?? "",
    categoria: o.categoria,
    categoriaLabel: d.categorieBrevi[o.categoria] ?? o.categoria,
    dettaglio: o.materiale || o.tecnica || "",
    luogo: o.luogo ?? "",
    decade: decadeDi(o.anno),
    foto: foto(o.foto),
  };
}

/**
 * Raggruppa l'archivio: prima le opere documentate per decennio,
 * poi i dipinti in blocchi di numero d'archivio. Il blocco numerico è onesto:
 * non finge un ordine cronologico che non conosciamo.
 */
export function raggruppaArchivio(
  opere: SchedaOpera[],
  etichette: { senzaData: string; senzaTitolo: string }
) {
  const gruppi: { chiave: string; titolo: string; opere: SchedaOpera[] }[] = [];
  const conAnno = opere.filter((o) => o.decade);
  const senzaAnno = opere.filter((o) => !o.decade);
  const documentate = senzaAnno.filter((o) => o.titolo !== etichette.senzaTitolo);
  const daSchedare = senzaAnno.filter((o) => o.titolo === etichette.senzaTitolo);

  for (const d of [...new Set(conAnno.map((o) => o.decade as string))].sort((a, b) => Number(b) - Number(a))) {
    gruppi.push({ chiave: `d-${d}`, titolo: `${d}–${Number(d) + 9}`, opere: conAnno.filter((o) => o.decade === d) });
  }
  if (documentate.length) {
    gruppi.push({ chiave: "senza-data", titolo: etichette.senzaData, opere: documentate });
  }
  // i dipinti ancora da schedare, a blocchi di numero d'archivio: è un ordine onesto,
  // non finge una cronologia che non conosciamo
  const blocco = 50;
  for (let i = 0; i < daSchedare.length; i += blocco) {
    const fetta = daSchedare.slice(i, i + blocco);
    const da = fetta[0]?.codice ?? "";
    const a = fetta[fetta.length - 1]?.codice ?? "";
    gruppi.push({ chiave: `b-${i}`, titolo: da && a ? `${da} – ${a}` : etichette.senzaData, opere: fetta });
  }
  return gruppi;
}

export function categoriePresenti(opere: Opera[], lang: Lang) {
  const d = t(lang);
  return CATEGORIE_OPERE.filter((c) => opere.some((o) => o.categoria === c.value)).map((c) => ({
    value: c.value,
    label: d.categorieBrevi[c.value] ?? c.label,
  }));
}

/** Divide un testo in paragrafi sulle righe vuote. */
export const paragrafi = (testo: string | null | undefined): string[] =>
  (testo ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

export const righe = (testo: string | null | undefined): string[] =>
  (testo ?? "")
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean);

export function formattaData(data: string | null | undefined, lang: Lang): string {
  if (!data) return "";
  const d = new Date(data);
  if (Number.isNaN(d.getTime())) return data;
  return d.toLocaleDateString(lang === "it" ? "it-IT" : "en-GB", { year: "numeric", month: "long" });
}

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
    anno: o.anno ?? "",
    categoria: o.categoria,
    categoriaLabel: d.categorieBrevi[o.categoria] ?? o.categoria,
    dettaglio: o.materiale || o.tecnica || "",
    luogo: o.luogo ?? "",
    decade: decadeDi(o.anno),
    foto: foto(o.foto),
  };
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

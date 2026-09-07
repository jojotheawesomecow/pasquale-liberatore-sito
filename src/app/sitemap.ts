import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/base";
import { getOpere, getRiflessioni } from "@/lib/contenuti";
import { SEZIONI, url, type Lang, type Sezione } from "@/lib/rotte";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [opere, riflessioni] = await Promise.all([getOpere(), getRiflessioni()]);
  const voci: MetadataRoute.Sitemap = [];
  const aggiungi = (sezione: Sezione, slug?: string, priority = 0.6) => {
    for (const lang of ["it", "en"] as Lang[]) {
      voci.push({
        url: `${SITE_URL}${url(lang, sezione, slug)}`,
        changeFrequency: "monthly",
        priority,
        alternates: { languages: { it: `${SITE_URL}${url("it", sezione, slug)}`, en: `${SITE_URL}${url("en", sezione, slug)}` } },
      });
    }
  };
  aggiungi("home", undefined, 1);
  for (const s of Object.keys(SEZIONI) as Sezione[]) if (s !== "home") aggiungi(s, undefined, s === "privacy" ? 0.2 : 0.8);
  for (const o of opere) aggiungi("opere", o.slug, 0.7);
  for (const r of riflessioni) aggiungi("riflessioni", r.slug, 0.6);
  return voci;
}

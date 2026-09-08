import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BASE, NOINDEX, SITE_URL } from "@/lib/base";
import { getImpostazioni, getOpera, getOpere, getRiflessione, getRiflessioni } from "@/lib/contenuti";
import { campo, t } from "@/lib/i18n";
import { foto } from "@/lib/immagini";
import { SEZIONI, risolvi, url, type Lang, type Sezione } from "@/lib/rotte";
import { testi } from "@/lib/testi";
import { testoSemplice } from "@/lib/markdoc";
import { tema } from "@tema";

/** Origine del sito senza il percorso base (per costruire URL assoluti di immagini già prefissate). */
const ORIGINE = BASE && SITE_URL.endsWith(BASE) ? SITE_URL.slice(0, -BASE.length) : SITE_URL;
const assoluto = (percorso: string) => `${SITE_URL}${percorso}`;

/** Tutti i percorsi statici di una lingua (esclusa la home, servita da page.tsx). */
export async function elencoPercorsi(lang: Lang): Promise<string[][]> {
  const [opere, riflessioni] = await Promise.all([getOpere(), getRiflessioni()]);
  const percorsi: string[][] = [];
  for (const s of Object.keys(SEZIONI) as Sezione[]) if (s !== "home") percorsi.push([SEZIONI[s][lang]]);
  for (const o of opere) percorsi.push([SEZIONI.opere[lang], o.slug]);
  for (const r of riflessioni) percorsi.push([SEZIONI.riflessioni[lang], r.slug]);
  return percorsi;
}

export async function renderPagina(lang: Lang, path: string[]) {
  const rotta = risolvi(lang, path);
  if (!rotta) notFound();
  switch (rotta.sezione) {
    case "home":
      return <tema.Home lang={lang} />;
    case "opere":
      return rotta.slug ? <tema.Opera lang={lang} slug={rotta.slug} /> : <tema.Opere lang={lang} />;
    case "archivio":
      return <tema.Archivio lang={lang} />;
    case "chiSono":
      return <tema.ChiSono lang={lang} />;
    case "riflessioni":
      return rotta.slug ? <tema.Riflessione lang={lang} slug={rotta.slug} /> : <tema.Riflessioni lang={lang} />;
    case "giardino":
      return <tema.Giardino lang={lang} />;
    case "video":
      return <tema.Video lang={lang} />;
    case "contatti":
      return <tema.Contatti lang={lang} />;
    case "privacy":
      return <tema.Privacy lang={lang} />;
  }
}

/** Metadati comuni (layout radice). */
export async function metadataBase(lang: Lang): Promise<Metadata> {
  const imp = await getImpostazioni();
  const descrizione = campo(imp, "descrizione_seo", lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: imp.nome, template: `%s — ${imp.nome}` },
    description: descrizione,
    applicationName: imp.nome,
    robots: NOINDEX ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: { type: "website", siteName: imp.nome, locale: lang === "it" ? "it_IT" : "en_GB" },
  };
}

/** Metadati della singola pagina. */
export async function metadataPagina(lang: Lang, path: string[]): Promise<Metadata> {
  const rotta = risolvi(lang, path);
  if (!rotta) return {};
  const [imp] = await Promise.all([getImpostazioni()]);
  const d = t(lang);
  const x = testi(lang);
  const altra: Lang = lang === "it" ? "en" : "it";
  const alternates = {
    canonical: assoluto(url(lang, rotta.sezione, rotta.slug)),
    languages: { it: assoluto(url("it", rotta.sezione, rotta.slug)), en: assoluto(url("en", rotta.sezione, rotta.slug)), "x-default": assoluto(url("it", rotta.sezione, rotta.slug)) },
  };
  void altra;

  let title: string | undefined;
  let description: string | undefined = campo(imp, "descrizione_seo", lang);
  let immagine: string | undefined;

  switch (rotta.sezione) {
    case "home": {
      title = `${imp.nome} — ${campo(imp, "tagline", lang) || d.ruolo}`;
      break;
    }
    case "opere": {
      if (rotta.slug) {
        const o = await getOpera(rotta.slug);
        if (!o) return {};
        title = `${campo(o, "titolo", lang)}${o.anno ? `, ${o.anno}` : ""}`;
        const desc = campo(o, "descrizione", lang);
        description = desc ? desc.slice(0, 200) : [d.categorie[o.categoria], o.materiale || o.tecnica, o.dimensioni, o.luogo].filter(Boolean).join(" · ");
        const f = foto(o.foto);
        if (f) immagine = `${ORIGINE}${f.url}`;
      } else {
        title = d.nav.opere;
        description = x.opereIntro;
      }
      break;
    }
    case "archivio":
      title = d.nav.archivio;
      description = d.archivioIntro;
      break;
    case "chiSono":
      title = d.nav.chiSono;
      break;
    case "riflessioni": {
      if (rotta.slug) {
        const r = await getRiflessione(rotta.slug);
        if (!r) return {};
        title = campo(r, "titolo", lang);
        description = campo(r, "estratto", lang) || testoSemplice(r.testo?.node);
        const f = foto(r.immagine);
        if (f) immagine = `${ORIGINE}${f.url}`;
      } else {
        title = d.nav.riflessioni;
        description = d.riflessioniIntro;
      }
      break;
    }
    case "giardino":
      title = d.nav.giardino;
      break;
    case "video":
      title = d.nav.video;
      description = d.videoIntro;
      break;
    case "contatti":
      title = d.nav.contatti;
      description = d.contattiIntro;
      break;
    case "privacy":
      title = d.nav.privacy;
      break;
  }

  return {
    title: rotta.sezione === "home" ? { absolute: title ?? imp.nome } : title,
    description,
    alternates,
    openGraph: { title: title ?? imp.nome, description, url: alternates.canonical, images: immagine ? [{ url: immagine }] : undefined },
  };
}

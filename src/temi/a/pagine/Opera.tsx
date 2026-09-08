import Link from "next/link";
import { notFound } from "next/navigation";
import { GalleriaOpera, type Immagine } from "@/temi/a/componenti/GalleriaOpera";
import { getOpere } from "@/lib/contenuti";
import { campo, t } from "@/lib/i18n";
import { foto } from "@/lib/immagini";
import { url, type Lang } from "@/lib/rotte";
import { paragrafi } from "@/pagine/utili";

type OperaVicina = Awaited<ReturnType<typeof getOpere>>[number] | undefined;

function Vicina({ opera, etichetta, lang, allineaDestra = false }: { opera: OperaVicina; etichetta: string; lang: Lang; allineaDestra?: boolean }) {
  if (!opera) return <span />;
  return (
    <Link href={url(lang, "opere", opera.slug)} className={`group flex max-w-xs flex-col gap-1 ${allineaDestra ? "items-end text-right" : ""}`}>
      <span className="etichetta">{etichetta}</span>
      <span className="font-serif text-xl leading-tight transition-colors group-hover:text-muschio">
        {campo(opera, "titolo", lang)}
        {opera.anno ? <span className="text-pietra-2">, {opera.anno}</span> : null}
      </span>
    </Link>
  );
}

export async function Opera({ lang, slug }: { lang: Lang; slug: string }) {
  const opere = await getOpere();
  const i = opere.findIndex((o) => o.slug === slug);
  if (i < 0) notFound();
  const o = opere[i];
  const prec = opere[i - 1];
  const succ = opere[i + 1];
  const d = t(lang);
  const titolo = campo(o, "titolo", lang) || d.senzaTitolo;

  const immagini: Immagine[] = [];
  const copertina = foto(o.foto);
  if (copertina) immagini.push({ foto: copertina, alt: `${titolo}${o.anno ? `, ${o.anno}` : ""}` });
  for (const g of o.galleria) {
    const f = foto(g.foto);
    if (f) immagini.push({ foto: f, alt: campo(g, "didascalia", lang) || titolo, didascalia: campo(g, "didascalia", lang) });
  }

  const scheda: [string, string][] = [
    [d.scheda.categoria, d.categorie[o.categoria] ?? o.categoria],
    [d.scheda.anno, o.anno ?? ""],
    [d.scheda.luogo, o.luogo ?? ""],
    [d.scheda.materiale, o.materiale ?? ""],
    [d.scheda.tecnica, o.tecnica ?? ""],
    [d.scheda.dimensioni, o.dimensioni ?? ""],
    [d.scheda.collezione, o.collezione ?? ""],
  ];
  const descrizione = paragrafi(campo(o, "descrizione", lang));

  return (
    <article className="contenitore pt-8 sm:pt-12">
      <Link href={url(lang, "opere")} className="link-freccia text-inchiostro-2"><span aria-hidden="true">←</span><span>{d.tornaAlleOpere}</span></Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <p className="etichetta" data-rivela>
            {d.categorieBrevi[o.categoria] ?? o.categoria}
            {o.anno ? ` · ${o.anno}` : ""}
          </p>
          <h1 className="titolo-display mt-4" data-rivela data-ritardo="1">{titolo}</h1>
          <dl className="riga mt-8 grid grid-cols-[auto_1fr] gap-x-8 gap-y-2.5 pt-6 font-sans text-[0.9rem]" data-rivela data-ritardo="2">
            {scheda
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-pietra-2">{k}</dt>
                  <dd className="text-inchiostro">{v}</dd>
                </div>
              ))}
          </dl>
          {descrizione.length ? (
            <div className="prosa mt-8" data-rivela data-ritardo="3">
              {descrizione.map((p, k) => <p key={k}>{p}</p>)}
            </div>
          ) : null}
        </div>

        <div className="lg:col-span-7">
          <GalleriaOpera
            immagini={immagini}
            className="space-y-10"
            etichette={{ apri: d.apriImmagine, chiudi: d.chiudi, precedente: d.operaPrecedente, successiva: d.operaSuccessiva, immagine: d.immagine, di: d.di }}
          />
        </div>
      </div>

      <nav className="riga mt-20 flex items-start justify-between gap-8 pt-8" aria-label={d.nav.opere}>
        <Vicina opera={prec} etichetta={d.operaPrecedente} lang={lang} />
        <Vicina opera={succ} etichetta={d.operaSuccessiva} lang={lang} allineaDestra />
      </nav>
    </article>
  );
}

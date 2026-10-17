import Link from "next/link";
import { notFound } from "next/navigation";
import { Foto } from "@/componenti/Foto";
import { TestoRivela } from "@/componenti/TestoRivela";
import { getOpere, type Opera as TipoOpera } from "@/lib/contenuti";
import { campo, t } from "@/lib/i18n";
import { foto } from "@/lib/immagini";
import { url, type Lang } from "@/lib/rotte";
import { paragrafi } from "@/pagine/utili";
import { NastroOpera, type Immagine } from "../componenti/NastroOpera";

function Vicina({ opera, etichetta, lang, destra = false }: { opera: TipoOpera | undefined; etichetta: string; lang: Lang; destra?: boolean }) {
  if (!opera) return <span />;
  const f = foto(opera.foto);
  return (
    <Link href={url(lang, "opere", opera.slug)} className={`group flex items-center gap-5 ${destra ? "flex-row-reverse text-right" : ""}`} data-cursore="zoom">
      {f ? (
        <div className="h-24 w-20 shrink-0 overflow-hidden bg-sfondo-2">
          <Foto foto={f} alt="" riempi sizes="120px" className="h-full w-full" imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105" />
        </div>
      ) : null}
      <span>
        <span className="mono block">{etichetta}</span>
        <span className="titolo-l mt-1 block transition-colors group-hover:text-accento">{campo(opera, "titolo", lang)}</span>
        {opera.anno ? <span className="mono mt-1 block">{opera.anno}</span> : null}
      </span>
    </Link>
  );
}

export async function Opera({ lang, slug }: { lang: Lang; slug: string }) {
  const opere = await getOpere();
  const i = opere.findIndex((o) => o.slug === slug);
  if (i < 0) notFound();
  const o = opere[i];
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
    <article>
      <div className="contenitore pt-8">
        <Link href={url(lang, "opere")} className="mono transition-colors hover:text-accento">← {d.tornaAlleOpere}</Link>
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <TestoRivela testo={titolo} come="h1" className="titolo-xxl" passo={70} />
          <p className="mono shrink-0 lg:pb-4 lg:text-right" data-rivela>
            {String(i + 1).padStart(2, "0")} / {String(opere.length).padStart(2, "0")}
            <br />
            {d.categorieBrevi[o.categoria] ?? o.categoria}
            {o.anno ? ` · ${o.anno}` : ""}
          </p>
        </div>
      </div>

      <div className="mt-10 border-y border-linea">
        <NastroOpera immagini={immagini} etichette={{ apri: d.apriImmagine, chiudi: d.chiudi, precedente: d.operaPrecedente, successiva: d.operaSuccessiva, immagine: d.immagine, di: d.di }} />
      </div>

      <div className="contenitore mt-14 grid gap-12 lg:grid-cols-12">
        <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 self-start lg:col-span-4" data-rivela>
          {scheda
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="mono pt-0.5">{k}</dt>
                <dd className="font-sans text-[0.95rem] text-testo">{v}</dd>
              </div>
            ))}
        </dl>
        {descrizione.length ? (
          <div className="prosa lg:col-span-7 lg:col-start-6" data-rivela data-ritardo="1">
            {descrizione.map((p, k) => <p key={k}>{p}</p>)}
          </div>
        ) : null}
      </div>

      <nav className="contenitore riga mt-24 grid gap-10 py-10 sm:grid-cols-2" aria-label={d.nav.opere}>
        <Vicina opera={opere[i - 1]} etichetta={d.operaPrecedente} lang={lang} />
        <div className="sm:justify-self-end">
          <Vicina opera={opere[i + 1]} etichetta={d.operaSuccessiva} lang={lang} destra />
        </div>
      </nav>
    </article>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { Foto } from "@/componenti/Foto";
import { GalleriaOpera, type Immagine } from "@/temi/a/componenti/GalleriaOpera";
import { getRiflessione } from "@/lib/contenuti";
import { campo, t } from "@/lib/i18n";
import { foto } from "@/lib/immagini";
import { renderMarkdoc } from "@/lib/markdoc";
import { url, type Lang } from "@/lib/rotte";
import { formattaData } from "@/pagine/utili";

export async function Riflessione({ lang, slug }: { lang: Lang; slug: string }) {
  const r = await getRiflessione(slug);
  if (!r) notFound();
  const d = t(lang);
  const titolo = campo(r, "titolo", lang);
  const f = foto(r.immagine);
  const testo = (lang === "en" && r.testo_en?.node?.children?.length ? r.testo_en : r.testo)?.node;
  const pagine: Immagine[] = r.pagine
    .map((p) => ({ f: foto(p.foto), didascalia: p.didascalia }))
    .filter((p) => p.f)
    .map((p) => ({ foto: p.f!, alt: p.didascalia || titolo, didascalia: p.didascalia || undefined }));

  return (
    <article className="contenitore pt-8 sm:pt-12">
      <Link href={url(lang, "riflessioni")} className="link-freccia text-inchiostro-2"><span aria-hidden="true">←</span><span>{d.nav.riflessioni}</span></Link>
      <header className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-9">
          {r.data ? <p className="etichetta" data-rivela>{formattaData(r.data, lang)}</p> : <p className="etichetta" data-rivela>Pasquale Liberatore</p>}
          <h1 className="titolo-display mt-4" data-rivela data-ritardo="1">{titolo}</h1>
        </div>
      </header>
      {f ? (
        <figure className="mt-10" data-rivela>
          <Foto foto={f} alt={titolo} sizes="100vw" priorita className="rounded-[2px] bg-carta-2" />
        </figure>
      ) : null}
      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        <div className="prosa prosa-lg lg:col-span-8 lg:col-start-3" data-rivela>
          {renderMarkdoc(testo)}
          <p className="mt-10 font-sans text-sm text-pietra-2">— Pasquale Liberatore</p>
        </div>
      </div>
      {pagine.length ? (
        <section className="mt-20">
          <h2 className="etichetta riga pt-6">{d.pagineQuaderno}</h2>
          <GalleriaOpera
            immagini={pagine}
            className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            etichette={{ apri: d.apriImmagine, chiudi: d.chiudi, precedente: d.operaPrecedente, successiva: d.operaSuccessiva, immagine: d.immagine, di: d.di }}
          />
        </section>
      ) : null}
    </article>
  );
}

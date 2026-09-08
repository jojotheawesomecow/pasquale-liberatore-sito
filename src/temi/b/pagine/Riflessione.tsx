import Link from "next/link";
import { notFound } from "next/navigation";
import { Foto } from "@/componenti/Foto";
import { TestoRivela } from "@/componenti/TestoRivela";
import { getRiflessione } from "@/lib/contenuti";
import { campo, t } from "@/lib/i18n";
import { foto } from "@/lib/immagini";
import { renderMarkdoc } from "@/lib/markdoc";
import { url, type Lang } from "@/lib/rotte";
import { formattaData } from "@/pagine/utili";
import { NastroOpera, type Immagine } from "../componenti/NastroOpera";

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
    <article>
      <div className="contenitore pt-8">
        <Link href={url(lang, "riflessioni")} className="mono transition-colors hover:text-accento">← {d.nav.riflessioni}</Link>
        <p className="mono mt-10" data-rivela>{r.data ? formattaData(r.data, lang) : "Pasquale Liberatore"}</p>
        <TestoRivela testo={titolo} come="h1" className="voce mt-4 text-[clamp(2.8rem,9vw,10rem)] leading-[0.95]" passo={80} />
      </div>
      {f ? (
        <div className="rivela-immagine mt-12 aspect-[16/9] bg-sfondo-2 sm:aspect-[21/9]" data-rivela>
          <Foto foto={f} alt={titolo} riempi sizes="100vw" priorita className="h-full w-full" />
        </div>
      ) : null}
      <div className="contenitore mt-16 grid gap-10 lg:grid-cols-12">
        <div className="prosa-riflessione lg:col-span-7 lg:col-start-4" data-rivela>
          {renderMarkdoc(testo)}
          <p className="mono mt-12">— Pasquale Liberatore</p>
        </div>
      </div>
      {pagine.length ? (
        <section className="mt-24">
          <h2 className="contenitore mono riga pt-6">{d.pagineQuaderno}</h2>
          <div className="mt-6 border-y border-linea">
            <NastroOpera immagini={pagine} etichette={{ apri: d.apriImmagine, chiudi: d.chiudi, precedente: d.operaPrecedente, successiva: d.operaSuccessiva, immagine: d.immagine, di: d.di }} />
          </div>
        </section>
      ) : null}
    </article>
  );
}

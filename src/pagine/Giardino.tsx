import { Foto } from "@/componenti/Foto";
import { GalleriaOpera, type Immagine } from "@/componenti/GalleriaOpera";
import { Titolo } from "@/componenti/Titolo";
import { getGiardino } from "@/lib/contenuti";
import { campo, t } from "@/lib/i18n";
import { foto } from "@/lib/immagini";
import { renderMarkdoc } from "@/lib/markdoc";
import type { Lang } from "@/lib/rotte";

export async function Giardino({ lang }: { lang: Lang }) {
  const g = await getGiardino();
  const d = t(lang);
  const f = foto(g.immagine);
  const testo = (lang === "en" && g.testo_en?.node?.children?.length ? g.testo_en : g.testo)?.node;
  const galleria: Immagine[] = g.galleria
    .map((p) => ({ f: foto(p.foto), didascalia: campo(p, "didascalia", lang) }))
    .filter((p) => p.f)
    .map((p) => ({ foto: p.f!, alt: p.didascalia || campo(g, "titolo", lang), didascalia: p.didascalia || undefined }));
  const visite = campo(g, "visite", lang);

  return (
    <>
      <Titolo etichetta="Villa Sant'Angelo, Abruzzo" titolo={campo(g, "titolo", lang)} intro={campo(g, "intro", lang)} />
      {f ? (
        <figure className="contenitore" data-rivela>
          <div className="aspect-[16/10] overflow-hidden rounded-[2px] bg-carta-2 sm:aspect-[21/9]">
            <Foto foto={f} alt={campo(g, "titolo", lang)} riempi sizes="100vw" priorita className="h-full w-full" />
          </div>
        </figure>
      ) : null}
      <section className="contenitore mt-14 grid gap-10 lg:grid-cols-12">
        <div className="prosa lg:col-span-7 lg:col-start-3" data-rivela>{renderMarkdoc(testo)}</div>
      </section>
      {galleria.length ? (
        <section className="contenitore mt-20">
          <GalleriaOpera
            immagini={galleria}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            etichette={{ apri: d.apriImmagine, chiudi: d.chiudi, precedente: d.operaPrecedente, successiva: d.operaSuccessiva, immagine: d.immagine, di: d.di }}
          />
        </section>
      ) : null}
      {visite ? (
        <section className="contenitore mt-20">
          <div className="riga grid gap-6 pt-8 lg:grid-cols-12" data-rivela>
            <h2 className="etichetta lg:col-span-3">{d.visite}</h2>
            <p className="font-serif text-xl text-inchiostro-2 lg:col-span-7">{visite}</p>
          </div>
        </section>
      ) : null}
    </>
  );
}

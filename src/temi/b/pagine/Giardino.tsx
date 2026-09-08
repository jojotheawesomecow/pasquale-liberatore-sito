import { Foto } from "@/componenti/Foto";
import { getGiardino } from "@/lib/contenuti";
import { campo, t } from "@/lib/i18n";
import { foto } from "@/lib/immagini";
import { renderMarkdoc } from "@/lib/markdoc";
import type { Lang } from "@/lib/rotte";
import { NastroOpera, type Immagine } from "../componenti/NastroOpera";
import { Titolo } from "../componenti/Titolo";

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
        <div className="rivela-immagine aspect-[16/10] bg-sfondo-2 sm:aspect-[21/9]" data-rivela>
          <Foto foto={f} alt={campo(g, "titolo", lang)} riempi sizes="100vw" priorita className="h-full w-full" />
        </div>
      ) : null}
      <section className="contenitore mt-16 grid gap-10 lg:grid-cols-12">
        <div className="prosa lg:col-span-7 lg:col-start-4" data-rivela>{renderMarkdoc(testo)}</div>
      </section>
      {galleria.length ? (
        <section className="mt-20 border-y border-linea">
          <NastroOpera immagini={galleria} etichette={{ apri: d.apriImmagine, chiudi: d.chiudi, precedente: d.operaPrecedente, successiva: d.operaSuccessiva, immagine: d.immagine, di: d.di }} />
        </section>
      ) : null}
      {visite ? (
        <section className="contenitore mt-20">
          <div className="riga grid gap-6 pt-8 lg:grid-cols-12" data-rivela>
            <h2 className="mono lg:col-span-3">{d.visite}</h2>
            <p className="voce text-2xl text-testo-2 lg:col-span-7">{visite}</p>
          </div>
        </section>
      ) : null}
    </>
  );
}

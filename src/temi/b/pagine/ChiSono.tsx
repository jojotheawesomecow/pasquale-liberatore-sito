import { Foto } from "@/componenti/Foto";
import { getBio } from "@/lib/contenuti";
import { campo, t } from "@/lib/i18n";
import { foto } from "@/lib/immagini";
import { renderMarkdoc } from "@/lib/markdoc";
import type { Lang } from "@/lib/rotte";
import { testi } from "@/lib/testi";
import { righe } from "@/pagine/utili";
import { TIPI_CRONOLOGIA } from "../../../../keystatic.config";
import { Cronologia } from "../componenti/Cronologia";
import { Titolo } from "../componenti/Titolo";

export async function ChiSono({ lang }: { lang: Lang }) {
  const bio = await getBio();
  const d = t(lang);
  const x = testi(lang);
  const ritratto = foto(bio.ritratto);
  const testo = (lang === "en" && bio.testo_en?.node?.children?.length ? bio.testo_en : bio.testo)?.node;
  const interessati = righe(bio.interessati);
  const hannoScritto = righe(bio.hanno_scritto);

  return (
    <>
      <Titolo etichetta={x.artista} titolo={d.nav.chiSono} intro={campo(bio, "intro", lang)} />
      <section className="contenitore grid gap-12 lg:grid-cols-12">
        {ritratto ? (
          <figure className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rivela-immagine bg-sfondo-2" data-rivela>
              <Foto foto={ritratto} alt={bio.ritratto_didascalia || "Pasquale Liberatore"} sizes="(min-width: 1024px) 40vw, 100vw" priorita />
            </div>
            {bio.ritratto_didascalia ? <figcaption className="mono mt-3 normal-case tracking-normal">{bio.ritratto_didascalia}</figcaption> : null}
          </figure>
        ) : null}
        <div className="prosa lg:col-span-6 lg:col-start-7" data-rivela data-ritardo="1">{renderMarkdoc(testo)}</div>
      </section>

      {bio.cronologia.length ? (
        <section className="contenitore mt-32">
          <div className="riga grid gap-4 py-6 lg:grid-cols-12" data-rivela>
            <h2 className="titolo-xl lg:col-span-7">{d.cronologia}</h2>
            <p className="voce text-2xl text-testo-2 lg:col-span-5 lg:pt-3">{d.cronologiaIntro}</p>
          </div>
          <div className="mt-10">
            <Cronologia
              voci={bio.cronologia.map((v) => ({ anno: v.anno, titolo: campo(v, "titolo", lang), luogo: v.luogo ?? "", tipo: v.tipo, nota: campo(v, "nota", lang) }))}
              tipi={TIPI_CRONOLOGIA.map((tp) => ({ value: tp.value, label: d.tipiCronologia[tp.value] ?? tp.label }))}
              etichette={{ tutte: d.filtri.tutte, filtra: d.filtraCronologia, senzaData: x.senzaData }}
            />
          </div>
          <p className="mono mt-6 normal-case tracking-normal">{x.cronologiaNota}</p>
        </section>
      ) : null}

      {interessati.length || hannoScritto.length ? (
        <section className="contenitore mt-32 grid gap-12 lg:grid-cols-12">
          {interessati.length ? (
            <div className="riga pt-6 lg:col-span-4" data-rivela>
              <h2 className="mono">{d.interessati}</h2>
              <ul className="mt-6 space-y-1 font-sans text-2xl tracking-[-0.02em]">{interessati.map((n) => <li key={n}>{n}</li>)}</ul>
            </div>
          ) : null}
          {hannoScritto.length ? (
            <div className="riga pt-6 lg:col-span-8" data-rivela data-ritardo="1">
              <h2 className="mono">{d.hannoScritto}</h2>
              <ul className="mt-6 columns-2 gap-8 space-y-1 font-sans text-2xl tracking-[-0.02em] sm:columns-3">{hannoScritto.map((n) => <li key={n} className="break-inside-avoid">{n}</li>)}</ul>
            </div>
          ) : null}
        </section>
      ) : null}

      {bio.bibliografia.length ? (
        <section className="contenitore mt-32">
          <div className="riga pt-6" data-rivela>
            <h2 className="mono">{d.bibliografia}</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {bio.bibliografia.map((b, i) => (
                <li key={i} className="font-sans text-base leading-snug text-testo-2">
                  {b.url ? <a href={b.url} target="_blank" rel="noopener noreferrer" className="underline decoration-linea underline-offset-4 transition-colors hover:text-testo hover:decoration-accento">{b.testo}</a> : b.testo}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}

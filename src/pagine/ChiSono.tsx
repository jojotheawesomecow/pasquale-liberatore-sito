import { Cronologia } from "@/componenti/Cronologia";
import { Foto } from "@/componenti/Foto";
import { Titolo } from "@/componenti/Titolo";
import { TIPI_CRONOLOGIA } from "../../keystatic.config";
import { getBio } from "@/lib/contenuti";
import { campo, t } from "@/lib/i18n";
import { foto } from "@/lib/immagini";
import { renderMarkdoc } from "@/lib/markdoc";
import type { Lang } from "@/lib/rotte";
import { testi } from "@/lib/testi";
import { righe } from "./utili";

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

      <section className="contenitore grid gap-12 lg:grid-cols-12 lg:gap-16">
        {ritratto ? (
          <figure className="lg:col-span-5" data-rivela>
            <Foto foto={ritratto} alt={bio.ritratto_didascalia || "Pasquale Liberatore"} sizes="(min-width: 1024px) 40vw, 100vw" priorita className="rounded-[2px] bg-carta-2" />
            {bio.ritratto_didascalia ? <figcaption className="mt-3 font-sans text-xs text-pietra-2">{bio.ritratto_didascalia}</figcaption> : null}
          </figure>
        ) : null}
        <div className="prosa lg:col-span-7" data-rivela data-ritardo="1">
          {renderMarkdoc(testo)}
        </div>
      </section>

      {bio.cronologia.length ? (
        <section className="contenitore mt-24 sm:mt-32">
          <div className="riga grid gap-4 pb-10 pt-6 lg:grid-cols-12" data-rivela>
            <h2 className="titolo-sezione lg:col-span-7">{d.cronologia}</h2>
            <p className="font-serif text-lg text-inchiostro-2 lg:col-span-5 lg:pt-3">{d.cronologiaIntro}</p>
          </div>
          <Cronologia
            voci={bio.cronologia.map((v) => ({ anno: v.anno, titolo: campo(v, "titolo", lang), luogo: v.luogo ?? "", tipo: v.tipo, nota: campo(v, "nota", lang) }))}
            tipi={TIPI_CRONOLOGIA.map((tp) => ({ value: tp.value, label: d.tipiCronologia[tp.value] ?? tp.label }))}
            etichette={{ tutte: d.filtri.tutte, filtra: d.filtraCronologia, senzaData: x.senzaData }}
          />
          <p className="mt-6 font-sans text-xs text-pietra-2">{x.cronologiaNota}</p>
        </section>
      ) : null}

      {interessati.length || hannoScritto.length ? (
        <section className="contenitore mt-24 grid gap-12 sm:mt-32 lg:grid-cols-12">
          {interessati.length ? (
            <div className="riga pt-6 lg:col-span-4" data-rivela>
              <h2 className="etichetta">{d.interessati}</h2>
              <ul className="mt-5 space-y-1.5 font-serif text-xl">
                {interessati.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </div>
          ) : null}
          {hannoScritto.length ? (
            <div className="riga pt-6 lg:col-span-8" data-rivela data-ritardo="1">
              <h2 className="etichetta">{d.hannoScritto}</h2>
              <ul className="mt-5 columns-2 gap-8 space-y-1.5 font-serif text-xl sm:columns-3">
                {hannoScritto.map((n) => <li key={n} className="break-inside-avoid">{n}</li>)}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      {bio.bibliografia.length ? (
        <section className="contenitore mt-24 sm:mt-32">
          <div className="riga pt-6" data-rivela>
            <h2 className="etichetta">{d.bibliografia}</h2>
            <ul className="mt-5 grid gap-4 md:grid-cols-2">
              {bio.bibliografia.map((b, i) => (
                <li key={i} className="font-serif text-lg leading-snug text-inchiostro-2">
                  {b.url ? (
                    <a href={b.url} target="_blank" rel="noopener noreferrer" className="link-sottile hover:text-muschio">{b.testo}</a>
                  ) : (
                    b.testo
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}

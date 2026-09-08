import Link from "next/link";
import { Foto } from "@/componenti/Foto";
import { TestoRivela } from "@/componenti/TestoRivela";
import { VideoEmbed } from "@/componenti/VideoEmbed";
import { getGiardino, getHome, getImpostazioni, getOpere, getRiflessioni, getVideo, youtubeId } from "@/lib/contenuti";
import { campo, t } from "@/lib/i18n";
import { foto } from "@/lib/immagini";
import { url, type Lang } from "@/lib/rotte";
import { testi } from "@/lib/testi";
import { schedaOpera } from "@/pagine/utili";
import { Nastro } from "../componenti/Nastro";

const POSIZIONI = [
  "lg:col-span-7 lg:col-start-1",
  "lg:col-span-4 lg:col-start-9 lg:mt-48",
  "lg:col-span-5 lg:col-start-2 lg:-mt-24",
  "lg:col-span-6 lg:col-start-7 lg:mt-20",
  "lg:col-span-8 lg:col-start-1",
  "lg:col-span-4 lg:col-start-9 lg:mt-40",
];

export async function Home({ lang }: { lang: Lang }) {
  const [home, opere, riflessioni, giardino, video, impostazioni] = await Promise.all([getHome(), getOpere(), getRiflessioni(), getGiardino(), getVideo(), getImpostazioni()]);
  const d = t(lang);
  const x = testi(lang);
  const hero = foto(home.immagine);
  const inEvidenza = opere.filter((o) => o.in_evidenza);
  const evidenza = (inEvidenza.length >= 3 ? inEvidenza : opere).slice(0, 6).map((o) => schedaOpera(o, lang));
  const manifesto = riflessioni.find((r) => r.slug === "i-semi-sono-il-territorio") ?? riflessioni[0];
  const fotoGiardino = foto(giardino.immagine);
  const videoHome = video.filter((v) => youtubeId(v.url)).slice(0, 2);
  const titolo = campo(home, "titolo", lang);
  const testo = campo(home, "testo", lang);
  const presentazione = campo(home, "presentazione", lang);
  const citazione = campo(home, "citazione", lang);

  return (
    <>
      {/* Apertura a tutto schermo */}
      <section className="relative -mt-16 h-[100svh] max-h-[1150px] min-h-[640px] overflow-hidden">
        {hero ? <Foto foto={hero} alt={home.immagine_didascalia || impostazioni.nome} riempi priorita sizes="100vw" className="absolute inset-0 h-full w-full" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-sfondo via-sfondo/10 to-sfondo/50" aria-hidden="true" />
        <div className="contenitore absolute inset-x-0 bottom-0 pb-8 sm:pb-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="titolo-xxl pagina-entra">
              Pasquale
              <br />
              Liberatore
            </h1>
            <div className="max-w-xs lg:pb-4 lg:text-right">
              <p className="mono text-testo">{d.ruolo}</p>
              {home.immagine_didascalia ? <p className="mono mt-2 normal-case tracking-normal">{home.immagine_didascalia}</p> : null}
              <p className="mono mt-6 hidden lg:block" aria-hidden="true">{d.scorri} ↓</p>
            </div>
          </div>
        </div>
      </section>

      <Nastro voci={x.nastro.materiali} etichetta={x.nastro.materie} variante="mono" className="border-y border-linea py-4 sm:py-5" durata={72} />

      {/* Dichiarazione */}
      <section className="contenitore py-24 sm:py-36">
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="mono lg:col-span-2" data-rivela>{d.manifesto}</p>
          <div className="lg:col-span-10">
            <TestoRivela testo={titolo} come="h2" className="voce text-[clamp(2.6rem,7.5vw,8rem)] leading-[0.98]" passo={90} />
            {testo ? <p className="mt-8 max-w-2xl font-sans text-lg text-testo-2 sm:text-xl" data-rivela data-ritardo="2">{testo}</p> : null}
            {presentazione ? <p className="prosa mt-12" data-rivela data-ritardo="3">{presentazione}</p> : null}
          </div>
        </div>
      </section>

      {/* Opere in evidenza, disposizione sfalsata */}
      <section className="contenitore">
        <div className="riga flex items-end justify-between py-5" data-rivela>
          <h2 className="mono text-testo">{d.inEvidenza}</h2>
          <Link href={url(lang, "opere")} className="mono text-testo transition-colors hover:text-accento">{d.tutteLeOpere} →</Link>
        </div>
        <ul className="mt-12 grid gap-x-6 gap-y-20 lg:grid-cols-12">
          {evidenza.map((o, i) => (
            <li key={o.slug} className={POSIZIONI[i % POSIZIONI.length]}>
              <Link href={o.href} className="group block" data-cursore="zoom">
                {o.foto ? (
                  <div className="rivela-immagine overflow-hidden bg-sfondo-2" data-rivela>
                    <Foto foto={o.foto} alt={o.titolo} sizes="(min-width: 1024px) 60vw, 100vw" imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]" />
                  </div>
                ) : null}
                <div className="mt-4 flex items-start justify-between gap-6">
                  <div>
                    <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="titolo-l mt-1 transition-colors group-hover:text-accento">{o.titolo}</h3>
                  </div>
                  <p className="mono mt-1 shrink-0 text-right normal-case tracking-normal">
                    {o.anno}
                    <br />
                    <span className="text-testo-3">{o.dettaglio}</span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Citazione dal manifesto */}
      {citazione ? (
        <section className="mt-32 border-y border-linea bg-sfondo-2">
          <div className="contenitore grid gap-10 py-24 sm:py-32 lg:grid-cols-12">
            <p className="mono lg:col-span-2" data-rivela>{d.manifesto}</p>
            <blockquote className="lg:col-span-10">
              <TestoRivela testo={citazione} come="p" className="voce text-[clamp(1.9rem,4.6vw,4.8rem)] leading-[1.02]" passo={35} />
              <footer className="mt-10 flex flex-wrap items-center gap-8">
                {home.citazione_fonte ? <cite className="mono not-italic">«{home.citazione_fonte}»</cite> : null}
                {manifesto ? <Link href={url(lang, "riflessioni", manifesto.slug)} className="bottone">{d.vaiAlManifesto} →</Link> : null}
              </footer>
            </blockquote>
          </div>
        </section>
      ) : null}

      {/* Il giardino: schermo diviso */}
      {impostazioni.mostra_giardino ? (
        <section className="grid lg:grid-cols-2">
          {fotoGiardino ? (
            <div className="rivela-immagine aspect-[4/5] bg-sfondo-2 lg:aspect-auto lg:min-h-[80svh]" data-rivela>
              <Foto foto={fotoGiardino} alt={campo(giardino, "titolo", lang)} riempi sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full" />
            </div>
          ) : null}
          <div className="contenitore flex flex-col justify-center py-16 lg:py-24">
            <p className="mono" data-rivela>{d.ilGiardino}</p>
            <h2 className="titolo-xl mt-4" data-rivela data-ritardo="1">{campo(giardino, "titolo", lang)}</h2>
            {campo(giardino, "intro", lang) ? <p className="voce mt-6 max-w-xl text-2xl text-testo-2 sm:text-3xl" data-rivela data-ritardo="2">{campo(giardino, "intro", lang)}</p> : null}
            <Link href={url(lang, "giardino")} className="bottone mt-10 self-start" data-rivela data-ritardo="3">{d.leggiTutto} →</Link>
          </div>
        </section>
      ) : null}

      {/* Video */}
      {impostazioni.mostra_video && videoHome.length > 0 ? (
        <section className="contenitore mt-32">
          <div className="riga flex items-end justify-between py-5" data-rivela>
            <h2 className="mono text-testo">{d.ultimiVideo}</h2>
            <Link href={url(lang, "video")} className="mono text-testo transition-colors hover:text-accento">{d.tuttiIVideo} →</Link>
          </div>
          <ul className="mt-10 grid gap-6 lg:grid-cols-2">
            {videoHome.map((v, i) => (
              <li key={v.slug} data-rivela data-ritardo={String(i)}>
                <VideoEmbed id={youtubeId(v.url)!} titolo={campo(v, "titolo", lang)} riproduci={d.riproduci} />
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-sans text-xl font-medium tracking-[-0.02em]">{campo(v, "titolo", lang)}</h3>
                  {v.anno ? <span className="mono">{v.anno}</span> : null}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}

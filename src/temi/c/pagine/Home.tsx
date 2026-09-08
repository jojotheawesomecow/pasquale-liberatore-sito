import Link from "next/link";
import { Foto } from "@/componenti/Foto";
import { TestoRivela } from "@/componenti/TestoRivela";
import { VideoEmbed } from "@/componenti/VideoEmbed";
import { getGiardino, getHome, getImpostazioni, getOpere, getRiflessioni, getVideo, youtubeId } from "@/lib/contenuti";
import { campo, t } from "@/lib/i18n";
import { foto } from "@/lib/immagini";
import { url, type Lang } from "@/lib/rotte";
import { schedaOpera } from "@/pagine/utili";

export async function Home({ lang }: { lang: Lang }) {
  const [home, opere, riflessioni, giardino, video, impostazioni] = await Promise.all([getHome(), getOpere(), getRiflessioni(), getGiardino(), getVideo(), getImpostazioni()]);
  const d = t(lang);
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
      {/* Immagine di apertura a tutta larghezza */}
      {hero ? (
        <section>
          <div className="rivela-immagine dall-alto aspect-[16/10] max-h-[82svh] bg-sfondo-2 sm:aspect-[21/9]" data-rivela>
            <Foto foto={hero} alt={home.immagine_didascalia || impostazioni.nome} riempi priorita sizes="100vw" className="h-full w-full" />
          </div>
          {home.immagine_didascalia ? <p className="contenitore mono mt-3 normal-case tracking-normal">{home.immagine_didascalia}</p> : null}
        </section>
      ) : null}

      {/* Nome e dichiarazione */}
      <section className="contenitore grid gap-10 py-16 sm:py-24 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="mono" data-rivela>{d.ruolo}</p>
          <h1 className="titolo-xxl mt-4 pagina-entra">
            Pasquale
            <br />
            Liberatore
          </h1>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-3">
          <TestoRivela testo={titolo} come="h2" className="voce text-[clamp(2rem,4.2vw,4.2rem)] leading-[1.02]" passo={80} />
          {testo ? <p className="mt-6 max-w-xl font-sans text-lg text-testo-2" data-rivela data-ritardo="2">{testo}</p> : null}
          {presentazione ? <p className="prosa mt-10" data-rivela data-ritardo="3">{presentazione}</p> : null}
          <div className="mt-8 flex flex-wrap gap-3" data-rivela data-ritardo="3">
            <Link href={url(lang, "opere")} className="bottone bottone-pieno">{d.scopriOpere} →</Link>
            <Link href={url(lang, "chiSono")} className="bottone">{d.nav.chiSono}</Link>
          </div>
        </div>
      </section>

      {/* Opere in evidenza: griglia a tutta larghezza */}
      <section>
        <div className="contenitore riga flex items-end justify-between py-5" data-rivela>
          <h2 className="mono text-testo">{d.inEvidenza}</h2>
          <Link href={url(lang, "opere")} className="font-sans text-sm text-testo underline decoration-accento underline-offset-4 hover:text-accento">{d.tutteLeOpere} →</Link>
        </div>
        <ul className="griglia-c border-y border-linea">
          {evidenza.map((o, i) => (
            <li key={o.slug} data-rivela data-ritardo={String(i % 3)}>
              <Link href={o.href} className="scheda-c">
                <div className="scheda-immagine">{o.foto ? <Foto foto={o.foto} alt={o.titolo} riempi sizes="(min-width: 1536px) 25vw, (min-width: 768px) 33vw, 50vw" className="h-full w-full" /> : null}</div>
                <div className="scheda-riga">
                  <span className="scheda-titolo">{o.titolo}</span>
                  {o.anno ? <span className="mono shrink-0">{o.anno}</span> : null}
                </div>
                <p className="mt-1 font-sans text-[0.8rem] text-testo-3">{[o.categoriaLabel, o.dettaglio].filter(Boolean).join(" · ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Citazione */}
      {citazione ? (
        <section className="mt-28 bg-sfondo-2">
          <div className="contenitore grid gap-10 py-24 sm:py-32 lg:grid-cols-12">
            <p className="mono lg:col-span-2" data-rivela>{d.manifesto}</p>
            <blockquote className="lg:col-span-9">
              <TestoRivela testo={citazione} come="p" className="voce text-[clamp(1.9rem,4.4vw,4.6rem)] leading-[1.05]" passo={35} />
              <footer className="mt-10 flex flex-wrap items-center gap-8">
                {home.citazione_fonte ? <cite className="mono not-italic">«{home.citazione_fonte}»</cite> : null}
                {manifesto ? <Link href={url(lang, "riflessioni", manifesto.slug)} className="bottone">{d.vaiAlManifesto} →</Link> : null}
              </footer>
            </blockquote>
          </div>
        </section>
      ) : null}

      {/* Il giardino */}
      {impostazioni.mostra_giardino ? (
        <section className="grid lg:grid-cols-2">
          {fotoGiardino ? (
            <div className="rivela-immagine aspect-[4/5] bg-sfondo-2 lg:aspect-auto lg:min-h-[75svh]" data-rivela>
              <Foto foto={fotoGiardino} alt={campo(giardino, "titolo", lang)} riempi sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full" />
            </div>
          ) : null}
          <div className="contenitore flex flex-col justify-center py-16 lg:py-24">
            <p className="mono" data-rivela>{d.ilGiardino}</p>
            <h2 className="titolo-xl mt-4" data-rivela data-ritardo="1">{campo(giardino, "titolo", lang)}</h2>
            {campo(giardino, "intro", lang) ? <p className="prosa mt-6" data-rivela data-ritardo="2">{campo(giardino, "intro", lang)}</p> : null}
            <Link href={url(lang, "giardino")} className="bottone mt-10 self-start" data-rivela data-ritardo="3">{d.leggiTutto} →</Link>
          </div>
        </section>
      ) : null}

      {/* Video */}
      {impostazioni.mostra_video && videoHome.length > 0 ? (
        <section className="contenitore mt-28">
          <div className="riga flex items-end justify-between py-5" data-rivela>
            <h2 className="mono text-testo">{d.ultimiVideo}</h2>
            <Link href={url(lang, "video")} className="font-sans text-sm text-testo underline decoration-accento underline-offset-4 hover:text-accento">{d.tuttiIVideo} →</Link>
          </div>
          <ul className="mt-8 grid gap-6 lg:grid-cols-2">
            {videoHome.map((v, i) => (
              <li key={v.slug} data-rivela data-ritardo={String(i)}>
                <VideoEmbed id={youtubeId(v.url)!} titolo={campo(v, "titolo", lang)} riproduci={d.riproduci} />
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="titolo-l">{campo(v, "titolo", lang)}</h3>
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

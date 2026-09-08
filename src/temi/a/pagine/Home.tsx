import Link from "next/link";
import { Foto } from "@/componenti/Foto";
import { Seme } from "@/temi/a/componenti/Seme";
import { VideoEmbed } from "@/componenti/VideoEmbed";
import { getGiardino, getHome, getImpostazioni, getOpere, getRiflessioni, getVideo, youtubeId } from "@/lib/contenuti";
import { campo, t } from "@/lib/i18n";
import { foto } from "@/lib/immagini";
import { url, type Lang } from "@/lib/rotte";
import { schedaOpera } from "@/pagine/utili";

export async function Home({ lang }: { lang: Lang }) {
  const [home, opere, riflessioni, giardino, video, impostazioni] = await Promise.all([
    getHome(),
    getOpere(),
    getRiflessioni(),
    getGiardino(),
    getVideo(),
    getImpostazioni(),
  ]);
  const d = t(lang);
  const hero = foto(home.immagine);
  const evidenza = (opere.filter((o) => o.in_evidenza).length >= 3 ? opere.filter((o) => o.in_evidenza) : opere).slice(0, 6).map((o) => schedaOpera(o, lang));
  const manifesto = riflessioni.find((r) => r.slug === "i-semi-sono-il-territorio") ?? riflessioni[0];
  const fotoGiardino = foto(giardino.immagine);
  const videoHome = video.filter((v) => youtubeId(v.url)).slice(0, 2);
  const titolo = campo(home, "titolo", lang);
  const testo = campo(home, "testo", lang);
  const presentazione = campo(home, "presentazione", lang);
  const citazione = campo(home, "citazione", lang);

  return (
    <>
      {/* Apertura */}
      <section className="contenitore pt-6 sm:pt-10 lg:pt-14">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="order-2 lg:order-1 lg:col-span-5 lg:pb-6">
            <h1 className="titolo-display" data-rivela>{titolo}</h1>
            {testo ? (
              <p className="prosa mt-6 max-w-md" data-rivela data-ritardo="2">{testo}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3" data-rivela data-ritardo="3">
              <Link href={url(lang, "opere")} className="link-freccia"><span>{d.scopriOpere}</span><span aria-hidden="true">→</span></Link>
              <Link href={url(lang, "chiSono")} className="link-freccia text-inchiostro-2"><span>{d.nav.chiSono}</span><span aria-hidden="true">→</span></Link>
            </div>
          </div>
          {hero ? (
            <figure className="order-1 lg:order-2 lg:col-span-7" data-rivela>
              <Foto foto={hero} alt={home.immagine_didascalia || d.nav.home} sizes="(min-width: 1024px) 58vw, 100vw" priorita className="rounded-[2px] bg-carta-2" />
              {home.immagine_didascalia ? <figcaption className="mt-3 font-sans text-xs text-pietra-2">{home.immagine_didascalia}</figcaption> : null}
            </figure>
          ) : null}
        </div>
      </section>

      {/* Presentazione */}
      {presentazione ? (
        <section className="contenitore mt-20 sm:mt-28">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-2" data-rivela><Seme className="text-muschio-2" size={44} /></div>
            <p className="prosa prosa-lg lg:col-span-8" data-rivela data-ritardo="1">{presentazione}</p>
          </div>
        </section>
      ) : null}

      {/* Opere in evidenza */}
      <section className="contenitore mt-24 sm:mt-32">
        <div className="riga flex items-end justify-between pb-10 pt-6" data-rivela>
          <h2 className="titolo-sezione">{d.inEvidenza}</h2>
          <Link href={url(lang, "opere")} className="link-freccia hidden sm:inline-flex"><span>{d.tutteLeOpere}</span><span aria-hidden="true">→</span></Link>
        </div>
        <ul className="columns-1 gap-8 sm:columns-2 lg:columns-3">
          {evidenza.map((o, i) => (
            <li key={o.slug} className="mb-10 break-inside-avoid" data-rivela data-ritardo={String(i % 3)}>
              <Link href={o.href} className="group block">
                {o.foto ? (
                  <div className="overflow-hidden rounded-[2px] bg-carta-2">
                    <Foto foto={o.foto} alt={o.titolo} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.025]" />
                  </div>
                ) : null}
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-[1.35rem] leading-tight tracking-tight transition-colors group-hover:text-muschio">{o.titolo}</h3>
                  {o.anno ? <span className="shrink-0 font-sans text-sm text-pietra-2">{o.anno}</span> : null}
                </div>
                <p className="mt-1 font-sans text-[0.82rem] text-pietra-2">{[o.categoriaLabel, o.dettaglio].filter(Boolean).join(" · ")}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={url(lang, "opere")} className="link-freccia mt-10 sm:hidden"><span>{d.tutteLeOpere}</span><span aria-hidden="true">→</span></Link>
      </section>

      {/* Citazione dal manifesto */}
      {citazione ? (
        <section className="mt-24 bg-ardesia text-carta sm:mt-32">
          <div className="contenitore grid gap-10 py-20 sm:py-28 lg:grid-cols-12">
            <div className="lg:col-span-2" data-rivela>
              <p className="etichetta text-pietra">{d.manifesto}</p>
            </div>
            <blockquote className="lg:col-span-9" data-rivela data-ritardo="1">
              <p className="font-serif text-3xl font-light leading-[1.15] tracking-tight sm:text-4xl lg:text-[3.4rem]">{citazione}</p>
              <footer className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
                {home.citazione_fonte ? <cite className="font-sans text-sm not-italic text-pietra">«{home.citazione_fonte}»</cite> : null}
                {manifesto ? (
                  <Link href={url(lang, "riflessioni", manifesto.slug)} className="link-freccia text-carta"><span>{d.vaiAlManifesto}</span><span aria-hidden="true">→</span></Link>
                ) : null}
              </footer>
            </blockquote>
          </div>
        </section>
      ) : null}

      {/* Il giardino */}
      {impostazioni.mostra_giardino ? (
        <section className="contenitore mt-24 sm:mt-32">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            {fotoGiardino ? (
              <div className="lg:col-span-5" data-rivela>
                <div className="aspect-[4/5] overflow-hidden rounded-[2px] bg-carta-2">
                  <Foto foto={fotoGiardino} alt={campo(giardino, "titolo", lang)} riempi sizes="(min-width: 1024px) 40vw, 100vw" className="h-full w-full" />
                </div>
              </div>
            ) : null}
            <div className="lg:col-span-6 lg:col-start-7" data-rivela data-ritardo="1">
              <p className="etichetta">{d.ilGiardino}</p>
              <h2 className="titolo-sezione mt-4">{campo(giardino, "titolo", lang)}</h2>
              {campo(giardino, "intro", lang) ? <p className="prosa mt-6">{campo(giardino, "intro", lang)}</p> : null}
              <Link href={url(lang, "giardino")} className="link-freccia mt-8"><span>{d.leggiTutto}</span><span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* Video */}
      {impostazioni.mostra_video && videoHome.length > 0 ? (
        <section className="contenitore mt-24 sm:mt-32">
          <div className="riga flex items-end justify-between pb-10 pt-6" data-rivela>
            <h2 className="titolo-sezione">{d.ultimiVideo}</h2>
            <Link href={url(lang, "video")} className="link-freccia hidden sm:inline-flex"><span>{d.tuttiIVideo}</span><span aria-hidden="true">→</span></Link>
          </div>
          <ul className="grid gap-8 lg:grid-cols-2">
            {videoHome.map((v, i) => (
              <li key={v.slug} data-rivela data-ritardo={String(i)}>
                <VideoEmbed id={youtubeId(v.url)!} titolo={campo(v, "titolo", lang)} riproduci={d.riproduci} />
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-[1.35rem] leading-tight tracking-tight">{campo(v, "titolo", lang)}</h3>
                  {v.anno ? <span className="font-sans text-sm text-pietra-2">{v.anno}</span> : null}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Contatti */}
      <section className="contenitore mt-24 sm:mt-32">
        <div className="riga grid gap-8 pt-10 lg:grid-cols-12" data-rivela>
          <h2 className="titolo-sezione lg:col-span-7">{d.contattiIntro}</h2>
          <div className="flex flex-col items-start gap-4 lg:col-span-5 lg:items-end lg:justify-center">
            <Link href={url(lang, "contatti")} className="inline-flex h-12 items-center rounded-full bg-inchiostro px-7 font-sans text-sm tracking-[0.02em] text-carta transition-colors hover:bg-muschio">
              {d.scrivi}
            </Link>
            {impostazioni.instagram ? (
              <a href={impostazioni.instagram} target="_blank" rel="noopener noreferrer" className="link-freccia text-inchiostro-2"><span>{d.seguiInstagram}</span><span aria-hidden="true">↗</span></a>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}

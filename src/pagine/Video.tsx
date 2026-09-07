import { Titolo } from "@/componenti/Titolo";
import { VideoEmbed } from "@/componenti/VideoEmbed";
import { getVideo, youtubeId } from "@/lib/contenuti";
import { campo, t } from "@/lib/i18n";
import type { Lang } from "@/lib/rotte";
import { paragrafi } from "./utili";

export async function Video({ lang }: { lang: Lang }) {
  const video = (await getVideo()).filter((v) => youtubeId(v.url));
  const d = t(lang);
  return (
    <>
      <Titolo etichetta="Pasquale Liberatore" titolo={d.nav.video} intro={d.videoIntro} />
      <ul className="contenitore grid gap-x-8 gap-y-14 lg:grid-cols-2">
        {video.map((v, i) => (
          <li key={v.slug} data-rivela data-ritardo={String(i % 2)}>
            <VideoEmbed id={youtubeId(v.url)!} titolo={campo(v, "titolo", lang)} riproduci={d.riproduci} />
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h2 className="font-serif text-2xl leading-tight tracking-tight">{campo(v, "titolo", lang)}</h2>
              {v.anno ? <span className="shrink-0 font-sans text-sm text-pietra-2">{v.anno}</span> : null}
            </div>
            {paragrafi(campo(v, "descrizione", lang)).map((p, k) => (
              <p key={k} className="mt-3 font-serif text-lg text-inchiostro-2">{p}</p>
            ))}
            <a href={v.url ?? "#"} target="_blank" rel="noopener noreferrer" className="link-freccia mt-4 text-inchiostro-2"><span>{d.guardaSuYoutube}</span><span aria-hidden="true">↗</span></a>
          </li>
        ))}
      </ul>
    </>
  );
}

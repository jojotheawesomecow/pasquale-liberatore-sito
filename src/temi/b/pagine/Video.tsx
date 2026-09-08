import { VideoEmbed } from "@/componenti/VideoEmbed";
import { getVideo, youtubeId } from "@/lib/contenuti";
import { campo, t } from "@/lib/i18n";
import type { Lang } from "@/lib/rotte";
import { paragrafi } from "@/pagine/utili";
import { Titolo } from "../componenti/Titolo";

export async function Video({ lang }: { lang: Lang }) {
  const video = (await getVideo()).filter((v) => youtubeId(v.url));
  const d = t(lang);
  return (
    <>
      <Titolo etichetta="Pasquale Liberatore" titolo={d.nav.video} intro={d.videoIntro} numero={String(video.length).padStart(2, "0")} />
      <ul className="contenitore grid gap-x-6 gap-y-16 lg:grid-cols-2">
        {video.map((v, i) => (
          <li key={v.slug} data-rivela data-ritardo={String(i % 2)}>
            <VideoEmbed id={youtubeId(v.url)!} titolo={campo(v, "titolo", lang)} riproduci={d.riproduci} />
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h2 className="font-sans text-2xl font-medium tracking-[-0.02em]">{campo(v, "titolo", lang)}</h2>
              {v.anno ? <span className="mono shrink-0">{v.anno}</span> : null}
            </div>
            {paragrafi(campo(v, "descrizione", lang)).map((p, k) => <p key={k} className="prosa mt-3">{p}</p>)}
            <a href={v.url ?? "#"} target="_blank" rel="noopener noreferrer" className="mono mt-4 inline-block transition-colors hover:text-accento">{d.guardaSuYoutube} ↗</a>
          </li>
        ))}
      </ul>
    </>
  );
}

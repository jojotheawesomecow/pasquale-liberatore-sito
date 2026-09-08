import Link from "next/link";
import { Foto } from "@/componenti/Foto";
import { Titolo } from "@/temi/a/componenti/Titolo";
import { getImpostazioni, getRiflessioni } from "@/lib/contenuti";
import { campo, t } from "@/lib/i18n";
import { foto } from "@/lib/immagini";
import { url, type Lang } from "@/lib/rotte";
import { testi } from "@/lib/testi";
import { formattaData } from "@/pagine/utili";

export async function Riflessioni({ lang }: { lang: Lang }) {
  const [riflessioni, impostazioni] = await Promise.all([getRiflessioni(), getImpostazioni()]);
  const d = t(lang);
  const x = testi(lang);
  const ordinate = [...riflessioni].sort((a, b) => (a.ordine ?? 1e9) - (b.ordine ?? 1e9) || (b.data ?? "").localeCompare(a.data ?? ""));

  return (
    <>
      <Titolo etichetta="Pasquale Liberatore" titolo={d.nav.riflessioni} intro={d.riflessioniIntro} />
      <ul className="contenitore grid gap-16 sm:gap-20">
        {ordinate.map((r, i) => {
          const f = foto(r.immagine);
          const href = url(lang, "riflessioni", r.slug);
          const titolo = campo(r, "titolo", lang);
          return (
            <li key={r.slug} className="riga grid gap-8 pt-10 lg:grid-cols-12 lg:gap-12" data-rivela>
              {f ? (
                <Link href={href} className="group block overflow-hidden rounded-[2px] bg-carta-2 lg:col-span-5">
                  <Foto foto={f} alt={titolo} sizes="(min-width: 1024px) 40vw, 100vw" priorita={i === 0} imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.025]" />
                </Link>
              ) : null}
              <div className={f ? "lg:col-span-7" : "lg:col-span-12"}>
                {r.data ? <p className="etichetta">{formattaData(r.data, lang)}</p> : null}
                <h2 className="titolo-sezione mt-3"><Link href={href} className="transition-colors hover:text-muschio">{titolo}</Link></h2>
                {campo(r, "estratto", lang) ? <p className="prosa mt-5 max-w-2xl">{campo(r, "estratto", lang)}</p> : null}
                <Link href={href} className="link-freccia mt-7"><span>{d.leggi}</span><span aria-hidden="true">→</span></Link>
              </div>
            </li>
          );
        })}
      </ul>
      {impostazioni.instagram ? (
        <p className="contenitore mt-20 font-serif text-xl text-inchiostro-2">
          {x.riflessioniNota}{" "}
          <a href={impostazioni.instagram} target="_blank" rel="noopener noreferrer" className="link-sottile text-muschio">{d.seguiInstagram} ↗</a>
        </p>
      ) : null}
    </>
  );
}

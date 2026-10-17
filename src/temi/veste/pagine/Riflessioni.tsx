import Link from "next/link";
import { Foto } from "@/componenti/Foto";
import { getImpostazioni, getRiflessioni } from "@/lib/contenuti";
import { campo, t } from "@/lib/i18n";
import { foto } from "@/lib/immagini";
import { url, type Lang } from "@/lib/rotte";
import { testi } from "@/lib/testi";
import { formattaData } from "@/pagine/utili";
import { Titolo } from "../componenti/Titolo";

export async function Riflessioni({ lang }: { lang: Lang }) {
  const [riflessioni, impostazioni] = await Promise.all([getRiflessioni(), getImpostazioni()]);
  const d = t(lang);
  const x = testi(lang);
  const ordinate = [...riflessioni].sort((a, b) => (a.ordine ?? 1e9) - (b.ordine ?? 1e9) || (b.data ?? "").localeCompare(a.data ?? ""));
  return (
    <>
      <Titolo etichetta="Pasquale Liberatore" titolo={d.nav.riflessioni} intro={d.riflessioniIntro} numero={String(ordinate.length).padStart(2, "0")} />
      <ul className="contenitore">
        {ordinate.map((r, i) => {
          const f = foto(r.immagine);
          const href = url(lang, "riflessioni", r.slug);
          const titolo = campo(r, "titolo", lang);
          return (
            <li key={r.slug} className="riga grid gap-8 py-12 lg:grid-cols-12 lg:gap-12" data-rivela>
              <p className="mono lg:col-span-2">
                {String(i + 1).padStart(2, "0")}
                {r.data ? <><br />{formattaData(r.data, lang)}</> : null}
              </p>
              <div className={f ? "lg:col-span-5" : "lg:col-span-10"}>
                <h2 className="voce text-[clamp(2rem,4.5vw,4.5rem)] leading-[1]"><Link href={href} className="transition-colors hover:text-accento">{titolo}</Link></h2>
                {campo(r, "estratto", lang) ? <p className="prosa mt-6">{campo(r, "estratto", lang)}</p> : null}
                <Link href={href} className="bottone mt-8">{d.leggi} →</Link>
              </div>
              {f ? (
                <Link href={href} className="group block overflow-hidden bg-sfondo-2 lg:col-span-5" data-cursore="zoom">
                  <Foto foto={f} alt={titolo} sizes="(min-width: 1024px) 40vw, 100vw" priorita={i === 0} imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]" />
                </Link>
              ) : null}
            </li>
          );
        })}
      </ul>
      {impostazioni.instagram ? (
        <p className="contenitore mt-16 font-sans text-lg text-testo-2">
          {x.riflessioniNota}{" "}
          <a href={impostazioni.instagram} target="_blank" rel="noopener noreferrer" className="text-testo underline decoration-accento underline-offset-4">{d.seguiInstagram} ↗</a>
        </p>
      ) : null}
    </>
  );
}

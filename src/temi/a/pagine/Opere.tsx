import { OpereGriglia } from "@/temi/a/componenti/OpereGriglia";
import { Titolo } from "@/temi/a/componenti/Titolo";
import Link from "next/link";
import { getOpere, getOpereSelezionate } from "@/lib/contenuti";
import { t } from "@/lib/i18n";
import { url, type Lang } from "@/lib/rotte";
import { testi } from "@/lib/testi";
import { categoriePresenti, schedaOpera } from "@/pagine/utili";

export async function Opere({ lang }: { lang: Lang }) {
  const opere = await getOpereSelezionate();
  const tutte = (await getOpere()).length;
  const d = t(lang);
  const x = testi(lang);
  return (
    <>
      <Titolo etichetta="Pasquale Liberatore" titolo={d.nav.opere} intro={x.opereIntro} />
      <OpereGriglia
        opere={opere.map((o) => schedaOpera(o, lang))}
        categorie={categoriePresenti(opere, lang)}
        etichette={{ ...d.filtri, senzaTitolo: d.senzaTitolo, cerca: d.cerca, cercaSuggerimento: d.cercaSuggerimento, mostraAltri: d.mostraAltri, mostraTutte: d.mostraTutte, nessunRisultato: d.nessunRisultato }}
      />
      <section className="contenitore riga mt-20 grid gap-6 pt-8 lg:grid-cols-12">
        <h2 className="etichetta lg:col-span-3">{d.nav.archivio}</h2>
        <div className="lg:col-span-7">
          <p className="prosa">{d.archivioIntro}</p>
          <Link href={url(lang, "archivio")} className="link-freccia mt-6"><span>{d.nav.archivio} ({tutte})</span><span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </>
  );
}

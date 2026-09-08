import Link from "next/link";
import { getOpere, getOpereSelezionate } from "@/lib/contenuti";
import { t } from "@/lib/i18n";
import { url, type Lang } from "@/lib/rotte";
import { testi } from "@/lib/testi";
import { categoriePresenti, schedaOpera } from "@/pagine/utili";
import { GrigliaOpere } from "../componenti/GrigliaOpere";
import { Titolo } from "../componenti/Titolo";

export async function Opere({ lang }: { lang: Lang }) {
  const opere = await getOpereSelezionate();
  const tutte = (await getOpere()).length;
  const d = t(lang);
  const x = testi(lang);
  return (
    <>
      <Titolo etichetta="Pasquale Liberatore" titolo={d.nav.opere} intro={x.opereIntro} numero={String(opere.length).padStart(2, "0")} />
      <GrigliaOpere
        opere={opere.map((o) => schedaOpera(o, lang))}
        categorie={categoriePresenti(opere, lang)}
        etichette={{ ...d.filtri, griglia: d.vista.griglia, indice: d.vista.indice, provino: d.vista.provino, cerca: d.cerca, cercaSuggerimento: d.cercaSuggerimento, mostraAltri: d.mostraAltri, mostraTutte: d.mostraTutte, nessunRisultato: d.nessunRisultato, colonne: d.colonne }}
      />
      <section className="contenitore riga mt-20 grid gap-6 pt-8 lg:grid-cols-12">
        <h2 className="mono lg:col-span-3">{d.nav.archivio}</h2>
        <div className="lg:col-span-7">
          <p className="voce text-2xl text-testo-2">{d.archivioIntro}</p>
          <Link href={url(lang, "archivio")} className="bottone mt-6">{d.nav.archivio} ({tutte}) →</Link>
        </div>
      </section>
    </>
  );
}

import { getOpere } from "@/lib/contenuti";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/rotte";
import { testi } from "@/lib/testi";
import { categoriePresenti, schedaOpera } from "@/pagine/utili";
import { GrigliaOpere } from "../componenti/GrigliaOpere";
import { Titolo } from "../componenti/Titolo";

export async function Opere({ lang }: { lang: Lang }) {
  const opere = await getOpere();
  const d = t(lang);
  const x = testi(lang);
  return (
    <>
      <Titolo etichetta="Pasquale Liberatore" titolo={d.nav.opere} intro={x.opereIntro} numero={String(opere.length).padStart(2, "0")} />
      <GrigliaOpere
        opere={opere.map((o) => schedaOpera(o, lang))}
        categorie={categoriePresenti(opere, lang)}
        etichette={{ ...d.filtri, griglia: d.vista.griglia, indice: d.vista.indice, colonne: d.colonne }}
      />
    </>
  );
}

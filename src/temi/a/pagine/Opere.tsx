import { OpereGriglia } from "@/temi/a/componenti/OpereGriglia";
import { Titolo } from "@/temi/a/componenti/Titolo";
import { getOpere } from "@/lib/contenuti";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/rotte";
import { testi } from "@/lib/testi";
import { categoriePresenti, schedaOpera } from "@/pagine/utili";

export async function Opere({ lang }: { lang: Lang }) {
  const opere = await getOpere();
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
    </>
  );
}

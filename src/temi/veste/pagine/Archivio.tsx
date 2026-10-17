import { ContenutoArchivio } from "@/pagine/Archivio";
import { getOpere } from "@/lib/contenuti";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/rotte";
import { Titolo } from "../componenti/Titolo";

export async function Archivio({ lang }: { lang: Lang }) {
  const d = t(lang);
  const opere = await getOpere();
  return (
    <>
      <Titolo etichetta="Pasquale Liberatore" titolo={d.nav.archivio} intro={d.archivioIntro} numero={String(opere.length)} />
      <ContenutoArchivio lang={lang} />
    </>
  );
}

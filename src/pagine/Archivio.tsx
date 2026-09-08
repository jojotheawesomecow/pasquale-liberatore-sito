import Link from "next/link";
import { BarraArchivio } from "@/componenti/BarraArchivio";
import { ElencoArchivio, GalleriaGiustificata } from "@/componenti/GalleriaGiustificata";
import { getOpere } from "@/lib/contenuti";
import { t } from "@/lib/i18n";
import { url, type Lang } from "@/lib/rotte";
import { testi } from "@/lib/testi";
import { categoriePresenti, raggruppaArchivio, schedaOpera } from "./utili";

/**
 * Archivio completo. Tutte le opere sono scritte nella pagina una volta sola, in HTML:
 * i filtri nascondono e mostrano quelle già presenti, senza spedire due volte gli stessi dati.
 */
export async function ContenutoArchivio({ lang }: { lang: Lang }) {
  const opere = await getOpere();
  const d = t(lang);
  const x = testi(lang);
  const schede = opere.map((o) => schedaOpera(o, lang));
  const gruppi = raggruppaArchivio(schede, { senzaData: x.senzaData, senzaTitolo: d.senzaTitolo });
  const decadi = [...new Set(schede.map((o) => o.decade).filter(Boolean) as string[])].sort((a, b) => Number(b) - Number(a));

  return (
    <div data-archivio data-vista="galleria" data-dati="1">
      <div className="contenitore">
        <BarraArchivio
          categorie={categoriePresenti(opere, lang)}
          decadi={decadi}
          totale={schede.length}
          etichette={{
            tutte: d.filtri.tutte,
            azzera: d.filtri.azzera,
            cerca: d.cerca,
            cercaSuggerimento: d.cercaSuggerimento,
            risultatiUno: d.filtri.risultatiUno,
            risultatiMolti: d.filtri.risultatiMolti,
            nessunRisultato: d.nessunRisultato,
            galleria: d.vistaGalleria,
            elenco: d.vistaElenco,
            conDati: d.conDati,
            senzaDati: d.senzaDati,
          }}
        />
        <GalleriaGiustificata gruppi={gruppi} etichette={{ senzaTitolo: d.senzaTitolo }} />
        <ElencoArchivio gruppi={gruppi} colonne={d.colonne} />
        <section className="riga mt-20 grid gap-6 pt-8 lg:grid-cols-12">
          <h2 className="mono lg:col-span-3">{d.notaArchivio}</h2>
          <div className="lg:col-span-7">
            {x.notaArchivio.map((p, i) => (
              <p key={i} className={`font-sans text-[0.95rem] leading-relaxed text-testo-2 ${i ? "mt-4" : ""}`}>{p}</p>
            ))}
            <p className="mt-6">
              <Link href={url(lang, "opere")} className="mono underline decoration-accento underline-offset-4">{d.nav.opere} →</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

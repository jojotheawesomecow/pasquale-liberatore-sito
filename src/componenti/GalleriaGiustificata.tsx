import Link from "next/link";
import type { SchedaOpera } from "@/lib/tipi";

export type Gruppo = { chiave: string; titolo: string; opere: SchedaOpera[] };

type Props = {
  gruppi: Gruppo[];
  /** testo alternativo di riserva quando l'opera non ha titolo */
  etichette: { senzaTitolo: string };
};

const normalizza = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/**
 * Righe giustificate: ogni immagine tiene le sue proporzioni e le righe riempiono la larghezza.
 * È tutto HTML e CSS, generato una volta sola alla costruzione del sito: nessun dato viene
 * spedito al browser e i filtri possono nascondere le opere senza rompere l'impaginazione.
 */
export function GalleriaGiustificata({ gruppi, etichette }: Props) {
  return (
    <div className="archivio">
      {gruppi.map((g) => (
        <section key={g.chiave} className="archivio-gruppo" data-gruppo={g.chiave}>
          <h2 className="archivio-titolo">
            <span>{g.titolo}</span>
            <span className="archivio-quanti" data-quanti>{g.opere.length}</span>
          </h2>
          <ul className="giustificata">
            {g.opere.map((o) => {
              const ar = o.foto ? o.foto.w / o.foto.h : 1;
              return (
                <li
                  key={o.slug}
                  id={o.slug}
                  className={o.foto?.alpha ? "scontornata" : ""}
                  style={{ ["--ar" as string]: ar.toFixed(4) }}
                  data-cat={o.categoria}
                  data-dec={o.decade ?? ""}
                  data-cerca={normalizza([o.titolo, o.codice, o.anno, o.dettaglio, o.luogo, o.categoriaLabel].filter(Boolean).join(" "))}
                >
                  <Link href={o.href} className="giustificata-scatto" data-cursore="zoom" title={`${o.titolo}${o.anno ? `, ${o.anno}` : ""}`}>
                    {o.foto ? (
                      <img
                        src={o.foto.url}
                        srcSet={o.foto.srcSet}
                        sizes="(min-width: 1280px) 26vw, (min-width: 768px) 34vw, 50vw"
                        width={o.foto.w}
                        height={o.foto.h}
                        alt={o.titolo || etichette.senzaTitolo}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                  </Link>
                  <p className="giustificata-dati">
                    <span className="giustificata-codice">{o.codice}</span>
                    <span className="giustificata-titolo">
                      {o.titolo}
                      {o.anno ? `, ${o.anno}` : ""}
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

/** Elenco tipografico: seconda vista, anch'essa già scritta nella pagina. */
export function ElencoArchivio({ gruppi, colonne }: { gruppi: Gruppo[]; colonne: [string, string, string, string] }) {
  return (
    <div className="archivio-elenco">
      <div className="elenco-testata" aria-hidden="true">
        <span>{colonne[0]}</span>
        <span>{colonne[1]}</span>
        <span>{colonne[2]}</span>
        <span>{colonne[3]}</span>
      </div>
      {gruppi.map((g) => (
        <section key={g.chiave} data-gruppo={g.chiave}>
          <h2 className="archivio-titolo">
            <span>{g.titolo}</span>
          </h2>
          <ul>
            {g.opere.map((o) => (
              <li
                key={o.slug}
                data-cat={o.categoria}
                data-dec={o.decade ?? ""}
                data-cerca={normalizza([o.titolo, o.codice, o.anno, o.dettaglio, o.luogo, o.categoriaLabel].filter(Boolean).join(" "))}
                data-anteprima={o.foto?.url ?? ""}
              >
                <Link href={o.href} className="elenco-riga">
                  <span className="elenco-codice">{o.codice}</span>
                  <span className="elenco-titolo">{o.titolo}</span>
                  <span className="elenco-anno">{o.anno || "—"}</span>
                  <span className="elenco-dettaglio">{o.dettaglio || o.luogo || o.categoriaLabel}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

import { Gestione, type OperaGestione } from "@/componenti/Gestione";
import { getOpere } from "@/lib/contenuti";
import { foto } from "@/lib/immagini";

export const metadata = { title: "Le opere di Pasquale", robots: { index: false, follow: false } };

/**
 * Banco di lavoro per schedare le opere: si ruotano le foto, si scrivono i dati
 * e si decide che cosa mostrare nella pagina Opere.
 * Funziona sia in locale (`npm run dev`) sia sul sito pubblicato, protetto da parola d'accesso.
 */
export default async function PaginaGestione() {
  const opere = await getOpere();
  const dati: OperaGestione[] = opere.map((o) => {
    const f = foto(o.foto);
    const { slug, ...scheda } = o;
    return {
      slug,
      codice: o.codice ?? "",
      titolo: o.titolo ?? "",
      anno: o.anno ?? "",
      tecnica: o.tecnica ?? "",
      materiale: o.materiale ?? "",
      dimensioni: o.dimensioni ?? "",
      luogo: o.luogo ?? "",
      categoria: o.categoria,
      selezionata: Boolean(o.selezionata),
      bozza: o.stato === "bozza",
      anteprima: f ? f.srcSet.split(",")[1]?.trim().split(" ")[0] ?? f.url : "",
      grande: f?.url ?? "",
      percorsoFoto: (o.foto ?? "").replace(/^\/media\//, "content/media/"),
      w: f?.w ?? 1,
      h: f?.h ?? 1,
      origine: o.origine ?? "",
      scheda: scheda as Record<string, unknown>,
    };
  });
  return <Gestione opere={dati} />;
}

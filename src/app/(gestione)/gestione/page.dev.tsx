import { Gestione, type OperaGestione } from "@/componenti/Gestione";
import { getOpere } from "@/lib/contenuti";
import { foto } from "@/lib/immagini";

/**
 * Banco di lavoro per schedare molte opere in fretta: si ruotano le foto, si scrivono i dati
 * e si decide che cosa mostrare nella pagina Opere. Esiste solo in sviluppo (`npm run dev`).
 */
export default async function PaginaGestione() {
  const opere = await getOpere();
  const dati: OperaGestione[] = opere.map((o) => {
    const f = foto(o.foto);
    return {
      slug: o.slug,
      codice: o.codice ?? "",
      titolo: o.titolo ?? "",
      titolo_en: o.titolo_en ?? "",
      anno: o.anno ?? "",
      tecnica: o.tecnica ?? "",
      materiale: o.materiale ?? "",
      dimensioni: o.dimensioni ?? "",
      luogo: o.luogo ?? "",
      categoria: o.categoria,
      selezionata: Boolean(o.selezionata),
      bozza: o.stato === "bozza",
      anteprima: f ? f.srcSet.split(",")[1]?.trim().split(" ")[0] ?? f.url : "",
      w: f?.w ?? 1,
      h: f?.h ?? 1,
      origine: o.origine ?? "",
    };
  });
  return <Gestione opere={dati} />;
}

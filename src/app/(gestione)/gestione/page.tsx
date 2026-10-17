import { Gestione } from "@/componenti/Gestione";

export const metadata = { title: "Le opere di Pasquale", robots: { index: false, follow: false } };

/**
 * Pannello delle opere. La pagina non contiene nessun dato: le opere arrivano
 * soltanto dopo l'ingresso, da un servizio protetto.
 */
export default function PaginaGestione() {
  return <Gestione />;
}

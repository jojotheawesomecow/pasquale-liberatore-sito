import dati from "../../dati/opere.json";
import { sessioneDi } from "../comuni/accessi";

/**
 * Le opere che il pannello mostra dopo il login.
 * Questo file non è raggiungibile dall'esterno: viene incluso nel servizio,
 * quindi senza essere entrati non si vede nulla.
 */
type Ambiente = { PANNELLO_PAROLA?: string; PANNELLO_PW_ANNAMARIA?: string };

export const onRequestGet: PagesFunction<Ambiente> = async ({ env, request }) => {
  const segreto = env.PANNELLO_PAROLA ?? env.PANNELLO_PW_ANNAMARIA ?? "";
  const sessione = segreto ? await sessioneDi(request, segreto) : null;
  if (!sessione) return Response.json({ errore: "Devi entrare nel pannello." }, { status: 401 });
  return Response.json({ ok: true, nome: sessione.nome, ...dati });
};

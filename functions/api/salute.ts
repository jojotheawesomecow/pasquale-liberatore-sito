import { creaUtente } from "../comuni/accessi";

/** Verifica minima: serve solo a capire se le funzioni vengono pubblicate. */
type Ambiente = {
  GITHUB_TOKEN?: string;
  GITHUB_TOKEN_SITO_PASQUALE?: string;
  GESTIONE_ACCESSI?: string;
  UTENTI?: KVNamespace;
};

/** Con ?prova=1 misura quanto costa calcolare un'impronta: è lì che il servizio si rompeva. */
async function provaImpronta() {
  const inizio = Date.now();
  try {
    await creaUtente("prova@esempio.it", "Prova", "unapasswordqualunque");
    return { impronta: "ok", millisecondi: Date.now() - inizio };
  } catch (e) {
    return { impronta: "rotta", millisecondi: Date.now() - inizio, motivo: e instanceof Error ? e.message : String(e) };
  }
}

export const onRequestGet: PagesFunction<Ambiente> = async ({ env, request }) => {
  const prova = new URL(request.url).searchParams.has("prova");
  return Response.json({
    ok: true,
    chiavePresente: Boolean(env.GITHUB_TOKEN ?? env.GITHUB_TOKEN_SITO_PASQUALE),
    parolaPresente: Boolean(env.GESTIONE_ACCESSI),
    archivioPresente: Boolean(env.UTENTI),
    quando: new Date().toISOString(),
    ...(prova ? await provaImpronta() : {}),
  });
};

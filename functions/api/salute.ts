/** Verifica minima: serve solo a capire se le funzioni vengono pubblicate. */
type Ambiente = {
  GITHUB_TOKEN?: string;
  GITHUB_TOKEN_SITO_PASQUALE?: string;
  GESTIONE_ACCESSI?: string;
};

export const onRequestGet: PagesFunction<Ambiente> = async ({ env }) => {
  return Response.json({
    ok: true,
    chiavePresente: Boolean(env.GITHUB_TOKEN ?? env.GITHUB_TOKEN_SITO_PASQUALE),
    parolaPresente: Boolean(env.GESTIONE_ACCESSI),
    quando: new Date().toISOString(),
  });
};

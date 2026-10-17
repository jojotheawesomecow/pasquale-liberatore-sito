/** Verifica minima: serve solo a capire se le funzioni vengono pubblicate. */
export const onRequestGet: PagesFunction<{ GITHUB_TOKEN?: string; GITHUB_TOKEN_SITO_PASQUALE?: string }> = async ({ env }) => {
  return Response.json({
    ok: true,
    chiavePresente: Boolean(env.GITHUB_TOKEN ?? env.GITHUB_TOKEN_SITO_PASQUALE),
    quando: new Date().toISOString(),
  });
};

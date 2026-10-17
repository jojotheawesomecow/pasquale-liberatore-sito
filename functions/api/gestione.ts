import * as yaml from "js-yaml";
import { sessioneDi } from "../comuni/accessi";

/**
 * Servizio del pannello quando il sito è pubblicato su Cloudflare.
 * Riceve le modifiche fatte nel pannello e le salva sul progetto su GitHub,
 * tutte insieme in un unico salvataggio. Da lì il sito si ricostruisce da solo.
 *
 * Richiede due variabili:
 *   GITHUB_TOKEN     chiave con permesso di scrittura sul repository
 *   PANNELLO_PAROLA  parola d'accesso del pannello (senza, il servizio rifiuta tutto)
 */

type Opera = { slug: string; dati: Record<string, unknown> };
type Foto = { percorso: string; base64: string };
type Corpo = { opere?: Opera[]; foto?: Foto[]; eliminate?: string[]; messaggio?: string };

type Ambiente = {
  GITHUB_TOKEN?: string;
  GITHUB_TOKEN_SITO_PASQUALE?: string;
  GITHUB_REPO?: string;
  GITHUB_RAMO?: string;
  /** Parola d'accesso del pannello. Accettiamo più nomi per non dipendere da come è stata chiamata. */
  PANNELLO_PAROLA?: string;
  PANNELLO_PW_ANNAMARIA?: string;
};

const API = "https://api.github.com";
const OPZIONI_YAML = { lineWidth: 100, quotingType: '"' as const };

async function gh<T = Record<string, unknown>>(token: string, percorso: string, opzioni: RequestInit = {}): Promise<T> {
  const r = await fetch(`${API}${percorso}`, {
    ...opzioni,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "pannello-pasquale-liberatore",
      ...(opzioni.headers ?? {}),
    },
  });
  if (!r.ok) throw new Error(`GitHub ${r.status}: ${(await r.text()).slice(0, 180)}`);
  return (await r.json()) as T;
}

const sicuro = (s: string) => /^[a-z0-9-]+$/.test(s);

export const onRequestPost: PagesFunction<Ambiente> = async ({ env, request }) => {
  const token = env.GITHUB_TOKEN ?? env.GITHUB_TOKEN_SITO_PASQUALE;
  const parola = env.PANNELLO_PAROLA ?? env.PANNELLO_PW_ANNAMARIA;
  const repo = env.GITHUB_REPO ?? "jojotheawesomecow/pasquale-liberatore-sito";
  const ramo = env.GITHUB_RAMO ?? "main";

  if (!token) return Response.json({ errore: "Manca la chiave di scrittura." }, { status: 503 });
  if (!parola) return Response.json({ errore: "Il pannello non è ancora stato attivato." }, { status: 503 });

  const sessione = await sessioneDi(request, parola);
  if (!sessione) return Response.json({ errore: "Devi entrare nel pannello." }, { status: 401 });

  let corpo: Corpo;
  try {
    corpo = await request.json();
  } catch {
    return Response.json({ errore: "richiesta non leggibile" }, { status: 400 });
  }

  const opere = (corpo.opere ?? []).filter((o) => o && sicuro(o.slug) && o.dati);
  const foto = (corpo.foto ?? []).filter((f) => f && typeof f.percorso === "string" && f.percorso.startsWith("content/media/opere/"));
  const eliminate = (corpo.eliminate ?? []).filter(sicuro);
  if (!opere.length && !foto.length && !eliminate.length) {
    return Response.json({ errore: "nessuna modifica da salvare" }, { status: 400 });
  }

  try {
    const rif = await gh<{ object: { sha: string } }>(token, `/repos/${repo}/git/ref/heads/${ramo}`);
    const commitBase = rif.object.sha;
    const commit = await gh<{ tree: { sha: string } }>(token, `/repos/${repo}/git/commits/${commitBase}`);

    const voci: Record<string, unknown>[] = [];

    for (const o of opere) {
      const testo = yaml.dump(o.dati, OPZIONI_YAML);
      const blob = await gh<{ sha: string }>(token, `/repos/${repo}/git/blobs`, {
        method: "POST",
        body: JSON.stringify({ content: btoa(String.fromCharCode(...new TextEncoder().encode(testo))), encoding: "base64" }),
      });
      voci.push({ path: `content/opere/${o.slug}/index.yaml`, mode: "100644", type: "blob", sha: blob.sha });
    }

    for (const f of foto) {
      const blob = await gh<{ sha: string }>(token, `/repos/${repo}/git/blobs`, {
        method: "POST",
        body: JSON.stringify({ content: f.base64, encoding: "base64" }),
      });
      voci.push({ path: f.percorso, mode: "100644", type: "blob", sha: blob.sha });
    }

    // le opere eliminate escono dal sito: si tolgono scheda e foto
    for (const slug of eliminate) {
      voci.push({ path: `content/opere/${slug}/index.yaml`, mode: "100644", type: "blob", sha: null });
    }

    const albero = await gh<{ sha: string }>(token, `/repos/${repo}/git/trees`, {
      method: "POST",
      body: JSON.stringify({ base_tree: commit.tree.sha, tree: voci }),
    });

    const quante = opere.length + foto.length + eliminate.length;
    const nuovo = await gh<{ sha: string }>(token, `/repos/${repo}/git/commits`, {
      method: "POST",
      body: JSON.stringify({
        message: corpo.messaggio || `Modifiche dal pannello di ${sessione.nome}: ${quante} ${quante === 1 ? "voce" : "voci"}`,
        tree: albero.sha,
        parents: [commitBase],
      }),
    });

    await gh(token, `/repos/${repo}/git/refs/heads/${ramo}`, {
      method: "PATCH",
      body: JSON.stringify({ sha: nuovo.sha }),
    });

    return Response.json({ ok: true, quante, commit: nuovo.sha.slice(0, 7) });
  } catch (e) {
    return Response.json({ errore: e instanceof Error ? e.message : "errore sconosciuto" }, { status: 500 });
  }
};

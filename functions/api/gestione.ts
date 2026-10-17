/**
 * Servizio del pannello quando il sito è pubblicato su Cloudflare.
 * Riceve le modifiche fatte nel pannello e le scrive sul progetto su GitHub,
 * in un unico salvataggio. Da lì il sito si ricostruisce da solo.
 *
 * Richiede una variabile segreta GITHUB_TOKEN con permesso di scrittura sul repository.
 */

type Modifica =
  | { tipo: "scheda"; percorso: string; contenuto: string }
  | { tipo: "foto"; percorso: string; contenutoBase64: string }
  | { tipo: "elimina"; percorso: string };

type Corpo = { modifiche: Modifica[]; messaggio?: string };

type Ambiente = {
  /** Chiave di scrittura su GitHub. Accettiamo più nomi per non dipendere da come è stata chiamata. */
  GITHUB_TOKEN?: string;
  GITHUB_TOKEN_SITO_PASQUALE?: string;
  GITHUB_REPO?: string;
  GITHUB_RAMO?: string;
};

const API = "https://api.github.com";

function intestazioni(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "User-Agent": "pannello-pasquale-liberatore",
  };
}

async function gh<T = Record<string, unknown>>(token: string, percorso: string, opzioni: RequestInit = {}): Promise<T> {
  const r = await fetch(`${API}${percorso}`, { ...opzioni, headers: { ...intestazioni(token), ...(opzioni.headers ?? {}) } });
  if (!r.ok) throw new Error(`GitHub ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return (await r.json()) as T;
}

export const onRequestPost: PagesFunction<Ambiente> = async (contesto) => {
  const { env, request } = contesto;
  const token = env.GITHUB_TOKEN ?? env.GITHUB_TOKEN_SITO_PASQUALE;
  const repo = env.GITHUB_REPO ?? "jojotheawesomecow/pasquale-liberatore-sito";
  const ramo = env.GITHUB_RAMO ?? "main";

  if (!token) {
    return Response.json({ errore: "Il pannello non è ancora collegato al progetto: manca la chiave di scrittura." }, { status: 503 });
  }

  let corpo: Corpo;
  try {
    corpo = await request.json();
  } catch {
    return Response.json({ errore: "richiesta non leggibile" }, { status: 400 });
  }
  const modifiche = (corpo.modifiche ?? []).filter((m) => m && typeof m.percorso === "string" && m.percorso.startsWith("content/"));
  if (!modifiche.length) return Response.json({ errore: "nessuna modifica da salvare" }, { status: 400 });

  try {
    // posizione attuale del ramo
    const rif = await gh<{ object: { sha: string } }>(token, `/repos/${repo}/git/ref/heads/${ramo}`);
    const commitBase = rif.object.sha;
    const commit = await gh<{ tree: { sha: string } }>(token, `/repos/${repo}/git/commits/${commitBase}`);
    const alberoBase = commit.tree.sha;

    // ogni file diventa un "blob"; i file eliminati hanno sha nullo
    const voci: Record<string, unknown>[] = [];
    for (const m of modifiche) {
      if (m.tipo === "elimina") {
        voci.push({ path: m.percorso, mode: "100644", type: "blob", sha: null });
        continue;
      }
      const contenuto = m.tipo === "foto" ? m.contenutoBase64 : btoa(unescape(encodeURIComponent(m.contenuto)));
      const blob = await gh<{ sha: string }>(token, `/repos/${repo}/git/blobs`, {
        method: "POST",
        body: JSON.stringify({ content: contenuto, encoding: "base64" }),
      });
      voci.push({ path: m.percorso, mode: "100644", type: "blob", sha: blob.sha });
    }

    const albero = await gh<{ sha: string }>(token, `/repos/${repo}/git/trees`, {
      method: "POST",
      body: JSON.stringify({ base_tree: alberoBase, tree: voci }),
    });

    const quante = modifiche.length;
    const nuovo = await gh<{ sha: string }>(token, `/repos/${repo}/git/commits`, {
      method: "POST",
      body: JSON.stringify({
        message: corpo.messaggio || `Modifiche dal pannello (${quante} ${quante === 1 ? "file" : "file"})`,
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

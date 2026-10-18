import fs from "node:fs/promises";
import path from "node:path";
import { verifica, type Sessione } from "../../../../functions/comuni/accessi";

/** Le schede del pannello in locale: stesso contratto del servizio su Cloudflare. */
const SEGRETO = process.env.GESTIONE_ACCESSI ?? "sviluppo";

export async function GET(richiesta: Request) {
  const sessione = await verifica<Sessione>(richiesta.headers.get("x-pannello-sessione") ?? "", SEGRETO);
  if (!sessione) return Response.json({ errore: "Devi entrare nel pannello." }, { status: 401 });
  try {
    const dati = JSON.parse(await fs.readFile(path.join(process.cwd(), "dati", "opere.json"), "utf8")) as Record<string, unknown>;
    return Response.json({ ok: true, nome: sessione.nome, ...dati });
  } catch {
    return Response.json({ errore: "Manca dati/opere.json: lancia «node scripts/dati-pannello.mjs»." }, { status: 503 });
  }
}

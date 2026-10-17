import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import * as yaml from "js-yaml";

/**
 * Stessa interfaccia del servizio su Cloudflare, ma scrive sui file del computer.
 * Serve per lavorare in locale con `npm run dev`.
 */
const ROOT = process.cwd();
const OPERE = path.join(ROOT, "content", "opere");
const CESTINO = path.join(ROOT, "cestino");
const OPZIONI_YAML = { lineWidth: 100, quotingType: '"' } as yaml.DumpOptions;

type Opera = { slug: string; dati: Record<string, unknown> };
type Foto = { percorso: string; base64: string };
type Corpo = { opere?: Opera[]; foto?: Foto[]; eliminate?: string[] };

const sicuro = (s: string) => /^[a-z0-9-]+$/.test(s);

function rigeneraImmagini(): Promise<void> {
  return new Promise((risolvi) => {
    const p = spawn(process.execPath, [path.join(ROOT, "scripts", "immagini.mjs")], { stdio: "ignore" });
    p.on("exit", () => risolvi());
    p.on("error", () => risolvi());
  });
}

export async function POST(richiesta: Request) {
  let corpo: Corpo;
  try {
    corpo = (await richiesta.json()) as Corpo;
  } catch {
    return Response.json({ errore: "richiesta non leggibile" }, { status: 400 });
  }

  const opere = (corpo.opere ?? []).filter((o) => o && sicuro(o.slug) && o.dati);
  const foto = (corpo.foto ?? []).filter((f) => f && typeof f.percorso === "string" && f.percorso.startsWith("content/media/opere/"));
  const eliminate = (corpo.eliminate ?? []).filter(sicuro);

  try {
    for (const o of opere) {
      const dir = path.join(OPERE, o.slug);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(path.join(dir, "index.yaml"), yaml.dump(o.dati, OPZIONI_YAML));
    }
    for (const f of foto) {
      const dest = path.join(ROOT, f.percorso);
      await fs.mkdir(path.dirname(dest), { recursive: true });
      await fs.writeFile(dest, Buffer.from(f.base64, "base64"));
    }
    for (const slug of eliminate) {
      const quando = new Date().toISOString().slice(0, 10);
      const dest = path.join(CESTINO, quando, slug);
      await fs.mkdir(dest, { recursive: true });
      for (const [da, sotto] of [
        [path.join(OPERE, slug), "scheda"],
        [path.join(ROOT, "content", "media", "opere", slug), "foto"],
      ] as const) {
        try {
          await fs.rename(da, path.join(dest, sotto));
        } catch {
          /* se non c'è, va bene così */
        }
      }
    }
    if (foto.length || eliminate.length) await rigeneraImmagini();
    return Response.json({ ok: true, quante: opere.length + foto.length + eliminate.length, locale: true });
  } catch (e) {
    return Response.json({ errore: e instanceof Error ? e.message : "errore" }, { status: 500 });
  }
}

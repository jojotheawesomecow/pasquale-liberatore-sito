import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import * as yaml from "js-yaml";

/**
 * Piccolo servizio locale usato dalla pagina /gestione (solo in sviluppo).
 * Scrive negli stessi file del pannello: nessun database, nessun account.
 */
const ROOT = process.cwd();
const OPERE = path.join(ROOT, "content", "opere");

type Corpo = {
  azione: "salva" | "ruota";
  slug: string;
  campi?: Record<string, string | boolean>;
  gradi?: number;
};

const percorsoScheda = (slug: string) => path.join(OPERE, path.basename(slug), "index.yaml");

async function leggi(slug: string) {
  return yaml.load(await fs.readFile(percorsoScheda(slug), "utf8")) as Record<string, unknown>;
}
const OPZIONI_YAML = { lineWidth: 100, quotingType: '"' } as yaml.DumpOptions;

async function scrivi(slug: string, dati: Record<string, unknown>) {
  await fs.writeFile(percorsoScheda(slug), yaml.dump(dati, OPZIONI_YAML));
}

/** Rigenera le versioni pubblicate: lo script è incrementale, tocca solo ciò che è cambiato. */
function rigeneraImmagini(): Promise<void> {
  return new Promise((risolvi) => {
    const p = spawn(process.execPath, [path.join(ROOT, "scripts", "immagini.mjs")], { stdio: "ignore" });
    p.on("exit", () => risolvi());
    p.on("error", () => risolvi());
  });
}

export async function POST(richiesta: Request) {
  const corpo = (await richiesta.json()) as Corpo;
  const slug = path.basename(corpo.slug ?? "");
  if (!slug) return Response.json({ errore: "manca l'opera" }, { status: 400 });

  try {
    const opera = await leggi(slug);

    if (corpo.azione === "salva") {
      for (const [k, v] of Object.entries(corpo.campi ?? {})) opera[k] = v;
      await scrivi(slug, opera);
      return Response.json({ ok: true });
    }

    if (corpo.azione === "ruota") {
      const rel = String(opera.foto ?? "");
      if (!rel.startsWith("/media/")) return Response.json({ errore: "foto non trovata" }, { status: 400 });
      const file = path.join(ROOT, "content", "media", rel.slice("/media/".length));
      const originale = await fs.readFile(file);
      const ruotata = await sharp(originale, { failOn: "none" })
        .rotate(corpo.gradi === -90 ? 270 : 90)
        .toBuffer();
      await fs.writeFile(file, ruotata);
      const meta = await sharp(ruotata).metadata();
      await rigeneraImmagini();
      return Response.json({ ok: true, w: meta.width, h: meta.height, v: Date.now() });
    }

    return Response.json({ errore: "azione sconosciuta" }, { status: 400 });
  } catch (e) {
    return Response.json({ errore: e instanceof Error ? e.message : "errore" }, { status: 500 });
  }
}

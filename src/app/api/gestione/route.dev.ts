import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import * as yaml from "js-yaml";

/**
 * Servizio locale del pannello /gestione.
 * Scrive negli stessi file del sito: nessun database, nessun account.
 * Le opere eliminate non spariscono: finiscono nella cartella `cestino/`.
 */
const ROOT = process.cwd();
const OPERE = path.join(ROOT, "content", "opere");
const MEDIA = path.join(ROOT, "content", "media", "opere");
const CESTINO = path.join(ROOT, "cestino");
const OPZIONI_YAML = { lineWidth: 100, quotingType: '"' } as yaml.DumpOptions;

type Corpo = {
  azione: "salva" | "ruota" | "elimina" | "blocco";
  slug?: string;
  slugs?: string[];
  campi?: Record<string, string | boolean>;
  gradi?: number;
};

const cartella = (base: string, slug: string) => path.join(base, path.basename(slug));
const scheda = (slug: string) => path.join(cartella(OPERE, slug), "index.yaml");

async function leggi(slug: string) {
  return yaml.load(await fs.readFile(scheda(slug), "utf8")) as Record<string, unknown>;
}
async function scrivi(slug: string, dati: Record<string, unknown>) {
  await fs.writeFile(scheda(slug), yaml.dump(dati, OPZIONI_YAML));
}

/** Rigenera le versioni pubblicate: lo script è incrementale, tocca solo ciò che è cambiato. */
function rigeneraImmagini(): Promise<void> {
  return new Promise((risolvi) => {
    const p = spawn(process.execPath, [path.join(ROOT, "scripts", "immagini.mjs")], { stdio: "ignore" });
    p.on("exit", () => risolvi());
    p.on("error", () => risolvi());
  });
}

/** Sposta l'opera nel cestino invece di cancellarla: si può sempre recuperare. */
async function nelCestino(slug: string) {
  const nome = path.basename(slug);
  const quando = new Date().toISOString().slice(0, 10);
  const dest = path.join(CESTINO, `${quando}`, nome);
  await fs.mkdir(dest, { recursive: true });
  for (const [da, sotto] of [
    [cartella(OPERE, nome), "scheda"],
    [cartella(MEDIA, nome), "foto"],
  ] as const) {
    try {
      await fs.rename(da, path.join(dest, sotto));
    } catch {
      /* se non esiste, pazienza */
    }
  }
}

async function ruota(slug: string, gradi: number) {
  const opera = await leggi(slug);
  const rel = String(opera.foto ?? "");
  if (!rel.startsWith("/media/")) throw new Error("foto non trovata");
  const file = path.join(ROOT, "content", "media", rel.slice("/media/".length));
  const originale = await fs.readFile(file);
  const ruotata = await sharp(originale, { failOn: "none" })
    .rotate(gradi === -90 ? 270 : 90)
    .toBuffer();
  await fs.writeFile(file, ruotata);
  const meta = await sharp(ruotata).metadata();
  return { w: meta.width, h: meta.height };
}

export async function POST(richiesta: Request) {
  const corpo = (await richiesta.json()) as Corpo;

  try {
    if (corpo.azione === "salva" && corpo.slug) {
      const opera = await leggi(corpo.slug);
      for (const [k, v] of Object.entries(corpo.campi ?? {})) opera[k] = v;
      await scrivi(corpo.slug, opera);
      return Response.json({ ok: true });
    }

    if (corpo.azione === "ruota" && corpo.slug) {
      const misure = await ruota(corpo.slug, corpo.gradi ?? 90);
      await rigeneraImmagini();
      return Response.json({ ok: true, ...misure, v: Date.now() });
    }

    if (corpo.azione === "elimina" && corpo.slugs?.length) {
      for (const s of corpo.slugs) await nelCestino(s);
      await rigeneraImmagini();
      return Response.json({ ok: true, quante: corpo.slugs.length });
    }

    if (corpo.azione === "blocco" && corpo.slugs?.length) {
      for (const s of corpo.slugs) {
        const opera = await leggi(s);
        for (const [k, v] of Object.entries(corpo.campi ?? {})) opera[k] = v;
        await scrivi(s, opera);
      }
      return Response.json({ ok: true, quante: corpo.slugs.length });
    }

    return Response.json({ errore: "richiesta non valida" }, { status: 400 });
  } catch (e) {
    return Response.json({ errore: e instanceof Error ? e.message : "errore" }, { status: 500 });
  }
}

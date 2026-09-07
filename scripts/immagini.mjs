#!/usr/bin/env node
/**
 * Ottimizzazione immagini.
 * Legge tutte le immagini in `content/media/**` e genera in `public/media/**` versioni WebP
 * a più larghezze (480, 960, 1600, 2400 px) più un'anteprima sfocata minuscola.
 * Scrive l'elenco in `src/generated/immagini.json`, usato dal componente <Foto>.
 *
 *   node scripts/immagini.mjs            # una volta
 *   node scripts/immagini.mjs --watch    # resta in ascolto (usato da `npm run dev`)
 */
import fs from "node:fs/promises";
import fss from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "content", "media");
const OUT = path.join(ROOT, "public", "media");
const MANIFEST = path.join(ROOT, "src", "generated", "immagini.json");
const SIZES = [480, 960, 1600, 2400];
const MAX = SIZES[SIZES.length - 1];
const EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".avif", ".heic"]);
const watch = process.argv.includes("--watch");

async function* walk(dir) {
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (EXT.has(path.extname(e.name).toLowerCase()) && !e.name.startsWith(".")) yield p;
  }
}

const toPosix = (p) => p.split(path.sep).join("/");

async function processOne(file, manifest) {
  const rel = path.relative(SRC, file);
  const key = "/media/" + toPosix(rel);
  const relNoExt = rel.slice(0, rel.length - path.extname(rel).length);
  const base = path.join(OUT, relNoExt);
  const relBase = "/media/" + toPosix(relNoExt);
  const stat = await fs.stat(file);
  const stamp = `${stat.size}-${Math.floor(stat.mtimeMs)}`;
  const prev = manifest[key];
  if (prev && prev.stamp === stamp && prev.sizes.every((w) => fss.existsSync(`${base}-${w}.webp`))) return false;

  const meta = await sharp(file, { failOn: "none" }).metadata();
  let w = meta.width ?? 0;
  let h = meta.height ?? 0;
  if ((meta.orientation ?? 1) >= 5) [w, h] = [h, w];
  if (!w || !h) throw new Error(`Impossibile leggere le dimensioni di ${rel}`);

  await fs.mkdir(path.dirname(base), { recursive: true });
  const sizes = SIZES.filter((s) => s < w);
  const largest = Math.min(w, MAX);
  if (!sizes.includes(largest)) sizes.push(largest);
  for (const s of sizes) {
    await sharp(file, { failOn: "none" })
      .rotate()
      .resize({ width: s, withoutEnlargement: true })
      .webp({ quality: s >= 1600 ? 82 : 78, effort: 4 })
      .toFile(`${base}-${s}.webp`);
  }
  const blur = await sharp(file, { failOn: "none" }).rotate().resize({ width: 24 }).blur(0.8).webp({ quality: 40 }).toBuffer();
  const finalW = largest;
  const finalH = Math.round((h * finalW) / w);
  manifest[key] = {
    w: finalW,
    h: finalH,
    sizes,
    base: relBase,
    blur: `data:image/webp;base64,${blur.toString("base64")}`,
    stamp,
  };
  return true;
}

async function run() {
  await fs.mkdir(SRC, { recursive: true });
  await fs.mkdir(path.dirname(MANIFEST), { recursive: true });
  let manifest = {};
  try {
    manifest = JSON.parse(await fs.readFile(MANIFEST, "utf8"));
  } catch {}
  const seen = new Set();
  let done = 0;
  const t0 = Date.now();
  for await (const file of walk(SRC)) {
    const key = "/media/" + toPosix(path.relative(SRC, file));
    seen.add(key);
    try {
      if (await processOne(file, manifest)) {
        done++;
        console.log(`  ✓ ${key}`);
      }
    } catch (err) {
      console.error(`  ✗ ${key}: ${err.message}`);
    }
  }
  for (const key of Object.keys(manifest)) if (!seen.has(key)) delete manifest[key];
  const ordered = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
  await fs.writeFile(MANIFEST, JSON.stringify(ordered, null, 1));
  console.log(`Immagini: ${Object.keys(ordered).length} totali, ${done} rigenerate (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
}

await run();

if (watch) {
  console.log("In ascolto di nuove immagini in content/media …");
  let timer = null;
  const trigger = () => {
    clearTimeout(timer);
    timer = setTimeout(() => run().catch((e) => console.error(e)), 800);
  };
  try {
    fss.watch(SRC, { recursive: true }, trigger);
  } catch (e) {
    console.warn("Impossibile avviare l'ascolto ricorsivo:", e.message);
  }
}

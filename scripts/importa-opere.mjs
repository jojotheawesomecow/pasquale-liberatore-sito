#!/usr/bin/env node
/**
 * Importazione massiva di opere.
 *
 * Legge le foto da una cartella (predefinita: `import/`), ne ricava un "master" leggero
 * dentro `content/media/opere/<nome>/` e crea la scheda `content/opere/<nome>/index.yaml`.
 * Gli originali NON vengono spostati né modificati: restano dove sono.
 *
 *   npm run importa                                   # dalla cartella import/
 *   npm run importa -- --da "/percorso/della/cartella" --categoria pittura
 *   npm run importa -- --da "…" --categoria pittura --codice P --titolo "Senza titolo" --ordine 1000
 *   npm run importa -- --bozza                        # importa senza pubblicare
 *   npm run importa -- --prova                        # mostra cosa farebbe, senza scrivere
 *
 * Opzioni: --max 2000 (lato lungo del master), --qualita 80, --non-tagliare (non ritaglia i bordi trasparenti)
 * Vedi import/LEGGIMI.md.
 */
import fs from "node:fs";
import fss from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import * as yaml from "js-yaml";

const ROOT = process.cwd();
const OPERE = path.join(ROOT, "content", "opere");
const MEDIA = path.join(ROOT, "content", "media", "opere");
const EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif", ".tif", ".tiff", ".avif"]);
const CATEGORIE = ["scultura", "opera-pubblica", "pittura", "disegno", "installazione", "performance"];

const args = process.argv.slice(2);
const opz = (nome, predef) => {
  const i = args.indexOf(`--${nome}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : predef;
};
const flag = (nome) => args.includes(`--${nome}`);

const cartella = path.resolve(opz("da", path.join(ROOT, "import")));
const categoria = opz("categoria", "pittura");
const codicePrefisso = opz("codice", "");
const titoloPredef = opz("titolo", "Senza titolo");
const titoloEnPredef = opz("titolo-en", "Untitled");
const ordineBase = parseInt(opz("ordine", "0"), 10) || 0;
const MAX = parseInt(opz("max", "2000"), 10);
const QUALITA = parseInt(opz("qualita", "80"), 10);
const nonTagliare = flag("non-tagliare");
const bozza = flag("bozza");
const prova = flag("prova");

if (!CATEGORIE.includes(categoria)) {
  console.error(`Categoria non valida: ${categoria}. Usa una tra: ${CATEGORIE.join(", ")}`);
  process.exit(1);
}
if (!fs.existsSync(cartella)) {
  console.error(`Cartella non trovata: ${cartella}`);
  process.exit(1);
}

const slugify = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70) || "opera";

/** Da "Germoglio 2021 60x35x15.jpg" ricava titolo, anno e dimensioni. */
function analizzaNome(nome) {
  let base = nome.replace(/\.[^.]+$/, "").replace(/_/g, " ").trim();
  // scarta i nomi che sono solo una data dell'apparecchio fotografico (20160908 142019)
  const soloData = /^\s*(19|20)\d{6}(?:[\s_-]+\d{1,6})*(\s*\(\d+\))?\s*$/.test(base.replace(/senza sfondo/i, "").trim());
  const anno = soloData ? "" : (base.match(/\b(19|20)\d{2}\b/) ?? [])[0] ?? "";
  const dim = (base.match(/\b\d+(?:[.,]\d+)?\s*[x×]\s*\d+(?:[.,]\d+)?(?:\s*[x×]\s*\d+(?:[.,]\d+)?)?\s*(?:cm)?\b/i) ?? [])[0] ?? "";
  let titolo = base;
  if (anno) titolo = titolo.replace(anno, "");
  if (dim) titolo = titolo.replace(dim, "");
  titolo = titolo.replace(/senza sfondo/i, "").replace(/\s*-\s*/g, " ").replace(/\s{2,}/g, " ").replace(/^[\s,.-]+|[\s,.-]+$/g, "").trim();
  return {
    titolo: soloData || !titolo ? "" : titolo,
    anno,
    dimensioni: dim ? dim.replace(/\s*[x×]\s*/gi, "×").replace(/\s*cm$/i, "").trim() + " cm" : "",
  };
}

/** Legge <cartella>/schede.csv (separatore , o ;) → mappa nomefile → campi. */
function leggiCsv() {
  const p = path.join(cartella, "schede.csv");
  if (!fs.existsSync(p)) return new Map();
  const righe = fs.readFileSync(p, "utf8").split(/\r?\n/).filter((r) => r.trim());
  if (!righe.length) return new Map();
  const sep = righe[0].includes(";") ? ";" : ",";
  const parse = (r) => {
    const out = [];
    let cur = "";
    let q = false;
    for (let i = 0; i < r.length; i++) {
      const c = r[i];
      if (c === '"') {
        if (q && r[i + 1] === '"') { cur += '"'; i++; } else q = !q;
      } else if (c === sep && !q) { out.push(cur); cur = ""; }
      else cur += c;
    }
    out.push(cur);
    return out.map((s) => s.trim());
  };
  const intest = parse(righe[0]).map((s) => s.toLowerCase());
  const mappa = new Map();
  for (const r of righe.slice(1)) {
    const v = parse(r);
    const rec = Object.fromEntries(intest.map((k, i) => [k, v[i] ?? ""]));
    if (rec.file) mappa.set(rec.file.replace(/\.[^.]+$/, "").toLowerCase(), rec);
  }
  return mappa;
}

/** Crea il master ottimizzato dentro content/media/opere/<slug>/ e restituisce il percorso pubblico. */
async function scriviMaster(origine, slug, indice) {
  const dir = path.join(MEDIA, slug);
  const nome = indice === 0 ? `${slug}.webp` : `${slug}-${indice + 1}.webp`;
  const dest = path.join(dir, nome);
  if (!prova) {
    await fss.mkdir(dir, { recursive: true });
    const meta = await sharp(origine, { failOn: "none" }).metadata();
    let im = sharp(origine, { failOn: "none" }).rotate();
    // nei quadri già scontornati toglie il bordo trasparente vuoto attorno all'opera
    if (meta.hasAlpha && !nonTagliare) im = im.trim({ threshold: 1 });
    await im
      .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITA, effort: 5 })
      .toFile(dest);
  }
  return { pubblico: `/media/opere/${slug}/${nome}`, dest };
}

const voci = fs
  .readdirSync(cartella, { withFileTypes: true })
  .filter((v) => !v.name.startsWith(".") && v.name !== "LEGGIMI.md" && v.name !== "schede.csv")
  .sort((a, b) => a.name.localeCompare(b.name, "it", { numeric: true }));

const csv = leggiCsv();
const usati = new Set(fs.existsSync(OPERE) ? fs.readdirSync(OPERE) : []);
let n = 0;
let pesoOrig = 0;
let pesoMaster = 0;
const t0 = Date.now();

for (const voce of voci) {
  const p = path.join(cartella, voce.name);
  let foto = [];
  if (voce.isDirectory()) {
    foto = fs
      .readdirSync(p)
      .filter((f) => EXT.has(path.extname(f).toLowerCase()) && !f.startsWith("."))
      .sort((a, b) => a.localeCompare(b, "it", { numeric: true }))
      .map((f) => path.join(p, f));
    if (!foto.length) continue;
  } else if (EXT.has(path.extname(voce.name).toLowerCase())) {
    foto = [p];
  } else continue;

  const dati = analizzaNome(voce.name);
  const extra = csv.get(voce.name.replace(/\.[^.]+$/, "").toLowerCase()) ?? {};
  const codice = extra.codice || (codicePrefisso ? `${codicePrefisso}-${String(n + 1).padStart(3, "0")}` : "");
  const titolo = extra.titolo || dati.titolo || titoloPredef;
  const base = extra.titolo || dati.titolo ? `${titolo} ${extra.anno || dati.anno}` : codice || titolo;
  let slug = slugify(base);
  let k = 2;
  while (usati.has(slug)) slug = `${slugify(base)}-${k++}`;
  usati.add(slug);

  if (prova) {
    console.log(`  ${slug}  ←  ${voce.name}${foto.length > 1 ? ` (+${foto.length - 1})` : ""}`);
    n++;
    continue;
  }

  const nomi = [];
  for (let i = 0; i < foto.length; i++) {
    pesoOrig += fs.statSync(foto[i]).size;
    const { pubblico, dest } = await scriviMaster(foto[i], slug, i);
    pesoMaster += fs.statSync(dest).size;
    nomi.push(pubblico);
  }

  const opera = {
    titolo,
    titolo_en: extra.titolo_en || (dati.titolo ? "" : titoloEnPredef),
    codice,
    categoria: extra.categoria && CATEGORIE.includes(extra.categoria) ? extra.categoria : categoria,
    anno: extra.anno || dati.anno || "",
    luogo: extra.luogo ?? "",
    materiale: extra.materiale ?? "",
    tecnica: extra.tecnica ?? "",
    dimensioni: extra.dimensioni || dati.dimensioni || "",
    collezione: extra.collezione ?? "",
    foto: nomi[0],
    galleria: nomi.slice(1).map((x) => ({ foto: x, didascalia: "", didascalia_en: "" })),
    descrizione: extra.descrizione ?? "",
    descrizione_en: extra.descrizione_en ?? "",
    in_evidenza: false,
    ...(ordineBase ? { ordine: ordineBase + n + 1 } : {}),
    stato: bozza ? "bozza" : "pubblicata",
    origine: foto.map((f) => path.basename(f)).join(" · "),
  };
  const dir = path.join(OPERE, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.yaml"), yaml.dump(opera, { lineWidth: 100, quotingType: '"' }));
  n++;
  if (n % 20 === 0) process.stdout.write(`  … ${n} opere\n`);
}

const mb = (b) => (b / 1e6).toFixed(0);
console.log(`\nImportate ${n} opere come "${categoria}"${bozza ? " (bozza)" : ""}${prova ? " — PROVA, nulla è stato scritto" : ""}.`);
if (!prova && n) {
  console.log(`Originali letti: ${mb(pesoOrig)} MB (lasciati dove sono) → master creati: ${mb(pesoMaster)} MB.`);
  console.log(`Tempo: ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  console.log(`\nOra lancia \`npm run immagini\` (o \`npm run dev\`) per generare le versioni pubblicate.`);
}

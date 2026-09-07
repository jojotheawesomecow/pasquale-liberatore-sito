#!/usr/bin/env node
/**
 * Importazione massiva di opere dalla cartella `import/`.
 * Vedi import/LEGGIMI.md per le istruzioni.
 *   npm run importa -- --categoria pittura [--bozza]
 */
import fs from "node:fs";
import path from "node:path";
import * as yaml from "js-yaml";

const ROOT = process.cwd();
const IMPORT = path.join(ROOT, "import");
const OPERE = path.join(ROOT, "content", "opere");
const MEDIA = path.join(ROOT, "content", "media", "opere");
const EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic", ".tif", ".tiff"]);
const CATEGORIE = ["scultura", "opera-pubblica", "pittura", "disegno", "installazione", "performance"];

const args = process.argv.slice(2);
const opzione = (nome, predef) => {
  const i = args.indexOf(`--${nome}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : predef;
};
const categoria = opzione("categoria", "pittura");
const bozza = args.includes("--bozza");
if (!CATEGORIE.includes(categoria)) {
  console.error(`Categoria non valida: ${categoria}. Usa una tra: ${CATEGORIE.join(", ")}`);
  process.exit(1);
}

const slugify = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "opera";

/** Da "Germoglio 2021 60x35x15.jpg" ricava titolo, anno e dimensioni. */
function analizzaNome(nome) {
  let base = nome.replace(/\.[^.]+$/, "").replace(/[_]+/g, " ").trim();
  const anno = (base.match(/\b(19|20)\d{2}\b/) ?? [])[0] ?? "";
  const dim = (base.match(/\b\d+(?:[.,]\d+)?\s*[x×]\s*\d+(?:[.,]\d+)?(?:\s*[x×]\s*\d+(?:[.,]\d+)?)?\s*(?:cm)?\b/i) ?? [])[0] ?? "";
  let titolo = base;
  if (anno) titolo = titolo.replace(anno, "");
  if (dim) titolo = titolo.replace(dim, "");
  titolo = titolo.replace(/\s*-\s*/g, " ").replace(/\s{2,}/g, " ").replace(/^[\s,.-]+|[\s,.-]+$/g, "").trim();
  if (!titolo) titolo = "Senza titolo";
  const dimensioni = dim ? dim.replace(/\s*[x×]\s*/gi, "×").replace(/\s*cm$/i, "").trim() + " cm" : "";
  return { titolo, anno, dimensioni };
}

/** Legge import/schede.csv (separatore , o ;) → mappa file → campi. */
function leggiCsv() {
  const p = path.join(IMPORT, "schede.csv");
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

function scriviOpera(slug, dati, foto, extra) {
  const dir = path.join(OPERE, slug);
  if (fs.existsSync(path.join(dir, "index.yaml"))) {
    console.log(`  · esiste già: ${slug} (saltata)`);
    return false;
  }
  fs.mkdirSync(dir, { recursive: true });
  const media = path.join(MEDIA, slug);
  fs.mkdirSync(media, { recursive: true });
  const nomi = [];
  foto.forEach((f, i) => {
    const ext = path.extname(f).toLowerCase() === ".jpeg" ? ".jpg" : path.extname(f).toLowerCase();
    const nome = i === 0 ? `${slug}${ext}` : `${slug}-${i + 1}${ext}`;
    fs.renameSync(f, path.join(media, nome));
    nomi.push(`/media/opere/${slug}/${nome}`);
  });
  const opera = {
    titolo: dati.titolo,
    titolo_en: extra.titolo_en ?? "",
    categoria: extra.categoria && CATEGORIE.includes(extra.categoria) ? extra.categoria : categoria,
    anno: extra.anno || dati.anno || "",
    luogo: extra.luogo ?? "",
    materiale: extra.materiale ?? "",
    tecnica: extra.tecnica ?? "",
    dimensioni: extra.dimensioni || dati.dimensioni || "",
    collezione: extra.collezione ?? "",
    foto: nomi[0],
    galleria: nomi.slice(1).map((n) => ({ foto: n, didascalia: "", didascalia_en: "" })),
    descrizione: extra.descrizione ?? "",
    descrizione_en: extra.descrizione_en ?? "",
    in_evidenza: false,
    stato: bozza ? "bozza" : "pubblicata",
  };
  fs.writeFileSync(path.join(dir, "index.yaml"), yaml.dump(opera, { lineWidth: 100, quotingType: '"' }));
  console.log(`  ✓ ${slug}  (${foto.length} foto)`);
  return true;
}

if (!fs.existsSync(IMPORT)) fs.mkdirSync(IMPORT, { recursive: true });
const csv = leggiCsv();
let n = 0;
for (const voce of fs.readdirSync(IMPORT, { withFileTypes: true })) {
  if (voce.name.startsWith(".") || voce.name === "LEGGIMI.md" || voce.name === "schede.csv") continue;
  const p = path.join(IMPORT, voce.name);
  if (voce.isDirectory()) {
    const foto = fs.readdirSync(p).filter((f) => EXT.has(path.extname(f).toLowerCase()) && !f.startsWith(".")).sort().map((f) => path.join(p, f));
    if (!foto.length) continue;
    const dati = analizzaNome(voce.name);
    const extra = csv.get(voce.name.toLowerCase()) ?? {};
    const slug = slugify(`${extra.titolo || dati.titolo} ${extra.anno || dati.anno}`);
    if (scriviOpera(slug, { ...dati, titolo: extra.titolo || dati.titolo }, foto, extra)) n++;
    if (!fs.readdirSync(p).length) fs.rmdirSync(p);
  } else if (EXT.has(path.extname(voce.name).toLowerCase())) {
    const dati = analizzaNome(voce.name);
    const extra = csv.get(voce.name.replace(/\.[^.]+$/, "").toLowerCase()) ?? {};
    const slug = slugify(`${extra.titolo || dati.titolo} ${extra.anno || dati.anno}`);
    if (scriviOpera(slug, { ...dati, titolo: extra.titolo || dati.titolo }, [p], extra)) n++;
  }
}
console.log(`\nImportate ${n} opere come "${categoria}"${bozza ? " (bozza)" : ""}.`);
console.log("Ora avvia `npm run dev` (o `npm run immagini`) per generare le immagini ottimizzate, e completa le schede dal pannello /keystatic.");

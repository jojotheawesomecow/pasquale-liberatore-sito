#!/usr/bin/env node
/**
 * Compilazione dei dati delle opere in due tempi.
 *
 *   npm run schede                 → crea `schede-opere.csv` (foglio da compilare) e
 *                                    `provino-opere.html` (provino stampabile con i numeri)
 *   npm run schede -- --applica    → rilegge il foglio compilato e aggiorna le schede
 *
 * Nel foglio si riempiono solo le caselle che si conoscono: le vuote non toccano nulla.
 * Si apre con Excel, Numbers o Fogli Google. Va salvato in formato CSV.
 */
import fs from "node:fs";
import path from "node:path";
import * as yaml from "js-yaml";

const ROOT = process.cwd();
const OPERE = path.join(ROOT, "content", "opere");
const CSV = path.join(ROOT, "schede-opere.csv");
const HTML = path.join(ROOT, "provino-opere.html");
const COLONNE = ["codice", "cartella", "titolo", "titolo_en", "anno", "tecnica", "materiale", "dimensioni", "luogo", "collezione", "categoria", "descrizione", "in_evidenza", "stato"];
const applica = process.argv.includes("--applica");

const leggi = (slug) => yaml.load(fs.readFileSync(path.join(OPERE, slug, "index.yaml"), "utf8"));
const slugs = fs
  .readdirSync(OPERE, { withFileTypes: true })
  .filter((v) => v.isDirectory() && fs.existsSync(path.join(OPERE, v.name, "index.yaml")))
  .map((v) => v.name);

const virgola = (v) => {
  const s = String(v ?? "");
  return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

function parseCsv(testo) {
  const righe = [];
  let campo = "";
  let riga = [];
  let q = false;
  const sep = (testo.split("\n")[0].match(/;/g) ?? []).length > (testo.split("\n")[0].match(/,/g) ?? []).length ? ";" : ",";
  for (let i = 0; i < testo.length; i++) {
    const c = testo[i];
    if (q) {
      if (c === '"' && testo[i + 1] === '"') { campo += '"'; i++; }
      else if (c === '"') q = false;
      else campo += c;
    } else if (c === '"') q = true;
    else if (c === sep) { riga.push(campo); campo = ""; }
    else if (c === "\n") { riga.push(campo); righe.push(riga); riga = []; campo = ""; }
    else if (c !== "\r") campo += c;
  }
  if (campo || riga.length) { riga.push(campo); righe.push(riga); }
  return righe.filter((r) => r.some((c) => c.trim()));
}

if (applica) {
  if (!fs.existsSync(CSV)) {
    console.error(`Non trovo ${path.basename(CSV)}. Lancia prima \`npm run schede\`.`);
    process.exit(1);
  }
  const righe = parseCsv(fs.readFileSync(CSV, "utf8"));
  const intest = righe[0].map((c) => c.trim().toLowerCase());
  let cambiate = 0;
  for (const r of righe.slice(1)) {
    const rec = Object.fromEntries(intest.map((k, i) => [k, (r[i] ?? "").trim()]));
    const slug = rec.cartella;
    if (!slug || !fs.existsSync(path.join(OPERE, slug, "index.yaml"))) continue;
    const opera = leggi(slug);
    let tocca = false;
    for (const c of COLONNE) {
      if (c === "cartella" || !rec[c]) continue;
      const valore = c === "in_evidenza" ? /^(1|si|sì|x|true|vero)$/i.test(rec[c]) : rec[c];
      if (opera[c] !== valore) { opera[c] = valore; tocca = true; }
    }
    if (tocca) {
      fs.writeFileSync(path.join(OPERE, slug, "index.yaml"), yaml.dump(opera, { lineWidth: 100, quotingType: '"' }));
      cambiate++;
    }
  }
  console.log(`Aggiornate ${cambiate} schede su ${righe.length - 1} righe.`);
  console.log("Ricorda di rivedere il sito con `npm run dev` e poi di pubblicare.");
} else {
  const dati = slugs.map((slug) => ({ slug, o: leggi(slug) }));
  dati.sort((a, b) => (a.o.ordine ?? 1e9) - (b.o.ordine ?? 1e9) || a.slug.localeCompare(b.slug));

  const righe = [COLONNE.join(",")];
  for (const { slug, o } of dati) {
    righe.push(
      COLONNE.map((c) => virgola(c === "cartella" ? slug : c === "in_evidenza" ? (o.in_evidenza ? "sì" : "") : o[c] ?? "")).join(",")
    );
  }
  fs.writeFileSync(CSV, "﻿" + righe.join("\n") + "\n");

  const card = dati
    .map(({ slug, o }) => {
      const base = (o.foto ?? "").replace(/\.[^.]+$/, "");
      const src = base ? `public${base}-480.webp` : "";
      return `<figure><img loading="lazy" src="${src}" alt=""><figcaption><b>${o.codice || slug}</b>${o.titolo && o.titolo !== "Senza titolo" ? `<br>${o.titolo}` : ""}${o.anno ? `<br>${o.anno}` : ""}</figcaption></figure>`;
    })
    .join("\n");
  fs.writeFileSync(
    HTML,
    `<!doctype html><html lang="it"><meta charset="utf-8"><title>Provino delle opere — Pasquale Liberatore</title>
<style>
  :root { font-family: ui-sans-serif, system-ui, sans-serif; }
  body { margin: 24px; color: #1b1b1b; }
  h1 { font-weight: 500; font-size: 20px; margin: 0 0 4px; }
  p.intro { margin: 0 0 20px; color: #666; font-size: 13px; max-width: 70ch; }
  .griglia { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 14px; }
  figure { margin: 0; break-inside: avoid; }
  img { width: 100%; height: 150px; object-fit: contain; background: #f0efec; display: block; }
  figcaption { font-size: 10px; line-height: 1.35; margin-top: 4px; color: #333; }
  b { font-family: ui-monospace, Menlo, monospace; letter-spacing: 0.04em; }
  @media print { body { margin: 8mm; } p.intro { display: none; } .griglia { grid-template-columns: repeat(6, 1fr); gap: 6px; } img { height: 95px; } }
</style>
<h1>Provino delle opere — ${dati.length} schede</h1>
<p class="intro">Ogni immagine ha il suo numero d'archivio. Per aggiungere titoli, anni, tecniche e misure basta scrivere nel foglio <code>schede-opere.csv</code> sulla riga con lo stesso numero, poi lanciare <code>npm run schede -- --applica</code>. Si può anche stampare questo foglio e annotarlo a mano.</p>
<div class="griglia">
${card}
</div>
</html>`
  );

  console.log(`Creati:\n  ${path.basename(CSV)}   (${dati.length} righe da compilare)\n  ${path.basename(HTML)}  (provino stampabile)`);
  console.log(`\nCompila le caselle che conosci, salva in CSV e poi lancia:\n  npm run schede -- --applica`);
}

#!/usr/bin/env node
/**
 * Prepara i dati che il pannello mostra dopo il login.
 * Il file finisce in `dati/`, che NON viene pubblicato: lo legge soltanto il servizio
 * protetto da password. Così chi apre /gestione senza entrare non vede nulla.
 */
import fs from "node:fs";
import path from "node:path";
import * as yaml from "js-yaml";

const ROOT = process.cwd();
const OPERE = path.join(ROOT, "content", "opere");
const MANIFESTO = path.join(ROOT, "src", "generated", "immagini.json");
const DEST = path.join(ROOT, "dati", "opere.json");

const immagini = fs.existsSync(MANIFESTO) ? JSON.parse(fs.readFileSync(MANIFESTO, "utf8")) : {};

const opere = fs
  .readdirSync(OPERE, { withFileTypes: true })
  .filter((v) => v.isDirectory() && fs.existsSync(path.join(OPERE, v.name, "index.yaml")))
  .map((v) => {
    const scheda = yaml.load(fs.readFileSync(path.join(OPERE, v.name, "index.yaml"), "utf8"));
    const img = immagini[scheda.foto ?? ""] ?? null;
    const base = img ? img.base : "";
    const misure = img ? img.sizes : [];
    return {
      slug: v.name,
      codice: scheda.codice ?? "",
      titolo: scheda.titolo ?? "",
      anno: scheda.anno ?? "",
      tecnica: scheda.tecnica ?? "",
      materiale: scheda.materiale ?? "",
      dimensioni: scheda.dimensioni ?? "",
      luogo: scheda.luogo ?? "",
      categoria: scheda.categoria ?? "pittura",
      selezionata: Boolean(scheda.selezionata),
      bozza: scheda.stato === "bozza",
      anteprima: base && misure.length ? `${base}-${misure[Math.min(1, misure.length - 1)]}.webp` : "",
      grande: base && misure.length ? `${base}-${misure[misure.length - 1]}.webp` : "",
      percorsoFoto: (scheda.foto ?? "").replace(/^\/media\//, "content/media/"),
      w: img?.w ?? 1,
      h: img?.h ?? 1,
      origine: scheda.origine ?? "",
      aggiunta: scheda.aggiunta ?? "",
      scheda,
    };
  })
  .sort((a, b) => (a.scheda.ordine ?? 1e9) - (b.scheda.ordine ?? 1e9) || a.slug.localeCompare(b.slug));

fs.mkdirSync(path.dirname(DEST), { recursive: true });
fs.writeFileSync(DEST, JSON.stringify({ opere, quando: new Date().toISOString() }));
console.log(`Dati del pannello: ${opere.length} opere (${(fs.statSync(DEST).size / 1024).toFixed(0)} KB)`);

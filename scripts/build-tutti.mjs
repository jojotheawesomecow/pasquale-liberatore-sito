#!/usr/bin/env node
/**
 * Costruisce i tre temi e li riunisce in `out-tutti/`:
 *   out-tutti/      → tema A
 *   out-tutti/b/    → tema B
 *   out-tutti/c/    → tema C
 * Usato dal workflow GitHub Pages per l'anteprima comparativa.
 *   node scripts/build-tutti.mjs [base]     es. base = /pasquale-liberatore-sito
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const base = (process.argv[2] ?? process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const sito = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
const dest = path.join(root, "out-tutti");
fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });

const temi = { a: "", b: "/b", c: "/c" };
const anteprima = Object.entries(temi).map(([t, suffisso]) => `${t.toUpperCase()}=${base}${suffisso}/`).join("|");

for (const [tema, suffisso] of Object.entries(temi)) {
  console.log(`\n=== Tema ${tema.toUpperCase()} ===`);
  const r = spawnSync("npx", ["next", "build"], {
    stdio: "inherit",
    env: {
      ...process.env,
      TEMA: tema,
      NEXT_PUBLIC_BASE_PATH: `${base}${suffisso}`,
      NEXT_PUBLIC_SITE_URL: `${sito}${suffisso}`,
      NEXT_PUBLIC_ANTEPRIMA_TEMI: anteprima,
    },
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
  const out = path.join(root, "out");
  const target = suffisso ? path.join(dest, suffisso.slice(1)) : dest;
  fs.mkdirSync(target, { recursive: true });
  for (const voce of fs.readdirSync(out)) fs.renameSync(path.join(out, voce), path.join(target, voce));
  fs.rmSync(out, { recursive: true, force: true });
}
console.log(`\nFatto: ${dest}`);

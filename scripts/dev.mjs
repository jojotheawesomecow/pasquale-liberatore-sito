#!/usr/bin/env node
/**
 * Avvia insieme l'ottimizzatore immagini (in ascolto) e il server di sviluppo Next.js.
 *   npm run dev            → tema A su http://localhost:3000
 *   TEMA=b npm run dev -- -p 3001   → tema B su un'altra porta (si può tenere aperto insieme ad A)
 */
import { spawn, spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const tema = ["a", "b", "c"].includes(process.env.TEMA ?? "") ? process.env.TEMA : "a";
const argomenti = process.argv.slice(2);
const iPorta = argomenti.indexOf("-p");
const porta = iPorta >= 0 ? argomenti[iPorta + 1] : "3000";

// prima passata sincrona: così il manifesto delle immagini esiste prima che parta Next
spawnSync(process.execPath, [path.join(root, "scripts", "immagini.mjs")], { stdio: "inherit" });

const figli = [
  spawn(process.execPath, [path.join(root, "scripts", "immagini.mjs"), "--watch"], { stdio: "inherit" }),
  spawn(process.execPath, [nextBin, "dev", ...argomenti], { stdio: "inherit", env: { ...process.env, NODE_ENV: "development", TEMA: tema } }),
];

console.log(`\n  Tema ${tema.toUpperCase()}\n  Sito:      http://localhost:${porta}\n  Pannello:  http://localhost:${porta}/keystatic\n`);

const stop = () => {
  for (const f of figli) if (!f.killed) f.kill("SIGTERM");
  process.exit(0);
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
for (const f of figli) f.on("exit", (code) => { if (code && code !== 0) stop(); });

#!/usr/bin/env node
/** Avvia insieme l'ottimizzatore immagini (in ascolto) e il server di sviluppo Next.js. */
import { spawn, spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");

// prima passata sincrona: così il manifesto delle immagini esiste prima che parta Next
spawnSync(process.execPath, [path.join(root, "scripts", "immagini.mjs")], { stdio: "inherit" });

const figli = [
  spawn(process.execPath, [path.join(root, "scripts", "immagini.mjs"), "--watch"], { stdio: "inherit" }),
  spawn(process.execPath, [nextBin, "dev", ...process.argv.slice(2)], { stdio: "inherit", env: { ...process.env, NODE_ENV: "development" } }),
];

console.log("\n  Sito:      http://localhost:3000\n  Pannello:  http://localhost:3000/keystatic\n");

const stop = () => {
  for (const f of figli) if (!f.killed) f.kill("SIGTERM");
  process.exit(0);
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
for (const f of figli) f.on("exit", (code) => { if (code && code !== 0) stop(); });

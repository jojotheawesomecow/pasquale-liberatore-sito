import path from "node:path";
import type { NextConfig } from "next";

// In sviluppo (`npm run dev`) il pannello di amministrazione Keystatic è attivo su /keystatic
// e le rotte che finiscono in `.dev.tsx` / `.dev.ts` vengono incluse.
// In produzione (`npm run build`) il sito viene esportato come file statici (cartella `out/`),
// pubblicabili su qualsiasi hosting: GitHub Pages, Aruba, Netlify, Vercel, Cloudflare...
const isDev = process.env.NODE_ENV === "development";

// Percorso base opzionale (es. "/pasquale-liberatore-sito" su GitHub Pages). Vuoto = radice del dominio.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

// Veste grafica: "a" (carta e pietra), "b" (ultra moderna), "c" (intermedia). Contenuti e pannello sono condivisi.
const TEMI = ["a", "b", "c"] as const;
const tema = (TEMI as readonly string[]).includes(process.env.TEMA ?? "") ? (process.env.TEMA as string) : "a";

const nextConfig: NextConfig = {
  output: isDev ? undefined : "export",
  pageExtensions: isDev ? ["dev.tsx", "dev.ts", "tsx", "ts"] : ["tsx", "ts"],
  // barre finali solo nell'export statico (es. /opere/ -> opere/index.html); in sviluppo no,
  // perché il router del pannello Keystatic non le gestisce
  trailingSlash: !isDev,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
  distDir: tema === "a" ? ".next" : `.next-${tema}`,
  env: { NEXT_PUBLIC_TEMA: tema },
  turbopack: {
    root: path.resolve(process.cwd()),
    resolveAlias: { "@tema": `./src/temi/${tema}` },
  },
};

export default nextConfig;

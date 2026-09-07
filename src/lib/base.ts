/** Prefisso opzionale del sito (es. "/pasquale-liberatore-sito" su GitHub Pages). */
export const BASE = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** Aggiunge il prefisso a un percorso assoluto interno (per <img src>, link non gestiti da <Link>). */
export const conBase = (p: string) => (p.startsWith("/") ? `${BASE}${p}` : p);

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://pasqualeliberatore.com").replace(/\/$/, "");
export const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "1";

/** Prefisso opzionale del sito (es. "/pasquale-liberatore-sito" su GitHub Pages). */
export const BASE = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** Aggiunge il prefisso a un percorso assoluto interno (per <img src>, link non gestiti da <Link>). */
export const conBase = (p: string) => (p.startsWith("/") ? `${BASE}${p}` : p);

/**
 * Prefisso delle immagini. Nell'anteprima con più temi punta a una cartella unica,
 * così le foto non vengono duplicate per ogni veste grafica. Se non impostato, segue il sito.
 */
export const BASE_MEDIA = (process.env.NEXT_PUBLIC_MEDIA_BASE ?? process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
export const conBaseMedia = (p: string) => (p.startsWith("/") ? `${BASE_MEDIA}${p}` : p);

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://pasqualeliberatore.com").replace(/\/$/, "");
export const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "1";

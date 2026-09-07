import fs from "node:fs";
import path from "node:path";
import { conBase } from "./base";

import type { Foto } from "./tipi";
export type { Foto };

type Voce = { w: number; h: number; sizes: number[]; base: string; blur: string };

let cache: Record<string, Voce> | null = null;
let cacheMtime = 0;
const FILE = path.join(process.cwd(), "src", "generated", "immagini.json");

function manifesto(): Record<string, Voce> {
  try {
    const mtime = fs.statSync(FILE).mtimeMs;
    if (!cache || mtime !== cacheMtime) {
      cache = JSON.parse(fs.readFileSync(FILE, "utf8"));
      cacheMtime = mtime;
    }
  } catch {
    cache = cache ?? {};
  }
  return cache!;
}

/** Restituisce i dati per mostrare un'immagine, oppure null se non è stata ancora ottimizzata. */
export function foto(src: string | null | undefined): Foto | null {
  if (!src) return null;
  const v = manifesto()[src];
  if (!v) return null;
  const grande = v.sizes[v.sizes.length - 1];
  return {
    src,
    w: v.w,
    h: v.h,
    sizes: v.sizes,
    url: conBase(`${v.base}-${grande}.webp`),
    srcSet: v.sizes.map((s) => `${conBase(`${v.base}-${s}.webp`)} ${s}w`).join(", "),
    blur: v.blur,
  };
}

import { createReader, type Entry, type EntryWithResolvedLinkedFiles } from "@keystatic/core/reader";
import config from "../../keystatic.config";
import type { Lang } from "./rotte";

export const reader = createReader(process.cwd(), config);

type Cfg = typeof config;
export type Opera = Entry<Cfg["collections"]["opere"]> & { slug: string };
export type Riflessione = EntryWithResolvedLinkedFiles<Cfg["collections"]["riflessioni"]> & { slug: string };
export type Video = Entry<Cfg["collections"]["video"]> & { slug: string };
export type Impostazioni = NonNullable<Entry<Cfg["singletons"]["impostazioni"]>>;
export type Home = NonNullable<Entry<Cfg["singletons"]["home"]>>;
export type Bio = NonNullable<EntryWithResolvedLinkedFiles<Cfg["singletons"]["bio"]>>;
export type Giardino = NonNullable<EntryWithResolvedLinkedFiles<Cfg["singletons"]["giardino"]>>;
export type Contatti = NonNullable<Entry<Cfg["singletons"]["contatti"]>>;

const annoNumero = (a: string | null | undefined): number => {
  const m = (a ?? "").match(/\d{4}/);
  return m ? parseInt(m[0], 10) : -1;
};

/** Ordina per campo `ordine` (se presente), poi per anno decrescente, poi per titolo. */
function ordina<T extends { ordine?: number | null; anno?: string | null; titolo: string }>(a: T, b: T): number {
  const oa = a.ordine ?? Number.MAX_SAFE_INTEGER;
  const ob = b.ordine ?? Number.MAX_SAFE_INTEGER;
  if (oa !== ob) return oa - ob;
  const ya = annoNumero(a.anno);
  const yb = annoNumero(b.anno);
  if (ya !== yb) return yb - ya;
  return a.titolo.localeCompare(b.titolo, "it");
}

export async function getOpere(): Promise<Opera[]> {
  const tutte = await reader.collections.opere.all();
  return tutte
    .filter((o) => o.entry.stato !== "bozza")
    .map((o) => ({ slug: o.slug, ...o.entry }))
    .sort(ordina);
}

export async function getOpera(slug: string): Promise<Opera | null> {
  const e = await reader.collections.opere.read(slug);
  if (!e || e.stato === "bozza") return null;
  return { slug, ...e };
}

export async function getRiflessioni(): Promise<Riflessione[]> {
  const tutte = await reader.collections.riflessioni.all({ resolveLinkedFiles: true });
  return tutte
    .filter((r) => r.entry.stato !== "bozza")
    .map((r) => ({ slug: r.slug, ...r.entry }))
    .sort((a, b) => (b.data ?? "").localeCompare(a.data ?? ""));
}

export async function getRiflessione(slug: string): Promise<Riflessione | null> {
  const e = await reader.collections.riflessioni.read(slug, { resolveLinkedFiles: true });
  if (!e || e.stato === "bozza") return null;
  return { slug, ...e };
}

export async function getVideo(): Promise<Video[]> {
  const tutti = await reader.collections.video.all();
  return tutti.map((v) => ({ slug: v.slug, ...v.entry })).sort(ordina);
}

export async function getImpostazioni(): Promise<Impostazioni> {
  const i = await reader.singletons.impostazioni.read();
  if (!i) throw new Error("Manca content/impostazioni/index.yaml");
  return i;
}
export async function getHome(): Promise<Home> {
  const h = await reader.singletons.home.read();
  if (!h) throw new Error("Manca content/home/index.yaml");
  return h;
}
export async function getBio(): Promise<Bio> {
  const b = await reader.singletons.bio.read({ resolveLinkedFiles: true });
  if (!b) throw new Error("Manca content/bio/index.mdoc");
  return b;
}
export async function getGiardino(): Promise<Giardino> {
  const g = await reader.singletons.giardino.read({ resolveLinkedFiles: true });
  if (!g) throw new Error("Manca content/giardino/index.mdoc");
  return g;
}
export async function getContatti(): Promise<Contatti> {
  const c = await reader.singletons.contatti.read();
  if (!c) throw new Error("Manca content/contatti/index.yaml");
  return c;
}

/** Estrae l'ID di un video YouTube da un URL nei formati più comuni. */
export function youtubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

export const decadeDi = (anno: string | null | undefined): string | null => {
  const y = annoNumero(anno);
  return y > 0 ? `${Math.floor(y / 10) * 10}` : null;
};

export { annoNumero };
export type { Lang };

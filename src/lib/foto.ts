/**
 * Lavorazioni sulle foto fatte dentro al browser, senza passare dal sito:
 * rimpicciolire, ruotare, ritagliare. Tutte restituiscono la stessa cosa —
 * l'immagine pronta da salvare e un indirizzo per mostrarla subito.
 */

export type FotoPronta = { base64: string; w: number; h: number; anteprima: string };

/** Quanto largo può essere il lato di una foto salvata: come le altre del sito. */
export const LATO_MAX = 2000;

/** Converte la tela in una foto leggera, pronta da salvare e da mostrare subito. */
export async function daTela(tela: HTMLCanvasElement): Promise<FotoPronta> {
  const nuovo: Blob = await new Promise((ok) => tela.toBlob((b) => ok(b!), "image/webp", 0.82));
  const buffer = await nuovo.arrayBuffer();
  let binario = "";
  const byte = new Uint8Array(buffer);
  for (let i = 0; i < byte.length; i += 8192) binario += String.fromCharCode(...byte.subarray(i, i + 8192));
  return { base64: btoa(binario), w: tela.width, h: tela.height, anteprima: URL.createObjectURL(nuovo) };
}

/** Prende una foto scelta sul computer e la rimpicciolisce quanto serve al sito. */
export async function daFile(file: File): Promise<FotoPronta> {
  const bitmap = await createImageBitmap(file);
  const scala = Math.min(1, LATO_MAX / Math.max(bitmap.width, bitmap.height));
  const tela = document.createElement("canvas");
  tela.width = Math.round(bitmap.width * scala);
  tela.height = Math.round(bitmap.height * scala);
  tela.getContext("2d")!.drawImage(bitmap, 0, 0, tela.width, tela.height);
  return daTela(tela);
}

/** Ruota la foto e restituisce la nuova immagine, pronta da salvare. */
export async function ruotaImmagine(url: string, gradi: number): Promise<FotoPronta> {
  const bitmap = await createImageBitmap(await (await fetch(url, { cache: "no-store" })).blob());
  const orizzontale = Math.abs(gradi) === 90;
  const tela = document.createElement("canvas");
  tela.width = orizzontale ? bitmap.height : bitmap.width;
  tela.height = orizzontale ? bitmap.width : bitmap.height;
  const ctx = tela.getContext("2d")!;
  ctx.translate(tela.width / 2, tela.height / 2);
  ctx.rotate((gradi * Math.PI) / 180);
  ctx.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2);
  return daTela(tela);
}

/** Il riquadro scelto, in frazioni del lato: 0 è il bordo, 1 è l'altro bordo. */
export type Riquadro = { x: number; y: number; w: number; h: number };

/** Tiene solo la parte dentro al riquadro. */
export async function ritagliaImmagine(url: string, r: Riquadro): Promise<FotoPronta> {
  const bitmap = await createImageBitmap(await (await fetch(url, { cache: "no-store" })).blob());
  const x = Math.round(r.x * bitmap.width);
  const y = Math.round(r.y * bitmap.height);
  const larghezza = Math.max(1, Math.round(r.w * bitmap.width));
  const altezza = Math.max(1, Math.round(r.h * bitmap.height));
  const scala = Math.min(1, LATO_MAX / Math.max(larghezza, altezza));
  const tela = document.createElement("canvas");
  tela.width = Math.round(larghezza * scala);
  tela.height = Math.round(altezza * scala);
  tela.getContext("2d")!.drawImage(bitmap, x, y, larghezza, altezza, 0, 0, tela.width, tela.height);
  return daTela(tela);
}

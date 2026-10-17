/**
 * Riconoscimento di chi usa il pannello.
 * Le password non vengono mai salvate: si conserva solo un'impronta,
 * calcolata con PBKDF2, dalla quale non si può risalire alla password.
 */

export type Utente = { email: string; nome: string; impronta: string; sale: string; giri: number };
export type Sessione = { email: string; nome: string; scade: number };

const GIRI = 150_000;
const cod = new TextEncoder();

const aBase64url = (b: ArrayBuffer | Uint8Array) => {
  const byte = b instanceof Uint8Array ? b : new Uint8Array(b);
  let s = "";
  for (let i = 0; i < byte.length; i += 8192) s += String.fromCharCode(...byte.subarray(i, i + 8192));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
const daBase64url = (s: string) => {
  const b = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(b, (c) => c.charCodeAt(0));
};

export const normalizzaEmail = (e: string) => e.trim().toLowerCase();

/** Confronto a tempo costante: non rivela quanti caratteri erano giusti. */
export function pariUguali(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function calcolaImpronta(password: string, sale: string, giri = GIRI) {
  const chiave = await crypto.subtle.importKey("raw", cod.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bit = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: daBase64url(sale), iterations: giri, hash: "SHA-256" }, chiave, 256);
  return aBase64url(bit);
}

export async function creaUtente(email: string, nome: string, password: string): Promise<Utente> {
  const sale = aBase64url(crypto.getRandomValues(new Uint8Array(16)));
  return { email: normalizzaEmail(email), nome: nome.trim(), impronta: await calcolaImpronta(password, sale), sale, giri: GIRI };
}

export async function passwordGiusta(utente: Utente, password: string) {
  const prova = await calcolaImpronta(password, utente.sale, utente.giri ?? GIRI);
  return pariUguali(prova, utente.impronta);
}

async function chiaveFirma(segreto: string) {
  return crypto.subtle.importKey("raw", cod.encode(segreto), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

/** Crea un lasciapassare firmato: chi lo possiede è riconosciuto, ma non può modificarlo. */
export async function firma(dati: Record<string, unknown>, segreto: string) {
  const corpo = aBase64url(cod.encode(JSON.stringify(dati)));
  const firma = await crypto.subtle.sign("HMAC", await chiaveFirma(segreto), cod.encode(corpo));
  return `${corpo}.${aBase64url(firma)}`;
}

export async function verifica<T = Record<string, unknown>>(gettone: string, segreto: string): Promise<T | null> {
  const [corpo, firmaRicevuta] = (gettone ?? "").split(".");
  if (!corpo || !firmaRicevuta) return null;
  const valida = await crypto.subtle.verify("HMAC", await chiaveFirma(segreto), daBase64url(firmaRicevuta), cod.encode(corpo));
  if (!valida) return null;
  try {
    const dati = JSON.parse(new TextDecoder().decode(daBase64url(corpo))) as { scade?: number };
    if (typeof dati.scade === "number" && Date.now() > dati.scade) return null;
    return dati as T;
  } catch {
    return null;
  }
}

/** Legge il lasciapassare dall'intestazione della richiesta. */
export async function sessioneDi(richiesta: Request, segreto: string): Promise<Sessione | null> {
  const gettone = richiesta.headers.get("x-pannello-sessione") ?? "";
  return verifica<Sessione>(gettone, segreto);
}

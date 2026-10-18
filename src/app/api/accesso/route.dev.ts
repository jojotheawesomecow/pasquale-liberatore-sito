import fs from "node:fs/promises";
import path from "node:path";
import { creaUtente, firma, normalizzaEmail, passwordGiusta, verifica, type Sessione, type Utente } from "../../../../functions/comuni/accessi";

/**
 * Stesso ingresso del servizio su Cloudflare, ma le persone stanno in un file
 * del computer invece che nell'archivio UTENTI. Serve solo con `npm run dev`.
 */
const ARCHIVIO = path.join(process.cwd(), "dati", "utenti-dev.json");
const SEGRETO = process.env.GESTIONE_ACCESSI ?? "sviluppo";
const GIORNI_30 = 30 * 24 * 60 * 60 * 1000;

async function leggiTutti(): Promise<Utente[]> {
  try {
    return JSON.parse(await fs.readFile(ARCHIVIO, "utf8")) as Utente[];
  } catch {
    return [];
  }
}

async function salvaTutti(utenti: Utente[]) {
  await fs.mkdir(path.dirname(ARCHIVIO), { recursive: true });
  await fs.writeFile(ARCHIVIO, JSON.stringify(utenti, null, 2));
}

const elenco = (utenti: Utente[], io?: string) => utenti.map((u) => ({ email: u.email, nome: u.nome, tu: u.email === io }));
const gettoneDi = (u: Utente) => firma({ email: u.email, nome: u.nome, scade: Date.now() + GIORNI_30 }, SEGRETO);

export async function POST(richiesta: Request) {
  let corpo: Record<string, string>;
  try {
    corpo = (await richiesta.json()) as Record<string, string>;
  } catch {
    return Response.json({ errore: "richiesta non leggibile" }, { status: 400 });
  }

  const utenti = await leggiTutti();
  const azione = corpo.azione ?? "";

  if (azione === "stato") return Response.json({ ok: true, quanti: utenti.length, recuperoAttivo: false });

  if (azione === "primo-ingresso") {
    if (utenti.length > 0) return Response.json({ errore: "Le persone ammesse esistono già." }, { status: 409 });
    if (corpo.parola !== SEGRETO) return Response.json({ errore: "Parola d'accesso errata." }, { status: 401 });
    if (!corpo.email || !corpo.password || corpo.password.length < 8) {
      return Response.json({ errore: "Servono un'email e una password di almeno otto caratteri." }, { status: 400 });
    }
    const utente = await creaUtente(corpo.email, corpo.nome || corpo.email, corpo.password);
    await salvaTutti([utente]);
    return Response.json({ ok: true, nome: utente.nome, sessione: await gettoneDi(utente) });
  }

  if (azione === "entra") {
    const utente = utenti.find((u) => u.email === normalizzaEmail(corpo.email ?? ""));
    if (!utente || !(await passwordGiusta(utente, corpo.password ?? ""))) {
      return Response.json({ errore: "Email o password non corrette." }, { status: 401 });
    }
    return Response.json({ ok: true, nome: utente.nome, sessione: await gettoneDi(utente) });
  }

  if (azione === "recupera") {
    return Response.json({ ok: true, messaggio: "In locale il recupero via email non esiste: cancella dati/utenti-dev.json e ricomincia." });
  }

  const sessione = await verifica<Sessione>(richiesta.headers.get("x-pannello-sessione") ?? "", SEGRETO);
  if (!sessione) return Response.json({ errore: "Devi entrare nel pannello." }, { status: 401 });

  if (azione === "elenco-persone") return Response.json({ ok: true, persone: elenco(utenti, sessione.email), recuperoAttivo: false });

  if (azione === "aggiungi-persona") {
    if (!corpo.email || !corpo.password || corpo.password.length < 8) {
      return Response.json({ errore: "Servono un'email e una password di almeno otto caratteri." }, { status: 400 });
    }
    const utente = await creaUtente(corpo.email, corpo.nome || corpo.email, corpo.password);
    const aggiornati = [...utenti.filter((u) => u.email !== utente.email), utente];
    await salvaTutti(aggiornati);
    return Response.json({ ok: true, persone: elenco(aggiornati, sessione.email) });
  }

  if (azione === "togli-persona") {
    const email = normalizzaEmail(corpo.email ?? "");
    if (email === sessione.email) return Response.json({ errore: "Non puoi togliere te stesso." }, { status: 400 });
    const aggiornati = utenti.filter((u) => u.email !== email);
    await salvaTutti(aggiornati);
    return Response.json({ ok: true, persone: elenco(aggiornati, sessione.email) });
  }

  if (azione === "cambia-password") {
    const utente = utenti.find((u) => u.email === sessione.email);
    if (!utente) return Response.json({ errore: "Persona non trovata." }, { status: 404 });
    if (!(await passwordGiusta(utente, corpo.vecchia ?? ""))) return Response.json({ errore: "La password attuale non è corretta." }, { status: 401 });
    if (!corpo.password || corpo.password.length < 8) return Response.json({ errore: "La nuova password deve avere almeno otto caratteri." }, { status: 400 });
    const nuovo = await creaUtente(utente.email, utente.nome, corpo.password);
    await salvaTutti(utenti.map((u) => (u.email === nuovo.email ? nuovo : u)));
    return Response.json({ ok: true });
  }

  return Response.json({ errore: "azione sconosciuta" }, { status: 400 });
}

import { creaUtente, firma, normalizzaEmail, passwordGiusta, sessioneDi, verifica, type Utente } from "../comuni/accessi";

/**
 * Entrata nel pannello: login, recupero della password, gestione delle persone ammesse.
 * Le persone sono conservate nell'archivio UTENTI di Cloudflare, non nel progetto.
 */

type Ambiente = {
  UTENTI?: KVNamespace;
  GESTIONE_ACCESSI?: string;
  RESEND_API_KEY?: string;
  MITTENTE_EMAIL?: string;
  SITO_URL?: string;
};

const GIORNI_30 = 30 * 24 * 60 * 60 * 1000;
const ORA = 60 * 60 * 1000;

const segretoDi = (env: Ambiente) => env.GESTIONE_ACCESSI ?? "";
const chiaveUtente = (email: string) => `utente:${normalizzaEmail(email)}`;
const chiaveTentativi = (email: string) => `tentativi:${normalizzaEmail(email)}`;
const TENTATIVI_MAX = 10;
const PAUSA = 15 * 60; // secondi di attesa dopo troppi tentativi

async function leggiUtente(env: Ambiente, email: string): Promise<Utente | null> {
  if (!env.UTENTI) return null;
  return env.UTENTI.get<Utente>(chiaveUtente(email), "json");
}

async function elencoUtenti(env: Ambiente, io?: string) {
  if (!env.UTENTI) return [];
  const { keys } = await env.UTENTI.list({ prefix: "utente:" });
  const fuori: { email: string; nome: string; tu: boolean }[] = [];
  for (const k of keys) {
    const u = await env.UTENTI.get<Utente>(k.name, "json");
    if (u) fuori.push({ email: u.email, nome: u.nome, tu: u.email === io });
  }
  return fuori;
}

/** Manda l'email per rifare la password. Funziona solo se è stato collegato un servizio di posta. */
async function mandaEmail(env: Ambiente, a: string, nome: string, collegamento: string) {
  if (!env.RESEND_API_KEY) return false;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.MITTENTE_EMAIL ?? "Pannello <onboarding@resend.dev>",
      to: [a],
      subject: "Rifare la password del pannello",
      text: `Ciao ${nome},\n\nper scegliere una nuova password apri questo collegamento entro un'ora:\n\n${collegamento}\n\nSe non hai chiesto tu di cambiarla, puoi ignorare questo messaggio.`,
    }),
  });
  return r.ok;
}

export const onRequestPost: PagesFunction<Ambiente> = async (contesto) => {
  // se qualcosa si rompe davvero, la schermata deve poterlo dire invece di mostrare un 500 muto
  try {
    return await rispondi(contesto);
  } catch (e) {
    return Response.json({ errore: `Errore interno: ${e instanceof Error ? e.message : String(e)}` }, { status: 500 });
  }
};

const rispondi: PagesFunction<Ambiente> = async ({ env, request }) => {
  const segreto = segretoDi(env);
  if (!segreto) return Response.json({ errore: "Il pannello non è ancora stato attivato." }, { status: 503 });
  if (!env.UTENTI) return Response.json({ errore: "Manca l'archivio delle persone ammesse." }, { status: 503 });

  let corpo: Record<string, string>;
  try {
    corpo = await request.json();
  } catch {
    return Response.json({ errore: "richiesta non leggibile" }, { status: 400 });
  }
  const azione = corpo.azione ?? "";

  // quante persone esistono: serve alla prima configurazione
  if (azione === "stato") {
    const quanti = (await elencoUtenti(env)).length;
    return Response.json({ ok: true, quanti, recuperoAttivo: Boolean(env.RESEND_API_KEY) });
  }

  // prima persona: si crea con la parola d'accesso del pannello
  if (azione === "primo-ingresso") {
    const quanti = (await elencoUtenti(env)).length;
    if (quanti > 0) return Response.json({ errore: "Le persone ammesse esistono già." }, { status: 409 });
    if (corpo.parola !== segreto) return Response.json({ errore: "Parola d'accesso errata." }, { status: 401 });
    if (!corpo.email || !corpo.password || corpo.password.length < 8) {
      return Response.json({ errore: "Servono un'email e una password di almeno otto caratteri." }, { status: 400 });
    }
    const utente = await creaUtente(corpo.email, corpo.nome || corpo.email, corpo.password);
    await env.UTENTI.put(chiaveUtente(utente.email), JSON.stringify(utente));
    const sessione = await firma({ email: utente.email, nome: utente.nome, scade: Date.now() + GIORNI_30 }, segreto);
    return Response.json({ ok: true, nome: utente.nome, sessione });
  }

  if (azione === "entra") {
    const conta = chiaveTentativi(corpo.email ?? "");
    const sbagliati = Number(await env.UTENTI.get(conta)) || 0;
    if (sbagliati >= TENTATIVI_MAX) {
      return Response.json({ errore: "Troppi tentativi. Riprova fra un quarto d'ora." }, { status: 429 });
    }
    const utente = await leggiUtente(env, corpo.email ?? "");
    const giusta = utente ? await passwordGiusta(utente, corpo.password ?? "") : false;
    if (!utente || !giusta) {
      await env.UTENTI.put(conta, String(sbagliati + 1), { expirationTtl: PAUSA });
      // stesso messaggio in entrambi i casi: non si rivela se l'indirizzo esiste
      return Response.json({ errore: "Email o password non corrette." }, { status: 401 });
    }
    await env.UTENTI.delete(conta);
    const sessione = await firma({ email: utente.email, nome: utente.nome, scade: Date.now() + GIORNI_30 }, segreto);
    return Response.json({ ok: true, nome: utente.nome, sessione });
  }

  if (azione === "recupera") {
    const utente = await leggiUtente(env, corpo.email ?? "");
    if (utente) {
      // l'impronta nel gettone fa scadere il collegamento appena la password cambia
      const gettone = await firma(
        { email: utente.email, scopo: "reimposta", prova: utente.impronta.slice(0, 10), scade: Date.now() + ORA },
        segreto,
      );
      const sito = env.SITO_URL ?? "https://pasqualeliberatore.com";
      await mandaEmail(env, utente.email, utente.nome, `${sito}/gestione/?reimposta=${encodeURIComponent(gettone)}`);
    }
    // risposta identica anche se l'indirizzo non esiste
    return Response.json({
      ok: true,
      messaggio: env.RESEND_API_KEY
        ? "Se l'indirizzo è fra quelli ammessi, fra poco riceverai un'email con le istruzioni."
        : "Il recupero via email non è ancora attivo: chiedi a chi gestisce il sito di reimpostarla.",
    });
  }

  if (azione === "reimposta") {
    const dati = await verifica<{ email: string; scopo: string; prova?: string }>(corpo.gettone ?? "", segreto);
    if (!dati || dati.scopo !== "reimposta") return Response.json({ errore: "Il collegamento è scaduto o non è valido." }, { status: 401 });
    if (!corpo.password || corpo.password.length < 8) return Response.json({ errore: "La password deve avere almeno otto caratteri." }, { status: 400 });
    const utente = await leggiUtente(env, dati.email);
    if (!utente) return Response.json({ errore: "Persona non trovata." }, { status: 404 });
    if (dati.prova !== utente.impronta.slice(0, 10)) {
      return Response.json({ errore: "Il collegamento è già stato usato." }, { status: 401 });
    }
    await env.UTENTI.delete(chiaveTentativi(utente.email));
    const aggiornato = await creaUtente(utente.email, utente.nome, corpo.password);
    await env.UTENTI.put(chiaveUtente(utente.email), JSON.stringify(aggiornato));
    const sessione = await firma({ email: aggiornato.email, nome: aggiornato.nome, scade: Date.now() + GIORNI_30 }, segreto);
    return Response.json({ ok: true, nome: aggiornato.nome, sessione });
  }

  // da qui in poi serve essere già entrati
  const sessione = await sessioneDi(request, segreto);
  if (!sessione) return Response.json({ errore: "Devi entrare nel pannello." }, { status: 401 });

  if (azione === "elenco-persone") {
    return Response.json({ ok: true, persone: await elencoUtenti(env, sessione.email), recuperoAttivo: Boolean(env.RESEND_API_KEY) });
  }

  if (azione === "aggiungi-persona") {
    if (!corpo.email || !corpo.password || corpo.password.length < 8) {
      return Response.json({ errore: "Servono un'email e una password di almeno otto caratteri." }, { status: 400 });
    }
    const utente = await creaUtente(corpo.email, corpo.nome || corpo.email, corpo.password);
    await env.UTENTI.put(chiaveUtente(utente.email), JSON.stringify(utente));
    return Response.json({ ok: true, persone: await elencoUtenti(env, sessione.email) });
  }

  if (azione === "togli-persona") {
    const email = normalizzaEmail(corpo.email ?? "");
    if (email === sessione.email) return Response.json({ errore: "Non puoi togliere te stesso." }, { status: 400 });
    await env.UTENTI.delete(chiaveUtente(email));
    return Response.json({ ok: true, persone: await elencoUtenti(env, sessione.email) });
  }

  if (azione === "cambia-password") {
    const utente = await leggiUtente(env, sessione.email);
    if (!utente) return Response.json({ errore: "Persona non trovata." }, { status: 404 });
    const vecchiaGiusta = await passwordGiusta(utente, corpo.vecchia ?? "");
    if (!vecchiaGiusta) return Response.json({ errore: "La password attuale non è corretta." }, { status: 401 });
    if (!corpo.password || corpo.password.length < 8) return Response.json({ errore: "La nuova password deve avere almeno otto caratteri." }, { status: 400 });
    await env.UTENTI.put(chiaveUtente(utente.email), JSON.stringify(await creaUtente(utente.email, utente.nome, corpo.password)));
    return Response.json({ ok: true });
  }

  return Response.json({ errore: "azione sconosciuta" }, { status: 400 });
};

"use client";

import { useEffect, useState } from "react";
import type { Sessione } from "@/lib/sessione";

async function chiedi(corpo: Record<string, string>, gettone?: string) {
  const r = await fetch("/api/accesso", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(gettone ? { "x-pannello-sessione": gettone } : {}) },
    body: JSON.stringify(corpo),
  });
  return (await r.json()) as { ok?: boolean; errore?: string; nome?: string; sessione?: string; quanti?: number; messaggio?: string; recuperoAttivo?: boolean };
}

type Schermata = "entra" | "dimenticata" | "reimposta" | "primo";

/** Schermata d'ingresso: finché non si entra, del pannello non si vede nulla. */
export function Accesso({ entrato }: { entrato: (s: Sessione) => void }) {
  const [schermata, setSchermata] = useState<Schermata>("entra");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [parola, setParola] = useState("");
  const [gettoneReimposta, setGettone] = useState("");
  const [errore, setErrore] = useState("");
  const [avviso, setAvviso] = useState("");
  const [inCorso, setInCorso] = useState(false);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    let vivo = true;
    const avvio = async () => {
      // il collegamento di recupero porta con sé il gettone per la nuova password
      const recupero = new URLSearchParams(window.location.search).get("reimposta");
      const stato = recupero ? null : await chiedi({ azione: "stato" }).catch(() => null);
      if (!vivo) return;
      if (recupero) {
        setGettone(recupero);
        setSchermata("reimposta");
      } else if (stato?.quanti === 0) {
        setSchermata("primo");
      }
      setPronto(true);
    };
    void avvio();
    return () => {
      vivo = false;
    };
  }, []);

  const invia = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrore("");
    setAvviso("");
    setInCorso(true);
    try {
      let r;
      if (schermata === "entra") r = await chiedi({ azione: "entra", email, password });
      else if (schermata === "dimenticata") r = await chiedi({ azione: "recupera", email });
      else if (schermata === "reimposta") r = await chiedi({ azione: "reimposta", gettone: gettoneReimposta, password });
      else r = await chiedi({ azione: "primo-ingresso", parola, email, nome, password });

      if (r.sessione && r.nome) {
        window.history.replaceState(null, "", window.location.pathname);
        entrato({ gettone: r.sessione, nome: r.nome });
      } else if (r.ok && r.messaggio) {
        setAvviso(r.messaggio);
      } else {
        setErrore(r.errore ?? "Qualcosa non ha funzionato.");
      }
    } catch {
      setErrore("Non riesco a contattare il sito. Controlla la connessione.");
    }
    setInCorso(false);
  };

  if (!pronto) return <div className="acc-attesa" />;

  const titoli: Record<Schermata, string> = {
    entra: "Le opere di Pasquale",
    dimenticata: "Password dimenticata",
    reimposta: "Scegli una nuova password",
    primo: "Prima configurazione",
  };

  return (
    <div className="acc">
      <form className="acc-riquadro" onSubmit={invia}>
        <h1>{titoli[schermata]}</h1>

        {schermata === "entra" ? <p className="acc-sotto">Inserisci la tua email e la password per entrare.</p> : null}
        {schermata === "dimenticata" ? <p className="acc-sotto">Scrivi la tua email: ti mandiamo un collegamento per sceglierne una nuova.</p> : null}
        {schermata === "primo" ? <p className="acc-sotto">Non c&apos;è ancora nessuna persona abilitata. Crea la prima usando la parola d&apos;accesso del pannello.</p> : null}

        {schermata === "primo" ? (
          <label>
            <span>Parola d&apos;accesso del pannello</span>
            <input type="password" value={parola} onChange={(e) => setParola(e.target.value)} autoComplete="off" required />
          </label>
        ) : null}

        {schermata !== "reimposta" ? (
          <label>
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required autoFocus />
          </label>
        ) : null}

        {schermata === "primo" ? (
          <label>
            <span>Nome</span>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="come vuoi essere chiamata" autoComplete="name" />
          </label>
        ) : null}

        {schermata !== "dimenticata" ? (
          <label>
            <span>{schermata === "entra" ? "Password" : "Nuova password"}</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={schermata === "entra" ? "current-password" : "new-password"}
              minLength={schermata === "entra" ? undefined : 8}
              required
            />
          </label>
        ) : null}

        {errore ? <p className="acc-errore">{errore}</p> : null}
        {avviso ? <p className="acc-avviso">{avviso}</p> : null}

        <button type="submit" disabled={inCorso}>
          {inCorso ? "Un momento…" : schermata === "entra" ? "Entra" : schermata === "dimenticata" ? "Mandami il collegamento" : schermata === "reimposta" ? "Salva la nuova password" : "Crea e entra"}
        </button>

        {schermata === "entra" ? (
          <button type="button" className="acc-link" onClick={() => { setSchermata("dimenticata"); setErrore(""); }}>
            Ho dimenticato la password
          </button>
        ) : null}
        {schermata === "dimenticata" ? (
          <button type="button" className="acc-link" onClick={() => { setSchermata("entra"); setErrore(""); setAvviso(""); }}>
            Torna indietro
          </button>
        ) : null}
      </form>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import type { Sessione } from "@/lib/sessione";

type Persona = { email: string; nome: string; tu?: boolean };
type Risposta = { ok?: boolean; errore?: string; persone?: Persona[]; recuperoAttivo?: boolean };

/** Se il sito risponde con qualcosa che non è una risposta nostra, lo diciamo invece di tacere. */
async function leggiRisposta(r: Response) {
  const testo = await r.text();
  try {
    return JSON.parse(testo) as Record<string, unknown>;
  } catch {
    return { errore: `Il sito ha risposto in modo inatteso (${r.status}). Controlla di essere sull'indirizzo giusto.` };
  }
}


async function chiedi(corpo: Record<string, string>, gettone: string): Promise<Risposta> {
  const r = await fetch("/api/accesso", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-pannello-sessione": gettone },
    body: JSON.stringify(corpo),
  });
  return leggiRisposta(r) as Promise<Risposta>;
}

/** Chi può entrare nel pannello: si aggiunge, si toglie, si cambia la propria password. */
export function Persone({ sessione, chiudi }: { sessione: Sessione; chiudi: () => void }) {
  const [persone, setPersone] = useState<Persona[] | null>(null);
  const [recuperoAttivo, setRecupero] = useState(true);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vecchia, setVecchia] = useState("");
  const [nuova, setNuova] = useState("");
  const [errore, setErrore] = useState("");
  const [avviso, setAvviso] = useState("");
  const [inCorso, setInCorso] = useState(false);

  useEffect(() => {
    let vivo = true;
    chiedi({ azione: "elenco-persone" }, sessione.gettone)
      .then((r) => {
        if (!vivo) return;
        setPersone(r.persone ?? []);
        setRecupero(Boolean(r.recuperoAttivo));
      })
      .catch(() => {
        if (vivo) setErrore("Non riesco a leggere l'elenco.");
      });
    return () => {
      vivo = false;
    };
  }, [sessione.gettone]);

  const esegui = async (corpo: Record<string, string>, fatto: string, dopo?: () => void) => {
    setErrore("");
    setAvviso("");
    setInCorso(true);
    try {
      const r = await chiedi(corpo, sessione.gettone);
      if (r.ok) {
        if (r.persone) setPersone(r.persone);
        setAvviso(fatto);
        dopo?.();
      } else {
        setErrore(r.errore ?? "Qualcosa non ha funzionato.");
      }
    } catch {
      setErrore("Non riesco a contattare il sito.");
    }
    setInCorso(false);
  };

  const aggiungi = (e: React.FormEvent) => {
    e.preventDefault();
    void esegui({ azione: "aggiungi-persona", nome, email, password }, `${nome || email} ora può entrare.`, () => {
      setNome("");
      setEmail("");
      setPassword("");
    });
  };

  const cambiaPassword = (e: React.FormEvent) => {
    e.preventDefault();
    void esegui({ azione: "cambia-password", vecchia, password: nuova }, "Password cambiata.", () => {
      setVecchia("");
      setNuova("");
    });
  };

  return (
    <div className="per-velo" role="dialog" aria-modal="true" aria-label="Chi può entrare">
      <div className="per">
        <header className="per-testa">
          <h2>Chi può entrare</h2>
          <button type="button" className="per-chiudi" onClick={chiudi} aria-label="Chiudi">×</button>
        </header>

        {persone === null ? (
          <p className="per-attesa">Un momento…</p>
        ) : (
          <ul className="per-elenco">
            {persone.map((p) => (
              <li key={p.email}>
                <span>
                  <strong>{p.nome}</strong>
                  <em>{p.email}</em>
                </span>
                {p.tu ? (
                  <span className="per-tu">sei tu</span>
                ) : (
                  <button
                    type="button"
                    disabled={inCorso}
                    onClick={() => {
                      if (confirm(`Togliere ${p.nome} dalle persone che possono entrare?`)) {
                        void esegui({ azione: "togli-persona", email: p.email }, `${p.nome} non può più entrare.`);
                      }
                    }}
                  >
                    togli
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        <form className="per-modulo" onSubmit={aggiungi}>
          <h3>Aggiungi una persona</h3>
          <label>
            <span>Nome</span>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="come si chiama" required />
          </label>
          <label>
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" required />
          </label>
          <label>
            <span>Password per il primo ingresso</span>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} autoComplete="off" required />
          </label>
          <p className="per-nota">
            Scegli una password di almeno otto caratteri e comunicagliela a voce.
            {recuperoAttivo ? " Potrà cambiarla da sola con «Ho dimenticato la password»." : " Il recupero via email non è ancora attivo."}
          </p>
          <button type="submit" disabled={inCorso}>Aggiungi</button>
        </form>

        <form className="per-modulo" onSubmit={cambiaPassword}>
          <h3>Cambia la tua password</h3>
          <label>
            <span>Password attuale</span>
            <input type="password" value={vecchia} onChange={(e) => setVecchia(e.target.value)} autoComplete="current-password" required />
          </label>
          <label>
            <span>Nuova password</span>
            <input type="password" value={nuova} onChange={(e) => setNuova(e.target.value)} minLength={8} autoComplete="new-password" required />
          </label>
          <button type="submit" disabled={inCorso}>Cambia</button>
        </form>

        {errore ? <p className="per-errore">{errore}</p> : null}
        {avviso ? <p className="per-avviso">{avviso}</p> : null}
      </div>
    </div>
  );
}

/** La sessione del pannello vive nel browser: qui la leggiamo, la salviamo e avvisiamo chi la guarda. */

export type Sessione = { gettone: string; nome: string };

const CHIAVE = "pannello-pasquale-sessione";
const ascoltatori = new Set<() => void>();

let ultimoTesto: string | null = null;
let ultimaSessione: Sessione | null = null;

function avvisa() {
  for (const a of ascoltatori) a();
}

export function sottoscriviSessione(ascoltatore: () => void) {
  ascoltatori.add(ascoltatore);
  window.addEventListener("storage", ascoltatore);
  return () => {
    ascoltatori.delete(ascoltatore);
    window.removeEventListener("storage", ascoltatore);
  };
}

/** Restituisce sempre lo stesso oggetto finché il testo salvato non cambia. */
export function leggiSessione(): Sessione | null {
  let testo: string | null = null;
  try {
    testo = localStorage.getItem(CHIAVE);
  } catch {
    /* il browser può vietare l'archivio locale */
  }
  if (testo !== ultimoTesto) {
    ultimoTesto = testo;
    try {
      ultimaSessione = testo ? (JSON.parse(testo) as Sessione) : null;
    } catch {
      ultimaSessione = null;
    }
  }
  return ultimaSessione;
}

/** Durante la generazione statica non c'è nessuna sessione. */
export function nessunaSessione(): Sessione | null {
  return null;
}

export function salvaSessione(sessione: Sessione) {
  try {
    localStorage.setItem(CHIAVE, JSON.stringify(sessione));
  } catch {
    /* pazienza: la sessione vale solo per questa visita */
  }
  avvisa();
}

export function dimenticaSessione() {
  try {
    localStorage.removeItem(CHIAVE);
  } catch {
    /* niente da togliere */
  }
  avvisa();
}

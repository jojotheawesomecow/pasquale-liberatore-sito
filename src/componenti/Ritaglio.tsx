"use client";

import { useRef, useState } from "react";
import type { Riquadro } from "@/lib/foto";

type Presa = { angolo: string; partenza: Riquadro; x: number; y: number };

const ANGOLI = [
  { nome: "alto-sinistra", stile: { top: 0, left: 0 } },
  { nome: "alto-destra", stile: { top: 0, right: 0 } },
  { nome: "basso-sinistra", stile: { bottom: 0, left: 0 } },
  { nome: "basso-destra", stile: { bottom: 0, right: 0 } },
];
const MINIMO = 0.05;
const fra = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Sceglie la parte di foto da tenere: si trascinano gli angoli del riquadro,
 * oppure si trascina dentro per spostarlo. Il resto viene buttato via.
 */
export function Ritaglio({ url, inCorso, annulla, conferma }: {
  url: string;
  inCorso: boolean;
  annulla: () => void;
  conferma: (r: Riquadro) => void;
}) {
  const [riquadro, setRiquadro] = useState<Riquadro>({ x: 0, y: 0, w: 1, h: 1 });
  const [misura, setMisura] = useState({ w: 0, h: 0 });
  const presa = useRef<Presa | null>(null);
  const cornice = useRef<HTMLDivElement>(null);

  const prendi = (e: React.PointerEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    presa.current = { angolo: e.currentTarget.dataset.angolo ?? "dentro", partenza: riquadro, x: e.clientX, y: e.clientY };
  };

  const muovi = (e: React.PointerEvent) => {
    const p = presa.current;
    const box = cornice.current?.getBoundingClientRect();
    if (!p || !box) return;
    const dx = (e.clientX - p.x) / box.width;
    const dy = (e.clientY - p.y) / box.height;
    const r = p.partenza;

    if (p.angolo === "dentro") {
      setRiquadro({ ...r, x: fra(r.x + dx, 0, 1 - r.w), y: fra(r.y + dy, 0, 1 - r.h) });
      return;
    }
    let { x, y, w, h } = r;
    if (p.angolo.includes("sinistra")) {
      const nuovo = fra(r.x + dx, 0, r.x + r.w - MINIMO);
      w = r.x + r.w - nuovo;
      x = nuovo;
    } else {
      w = fra(r.w + dx, MINIMO, 1 - r.x);
    }
    if (p.angolo.includes("alto")) {
      const nuovo = fra(r.y + dy, 0, r.y + r.h - MINIMO);
      h = r.y + r.h - nuovo;
      y = nuovo;
    } else {
      h = fra(r.h + dy, MINIMO, 1 - r.y);
    }
    setRiquadro({ x, y, w, h });
  };

  const lascia = () => {
    presa.current = null;
  };

  const tenute = { w: Math.round(misura.w * riquadro.w), h: Math.round(misura.h * riquadro.h) };
  const stile = {
    left: `${riquadro.x * 100}%`,
    top: `${riquadro.y * 100}%`,
    width: `${riquadro.w * 100}%`,
    height: `${riquadro.h * 100}%`,
  };

  return (
    <div className="rit-velo" role="dialog" aria-modal="true" aria-label="Ritaglia la foto">
      <div className="rit">
        <header className="rit-testa">
          <h2>Ritaglia la foto</h2>
          <p>Trascina gli angoli per tenere solo la parte che ti interessa. Dentro al riquadro, trascina per spostarlo.</p>
        </header>

        <div className="rit-tela" onPointerMove={muovi} onPointerUp={lascia} onPointerCancel={lascia}>
          <div className="rit-cornice" ref={cornice}>
            <img src={url} alt="" draggable={false} onLoad={(e) => setMisura({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })} />
            <div className="rit-buio" style={stile} />
            <div className="rit-scelta" style={stile} data-angolo="dentro" onPointerDown={prendi}>
              {ANGOLI.map((a) => (
                <span key={a.nome} className="rit-angolo" style={a.stile} data-angolo={a.nome} onPointerDown={prendi} />
              ))}
            </div>
          </div>
        </div>

        <footer className="rit-fondo">
          <span className="rit-misura">{tenute.w && tenute.h ? `${tenute.w} × ${tenute.h} punti` : ""}</span>
          <button type="button" className="chiaro" onClick={() => setRiquadro({ x: 0, y: 0, w: 1, h: 1 })}>Tutta la foto</button>
          <button type="button" className="chiaro" onClick={annulla}>Annulla</button>
          <button type="button" className="pieno" disabled={inCorso} onClick={() => conferma(riquadro)}>
            {inCorso ? "Un momento…" : "Ritaglia"}
          </button>
        </footer>
      </div>
    </div>
  );
}

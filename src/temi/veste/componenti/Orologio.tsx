"use client";

import { useEffect, useState } from "react";

/** Ora locale di Villa Sant'Angelo (Europe/Rome), aggiornata ogni 30 secondi. */
export function Orologio({ luogo }: { luogo: string }) {
  const [ora, setOra] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setOra(new Intl.DateTimeFormat("it-IT", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Rome" }).format(new Date()));
    const avvio = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(avvio);
      clearInterval(id);
    };
  }, []);
  return (
    <span className="mono hidden items-center gap-2 xl:inline-flex" aria-label={`${luogo}, ${ora ?? ""}`}>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-accento" aria-hidden="true" />
      {luogo} <span className="tabular-nums text-testo">{ora ?? "--:--"}</span>
    </span>
  );
}

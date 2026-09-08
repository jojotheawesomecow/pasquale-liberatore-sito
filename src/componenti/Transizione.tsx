"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Avvolge il contenuto della pagina: la chiave cambia a ogni navigazione e fa ripartire l'animazione d'ingresso (CSS `.pagina-entra`). */
export function Transizione({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="pagina-entra">
      {children}
    </div>
  );
}

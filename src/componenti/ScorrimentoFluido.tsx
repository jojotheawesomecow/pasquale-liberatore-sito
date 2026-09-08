"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Scorrimento fluido (Lenis). Disattivato su touch e con "riduci movimento". */
export function ScorrimentoFluido() {
  const pathname = usePathname();
  useEffect(() => {
    const riduci = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (riduci || touch) return;
    let attivo = true;
    let lenis: { raf: (t: number) => void; destroy: () => void; scrollTo: (t: number | string, o?: object) => void } | null = null;
    let raf = 0;
    import("lenis").then(({ default: Lenis }) => {
      if (!attivo) return;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      document.documentElement.classList.add("lenis-attivo");
    });
    return () => {
      attivo = false;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      document.documentElement.classList.remove("lenis-attivo");
    };
  }, []);
  // ad ogni cambio pagina si torna in alto (Lenis intercetta lo scroll nativo)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

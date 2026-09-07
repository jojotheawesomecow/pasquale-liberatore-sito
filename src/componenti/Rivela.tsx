"use client";

import { useEffect } from "react";

/**
 * Aggiunge la classe `visibile` agli elementi `[data-rivela]` quando entrano nello schermo.
 * Usa il calcolo diretto dei rettangoli (robusto anche in schede nascoste) e, quando disponibile,
 * un IntersectionObserver per lo scorrimento.
 */
export function RivelaOsservatore() {
  useEffect(() => {
    const daRivelare = () => Array.from(document.querySelectorAll<HTMLElement>("[data-rivela]:not(.visibile)"));

    const controlla = () => {
      const h = window.innerHeight || document.documentElement.clientHeight;
      for (const el of daRivelare()) {
        const r = el.getBoundingClientRect();
        if (r.top < h * 0.94 && r.bottom > 0) el.classList.add("visibile");
      }
    };

    let raf = 0;
    const programma = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        controlla();
      });
    };

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (voci) => {
              for (const v of voci) {
                if (v.isIntersecting) {
                  v.target.classList.add("visibile");
                  io?.unobserve(v.target);
                }
              }
            },
            { rootMargin: "0px 0px -6% 0px", threshold: 0.01 }
          )
        : null;
    const osserva = () => daRivelare().forEach((el) => io?.observe(el));

    // prima si marcano gli elementi già in vista, poi si attiva la classe che nasconde gli altri:
    // così niente lampeggia al caricamento
    controlla();
    document.documentElement.classList.add("js");
    osserva();
    window.addEventListener("scroll", programma, { passive: true });
    window.addEventListener("resize", programma);
    document.addEventListener("visibilitychange", programma);
    const mo = new MutationObserver(() => {
      programma();
      osserva();
    });
    mo.observe(document.body, { childList: true, subtree: true });
    const timer = window.setTimeout(controlla, 1200);

    return () => {
      window.removeEventListener("scroll", programma);
      window.removeEventListener("resize", programma);
      document.removeEventListener("visibilitychange", programma);
      mo.disconnect();
      io?.disconnect();
      window.clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}

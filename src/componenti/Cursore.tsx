"use client";

import { useEffect, useRef } from "react";

/** Cursore personalizzato: un punto che segue il mouse e si allarga sui collegamenti. Solo con mouse e senza "riduci movimento". */
export function Cursore() {
  const punto = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const riduci = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || riduci || !punto.current) return;
    const el = punto.current;
    document.documentElement.classList.add("cursore-attivo");
    let raf = 0;
    const p = { x: -100, y: -100, tx: -100, ty: -100 };
    const passo = () => {
      raf = 0;
      p.x += (p.tx - p.x) * 0.22;
      p.y += (p.ty - p.y) * 0.22;
      el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
      if (Math.abs(p.tx - p.x) > 0.3 || Math.abs(p.ty - p.y) > 0.3) raf = requestAnimationFrame(passo);
    };
    const onMove = (e: MouseEvent) => {
      p.tx = e.clientX;
      p.ty = e.clientY;
      el.classList.add("visibile");
      if (!raf) raf = requestAnimationFrame(passo);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const link = t?.closest("a, button, [role=button], summary, label");
      el.classList.toggle("grande", !!link);
      el.classList.toggle("zoom", !!t?.closest("[data-cursore=zoom]"));
    };
    const onLeave = () => el.classList.remove("visibile");
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("cursore-attivo");
    };
  }, []);
  return <div ref={punto} className="cursore" aria-hidden="true" />;
}

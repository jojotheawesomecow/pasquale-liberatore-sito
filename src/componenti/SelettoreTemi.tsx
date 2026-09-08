"use client";

import { usePathname } from "next/navigation";

/**
 * Pillola di anteprima per passare tra le vesti grafiche A / B / C mantenendo la pagina corrente.
 * Compare solo se è definita NEXT_PUBLIC_ANTEPRIMA_TEMI (es. "A=/sito/|B=/sito/b/|C=/sito/c/").
 */
export function SelettoreTemi() {
  const pathname = usePathname() ?? "/";
  const def = process.env.NEXT_PUBLIC_ANTEPRIMA_TEMI;
  const corrente = (process.env.NEXT_PUBLIC_TEMA ?? "a").toUpperCase();
  if (!def) return null;
  const temi = def.split("|").map((v) => {
    const [nome, base] = v.split("=");
    return { nome, base: (base ?? "/").replace(/\/$/, "") };
  });
  const percorso = pathname.replace(/\/$/, "") + "/";
  return (
    <nav
      aria-label="Versioni del sito"
      style={{ position: "fixed", right: 12, bottom: 12, zIndex: 900, display: "flex", gap: 2, padding: 3, borderRadius: 999, background: "rgba(20,20,20,0.85)", backdropFilter: "blur(8px)", boxShadow: "0 4px 24px rgba(0,0,0,0.25)", fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, letterSpacing: "0.08em" }}
    >
      {temi.map((tm) => {
        const attivo = tm.nome.toUpperCase() === corrente;
        return (
          <a
            key={tm.nome}
            href={`${tm.base}${percorso}`}
            aria-current={attivo ? "true" : undefined}
            title={`Versione ${tm.nome}`}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 999, textDecoration: "none", color: attivo ? "#111" : "#eee", background: attivo ? "#f4f1ea" : "transparent" }}
          >
            {tm.nome}
          </a>
        );
      })}
    </nav>
  );
}

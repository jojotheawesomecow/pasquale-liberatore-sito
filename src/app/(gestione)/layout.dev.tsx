import type { ReactNode } from "react";
import "./gestione.css";

export const metadata = { title: "Gestione delle opere — Pasquale Liberatore" };

export default function LayoutGestione({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
